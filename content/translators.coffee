Prefs = require('./prefs.ts')
debug = require('./debug.ts')

class Translators

  init: Zotero.Promise.coroutine(->
    start = new Date()
    Object.assign(@, require('../gen/translators.json'))

    if Prefs.get('removeStock')
      @uninstall('BibLaTeX', 'b6e39b57-8942-4d11-8259-342c46ce395f')
      @uninstall('BibTeX', '9cb70025-a888-4a29-a210-93ec52da40d4')

    reinit = false
    for id, header of @byId
      if @install(header)
        reinit = true
        debug('Translators.init: installed', header.label, '@', (new Date() - start))
      else
        debug('Translators.init: retained', header.label, '@', (new Date() - start))

    return unless reinit

    debug('Translators.init: reinit translators...')
    try
      yield Zotero.Translators.reinit()
      debug('Translators.init: reinit ready @', (new Date() - start))
    catch err
      debug('Translator.inits: reinit failed @', (new Date() - start), err)
    return
  )

  uninstall: (label, id) ->
    try
      fileName = Zotero.Translators.getFileNameFromLabel(label, id)
      destFile = Zotero.getTranslatorsDirectory()
      destFile.append(fileName)
      destFile.remove(false) if destFile.exists()
    catch err
      debug("Translators.uninstall: failed to remove #{header.label}:", err)
    return

  install: (header) ->
    throw new Error('not a translator') unless header.label && header.translatorID

    try
      code = Zotero.File.getContentsFromURL("resource://zotero-better-bibtex/#{header.label}.js")
    catch err
      debug('Translators.install: ', header, 'could not be loaded:', err)
      throw err

    debug('Translators.install header:', header)
    try
      fileName = Zotero.Translators.getFileNameFromLabel(header.label, header.translatorID)
      destFile = Zotero.getTranslatorsDirectory()
      destFile.append(fileName)

      if existing = Zotero.Translators.get(header.translatorID)
        newHeader = code.substring(0, code.indexOf("\n}") + 2)
        debug('Translators.install: existing:', existing, 'new', newHeader)
        try
          newHeader = JSON.parse(newHeader)
          return false if newHeader.lastUpdated == existing.lastUpdated
        catch err
          debug('Translators.install: failed to parse new header:', err, newHeader)

      else
        debug('Translators.install: no existing:', header.translatorID)

      debug("Translators.install: saving translator", header.label)

      Zotero.File.putContents(destFile, code)

      debug('Translator.install', header, 'succeeded')

    catch err
      debug('Translator.load', header, 'failed:', err)
      @uninstall(header.label, header.translatorID)

    return true

  translate: Zotero.Promise.coroutine((translatorID, displayOptions, items, path) ->
    items ||= { library: Zotero.Libraries.userLibraryID }

    translation = new Zotero.Promise((resolve, reject) ->
      translation = new Zotero.Translate.Export()

      translation.setLibraryID(items.library) if items.library
      translation.setItems(items.items) if items.items
      translation.setCollection(if typeof items.collection == 'number' then Zotero.Collections.get(items.collection) else items.collection) if items.collection

      translation.setTranslator(translatorID)
      translation.setDisplayOptions(displayOptions) if displayOptions && Object.keys(displayOptions).length != 0
      translation.setLocation(Zotero.File.pathToFile(path)) if path
      translation.setHandler('done', (obj, success) ->
        if success
          return resolve(obj?.string)
        else
          return reject('translation failed')
      )
      translation.translate()
      return
    )

    return yield translation
  )


module.exports = new Translators()
