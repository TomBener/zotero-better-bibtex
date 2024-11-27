/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-empty-function, no-restricted-syntax */

declare const Zotero: any

import * as client from '../client'
const version = require('../../gen/version.js')
export const run = `<${version} ${client.run}>`

declare const dump: (msg: string) => void

export const discard = {
  log(): void {},
  error(): void {},
  warn(): void {},
  debug(): void {},
  info(): void {},
  clear(): void {},
  dir(): void {},
  table(): void {},
}

function replacer() {
  const seen = new WeakSet
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return '[Circular]'
      seen.add(value)
    }
    if (value === null) return value
    if (value instanceof Set) return [...value]
    if (value instanceof Map) return Object.fromEntries(value)
    switch (typeof value) {
      case 'string':
      case 'number':
      case 'boolean':
      case 'object':
        return value
    }
    if (Array.isArray(value)) return value
    return undefined
  }
}

function to_s(obj: any): string {
  if (typeof obj === 'string') return obj
  return JSON.stringify(obj, replacer(), 2)
}

export function format(...msg): void {
  msg.map(to_s).join(' ')
}

function prefix(error?: any) {
  return `{${ error ? 'error: ' : '' }${ client.worker ? 'worker: ' : '' }better-bibtex: ${run}} `
}

export function $dump(msg: string, error?: Error): void {
  dump(`${prefix(error)}${format(msg, error)}\n`)
}

export function trace(msg: string, mode = ''): void {
  dump(`trace${ mode }\t${ Date.now() }\t${ msg }\n`)
}

export const log = {
  debug(...msg): void {
    Zotero.debug(`${prefix()}${format(...msg)}\n`)
  },
  info(...msg): void {
    Zotero.debug(`${prefix()}${format(...msg)}\n`)
  },
  error(...msg): void {
    Zotero.debug(`${prefix(true)}${format(...msg)}\n`)
  },
  dump(msg: string): void {
    $dump(msg)
  },
}
