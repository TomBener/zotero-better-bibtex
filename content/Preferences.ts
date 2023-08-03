Components.utils.import('resource://gre/modules/Services.jsm')

import type { XUL } from '../typings/xul'

import { log } from './logger'
import { DB as Cache } from './db/cache'

import { Preference } from './prefs'
import { options as preferenceOptions, defaults as preferenceDefaults } from '../gen/preferences/meta'
import { Formatter } from './key-manager/formatter'
import { AutoExport } from './auto-export'
import { Translators } from './translators'
import { client } from './client'
import * as l10n from './l10n'
import { Events } from './events'
import { pick } from './file-picker'
import { flash } from './flash'
import { is7 } from './client'
import { icons } from './icons'

// safe to keep "global" since only one pref pane will be loaded at any one time
let $window: Window & { sizeToContent(): void } // eslint-disable-line no-var
Events.on('window-loaded', ({ win, href }: {win: Window, href: string}) => {
  switch (href) {
    case 'chrome://zotero/content/preferences/preferences.xul': // Zotero's own preferences on Z6
      new ZoteroPreferences(win)
      break

    case 'chrome://zotero-better-bibtex/content/preferences.xul': // BBT's own Z6 preferences
      Zotero.BetterBibTeX.PrefPane.load(win).catch(err => log.error(err))
      break
  }
})

Events.on('preference-changed', (pref: string) => {
  switch (pref) {
    case 'citekeyFormatEditing':
      Zotero.BetterBibTeX.PrefPane.checkCitekeyFormat()
      break
    case 'postscript':
      Zotero.BetterBibTeX.PrefPane.checkPostscript()
      break
  }
})

function setQuickCopy(node: XUL.Menuitem): void {
  if (!node) return

  let mode = ''
  let cmd = ''
  switch (Preference.quickCopyMode) {
    case 'latex':
      cmd = `${Preference.citeCommand}`.trim()
      mode = (cmd === '') ? 'citation keys' : `\\${cmd}{citation keys}`
      break

    case 'pandoc':
      mode = Preference.quickCopyPandocBrackets ? '[@citekeys]' : '@citekeys'
      break

    default:
      mode = preferenceOptions.quickCopyMode[Preference.quickCopyMode] || Preference.quickCopyMode
  }

  node.label = `Better BibTeX Quick Copy: ${mode}`
}

class ZoteroPreferences {
  private observer: MutationObserver
  private observed: XUL.Element

  constructor(win: Window) {
    this.observer = new MutationObserver(this.mutated.bind(this))
    this.observed = win.document.getElementById('zotero-prefpane-export') as unknown as XUL.Element
    this.observer.observe(this.observed, { childList: true, subtree: true })
    win.addEventListener('unload', () => {
      this.observer.disconnect()
    })
  }

  mutated(mutations: MutationRecord[], observer: MutationObserver): void {
    let node
    for (const mutation of mutations) {
      if (!mutation.addedNodes) continue

      if (this.observed?.id === 'zotero-prefpane-export' && (node = [...mutation.addedNodes].find((added: XUL.Element) => added.id === 'zotero-prefpane-export-groupbox'))) {
        observer.disconnect()
        this.observer = new MutationObserver(this.mutated.bind(this))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        this.observed = [...node.getElementsByTagNameNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'menulist')].find(added => added.id === 'zotero-quickCopy-menu')
        this.observer.observe(this.observed, { childList: true, subtree: true })
      }
      else if (this.observed?.tagName === 'menulist' && (node = [...mutation.addedNodes].find((added: XUL.Menuitem) => added.tagName === 'menuitem' && added.label?.match(/Better BibTeX.*Quick Copy/)))) {
        node.id = 'translator-bbt-quick-copy'
        setQuickCopy(node)
      }
    }
  }
}

class AutoExportPane {
  private status: { [key: string]: string }
  private cacherate: Record<number, number> = {}

  public load() {
    if (!this.status) {
      this.status = {}
      for (const status of ['scheduled', 'running', 'done', 'error', 'preparing']) {
        this.status[status] = l10n.localize(`better-bibtex_preferences_auto-export_status_${status}`)
      }
    }

    this.refresh()

    Events.on('export-progress', async ( { pct, ae }) => {
      this.cacherate[ae] = await AutoExport.cached(ae)
      if (pct >= 100 && typeof ae === 'number') {
        this.refresh(ae)
      }
    })
  }

  private label(ae) {
    let label: string = { library: icons.computer, collection: icons.folder }[ae.type]
    label += ` ${this.name(ae, 'short')}`
    label += ` (${Translators.byId[ae.translatorID].label})`
    const path = ae.path.startsWith(OS.Constants.Path.homeDir) ? ae.path.replace(OS.Constants.Path.homeDir, '~') : ae.path
    label += ` ${path}`
    return label
  }

  public refresh($loki?: number) {
    if (!$window) return
    const doc = $window.document

    const auto_exports = [...AutoExport.db.find()].sort((a: { path: string }, b: { path: string }) => a.path.localeCompare(b.path))
    const details = doc.querySelector<HTMLElement>('#bbt-prefs-auto-exports')
    details.style.display = auto_exports.length ? 'grid' : 'none'
    if (!auto_exports.length) return null

    const menulist: XUL.Menulist = doc.querySelector<HTMLElement>('#bbt-prefs-auto-export-select') as XUL.Menulist
    const menupopup = doc.querySelector('#bbt-prefs-auto-export-select menupopup')
    let selected
    if (menulist.selectedItem) {
      const selected$loki = parseInt(menulist.selectedItem.value)
      selected = auto_exports.find(ae => ae.$loki === selected$loki)
    }

    // list changed
    if (Array.from(menupopup.children).map(ae => (ae as unknown as XUL.Menuitem).value).join('/') !== auto_exports.map(ae => `${ae.$loki}`).join('/')) {
      menulist.removeAllItems()
      for (const ae of auto_exports) {
        const menuitem = menulist.appendItem(this.label(ae), `${ae.$loki}`)
        if (selected && ae.$loki === selected.$loki) menulist.selectedItem = menuitem
      }
    }
    if (!selected || !menulist.selectedItem) {
      selected = auto_exports[0]
      menulist.selectedIndex = 0
    }

    if (typeof $loki === 'number' && $loki !== selected.$loki) return

    if (details.getAttribute('data-ae-id') !== `${selected.$loki}` || details.getAttribute('data-ae-updated') !== `${selected.meta.updated || selected.meta.created}`) {
      details.setAttribute('data-ae-id', `${selected.$loki}`)
      details.setAttribute('data-ae-updated', `${selected.meta.updated || selected.meta.created}`)

      const displayed = `bbt-autoexport-${Translators.byId[selected.translatorID].label.replace(/ /g, '')}`
      for (const node of (Array.from(details.getElementsByClassName('bbt-autoexport-options')) as unknown[] as XUL.Element[])) {
        node.style.display = node.classList.contains(displayed) ? 'initial' : 'none'
      }

      for (const node of Array.from(details.querySelectorAll('*[data-ae-field]'))) {
        const field = node.getAttribute('data-ae-field')

        switch (field) {
          case 'type':
            (node as unknown as XUL.Textbox).value = `${l10n.localize(`better-bibtex_preferences_auto-export_type_${selected.type}`)}:`
            break

          case 'name':
            (node as unknown as XUL.Textbox).value = this.name(selected, 'long')
            break

          case 'updated':
            (node as unknown as XUL.Textbox).value = `${new Date(selected.meta.updated || selected.meta.created)}`
            break

          case 'translator':
            (node as unknown as XUL.Textbox).value = Translators.byId[selected.translatorID].label
            break

          case 'path':
            (node as unknown as XUL.Textbox).value = selected[field]
            break

          case 'exportNotes':
          case 'useJournalAbbreviation':
          case 'asciiBibTeX':
          case 'bibtexParticleNoOp':
          case 'asciiBibLaTeX':
          case 'biblatexExtendedNameFormat':
          case 'recursive':
            (node as unknown as XUL.Checkbox).checked = selected[field]
            break

          case 'DOIandURL':
          case 'bibtexURL':
            (node as unknown as XUL.Menulist).value = selected[field]
            break

          case 'cacherate':
          case 'status':
            // always set below on refresh
            break

          default:
            throw new Error(`Unexpected field in auto-export refresh: ${field}`)
        }
      }
    }

    const status = details.querySelector("*[data-ae-field='status']") as unknown as XUL.Textbox
    const progress = AutoExport.progress.get(selected.$loki)
    if (selected.status === 'running' && typeof progress === 'number') {
      status.value = progress < 0 ? `${icons.running} ${this.status?.preparing || 'preparing'} ${-progress}%` : `${icons.running} ${progress}%`
    }
    else {
      const icon: string = {
        running: icons.running,
        done: icons.check,
        scheduled: icons.waiting,
        error: icons.error,
        preparing: `${icons.running}${icons.waiting}`,
      }[selected.status] || selected.status

      status.value = `${icon} ${selected.error || ''}`.trim()
    }

    if (typeof this.cacherate[selected.$loki] === 'undefined') this.cacherate[selected.$loki] = 0
    const cacherate = details.querySelector("*[data-ae-field='cacherate']") as unknown as XUL.Textbox
    cacherate.value = `${this.cacherate[selected.$loki]}%`
  }

  public remove() {
    const menulist: XUL.Menulist = $window.document.querySelector('#bbt-prefs-auto-export-select') as unknown as XUL.Menulist
    if (!menulist.selectedItem) return

    if (!Services.prompt.confirm(null, l10n.localize('better-bibtex_auto-export_delete'), l10n.localize('better-bibtex_auto-export_delete_confirm'))) return

    const ae = AutoExport.db.get(parseInt(menulist.selectedItem.getAttribute('value')))
    Cache.getCollection(Translators.byId[ae.translatorID].label)?.removeDataOnly()
    AutoExport.db.remove(ae)
    this.refresh()
  }

  public run() {
    const menulist: XUL.Menulist = $window.document.querySelector('#bbt-prefs-auto-export-select') as unknown as XUL.Menulist
    if (!menulist.selectedItem) return

    AutoExport.run(parseInt(menulist.selectedItem.getAttribute('value')))
    this.refresh()
  }

  public edit(node) {
    let id: string
    // add data-ae-id check for testing
    if (!(id = node.getAttribute('data-ae-id'))) {
      const menulist: XUL.Menulist = $window.document.querySelector('#bbt-prefs-auto-export-select') as unknown as XUL.Menulist
      id = menulist.selectedItem.getAttribute('value')
    }
    const ae = AutoExport.db.get(parseInt(id))

    const field = node.getAttribute('data-ae-field')
    Cache.getCollection(Translators.byId[ae.translatorID].label).removeDataOnly()

    log.debug('edit autoexport:', field)

    switch (field) {
      case 'exportNotes':
      case 'useJournalAbbreviation':
      case 'asciiBibTeX':
      case 'bibtexParticleNoOp':
      case 'asciiBibLaTeX':
      case 'biblatexExtendedNameFormat':
      case 'recursive':
        log.debug('edit autoexport:', field, node.checked)
        ae[field] = node.checked
        break

      case 'DOIandURL':
      case 'bibtexURL':
        log.debug('edit autoexport:', field, node.value)
        ae[field] = node.value
        break

      default:
        log.error('unexpected field', field)
    }

    log.debug('edit autoexport:', ae)

    AutoExport.db.update(ae)
    AutoExport.run(ae.$loki)
    this.refresh()
  }

  private collection(id: number | string, form: 'long' | 'short'): string {
    if (typeof id === 'string') id = parseInt(id)
    if (isNaN(id)) return ''
    const coll = Zotero.Collections.get(id)
    if (!coll) return ''

    if (form === 'long' && !isNaN(parseInt(coll.parentID))) {
      return `${this.collection(coll.parentID, form)} / ${coll.name}`
    }
    else {
      return `${Zotero.Libraries.get(coll.libraryID).name} : ${coll.name}`
    }
  }

  private name(ae: { type: string, id: number, path: string }, form: 'long' | 'short'): string {
    switch (ae.type) {
      case 'library':
        return (Zotero.Libraries.get(ae.id).name as string)

      case 'collection':
        return this.collection(ae.id, form)

      default:
        return ae.path
    }
  }
}

export class PrefPane {
  public autoexport = new AutoExportPane
  private timer: ReturnType<typeof setInterval>
  // private prefwindow: HTMLElement

  public async exportPrefs(): Promise<void> {
    let file = await pick(Zotero.getString('fileInterface.export'), 'save', [['BBT JSON file', '*.json']])
    if (!file) return
    if (!file.match(/.json$/)) file = `${file}.json`
    Zotero.File.putContents(Zotero.File.pathToFile(file), JSON.stringify({ config: { preferences: Preference.all } }, null, 2))
  }

  public async importPrefs(): Promise<void> {
    const preferences: { path: string, contents?: string, parsed?: any } = {
      path: await pick(Zotero.getString('fileInterface.import'), 'open', [['BBT JSON file', '*.json']]),
    }
    if (!preferences.path) return

    try {
      preferences.contents = Zotero.File.getContents(preferences.path)
    }
    catch (err) {
      flash(`could not read contents of ${preferences.path}`)
      return
    }

    try {
      preferences.parsed = JSON.parse(preferences.contents)
    }
    catch (err) {
      flash(`could not parse contents of ${preferences.path}`)
      return
    }

    if (typeof preferences.parsed?.config?.preferences !== 'object') {
      flash(`no preferences in ${preferences.path}`)
      return
    }

    try {
      for (let [pref, value] of Object.entries(preferences.parsed.config.preferences)) {
        if (pref === 'citekeyFormatEditing') continue
        if (pref === 'citekeyFormat') pref = 'citekeyFormatEditing'

        if (typeof value === 'undefined' || typeof value !== typeof preferenceDefaults[pref]) {
          flash(`Invalid ${typeof value} value for ${pref}, expected ${preferenceDefaults[pref]}`)
        }
        else if (Preference[pref] !== value) {
          Preference[pref] = value
          flash(`${pref} set`, `${pref} set to ${JSON.stringify(value)}`)
        }
      }
    }
    catch (err) {
      flash(err.message)
    }
  }

  public checkCitekeyFormat(): void {
    if (!$window || Zotero.BetterBibTeX.ready.isPending()) return // itemTypes not available yet

    const error = Formatter.update([Preference.citekeyFormatEditing, Preference.citekeyFormat])

    const editing = $window.document.getElementById('bbt-preferences-citekeyFormatEditing')
    editing.classList[error ? 'add' : 'remove']('bbt-prefs-error')
    editing.setAttribute(is7 ? 'title' : 'tooltiptext', error)
    if (is7) editing.setAttribute('tooltip', 'html-tooltip')

    const msg = $window.document.getElementById('bbt-citekeyFormat-error') as HTMLInputElement
    msg.value = error
    msg.style.display = error ? 'initial' : 'none'

    const active = $window.document.getElementById('bbt-preferences-citekeyFormat')
    const label = $window.document.getElementById('bbt-label-citekeyFormat')
    active.style.display = label.style.display = Preference.citekeyFormat === Preference.citekeyFormatEditing ? 'none' : 'initial'
  }

  public checkPostscript(): void {
    if (!$window) {
      log.debug('Preferences.checkPostscript: window not loaded yet?')
      return
    }

    let error = ''
    try {
      // don't care about the return value, just if it throws an error
      new Function(Preference.postscript) // eslint-disable-line @typescript-eslint/no-unused-expressions
    }
    catch (err) {
      log.error('PrefPane.checkPostscript: error compiling postscript:', err)
      error = `${err}`
    }

    const postscript = $window.document.getElementById('bbt-postscript')
    postscript.setAttribute('style', (error ? '-moz-appearance: none !important; background-color: DarkOrange' : ''))
    postscript.setAttribute(is7 ? 'title' : 'tooltiptext', error)
    if (is7) postscript.setAttribute('tooltip', 'html-tooltip')
    $window.document.getElementById('bbt-cache-warn-postscript').setAttribute('hidden', `${!Preference.postscript.includes('Translator.options.exportPath')}`)
  }

  public async rescanCitekeys(): Promise<void> {
    await Zotero.BetterBibTeX.KeyManager.rescan()
  }

  public cacheReset(): void {
    Cache.reset('user-initiated')
  }

  public async load(win: Window): Promise<void> {
    try {
      $window = win as any

      ($window as any).Zotero = Zotero
      $window.addEventListener('unload', () => {
        Zotero.BetterBibTeX.PrefPane.unload()
        $window = null
      })

      if (!is7) {
        const deck = $window.document.getElementById('bbt-prefs-deck') as unknown as XUL.Deck
        deck.selectedIndex = 0

        await Zotero.BetterBibTeX.ready

        // bloody *@*&^@# html controls only sorta work for prefs
        for (const node of Array.from($window.document.querySelectorAll("input[preference][type='range']"))) {
          (node as HTMLInputElement).value = Preference[node.getAttribute('preference').replace('extensions.zotero.translators.better-bibtex.', '')]
        }

        deck.selectedIndex = 1
      }

      $window.document.getElementById('bbt-rescan-citekeys').hidden = !Zotero.Debug.enabled

      this.autoexport.load()

      this.quickCopy()
      $window.document.getElementById('bbt-preferences-quickcopy').addEventListener('command', () => this.quickCopy())

      this.checkCitekeyFormat()
      this.checkPostscript()
      this.refresh()
      if (typeof this.timer === 'undefined') this.timer = setInterval(this.refresh.bind(this), 500)  // eslint-disable-line no-magic-numbers
    }
    catch (err) {
      log.debug('error loading preferences:', err)
    }
  }

  private quickCopy() {
    const quickcopy = 'bbt-preferences-quickcopy-details'
    const selected = `${quickcopy}-${Zotero.Prefs.get('translators.better-bibtex.quickCopyMode')}`
    for (const details of ([...$window.document.querySelectorAll(`.${quickcopy}`)] as HTMLElement[])) {
      details.style.display = details.id === selected ? 'initial' : 'none'
    }
  }

  public unload(): void {
    if (typeof this.timer !== 'undefined') {
      clearInterval(this.timer)
      this.timer = undefined
    }
  }

  public refresh(): void {
    if (!$window) return

    const pane = $window.document.getElementById('bbt-zotero-prefpane')
    // unloaded
    if (!pane) {
      this.unload()
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    for (const node of (Array.from($window.document.getElementsByClassName('bbt-jurism')) as unknown[] as XUL.Element[])) {
      node.hidden = client !== 'jurism'
    }

    if (client === 'jurism') {
      Zotero.Styles.init().then(() => {
        const styles = Zotero.Styles.getVisible().filter((style: { usesAbbreviation: boolean }) => style.usesAbbreviation)

        const stylebox = $window.document.getElementById('bbt-abbrev-style') as unknown as XUL.Menulist
        const refill = stylebox.children.length === 0
        const selectedStyle = Preference.autoAbbrevStyle
        let selectedIndex = -1
        for (const [i, style] of styles.entries()) {
          if (refill) {
            const itemNode = $window.document.createElement('menuitem')
            itemNode.setAttribute('value', style.styleID)
            itemNode.setAttribute('label', style.title)
            stylebox.appendChild(itemNode)
          }
          if (style.styleID === selectedStyle) selectedIndex = i
        }
        if (selectedIndex === -1) selectedIndex = 0
        this.styleChanged(selectedIndex)

        setTimeout(() => {
          stylebox.ensureIndexIsVisible(selectedIndex)
          stylebox.selectedIndex = selectedIndex
        }, 0)
      })
    }

    if (this.autoexport) this.autoexport.refresh()
  }

  private styleChanged(index) {
    if (client !== 'jurism') return null

    const stylebox = $window.document.getElementById('bbt-abbrev-style') as unknown as XUL.Menulist
    const selectedItem: XUL.Element = typeof index !== 'undefined' ? stylebox.getItemAtIndex(index) : stylebox.selectedItem
    const styleID = selectedItem.getAttribute('value')
    Preference.autoAbbrevStyle = styleID
  }
}
