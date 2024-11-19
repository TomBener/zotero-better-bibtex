-citation-key = Citation key
better-bibtex_auto-export_delete = Auto-Export wird gelöscht
better-bibtex_auto-export_delete_confirm = Möchtest du den Auto-Export wirklich löschen? Dies kann nicht rückgängig gemacht werden.
better-bibtex_aux-scan_prompt = Name der Markierung
better-bibtex_aux-scan_title_aux = Markiere zitierte Einträge aus AUX-Datei
better-bibtex_aux-scan_title_md = Markiere zitierte Einträge aus Markdown-Datei
better-bibtex_aux-scanner = BibTeX-AUX-/Markdown-Datei nach Verweisen durchsuchen...
better-bibtex_bulk-keys-confirm_warning = You are changing more than { $treshold } items in one go. Are you sure?
better-bibtex_bulk-keys-confirm_stop_asking = OK, and don't ask me again
better-bibtex_citekey_pin = BibTeX-Key anheften
better-bibtex_citekey_set = BibTeX-Key ändern...
better-bibtex_citekey_set_change = Ändere BibTeX-Key zu
better-bibtex_citekey_set_toomany = Kann jeweils nur einen Schlüssel auf einmal ändern
better-bibtex_error-report = 
    .title = Better BibTeX Debug-Log
better-bibtex_error-report_better-bibtex_cache = Cache-Größe: { $entries } Einträge.
better-bibtex_error-report_better-bibtex_oom = Zotero is out of memory! Zotero on Windows has memory use restrictions that will be ameliorated by Zotero 7. In the mean time, please turn off Better BibTeX caching and restart Zotero.
    .value = { better-bibtex_error-report_better-bibtex_oom }
better-bibtex_error-report_better-bibtex_current = Sie verwenden Better BibTeX in Version { $version }
better-bibtex_error-report_better-bibtex_latest = Die neueste Better BibTeX-Version ist { $version }
better-bibtex_error-report_context = 
    .label = Anwendungskontext
better-bibtex_error-report_debug = 
    .label = Debug-Log
better-bibtex_error-report_enable-debug = Das Zotero Debug-Logging ist derzeit deaktiviert. Es ist einfacher, das Problem zu diagnostizieren, wenn Sie es aktivieren, bevor Sie ein Debug-Log senden.
better-bibtex_error-report_errors = 
    .label = Fehler
better-bibtex_error-report_include-errors = 
    .label = Include error messages
better-bibtex_error-report_include-log = 
    .label = Include debug log
better-bibtex_error-report_include-items = 
    .label = Include item
better-bibtex_error-report_include-notes = 
    .label = notes
better-bibtex_error-report_include-cache = 
    .label = cache
better-bibtex_error-report_include-attachments = 
    .label = attachment metadata
better-bibtex_error-report_items = 
    .label = Einträge
better-bibtex_error-report_not-reviewed = Debug-Reports können nicht überprüft werden, bis sie im GitHub Issue-Tracker genannt werden.
better-bibtex_error-report_post-to-git-hub = Bitte senden Sie eine Nachricht an den Issue-Tracker (https://github.com/retorquere/zotero-better-bibtex/issues) mit dieser Debug-Log-ID, einer Beschreibung des Problems und allen notwendigen Schritten zu seiner Reproduktion.
better-bibtex_error-report_report-id = Debug-Log-ID:
better-bibtex_error-report_restart-with-logging-enabled = 
    .label = Mit aktiviertem Logging neustarten…
better-bibtex_error-report_review =
    The data below is about to submitted to Better BibTeX for debugging. You can preview the data here, or save a copy of the log to get the precise data about to be sent, to see whether there's sensitive information that you do not wish to send. Please think carefully about whether unchecking options below is necessary for your environment. We will generally need more communication (= time) if you remove parts of the log this way.
    
    If you are OK with sending this data, please proceed to the next screen where you will be presented a red debug ID, and post this ID on the issue tracker at
    
    https://github.com/retorquere/zotero-better-bibtex/issue
better-bibtex_error-report_save = 
    .label = Save copy of log for inspection
better-bibtex_error-report_submission-in-progress = Bitte warten Sie, während der Debug-Log übermittelt wird.
better-bibtex_error-report_submitted = Ihr Debug-Log wurde übermittelt.
better-bibtex_export-options_keep-updated = Halte aktuell
better-bibtex_export-options_reminder = Sind Sie sicher, dass Sie nicht das ''{ $translator }''-Format wollen?
better-bibtex_export-options_worker = Hintergrund-Export
better-bibtex_export-options_biblatexAPA = biblatex-apa
better-bibtex_export-options_biblatexChicago = biblatex-chicago
better-bibtex_item-pane_section_sidenav = 
    .tooltip = { -citation-key }
better-bibtex_item-pane_section_header = 
    .label = { -citation-key }
better-bibtex_item-pane_info_citation-key = 
    .label = { -citation-key }
better-bibtex_item-pane_info_citation-key_label = { -citation-key }
better-bibtex_preferences_advanced_export_brace-protection = 
    .label = Groß-/Kleinschreibung auf Groß- und Kleinschreibung anwenden, indem sie Klammern beigefügt wird
better-bibtex_preferences_advanced_export_brace-protection_warning = Wenn Sie sowohl BibTeX/BibLaTeX Best Practice (siehe BBT FAQ) als auch die Zotero-Empfehlungen zum Titel-/Satz-Casing ignorieren möchten, können Sie dies ausschalten, um das Titel-Casing für englische Referenzen zu unterdrücken
better-bibtex_preferences_advanced_export_retain-cache = 
    .label = Export-Caches bei Upgrades behalten
better-bibtex_preferences_advanced_export_reset-cache = 
    .label = Cache will be recreated on next start
better-bibtex_preferences_advanced_export_retain-cache_warning =
    Standardmäßig löscht BBT alle Caches bei einem Upgrade von BBT oder Zotero. Ich kann nicht realistisch vorhersagen, ob eine Änderung in Zotero oder BBT die erzeugte Ausgabe für einen bestimmten Eintrag beeinflussen wird. Um sicher zu gehen, dass Sie immer die aktuellsten Behebungen haben, die sich auf den Export auswirken, werden die Caches verworfen, wenn eine neue Version von beiden erkannt wird. Wenn Sie jedoch eine sehr große Bibliothek haben, von der Sie regelmäßig erhebliche Teile exportieren, können Sie die zwischengespeicherten Einträge behalten wollen, auch wenn dies mit dem Risiko verbunden ist, dass Sie eine falsche Ausgabe beim Export erhalten, die in der Zwischenzeit repariert wurde.
    
    Wenn Sie dies eingeschaltet haben und Sie Probleme haben außer der Löschung des Caches beim Upgrade, *müssen* Sie den Cache löschen und das Problem reproduzieren. Wenn Sie diese Einstellung ändern, wie bei jeder Änderung der Einstellungen, wird der Cache gelöscht.
better-bibtex_preferences_advanced_export_title-case = 
    .label = Titel-Casing auf Titel anwenden
better-bibtex_preferences_advanced_export_title-case_warning = Wenn Sie sowohl BibTeX/BibLaTeX Best Practice (siehe BBT FAQ) als auch die Zotero-Empfehlungen zum Titel-/Satz-Casing ignorieren möchten, können Sie dies ausschalten, um das Titel-Casing für englische Referenzen zu unterdrücken
better-bibtex_preferences_advanced_export_workers_cache = 
    .label = Caching für Hintergrund-Exporte aktivieren
better-bibtex_preferences_advanced_extra-merge = When merging items, also merge:
    .label = { better-bibtex_preferences_advanced_extra-merge }
better-bibtex_preferences_advanced_extra-merge-csl = 
    .label = Felder, die von Zotero als CSL-Felder verstanden werden
better-bibtex_preferences_advanced_extra_merge-citekeys = 
    .label = ihre Zitierschlüssel in Bib(La)TeX "ids"-Feld
better-bibtex_preferences_advanced_extra_merge-tex = 
    .label = ihre "tex.*"-Felder
better-bibtex_preferences_advanced_ideographs = Ideographs in citekeys
    .label = { better-bibtex_preferences_advanced_ideographs }
better-bibtex_preferences_advanced_ideographs_jieba = 
    .label = Aktiviere "jieba"/"pinyin"-Filter in Zitierschlüssel-Mustern. Benötigt viel Speicher.
better-bibtex_preferences_advanced_ideographs_kuroshiro = 
    .label = Kuroshiro romajization in japanischen Namen/Titeln anwenden. Benötigt viel Speicher.
better-bibtex_preferences_advanced_import_case-protection = Fallschutz für Klammern einfügen:
better-bibtex_preferences_advanced_import_case-protection_as-needed = minimal
    .label = { better-bibtex_preferences_advanced_import_case-protection_as-needed }
better-bibtex_preferences_advanced_import_case-protection_off = nein
    .label = { better-bibtex_preferences_advanced_import_case-protection_off }
better-bibtex_preferences_advanced_import_case-protection_on = ja
    .label = { better-bibtex_preferences_advanced_import_case-protection_on }
better-bibtex_preferences_advanced_import_case-protection_warning =
    Beim Import fügt BBT den Titeln, die Wörter in { "{" }Braces{ "}" }haben, den Groß-/Kleinschreibung (<span class="nocase">...<span>) hinzu.
    
    Es gibt viele bib(la)tex-Dateien, die dies etwas übereifrig tun, und Sie können den resultierenden HTML-Code in Ihren Artikeln nicht mögen, auch wenn das die Klammern in bib(la)tex bedeuten, und Zotero unterstützt es.
    
    Wenn Sie dies ausschalten, wird das Markup während des Imports weggelassen. Wenn du 'Ja' auswählst, werden alle Klammern, die bib(la)tex als Fallschutz interpretieren würde (was nicht alle ist) in `span` Elemente konvertiert. Im `minimal` Modus wird die Anzahl der `span` Elemente minimiert.
better-bibtex_preferences_advanced_import_sentence-case = Satzbuchstaben beim Import:
better-bibtex_preferences_advanced_import_sentence-case_off = 
    .label = nein (importiere Title wie sie sind)
better-bibtex_preferences_advanced_import_sentence-case_on = 
    .label = ja
better-bibtex_preferences_advanced_import_sentence-case_on-guess = 
    .label = Ja, aber versuchen Sie bereits zitierte Titel auszuschließen
better-bibtex_preferences_advanced_import_sentence-case_warning =
    Bib(La)TeX-Einträge müssen im Titelfall gespeichert werden; Zotero-Einträge werden als Sätze erwartet.
    
    Mit dieser Option wird BBT versuchen, den Fall während des Imports zu senden. Dieses Satzgehäuse verwendet Heuristik, es wird keine natürliche Sprachverarbeitung durchgeführt und die Ergebnisse sind nicht perfekt.
    
    Du kannst dies deaktivieren, aber du kannst `Titelgehäuse auf Titel übertragen` deaktivieren (welches seine eigenen Probleme hat siehe den Hilfeeintrag für diese Option auf dieser Seite).
    Mit 'Ja, aber versuchen Sie bereits verurteilte Titel auszuschließen', BBT wird versuchen, bereits verurteilte Titel zu erkennen und sie wie beim Import zu belassen.
better-bibtex_preferences_advanced_import_migrate = Migrate BetterBibTeX preferences/citation keys
better-bibtex_preferences_advanced_import_export-prefs = 
    .label = Export BetterBibTeX preferences...
better-bibtex_preferences_advanced_import_prefs = 
    .label = Import BetterBibTeX preferences/citation keys...
better-bibtex_preferences_advanced_tab_postscript = postscript
    .label = { better-bibtex_preferences_advanced_tab_postscript }
better-bibtex_preferences_advanced_tab_strings = @string definitions
    .label = { better-bibtex_preferences_advanced_tab_strings }
better-bibtex_preferences_auto-abbrev = 
    .label = Kürze Zeitschriftentitel automatisch ab, wenn kein Wert explizit gesetzt wurde
better-bibtex_preferences_auto-abbrev_style = Abkürzungsstil:
better-bibtex_preferences_auto-export = Automatischer Export
better-bibtex_preferences_auto-export_delay = Auto-Export verzögern für
better-bibtex_preferences_auto-export_explanation = Sie können hier Exporte nur einsehen oder löschen. Um einen automatischen Export hinzuzufügen, führen Sie einen gewöhnlichen Export durch und wählen sie dabei die Option 'Halte aktuell'.
better-bibtex_preferences_auto-export_fields_cached = 
    .label = Zwischengespeichert
better-bibtex_preferences_auto-export_fields_error = Fehler
better-bibtex_preferences_auto-export_fields_journal-abbrev = 
    .label = Zeitschriften-Abkürzungen verwenden
better-bibtex_preferences_auto-export_fields_notes = 
    .label = Exportiere Notizen
better-bibtex_preferences_auto-export_fields_recursive = 
    .label = Exportiere alle Untersammlungen
better-bibtex_preferences_auto-export_git_message = { $type } aktualisiert durch Better BibTex for Zotero
better-bibtex_preferences_auto-export_idle = Wenn unbeschäftigt
    .label = { better-bibtex_preferences_auto-export_idle }
better-bibtex_preferences_auto-export_immediate = Bei Veränderung
    .label = { better-bibtex_preferences_auto-export_immediate }
better-bibtex_preferences_auto-export_off = Pausiert
    .label = { better-bibtex_preferences_auto-export_off }
better-bibtex_preferences_auto-export_remove = 
    .label = Löschen
better-bibtex_preferences_auto-export_run = 
    .label = Jetzt Exportieren
better-bibtex_preferences_auto-export_status = Status
better-bibtex_preferences_auto-export_status_done = fertig
better-bibtex_preferences_auto-export_status_error = Fehler
better-bibtex_preferences_auto-export_status_preparing = preparing { $translator }
better-bibtex_preferences_auto-export_status_preparing_delayed = preparing { $translator }, { $pending } exports pending
better-bibtex_preferences_auto-export_status_running = läuft
better-bibtex_preferences_auto-export_status_scheduled = geplant
better-bibtex_preferences_auto-export_target = Zieldatei
better-bibtex_preferences_auto-export_translator = Format
better-bibtex_preferences_auto-export_type_collection = Sammlung
better-bibtex_preferences_auto-export_type_library = Bibliothek
better-bibtex_preferences_auto-export_updated = Aktualisiert
better-bibtex_preferences_bulk-warning = Warne mich, wenn mehrere Schlüssel auf einmal geändert werden
better-bibtex_preferences_citekey_auto-pin-delay = Zitierschlüssel automatisch anpinnen nach
better-bibtex_preferences_citekey_aux-scanner_import = 
    .label = Versuche beim Scannen einer AUX-Datei, Einträge aus der angehängten Bib-Datei zu importieren, wenn sich deren Zitierschlüssel nicht in Zotero befinden
better-bibtex_preferences_citekey_fold = 
    .label = Erzwinge Plaintext-Format bei Zitierschlüsseln
better-bibtex_preferences_citekey_format = Zitierschlüssel-Formel
better-bibtex_preferences_citekey_format_installed = Aktiviere Zitierschlüssel-Formel
better-bibtex_preferences_citekey_search = 
    .label = Zitierschlüsselsuche aktivieren
better-bibtex_preferences_citekey_uniqueness = 
    .label = Halte Zitierschlüssel eindeutig
better-bibtex_preferences_citekey_uniqueness_case = 
    .label = Ignore upper/lowercase when comparing for uniqueness
better-bibtex_preferences_citekey_uniqueness_conflict = Bei Konflikten mit einem angehefteten Schlüssel werden nicht angeheftete Schlüssel
better-bibtex_preferences_citekey_uniqueness_conflict_change = nachbearbeitet (führt zu Änderungen der Zitierschlüssel)
    .label = { better-bibtex_preferences_citekey_uniqueness_conflict_change }
better-bibtex_preferences_citekey_uniqueness_conflict_keep = beibehalten (führt zu Duplikaten von Zitierschlüsseln)
    .label = { better-bibtex_preferences_citekey_uniqueness_conflict_keep }
better-bibtex_preferences_citekey_uniqueness_scope = Schlüssel eindeutig halten
better-bibtex_preferences_citekey_uniqueness_scope_global = über alle Bibliotheken hinweg
    .label = { better-bibtex_preferences_citekey_uniqueness_scope_global }
better-bibtex_preferences_citekey_uniqueness_scope_library = innerhalb jeder Bibliothek
    .label = { better-bibtex_preferences_citekey_uniqueness_scope_library }
better-bibtex_preferences_export_automatic-tags = 
    .label = Inkludiere automatische Tags in den Export
better-bibtex_preferences_export_biblatex_ascii = 
    .label = Exportiere Latex-Befehle im Unicode-Format als Plaintext
better-bibtex_preferences_export_biblatex_biblatex-extract-eprint = 
    .label = Extrahiere JSTOR-/Google-Books-/PubMed-Informationen aus dem URL-Feld in die eprint-Felder
better-bibtex_preferences_export_biblatex_extended-name-format = 
    .label = Verwende das erweiterte Namensformat von BibLaTeX (benötigt biblatex 3.5)
better-bibtex_preferences_export_bibtex_ascii = 
    .label = Exportiere Latex-Befehle im Unicode-Format als Plaintext (empfohlen)
better-bibtex_preferences_export_bibtex_urls = Füge URLs zu BibTeX-Export hinzu
better-bibtex_preferences_export_bibtex_urls_note = im 'note'-Feld
    .label = { better-bibtex_preferences_export_bibtex_urls_note }
better-bibtex_preferences_export_bibtex_urls_note-url-ish = im "note"-Feld, aber davon ausgehend, dass das "url"-Paket nicht geladen wurde
    .label = { better-bibtex_preferences_export_bibtex_urls_note-url-ish }
better-bibtex_preferences_export_bibtex_urls_off = nein
    .label = { better-bibtex_preferences_export_bibtex_urls_off }
better-bibtex_preferences_export_bibtex_urls_url = im 'url'-Feld
    .label = { better-bibtex_preferences_export_bibtex_urls_url }
better-bibtex_preferences_export_bibtex_urls_url-ish = im "url"-Feld, aber davon ausgehend, dass das "url"-Paket nicht geladen wurde
    .label = { better-bibtex_preferences_export_bibtex_urls_url-ish }
better-bibtex_preferences_export_sort = Sort TeX/CSL output (useful if you use version control on the output):
better-bibtex_preferences_export_sort_off = off (fastest)
    .label = { better-bibtex_preferences_export_sort_off }
better-bibtex_preferences_export_sort_id = item creation order (plenty fast)
    .label = { better-bibtex_preferences_export_sort_id }
better-bibtex_preferences_export_sort_citekey = citation key (slower on very large libraries)
    .label = { better-bibtex_preferences_export_sort_citekey }
better-bibtex_preferences_export_fields = Felder
    .label = { better-bibtex_preferences_export_fields }
better-bibtex_preferences_export_fields_bibtex-edition-ordinal = 
    .label = Export numeric edition as English-written ordinals
better-bibtex_preferences_export_fields_bibtex-particle-no-op = 
    .label = Ignoriere Namens-Präfixe beim Sortieren
better-bibtex_preferences_export_fields_doi-and-url = Wenn ein Eintrag über DOI und URL verfügt, exportiere
better-bibtex_preferences_export_fields_doi-and-url_both = beide
    .label = { better-bibtex_preferences_export_fields_doi-and-url_both }
better-bibtex_preferences_export_fields_doi-and-url_doi = DOI
    .label = { better-bibtex_preferences_export_fields_doi-and-url_doi }
better-bibtex_preferences_export_fields_doi-and-url_url = URL
    .label = { better-bibtex_preferences_export_fields_doi-and-url_url }
better-bibtex_preferences_export_fields_doi-and-url_warning = Die meisten BibTeX-Stile unterstützen keine DOI/URL-Felder. Von den Stilen, die sie unterstützen, vergessen viele, das erforderliche 'url'-Paket zu laden, stellen Sie also sicher, dass Sie es selbst laden. DOI- und URL-Felder sind so genannte 'Verbatim'-Felder, und ohne die vom Paket 'url' geladene Kompilierung wird die Kompilierung wahrscheinlich fehlschlagen.
better-bibtex_preferences_export_fields_export-strings = Wenn ein Feld eine @string-Referenz sein könnte, exportiere es als @string-Referenz ohne Klammern
better-bibtex_preferences_export_fields_export-strings_detect = Behandle Felder mit nur einem Wort als @String-Variablen
    .label = { better-bibtex_preferences_export_fields_export-strings_detect }
better-bibtex_preferences_export_fields_export-strings_match = Mit den @string-Deklarationen unten vergleichen
    .label = { better-bibtex_preferences_export_fields_export-strings_match }
better-bibtex_preferences_export_fields_export-strings_match_reverse = Mit den @string-Deklarationen und ihren Werten unten vergleichen
    .label = { better-bibtex_preferences_export_fields_export-strings_match_reverse }
better-bibtex_preferences_export_fields_export-strings_off = Nein
    .label = { better-bibtex_preferences_export_fields_export-strings_off }
better-bibtex_preferences_export_fields_import-strings = 
    .label = Erweitere die folgenden @string-Variablen während des Imports
better-bibtex_preferences_export_fields_language = Sprache exportieren als
better-bibtex_preferences_export_fields_language_both = beide
    .label = { better-bibtex_preferences_export_fields_language_both }
better-bibtex_preferences_export_fields_skip = Felder, die nicht exportiert werden sollen (mit Komma trennen)
better-bibtex_preferences_export_jabref-format = Füge JabRef-spezifische Meta-Informationen hinzu:
better-bibtex_preferences_export_jabref-format_0 = nein
    .label = { better-bibtex_preferences_export_jabref-format_0 }
better-bibtex_preferences_export_jabref-format_3 = für JabRef 3
    .label = { better-bibtex_preferences_export_jabref-format_3 }
better-bibtex_preferences_export_jabref-format_4 = für JabRef 4
    .label = { better-bibtex_preferences_export_jabref-format_4 }
better-bibtex_preferences_export_jabref-format_5 = für JabRef 5
    .label = { better-bibtex_preferences_export_jabref-format_5 }
better-bibtex_preferences_export_jabref-format_warn = JabRef-spezifische Felder exportieren: Zeitstempel, Titel für Anhänge und Gruppen für jede Sammlung, zu der ein Artikel gehört. Beachten Sie, dass das Einschalten das Caching in Exporten deaktiviert, was speziell für Auto-Exporte nicht wünschenswert ist.
better-bibtex_preferences_export_quality-report = 
    .label = Kommentare über mögliche Probleme mit den exportieren Einträgen hinzufügen
better-bibtex_preferences_export_quick-copy = Schnellkopie
    .label = { better-bibtex_preferences_export_quick-copy }
better-bibtex_preferences_export_quick-copy_explanation = Schnellkopie/Drag-and-Drop-Zitat
better-bibtex_preferences_export_quick-copy_format = Schnellkopie-Format
better-bibtex_preferences_export_quick-copy_citekeys = Zitierschlüssel
    .label = { better-bibtex_preferences_export_quick-copy_citekeys }
better-bibtex_preferences_export_quick-copy_eta-template = Eta-Template
    .label = { better-bibtex_preferences_export_quick-copy_eta-template }
better-bibtex_preferences_export_quick-copy_latex = LaTeX-Zitat
    .label = { better-bibtex_preferences_export_quick-copy_latex }
better-bibtex_preferences_export_quick-copy_latex_command = LaTeX-Befehl
    .label = { better-bibtex_preferences_export_quick-copy_latex_command }
better-bibtex_preferences_export_quick-copy_org-mode = Org-Modus Auswahllink
    .label = { better-bibtex_preferences_export_quick-copy_org-mode }
better-bibtex_preferences_export_quick-copy_org-mode_citekey = Better-BibTeX-Zitierschlüssel verwenden
    .label = { better-bibtex_preferences_export_quick-copy_org-mode_citekey }
better-bibtex_preferences_export_quick-copy_org-mode_zotero = Zotero-Eintragsschlüssel verwenden
    .label = { better-bibtex_preferences_export_quick-copy_org-mode_zotero }
better-bibtex_preferences_export_quick-copy_org-ref = Org-Ref-Zitat
    .label = { better-bibtex_preferences_export_quick-copy_org-ref }
better-bibtex_preferences_export_quick-copy_org-ref3 = Org-Ref-V3-Zitat
    .label = { better-bibtex_preferences_export_quick-copy_org-ref3 }
better-bibtex_preferences_export_quick-copy_pandoc = Pandoc-Zitat
    .label = { better-bibtex_preferences_export_quick-copy_pandoc }
better-bibtex_preferences_export_quick-copy_pandoc_brackets = 
    .label = Umschließe Pandoc-Zitate mit Klammern
better-bibtex_preferences_export_quick-copy_roam-cite-key = Roam-Zitierschlüssel
    .label = { better-bibtex_preferences_export_quick-copy_roam-cite-key }
better-bibtex_preferences_export_quick-copy_rtf-scan = RTF-Scan-Marker
    .label = { better-bibtex_preferences_export_quick-copy_rtf-scan }
better-bibtex_preferences_export_quick-copy_select-link = Zotero Auswahllink
    .label = { better-bibtex_preferences_export_quick-copy_select-link }
better-bibtex_preferences_export_quick-copy_select-link_citekey = Better-BibTeX-Zitierschlüssel verwenden
    .label = { better-bibtex_preferences_export_quick-copy_select-link_citekey }
better-bibtex_preferences_export_quick-copy_select-link_zotero = Zotero-Eintragsschlüssel verwenden
    .label = { better-bibtex_preferences_export_quick-copy_select-link_zotero }
better-bibtex_preferences_open = 
    .label = Open Better BibTeX preferences...
better-bibtex_preferences_postscript_warn = 
    .value = Die Verwendung von 'Translator.options.exportPath' in Postscripts deaktiviert den Cache. Die Exporte werden sich deutlich verlangsamen.
better-bibtex_preferences_prefpane_loading = Better BibTeX wird geladen
better-bibtex_preferences_rescan-citekeys = 
    .label = Scanne angeheftete Zitierschlüssel erneut
better-bibtex_preferences_reset-cache = 
    .label = Reset cache on next start
better-bibtex_preferences_tab_auto-export = Automatischer Export
    .label = { better-bibtex_preferences_tab_auto-export }
better-bibtex_preferences_tab_citekey = Citation keys
    .label = { better-bibtex_preferences_tab_citekey }
better-bibtex_preferences_tab_export = Export
    .label = { better-bibtex_preferences_tab_export }
better-bibtex_preferences_tab_import = Import
    .label = { better-bibtex_preferences_tab_import }
better-bibtex_preferences_tab_misc = Miscellaneous
    .label = { better-bibtex_preferences_tab_misc }
better-bibtex_report-errors = Better BibTeX Debug-Log senden...
better-bibtex_server-url = 
    .title = Better-BibTeX-Export via HTTP
    .buttonlabelaccept = OK
better-bibtex_server-url_description = Download-URL:
better-bibtex_server-url_format = Element herunterladen als
better-bibtex_server-url_or = oder
better-bibtex_startup_auto-export = Beginne Auto-Export
better-bibtex_startup_auto-export_load = Initialisiere Auto-Export
better-bibtex_startup_installing-translators = Installiere kompilierte Export-Module
better-bibtex_startup_journal-abbrev = Lade Zeitschriften-Abkürzer
better-bibtex_startup_key-manager = Starte Schlüsselverwaltung
better-bibtex_startup_serialization-cache = Starte Serialisierungs-Cache
better-bibtex_startup_waiting-for-zotero = Warten auf Zotero-Datenbank
better-bibtex_translate_error_target_no_parent = { $path } hat kein übergeordnetes Verzeichnis
better-bibtex_translate_error_target_not_a_file = { $path } existiert, ist aber keine Datei
better-bibtex_units_seconds = Sekunden
better-bibtex_workers_status = Gestartete Hintergrund-Exporte insgesamt: { $total }, aktuell laufend: { $running }
better-bibtex_zotero-pane_add-citation-links = Zitier-Graph: Zitat-Links hinzufügen...
better-bibtex_zotero-pane_citekey_pin_inspire-hep = Hefte BibTeX-Schlüssel aus InspireHEP an
better-bibtex_zotero-pane_citekey_refresh = Aktualisiere BibTeX key
better-bibtex_zotero-pane_citekey_unpin = BibTeX-Key lösen
better-bibtex_zotero-pane_bibtex_to_clipboard = 🅱 copy BibTeX to clipboard
better-bibtex_zotero-pane_biblatex_to_clipboard = 🅱 copy BibLaTeX to clipboard
better-bibtex_zotero-pane_column_citekey = { -citation-key }
better-bibtex_zotero-pane_patch-dates = Kopiere date-added/date-modified aus Extra-Feld
better-bibtex_zotero-pane_sentence-case = BBT Sentence-case
better-bibtex_zotero-pane_show_collection-key = Download Better-BibTeX-Export...
better-bibtex_zotero-pane_tag_duplicates = Markiere doppelte Zitierschlüssel
better-bibtex_zotero-pane_tex-studio = Einträge an TeXstudio senden
betterbibtex-item-pane-header = { -citation-key }
