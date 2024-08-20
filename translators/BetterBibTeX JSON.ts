declare const Zotero: any

import { Collected } from './lib/collect'
import { Translation } from './lib/translator'
import type { Translators } from '../typings/translators.d.ts'
declare var ZOTERO_TRANSLATOR_INFO: Translators.Header // eslint-disable-line no-var

// import { validItem } from '../content/ajv'
import { simplifyForImport, simplifyForExport } from '../gen/items/simplify'
const version = require('../gen/version.js')
// import { stringify } from '../content/stringify'
import { log } from '../content/logger/simple'
import type { Library } from './lib/normalize'

const chunkSize = 0x100000

export function detectImport(): boolean {
  let str
  let json = ''
  while ((str = Zotero.read(chunkSize)) !== false) {
    json += str
    if (json[0] !== '{') return false
  }

  let data
  try {
    data = JSON.parse(json)
  }
  catch {
    return false
  }

  if (!data.config || (data.config.id !== ZOTERO_TRANSLATOR_INFO.translatorID)) return false
  return true
}

export async function doImport(): Promise<void> {
  let str
  let json = ''
  while ((str = Zotero.read(chunkSize)) !== false) {
    json += str
  }

  const data: Library = JSON.parse(json)
  if (!data.items || !data.items.length) return

  const items = new Set<number>
  for (const source of (data.items as any[])) {
    simplifyForImport(source)

    // I do export these but the cannot be imported back
    delete source.relations
    delete source.citekey
    delete source.citationKey

    delete source.uri
    delete source.key
    delete source.itemKey
    delete source.version
    delete source.libraryID
    delete source.collections
    delete source.autoJournalAbbreviation

    if (source.creators) {
      for (const creator of source.creators) {
        // if .name is not set, *both* first and last must be set, even if empty
        if (!creator.name) {
          creator.lastName = creator.lastName || ''
          creator.firstName = creator.firstName || ''
        }
      }
    }

    // clear out junk data
    for (const [ field, value ] of Object.entries(source)) {
      if ((value ?? '') === '') delete source[field]
    }
    // validate tests for strings
    if (Array.isArray(source.extra)) source.extra = source.extra.join('\n')
    // marker so BBT-JSON can be imported without extra-field meddling
    if (source.extra) source.extra = `\x1BBBT\x1B${ source.extra }`

    // const error = validItem(source)
    // if (error) throw new Error(error)

    const item = (new Zotero.Item)
    Object.assign(item, source)

    for (const att of item.attachments || []) {
      if (att.url) delete att.path
      delete att.relations
      delete att.uri
    }
    await item.complete()
    items.add(source.itemID)
    Zotero.setProgress(items.size / data.items.length * 100)
  }
  Zotero.setProgress(100)

  const collections: any[] = Object.values(data.collections || {})
  for (const collection of collections) {
    collection.zoteroCollection = (new Zotero.Collection)
    collection.zoteroCollection.type = 'collection'
    collection.zoteroCollection.name = collection.name
    collection.zoteroCollection.children = collection.items.filter(id => {
      if (items.has(id)) return true
      log.error(`Collection ${ collection.key } has non-existent item ${ id }`)
      return false
    }).map(id => ({ type: 'item', id }))
  }
  for (const collection of collections) {
    if (collection.parent && data.collections[collection.parent]) {
      (data.collections[collection.parent] as unknown as any).zoteroCollection.children.push(collection.zoteroCollection)
    }
    else {
      if (collection.parent) log.error(`Collection ${ collection.key } has non-existent parent ${ collection.parent }`)
      collection.parent = false
    }
  }
  for (const collection of collections) {
    if (collection.parent) continue
    collection.zoteroCollection.complete()
  }
}

function addSelect(item: any) {
  const [ , kind, lib, key ] = item.uri.match(/^https?:\/\/zotero\.org\/(users|groups)\/((?:local\/)?[^/]+)\/items\/(.+)/)
  item.select = (kind === 'users') ? `zotero://select/library/items/${ key }` : `zotero://select/groups/${ lib }/items/${ key }`
}

export function doExport(): void {
  const translation = Translation.Export(new Collected(ZOTERO_TRANSLATOR_INFO, 'export'))

  const preferences = { ...translation.collected.preferences }
  delete preferences.citekeyFormatEditing
  delete preferences.testing
  delete preferences.platform
  delete preferences.logEvents
  delete preferences.scrubDatabase

  const data = {
    config: {
      id: ZOTERO_TRANSLATOR_INFO.translatorID,
      label: ZOTERO_TRANSLATOR_INFO.label,
      preferences: translation.collected.displayOptions.Preferences ? preferences : {},
      options: translation.collected.displayOptions,
    },
    version: {
      zotero: Zotero.Utilities.getVersion(),
      bbt: version,
    },
    collections: translation.collections,
    items: [],
  }

  if (translation.collected.displayOptions.Items) {
    const validAttachmentFields = new Set([ 'relations', 'uri', 'itemType', 'title', 'path', 'tags', 'dateAdded', 'dateModified', 'seeAlso', 'mimeType' ])

    for (const item of translation.collected.items) {
      delete item.$cacheable
      if (!translation.collected.preferences.testing) addSelect(item)

      switch (item.itemType) {
        case 'attachment':
          if (translation.collected.displayOptions.dropAttachments) continue
          break

        case 'note':
        case 'annotation':
          break

        default:
          delete item.collections

          if (translation.collected.displayOptions.Normalize) simplifyForExport(item, { dropAttachments: translation.collected.displayOptions.dropAttachments })

          for (const att of item.attachments || []) {
            if (translation.collected.displayOptions.exportFileData && att.saveFile && att.defaultPath) {
              att.saveFile(att.defaultPath, true)
              att.path = att.defaultPath
            }
            else if (att.localPath) {
              att.path = att.localPath
            }

            if (!att.path) continue // amazon/googlebooks etc links show up as atachments without a path

            for (const field of Object.keys(att)) {
              if (!validAttachmentFields.has(field)) {
                delete att[field]
              }
            }
            if (!translation.collected.preferences.testing) addSelect(att)
          }
          break
      }

      data.items.push(item)
    }
  }

  Zotero.write(JSON.stringify(data, null, 2))
  translation.erase()
}
