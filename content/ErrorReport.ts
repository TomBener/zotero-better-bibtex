Components.utils.import('resource://gre/modules/Services.jsm')

import { Shim } from './os'
import { is7 } from './client'
const $OS = is7 ? Shim : OS

import { PromptService } from './prompt'

import { Preference } from './prefs'

import { defaults } from '../gen/preferences/meta'
const supported: string[] = Object.keys(defaults).filter(name => !['client', 'testing', 'platform', 'newTranslatorsAskRestart'].includes(name))

import { byId } from '../gen/translators'
import { log } from './logger'
import { AutoExport } from './auto-export'
import { KeyManager } from './key-manager'

import { DB as Cache } from './db/cache'
import { pick } from './file-picker'
import * as l10n from './l10n'

import Tar from 'tar-js'
import { gzip } from 'pako'

import { alert } from './prompt'

import * as s3 from './s3.json'

import * as PACKAGE from '../package.json'

const kB = 1024

type WizardButton = HTMLElement & { disabled: boolean }

type Wizard = HTMLElement & {
  getButton: (name: string) => WizardButton
  getPageById: (id: string) => HTMLElement
  canRewind: boolean
  onLastPage: boolean
  pageIndex: number
  advance: () => void
  rewind: () => void
}

export class ErrorReport {
  private previewSize = 3 * kB // eslint-disable-line yoda
  private document: Document

  private key: string
  private timestamp: string
  private tarball: string

  private bucket: string
  private cacheState: string

  private errorlog: {
    info: string
    errors: string
    debug: string
    items?: string
    acronyms?: string
  }

  public async send(): Promise<void> {
    const wizard: Wizard = this.document.getElementById('better-bibtex-error-report') as Wizard

    wizard.getButton('next').disabled = true
    wizard.getButton('cancel').disabled = true
    wizard.canRewind = false

    const version = require('../gen/version.js')

    try {
      await Zotero.HTTP.request('PUT', `${this.bucket}/${$OS.Path.basename(this.tarball)}`, {
        noCache: true,
        // followRedirects: true,
        // noCache: true,
        // foreground: true,
        headers: {
          'x-amz-storage-class': 'STANDARD',
          'x-amz-acl': 'bucket-owner-full-control',
          'Content-Type': 'application/x-gzip',
        },
        body: this.tar(),
      })

      wizard.advance();

      // eslint-disable-next-line no-magic-numbers
      (<HTMLInputElement>this.document.getElementById('better-bibtex-report-id')).value = `${this.key}/${version}-${is7 ? 7 : 6}${Zotero.BetterBibTeX.outOfMemory ? '/oom' : ''}`
      this.document.getElementById('better-bibtex-report-result').hidden = false
    }
    catch (err) {
      log.error('failed to submit', this.key, err)
      alert({ text: `${err} (${this.key}, items: ${!!this.errorlog.items})`, title: Zotero.getString('general.error') })
      if (wizard.rewind) wizard.rewind()
    }
  }

  public show(): void {
    const wizard: Wizard = this.document.getElementById('better-bibtex-error-report') as Wizard

    if (wizard.onLastPage) wizard.canRewind = false
    else if (wizard.pageIndex === 0) wizard.canRewind = false
    else if (wizard.pageIndex === 1 && Zotero.Debug.storing) wizard.canRewind = false
    else wizard.canRewind = true
  }

  public restartWithDebugEnabled(): void {
    const buttonFlags = PromptService.BUTTON_POS_0 * PromptService.BUTTON_TITLE_IS_STRING
        + PromptService.BUTTON_POS_1 * PromptService.BUTTON_TITLE_CANCEL
        + PromptService.BUTTON_POS_2 * PromptService.BUTTON_TITLE_IS_STRING
    const index = PromptService.confirmEx(
      null,
      Zotero.getString('zotero.debugOutputLogging'),
      Zotero.getString('zotero.debugOutputLogging.enabledAfterRestart', [Zotero.clientName]),
      buttonFlags,
      Zotero.getString('general.restartNow'),
      null, Zotero.getString('general.restartLater'), null, {}
    )

    if (index !== 1) Zotero.Prefs.set('debug.store', true)

    if (index === 0) Zotero.Utilities.Internal.quit(true)
  }

  private async latest() {
    try {
      const latest = PACKAGE.xpi.releaseURL.replace('https://github.com/', 'https://api.github.com/repos/').replace(/\/releases\/.*/, '/releases/latest')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return JSON.parse((await Zotero.HTTP.request('GET', latest, { noCache: true })).response).tag_name.replace('v', '')
    }
    catch (err) {
      log.error('errorreport.latest:', err)
      return null
    }
  }

  public tar(): Uint8Array {
    const tape = new Tar
    let out: Uint8Array

    out = tape.append(`${this.key}/debug.txt`, [
      this.errorlog.info,
      this.cacheState,
      this.errorlog.errors,
      this.errorlog.debug,
    ].filter(chunk => chunk).join('\n\n'))

    if (this.errorlog.items) out = tape.append(`${this.key}/items.json`, this.errorlog.items)
    if (this.errorlog.acronyms) out = tape.append(`${this.key}/acronyms.csv`, this.errorlog.acronyms)

    if ((<HTMLInputElement>this.document.getElementById('better-bibtex-error-report-include-db')).checked) {
      out = tape.append(`${this.key}/database.json`, JSON.stringify(KeyManager.all()))
      out = tape.append(`${this.key}/cache.json`, Cache.serialize({ serializationMethod: 'pretty' }))
    }

    return gzip(out)
  }

  public async save(): Promise<void> {
    const filename = await pick('Logs', 'save', [['Tape Archive (*.tgz)', '*.tgz']], `${this.key}.tgz`)
    if (filename) await $OS.File.writeAtomic(filename, this.tar(), { tmpPath: filename + '.tmp' })
  }

  private async ping(region: string) {
    await Zotero.HTTP.request('GET', `https://s3.${region}.amazonaws.com${s3.region[region].tld || ''}/ping`, { noCache: true })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return { region, ...s3.region[region] }
  }

  private setValue(id: string, value: string) {
    (<HTMLInputElement>this.document.getElementById(id)).value = value
  }

  private errors(): string {
    const ignore = [
      /NS_NOINTERFACE.*ComponentUtils[.]jsm/,
      /Addon must include an id, version, and type/,
      /NS_ERROR_NOT_AVAILABLE.*PartitioningExceptionListService[.]jsm/,
      /NS_ERROR_FAILURE:.*getHistogramById/,
      /Upload request .* failed/,
      /You have reached your Zotero File Storage quota/,
      /See your zotero.org account settings for additional storage options/,
      /Could not get children of.*CrashManager.jsm/,
    ]

    return (Zotero.getErrors(true) as string[]).filter(line => !ignore.find(re => line.match(re))).join('\n')
  }

  private cleanItem(item: any) {
    delete item.libraryID
    delete item.uri
    delete item.relations
    delete item.select
    delete item.itemKey
    delete item.contentType
    delete item.filename
    delete item.defaultPath

    delete item.multi

    if (item.path) item.path = item.path.replace(/.*\/zotero\/storage\/[^/]+/, 'ATTACHMENT_KEY')

    for (const creator of (item.creators || [])) {
      delete creator.multi
    }

    if (item.attachments) {
      for (const att of item.attachments) {
        this.cleanItem(att)
      }
    }
  }

  public async load(win: Window & { ErrorReport: ErrorReport, arguments: any[] }): Promise<void> {
    this.document = win.document
    win.ErrorReport = this

    this.timestamp = (new Date()).toISOString().replace(/\..*/, '').replace(/:/g, '.')

    const wizard: Wizard = this.document.getElementById('better-bibtex-error-report') as Wizard
    wizard.getPageById('page-enable-debug').addEventListener('pageshow', this.show.bind(this))
    wizard.getPageById('page-review').addEventListener('pageshow', this.show.bind(this))
    wizard.getPageById('page-send').addEventListener('pageshow', () => { this.send().catch(err => log.debug('could not send debug log:', err)) })
    wizard.getPageById('page-done').addEventListener('pageshow', this.show.bind(this))

    wizard.pageIndex = Zotero.Debug.storing ? 1 : 0

    const continueButton = wizard.getButton('next')
    continueButton.disabled = true

    this.errorlog = {
      info: await this.info(),
      errors: `${Zotero.BetterBibTeX.outOfMemory}\n${this.errors()}`.trim(),
      // # 1896
      debug: Zotero.Debug.getConsoleViewerOutput().slice(-500000).join('\n'),
      items: win.arguments[0].wrappedJSObject.items,
    }

    if (this.errorlog.items) {
      log.debug('ITEMS::', this.errorlog.items)
      const lib = JSON.parse(this.errorlog.items)

      for (const item of (lib.items || [])) {
        this.cleanItem(item)
      }

      if (lib.config.preferences) {
        for (const [pref, value] of Object.entries(lib.config.preferences)) {
          if (!supported.includes(pref) || value === defaults[pref]) delete lib.config.preferences[pref]
        }
      }

      this.errorlog.items = JSON.stringify(lib, null, 2)
      log.debug('SCRUBBED::', this.errorlog.items)
    }

    const acronyms = $OS.Path.join(Zotero.BetterBibTeX.dir, 'acronyms.csv')
    if (await $OS.File.exists(acronyms)) this.errorlog.acronyms = await $OS.File.read(acronyms, { encoding: 'utf-8' }) as unknown as string

    this.setValue('better-bibtex-error-context', this.errorlog.info)
    this.setValue('better-bibtex-error-errors', this.errorlog.errors)
    this.setValue('better-bibtex-error-debug', this.preview(this.errorlog.debug))
    this.setValue('better-bibtex-error-items', this.preview(this.errorlog.items))
    this.document.getElementById('better-bibtex-error-tab-items').hidden = !this.errorlog.items

    const current = require('../gen/version.js')
    this.setValue('better-bibtex-report-current', l10n.localize('better-bibtex_error-report_better-bibtex_current', { version: current }))

    try {
      const latest = await this.latest()

      const show_latest = <HTMLInputElement>this.document.getElementById('better-bibtex-report-latest')
      if (current === latest) {
        show_latest.hidden = true
      }
      else {
        show_latest.value = l10n.localize('better-bibtex_error-report_better-bibtex_latest', { version: latest || '<could not be established>' })
        show_latest.hidden = false
      }

      (<HTMLInputElement>this.document.getElementById('better-bibtex-report-oom')).hidden = !Zotero.BetterBibTeX.outOfMemory

      this.setValue('better-bibtex-report-cache', this.cacheState = l10n.localize('better-bibtex_error-report_better-bibtex_cache', Cache.state()))

      const region = await Zotero.Promise.any(Object.keys(s3.region).map(this.ping.bind(this)))
      this.bucket = `https://${s3.bucket}-${region.short}.s3-${region.region}.amazonaws.com${region.tld || ''}`
      this.key = `${Zotero.Utilities.generateObjectKey()}${this.errorlog.items ? '-refs' : ''}-${region.short}` // eslint-disable-line no-magic-numbers

      this.tarball = `${this.key}-${this.timestamp}.tgz`

      continueButton.disabled = false
      continueButton.focus()
    }
    catch (err) {
      log.error('errorreport:', err)
      alert({ text: `No AWS region can be reached: ${err.message}` })
      wizard.getButton('cancel').disabled = false
    }
  }

  private preview(text: string): string {
    return text.length > this.previewSize ? `${text.substr(0, this.previewSize)} ...` : text
  }

  // general state of Zotero
  private async info() {
    let info = ''

    const appInfo = Components.classes['@mozilla.org/xre/app-info;1'].getService(Components.interfaces.nsIXULAppInfo)
    info += `Application: ${appInfo.name} (${Zotero.clientName}) ${appInfo.version} ${Zotero.locale}\n`
    info += `Platform: ${Zotero.platform} ${Zotero.oscpu}\n`

    const addons = await Zotero.getInstalledExtensions()
    if (addons.length) {
      info += 'Addons:\n'
      for (const addon of addons) {
        info += `  ${addon}\n`
      }
    }

    info += 'Settings:\n'
    const settings = { default: '', set: '' }
    for (const [key, value] of Object.entries(Preference.all)) {
      settings[value === defaults[key] ? 'default' : 'set'] += `  ${key} = ${JSON.stringify(value)}\n`
    }
    if (settings.default) settings.default = `Settings at default:\n${settings.default}`
    info += settings.set + settings.default

    for (const key of ['export.quickCopy.setting']) {
      info += `  Zotero: ${key} = ${JSON.stringify(Zotero.Prefs.get(key))}\n`
    }

    const autoExports = await AutoExport.all()
    if (autoExports.length) {
      info += 'Auto-exports:\n'
      for (const ae of autoExports) {
        info += `  path: ...${JSON.stringify($OS.Path.split(ae.path).components.pop())}`
        switch (ae.type) {
          case 'collection':
            info += ` (${Zotero.Collections.get(ae.id)?.name || '<collection>'})`
            break
          case 'library':
            info += ` (${Zotero.Libraries.get(ae.id)?.name || '<library>'})`
            break
        }
        info += '\n'
        for (const [k, v] of Object.entries(ae)) {
          if (k === 'path') continue
          info += `    ${k}: ${JSON.stringify(v)}`
          if (k === 'translatorID' && byId[v as string]) info += ` (${byId[v as string].label})`
          info += '\n'
        }
      }
    }

    info += `Zotero.Debug.storing: ${Zotero.Debug.storing}\n`
    info += `Zotero.Debug.storing at start: ${Zotero.BetterBibTeX.debugEnabledAtStart}\n`

    return info
  }
}
