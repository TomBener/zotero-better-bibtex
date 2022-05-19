import { Item, Attachment, Collection, Tag } from '../gen/typings/serialized-item'

export namespace Translators {
  namespace Worker {
    type Environment = {
      version: string
      platform: string
      locale: string
      localeDateOrder: string
    }

    type Job = {
      job: number,
      translator: string
      debugEnabled: boolean
      preferences: any,
      options: any,
      autoExport?: number
      output: string
      data?: {
        items: Array<Item | Attachment | Note>
        collections: Collection[]
        cache: Record<number, {itemID: number, reference: string, metadata: any, meta: { updated: number }}>
      }
    }

    /*
    type Config = {
      preferences: any,
      options: any,
      items: Array<Item | Attachment | Note>
      collections: Collection[]
      cache: Record<number, {itemID: number, reference: string, metadata: any, meta: { updated: number }}>
      autoExport?: number
      globals: {
        version: string
        platform: string
        translator: string
        output: string
        locale: string
        localeDateOrder: string
        debugEnabled: boolean
        worker: number
      },
    }
    */

    type Message = 
        { kind: 'configure', config: Environment }
      | { kind: 'start', config: ArrayBuffer }
      | { kind: 'done', output: boolean | string }
      | { kind: 'debug', message: string }
      | { kind: 'error', message: string }
      | { kind: 'cache', itemID: number, entry: string, metadata: any }
      | { kind: 'item', item: number }
      | { kind: 'stop' }
      | { kind: 'progress', percent: number, translator: string, autoExport: number }
  }

  namespace BibTeX {
    interface Field {
      name: string
      verbatim?: string
      value: string | string[] | number | null | Attachment[] | Tag[]
      enc?: 'raw' | 'url' | 'verbatim' | 'creators' | 'literal' | 'latex' | 'tags' | 'attachments' | 'date'
      orig?: { name?: string, verbatim?: string, inherit?: boolean }
      bibtexStrings?: boolean
      bare?: boolean
      raw?: boolean

      // kept as seperate booleans for backwards compat
      replace?: boolean
      fallback?: boolean

      html?: boolean

      bibtex?: string
    }
  }

  interface Header {
    translatorID: string
    label: string
    target: string
    configOptions?: {
      getCollections?: boolean
      hash?: string
    }
  }
}
