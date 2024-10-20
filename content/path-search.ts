import { log } from './logger'
import { Shim } from './os'
import * as client from './client'
const $OS = client.is7 ? Shim : OS

// https://searchfox.org/mozilla-central/source/toolkit/modules/subprocess/subprocess_win.jsm#135 doesn't seem to work on Windows.
export async function findBinary(bin: string, installationDirectory: { mac?: string[]; win?: string[] } = {}): Promise<string> {
  const pref = `translators.better-bibtex.path.${ bin }`
  let location: string = Zotero.Prefs.get(pref)
  if (location && (await $OS.File.exists(location))) return location
  location = await pathSearch(bin, installationDirectory)
  if (typeof location === 'string') Zotero.Prefs.set(pref, location)
  return location
}

const ENV = Components.classes['@mozilla.org/process/environment;1'].getService(Components.interfaces.nsIEnvironment)
const VarRef = Zotero.isWin ? /%([A-Z][A-Z0-9]*)%/ig : /[$]([A-Z][A-Z0-9]*)|[$][{]([A-Z][A-Z0-9]*)[}]/ig

const resolver = new class {
  private cache: Map<string, string> = new Map

  resolve(path: string, seen: Record<string, boolean> = {}): string {
    return path.replace(VarRef, (...args) => {
      const varName: string = args.slice(1).find(_ => _)
      if (this.cache.has(varName)) return this.cache.get(varName)

      log.debug('3026: resolving', varName)
      if (seen[varName]) {
        log.error(`path-resolve: circular reference detected for environment variable ${varName}`)
        return ''
      }

      const value = ENV.get(varName) || ''
      if (value) {
        log.debug('3026: resolved', varName, 'to', value)
      }
      else {
        log.error(`path-search: environment variable ${varName} is not defined`)
        return ''
      }

      const resolved = this.resolve(value, { ...seen, [varName]: true })
      if (value === resolved) this.cache.set(varName, value)
      return resolved
    })
  }
}

const dirService = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties)
const cwd = dirService.get('CurWorkD', Components.interfaces.nsIFile)?.path ?? ''

async function pathSearch(bin: string, installationDirectory: { mac?: string[]; win?: string[] } = {}): Promise<string> {
  const PATH = ENV.get('PATH')
  if (!PATH.length) {
    log.error('path-search: PATH not set')
    return ''
  }

  log.info(`path-search: looking for ${ bin } in ${ PATH }`)
  const sep = Zotero.isWin ? '\\' : '/'
  const paths: string[] = [ ...PATH.split(Zotero.isWin ? ';' : ':'), ...(installationDirectory[client.platform] || []) ]
    .map(p => resolver.resolve(p))
    .filter(_ => _)
    .filter((p: string, i: number, self: string[]) => self.indexOf(p) === i) // unique
    .map(p => cwd && p[0] === '.' && (p[1] || sep) === sep ? `${cwd}${p.substring(1)}` : p)
  if (!paths.length) {
    log.error('path-search:', PATH, 'yielded no directories')
    return ''
  }

  const extensions: string[] = Zotero.isWin ? ENV.get('PATHEXT').split(';').filter((e: string) => e.match(/^[.].+/)) : ['']
  if (Zotero.isWin && !extensions.length) {
    log.error('path-search: PATHEXT not set')
    return ''
  }

  for (const path of paths) {
    for (const ext of extensions) {
      try {
        const exe: string = $OS.Path.join(path, bin + ext)
        log.debug('3026:', exe)
        if (!(await $OS.File.exists(exe))) continue

        // eslint-disable-next-line @typescript-eslint/await-thenable
        const stat = await $OS.File.stat(exe)
        if (stat.isDir) continue

        // bit iffy -- we don't know if *we* can execute this. And on Zotero 7, unixMode does not exist
        if (!Zotero.isWin && typeof stat.unixMode === 'number' && (stat.unixMode & 111) === 0) { // eslint-disable-line no-bitwise
          log.error(`path-search: ${ exe } exists but has mode ${ (stat.unixMode).toString(8) }`)
          continue
        }

        log.info(`path-search: ${ bin } found at ${ exe }`)
        return exe
      }
      catch (err) {
        log.error('path-search:', err)
      }
    }
  }
  log.info(`path-search: ${ bin } not found in ${ PATH }`)
  return ''
}
