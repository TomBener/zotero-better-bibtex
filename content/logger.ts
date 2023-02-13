import type { Translators as Translator } from '../typings/translators'
import type { TranslatorMetadata } from '../translators/lib/translator'
// workerJob and Translator must be var-hoisted by esbuild to make this work
declare var ZOTERO_TRANSLATOR_INFO: TranslatorMetadata // eslint-disable-line no-var
declare const workerJob: Translator.Worker.Job
declare const dump: (msg: string) => void

import { asciify } from './stringify'
import { stringify } from './stringify'
// import { inspect as stringify } from 'loupe'
import { worker as inWorker } from './client'

export function print(msg: string): void {
  dump(msg + '\n')
}

class Logger {
  public verbose = false

  protected timestamp: number

  private format({ error=false, worker=0, translator='' }, msg) {
    let workername = `${worker}`
    let diff = null
    const now = Date.now()
    if (this.timestamp) diff = now - this.timestamp
    this.timestamp = now

    if (typeof msg !== 'string') {
      msg = msg.map(m => {
        const type = typeof m
        if (type === 'symbol') {
          return m.toString() as string
        }
        else if (type === 'string' || m instanceof String) {
          return m as string
        }
        else if (type === 'number' || type === 'undefined' || type === 'boolean' || m === null) {
          return `${m}`
        }
        else if (m instanceof Error || m instanceof ErrorEvent || m.toString() === '[object ErrorEvent]') {
          return this.formatError(m)
        }
        else {
          try {
            return stringify(m)
          }
          catch (err) {
            // may be an mozilla exception, no idea on the actual instance type
            return (m.message ? `${m.message}: ` : '') + this.formatError(err)
          }
        }
      }).join(' ')
    }

    if (inWorker) {
      if (!worker && typeof workerJob !== 'undefined') {
        worker = workerJob.job
        workername = `${workerJob.job}`
      }
      translator = translator || workerJob.translator
    }
    else {
      if (worker) workername = `${worker} (ceci n'est pas une ouvrier)`
      // Translator must be var-hoisted by esbuild for this to work
      if (!translator && typeof ZOTERO_TRANSLATOR_INFO !== 'undefined') translator = ZOTERO_TRANSLATOR_INFO.label
    }
    const prefix = ['better-bibtex', translator, error && ':error:', worker && `(worker ${workername})`].filter(p => p).join(' ')
    return `{${prefix}} +${diff} ${asciify(msg)}`
  }

  public formatError(e, indent='') {
    let msg = [e.name, e.message].filter(s => s).join(': ')
    if (e.filename || e.fileName) msg += ` in ${e.filename || e.fileName}`
    if (e.lineno || e.lineNumber) {
      msg += ` line ${e.lineno}`
      if (e.colno) msg += `, col ${e.colno}`
    }
    if (e.stack) msg += `\n${indent}${e.stack.replace(/\n/g, `${indent}\n`)}`
    if (e.error) msg += `\n${indent}${this.formatError(e.error, '  ')}\n`
    return `${indent}<Error: ${msg}>`
  }

  public get enabled(): boolean {
    if (typeof ZOTERO_TRANSLATOR_INFO === 'undefined') return Zotero.Debug.enabled as boolean
    if (!Zotero.worker) return true
    return !workerJob || workerJob.debugEnabled
  }

  public debug(...msg) {
    if (this.enabled) Zotero.debug(this.format({}, msg))
  }

  public dump(...msg) {
    if (this.enabled) print(this.format({}, msg))
  }

  public error(...msg) {
    Zotero.debug(this.format({error: true}, msg))
  }
  public status({ error=false, worker=0, translator='' }, ...msg) {
    if (error || this.enabled) Zotero.debug(this.format({error, worker, translator}, msg))
  }
}

export const log = new Logger
