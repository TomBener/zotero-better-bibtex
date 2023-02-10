/* eslint-disable no-magic-numbers, @typescript-eslint/quotes, max-len */
declare const Services: any

import { Events } from './events'

declare const Zotero: any

import { names, defaults } from '../gen/preferences/meta'
import { PreferenceManager as PreferenceManagerBase } from '../gen/preferences'
import { dict as csv2dict } from './load-csv'
import { log } from './logger'

type TexChar = { unicode?: string, math?: string, text?: string }
export type TeXMap = Record<string, TexChar>

export const Preference = new class PreferenceManager extends PreferenceManagerBase {
  public prefix = 'translators.better-bibtex.'
  public texmap: TeXMap = {}

  constructor() {
    super()

    this.baseAttachmentPath = Zotero.Prefs.get('baseAttachmentPath')
    Zotero.Prefs.registerObserver('baseAttachmentPath', val => { this.baseAttachmentPath = val })

    this.migrate()
    this.setDefaultPrefs()

    // put this in a preference so that translators can access this.
    if (Zotero.isWin) {
      this.platform = 'win'
    }
    else if (Zotero.isMac) {
      this.platform = 'mac'
    }
    else {
      if (!Zotero.isLinux) Zotero.debug('error: better-bibtex could not establish the platform, assuming linux')
      this.platform = 'lin'
    }

    if (this.testing) {
      return new Proxy(this, {
        set: (object, property, value) => {
          if (!(property in object)) {
            const stack = (new Error).stack
            throw new TypeError(`Unsupported preference ${new String(property)} ${stack}`) // eslint-disable-line no-new-wrappers
          }
          object[property] = value
          return true
        },
        get: (object, property) => {
          if (!(property in object)) {
            const stack = (new Error).stack
            throw new TypeError(`Unsupported preference ${new String(property)} ${stack}`) // eslint-disable-line no-new-wrappers
          }
          return object[property] // eslint-disable-line @typescript-eslint/no-unsafe-return
        },
      })
    }
  }

  setDefaultPrefs() {
    const branch = Services.prefs.getDefaultBranch('')
    for (let [pref, value] of Object.entries(defaults)) {
      pref = `extensions.zotero.translators.better-bibtex.${pref}`
      try {
        switch (typeof value) {
          case 'boolean':
            branch.setBoolPref(pref, value)
            break
          case 'string':
            branch.setStringPref(pref, value)
            break
          case 'number':
            branch.setIntPref(pref, value)
            break
          default:
            Zotero.logError(`Better BibTeX: Invalid type '${typeof(value)}' for pref '${pref}'`)
        }
      }
      catch (err) {
        Zotero.logError(`Better BibTeX: Error setting default for ${pref} to ${typeof value} ${JSON.stringify(value)}`)
      }
    }
  }

  observe(pref: string) {
    Zotero.Prefs.registerObserver(`${this.prefix}${pref}`, this.changed.bind(this, pref))
  }

  changed(pref: string) {
    void Events.emit('preference-changed', pref)
  }

  /*
  set cache(v: boolean | undefined) {
    if (!v) {
      const e = new Error
      log.debug('who turned off the cache?', e.stack)
    }
    super.cache = v
  }
  get cache(): boolean {
    return super.cache
  }
  */

  private migrate() {
    let old, key

    // clear out old keys
    const oops = 'extensions.translators.better-bibtex.'
    for (key of Services.prefs.getBranch(oops).getChildList('', {}) as string[]) {
      Zotero.Prefs.clear(oops + key, true) // eslint-disable-line @typescript-eslint/restrict-plus-operands
    }
    if (typeof Zotero.Prefs.get(key = 'translators.better-bibtex.citeprocNoteCitekey') !== 'undefined') Zotero.Prefs.clear(key)
    if (typeof Zotero.Prefs.get(key = 'translators.better-bibtex.newTranslatorsAskRestart') !== 'undefined') Zotero.Prefs.clear(key)
    if (typeof Zotero.Prefs.get(key = 'translators.better-bibtex.caching') !== 'undefined') Zotero.Prefs.clear(key)

    // migrate ancient keys
    if ((old = Zotero.Prefs.get(key = 'translators.better-bibtex.quickCopyMode')) === 'orgmode_citekey') {
      Zotero.Prefs.set(key, 'orgmode')
      Zotero.Prefs.set('translators.better-bibtex.quickCopyOrgMode', 'citationkey')
    }
    if ((old = Zotero.Prefs.get(key = 'translators.better-bibtex.quickCopyMode')) === 'selectLink_citekey') {
      Zotero.Prefs.set(key, 'selectlink')
      Zotero.Prefs.set('translators.better-bibtex.quickCopySelectLink', 'citationkey')
    }
    if ((old = Zotero.Prefs.get(key = 'translators.better-bibtex.quickCopyMode')) === 'selectLink') {
      Zotero.Prefs.set(key, 'selectlink')
    }
    if (typeof Zotero.Prefs.get(key = 'translators.better-bibtex.worker') !== 'undefined') {
      Zotero.Prefs.clear(key)
    }
    if (typeof Zotero.Prefs.get(key = 'translators.better-bibtex.workers') !== 'undefined') {
      Zotero.Prefs.clear(key)
    }
    if (typeof Zotero.Prefs.get(key = 'translators.better-bibtex.workersMax') !== 'undefined') {
      Zotero.Prefs.clear(key)
    }
    if (typeof (old = Zotero.Prefs.get(key = 'translators.better-bibtex.workersCache')) !== 'undefined') {
      Zotero.Prefs.clear(key)
    }
    if (typeof (old = Zotero.Prefs.get(key = 'translators.better-bibtex.suppressTitleCase')) !== 'undefined') {
      Zotero.Prefs.clear(key)
      Zotero.Prefs.set('translators.better-bibtex.exportTitleCase', !old)
    }
    if (typeof (old = Zotero.Prefs.get(key = 'translators.better-bibtex.suppressBraceProtection')) !== 'undefined') {
      Zotero.Prefs.clear(key)
      Zotero.Prefs.set('translators.better-bibtex.exportBraceProtection', !old)
    }
    if (typeof (old = Zotero.Prefs.get(key = 'translators.better-bibtex.suppressSentenceCase')) !== 'undefined') {
      Zotero.Prefs.clear(key)
      Zotero.Prefs.set('translators.better-bibtex.importSentenceCase', old ? 'off' : 'on+guess')
    }
    if (typeof (old = Zotero.Prefs.get(key = 'translators.better-bibtex.suppressNoCase')) !== 'undefined') {
      Zotero.Prefs.clear(key)
      Zotero.Prefs.set('translators.better-bibtex.importCaseProtection', old ? 'off' : 'as-needed')
    }
    if (typeof (old = Zotero.Prefs.get(key = 'translators.better-bibtex.autoPin')) !== 'undefined') {
      Zotero.Prefs.clear(key)
      Zotero.Prefs.set('translators.better-bibtex.autoPinDelay', old ? 1 : 0)
    }
    if (Zotero.Prefs.get(key = 'translators.better-bibtex.autoExportDelay') === 1) {
      Zotero.Prefs.set(key, defaults.autoExportDelay)
    }

    // put this in a preference so that translators can access this.
    if (Zotero.isWin) {
      this.platform = 'win'
    }
    else if (Zotero.isMac) {
      this.platform = 'mac'
    }
    else {
      if (!Zotero.isLinux) Zotero.debug('error: better-bibtex could not establish the platform, assuming linux')
      this.platform = 'lin'
    }

    if (this.testing) {
      return new Proxy(this, {
        set: (object, property, value) => {
          if (!(property in object)) throw new TypeError(`Unsupported preference ${new String(property)}`) // eslint-disable-line no-new-wrappers
          object[property] = value
          return true
        },
        get: (object, property) => {
          if (!(property in object)) throw new TypeError(`Unsupported preference ${new String(property)}`) // eslint-disable-line no-new-wrappers
          return object[property] // eslint-disable-line @typescript-eslint/no-unsafe-return
        },
      })
    }
  }

  private async loadFromCSV(pref: string, path: string, dflt: string, transform: (row: any) => any) {
    const key = `${this.prefix}${pref}`
    const modified = {
      pref: Zotero.Prefs.get(`${key}.modified`) || 0,
      file: (await OS.File.exists(path)) ? (await OS.File.stat(path)).lastModificationDate.getTime() : 0,
    }
    if (modified.pref >= modified.file) return

    Zotero.Prefs.set(`${key}.modified`, modified.file)
    const rows = await csv2dict(path)
    try {
      this[pref] = rows.length ? transform(rows) : dflt
    }
    catch (err) {
      log.error('error loading pref', pref, 'from', path, ':', err)
      this[pref] = dflt
    }
  }

  public async initAsync(dir: string) {
    // load from csv for easier editing
    this.texmap = {}
    await this.loadFromCSV('charmap', OS.Path.join(dir, 'charmap.csv'), '', (rows: Record<string, string>[]) => JSON.stringify(
      rows.reduce((acc: TeXMap, row: TexChar) => {
        if (row.unicode && (row.math || row.text)) acc[row.unicode] = { text: row.text, math: row.math }
        return (this.texmap = acc)
      }, {})
    ))

    for (const pref of names) {
      if (pref !== 'platform' && pref !== 'testing') {
        // zotero does not set defaults?!
        /*
        if (typeof Zotero.Prefs.get(`${this.prefix}${pref}`) === 'undefined') {
          Zotero.Prefs.set(`${this.prefix}${pref}`, typeof defaults[pref] === 'string' ? (defaults[pref] as string).replace(/^\u200B/, '') : defaults[pref])
          log.debug(`${pref} is undefined, setting to ${JSON.stringify(defaults[pref])}`)
        }
        */
        // install event emitter
        this.observe(pref)
      }
    }
  }
}
