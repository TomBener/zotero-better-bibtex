-citation-key = 引用
better-bibtex_auto-export_delete = 正在删除自动导出
better-bibtex_auto-export_delete_confirm = 您确定要删除此项自动导出吗？该操作不可撤销。
better-bibtex_aux-scan_prompt = 标签名
better-bibtex_aux-scan_title_aux = 标记从 AUX 文件导入的条目
better-bibtex_aux-scan_title_md = 标记从 Markdown 文件导入的条目
better-bibtex_aux-scanner = 从 BibTeX AUX/Markdown 文件扫描引用…
better-bibtex_bulk-keys-confirm_warning = 您正在修改超过 { $treshold } 个条目。您确定吗？
better-bibtex_bulk-keys-confirm_stop_asking = 确定，不再询问。
better-bibtex_citekey_pin = 固定 BibTeX 引用
better-bibtex_citekey_set = 修改 BibTeX 引用…
better-bibtex_citekey_set_change = 将 BibTeX 引用修改为
better-bibtex_citekey_set_toomany = 一次只能修改一条引用
better-bibtex_error-report = 
    .title = Better BibTeX 调试日志
better-bibtex_error-report_better-bibtex_cache = 缓存大小：{ $entries } 个条目。
better-bibtex_error-report_better-bibtex_oom = Zotero 内存不足！在 Windows 上，Zotero 有内存使用量限制，这将在 Zotero 7 中得到改善。在此期间，请关闭 Better BibTeX 缓存并重启 Zotero。
    .value = { better-bibtex_error-report_better-bibtex_oom }
better-bibtex_error-report_better-bibtex_current = 当前 Better BibTeX版本为 { $version }
better-bibtex_error-report_better-bibtex_latest = 最新 Better BibTeX 版本为 { $version }
better-bibtex_error-report_context = 
    .label = 应用程序上下文
better-bibtex_error-report_debug = 
    .label = 调试日志
better-bibtex_error-report_enable-debug = Zotero 的调试日志记录已被禁用。如果在提交调试日志之前启用它，将更容易诊断问题。
better-bibtex_error-report_errors = 
    .label = 错误
better-bibtex_error-report_include-errors = 
    .label = 包括错误信息
better-bibtex_error-report_include-log = 
    .label = 包括调试日志
better-bibtex_error-report_include-items = 
    .label = 包括条目
better-bibtex_error-report_include-notes = 
    .label = 备注
better-bibtex_error-report_include-cache = 
    .label = 缓存
better-bibtex_error-report_include-attachments = 
    .label = 附件元数据
better-bibtex_error-report_items = 
    .label = 条目
better-bibtex_error-report_not-reviewed = 仅当您在 GitHub Issues 中引用了日志 ID 时，调试日志才会被审阅。
better-bibtex_error-report_post-to-git-hub = 请在 GitHub 上发布相关信息 (https://github.com/retorquere/zotero-better-bibtex/issues)。您提交的 Issue 描述中应包含该调试日志 ID，问题描述，以及重现该问题的必要步骤。
better-bibtex_error-report_report-id = 调试日志 ID：
better-bibtex_error-report_restart-with-logging-enabled = 
    .label = 启用日志记录并重启…
better-bibtex_error-report_review =
    以下数据将被提交至 Better BibTeX 以供调试。您可以现在预览数据，或保存日志副本以获取将被发送的准确数据，以检查是否有您不希望发送的敏感信息。请仔细考虑在您的环境下是否有必要取消下面的选项。如果您以这种方式移除了部分日志，那么我们一般需要更多交流（=更多时间）。
    
    如果您允许发送数据，请进行下一步，并将以红色字体显示的调试 ID 提交至问题追踪器（issue tracker）：
    
    https://github.com/retorquere/zotero-better-bibtex/issue
better-bibtex_error-report_save = 
    .label = 保存日志副本以供检查
better-bibtex_error-report_submission-in-progress = 正在提交调试日志，请稍候。
better-bibtex_error-report_submitted = 您的调试日志已被提交。
better-bibtex_export-options_keep-updated = 保持更新
better-bibtex_export-options_reminder = 您确定不使用“{ $translator }”吗？
better-bibtex_export-options_worker = 后台导出
better-bibtex_export-options_biblatexAPA = biblatex-apa
better-bibtex_export-options_biblatexChicago = biblatex-chicago
better-bibtex_item-pane_section_sidenav = 
    .tooltip = { -citation-key }
better-bibtex_item-pane_section_header = 
    .label = { -citation-key }
better-bibtex_item-pane_info_citation-key = 
    .label = { -citation-key }
better-bibtex_preferences_advanced_export_brace-protection = 
    .label = 使用大括号括起首字母大写的单词以保持大小写格式
better-bibtex_preferences_advanced_export_brace-protection_warning = 若您坚持忽略 BibTeX/BibLaTeX 最佳做法（见 BBT FAQ）和 Zotero 关于标题/句子大小写格式的建议，您可以关闭该选项以禁止自动使用括号对含大写字母单词进行大小写保护。
better-bibtex_preferences_advanced_export_retain-cache = 
    .label = 升级后保留导出缓存
better-bibtex_preferences_advanced_export_retain-cache_warning =
    默认情况下，升级 BBT 或 Zotero 后 BBT 会清除所有缓存。我无法预测 BBT 或 Zotero 的更改是否会影响条目引用的生成结果，因此，为了确保您能受益于对引用生成有影响的更新和修复，当检测到组件更新时，缓存将被清除。然而，如果您有一个十分庞大的文库，且您经常需要导出其中的大量条目，那么您可能希望保留缓存的引用，即便这将带来在导出时获得（已在更新中修复的）旧有的错误输出的风险。
    
    如果您开启了此选项，并且遇到了任何不是由于升级时缓存被清除而引起的问题，您必须清除缓存后再重现问题。当您更改包括此设置的任何设置后，缓存都将被清除。
better-bibtex_preferences_advanced_export_title-case = 
    .label = 对标题应用标题大小写格式
better-bibtex_preferences_advanced_export_title-case_warning = 若您坚持忽略 BibTeX/BibLaTeX 最佳做法（见 BBT FAQ）和 Zotero 关于标题/句子大小写格式的建议，您可以关闭该选项以禁止自动英文条目标题大小写的自动格式化。
better-bibtex_preferences_advanced_export_workers_cache = 
    .label = 启用后台导出缓存
better-bibtex_preferences_advanced_extra-merge = 合并条目时，也合并：
    .label = { better-bibtex_preferences_advanced_extra-merge }
better-bibtex_preferences_advanced_extra-merge-csl = 
    .label = 被 Zotero 识别为 CSL 字段的字段
better-bibtex_preferences_advanced_extra_merge-citekeys = 
    .label = 引用，合并至 bib(la)tex 的“ids”字段
better-bibtex_preferences_advanced_extra_merge-tex = 
    .label = 它们的“tex.*”字段
better-bibtex_preferences_advanced_ideographs = 引用中的表意文字
    .label = { better-bibtex_preferences_advanced_ideographs }
better-bibtex_preferences_advanced_ideographs_jieba = 
    .label = 启用引用格式的“jieba”/“pinyin”过滤器。将消耗大量内存。
better-bibtex_preferences_advanced_ideographs_kuroshiro = 
    .label = 使用“kuroshiro”将日文姓名/标题转换为罗马音。将消耗大量内存。
better-bibtex_preferences_advanced_import_case-protection = 为括号插入大小写保护：
better-bibtex_preferences_advanced_import_case-protection_as-needed = 最少
    .label = { better-bibtex_preferences_advanced_import_case-protection_as-needed }
better-bibtex_preferences_advanced_import_case-protection_off = 否
    .label = { better-bibtex_preferences_advanced_import_case-protection_off }
better-bibtex_preferences_advanced_import_case-protection_on = 是
    .label = { better-bibtex_preferences_advanced_import_case-protection_on }
better-bibtex_preferences_advanced_import_case-protection_warning =
    导入时，BBT 将为标题中用{"{"}大括号{"}"}括起来的单词添加大小写保护（<span class="nocase">...</span>）。
    
    该功能对许多 bib(la)tex 文件来说是多余的，且您可能不希望条目含有 HTML 代码，尽管这就是大括号在 bib(la)tex 中的含义，而且 Zotero 也支持它。
    
    若您选择“否”，导入时标记符号将被省略。若您选择“是”，需要大小写保护的大括号（由 bib(la)tex 决定，并非所有情况）将被转换为“span”元素。若您选择“最少”，“span”元素的数量将尽可能地少。
better-bibtex_preferences_advanced_import_sentence-case = 导入时格式化标题为句首大写：
better-bibtex_preferences_advanced_import_sentence-case_off = 
    .label = 否（按原样导入标题）
better-bibtex_preferences_advanced_import_sentence-case_on = 
    .label = 是
better-bibtex_preferences_advanced_import_sentence-case_on-guess = 
    .label = 是，但尝试排除已句首大写的标题
better-bibtex_preferences_advanced_import_sentence-case_warning =
    Bib(La)TeX 条目必须按标题格式大小写保存；Zotero 条目应为句首大写。
    
    若您选择“是”，BBT 将尝试在导入时按句首大写格式化标题。该过程使用启发式算法，没有进行自然语言处理，所以结果并不完美。
    
    您可以禁用该选项，这时或许您还希望禁用“对标题应用标题大小写格式”（该选项自身也有问题，详见本页上关于该选项的帮助）。
    
    若您选择“是，但尝试排除已句首大写的标题”，BBT 将尝试检测标题是否已经为句首大写，若是，则将按原样导入。
better-bibtex_preferences_advanced_import_migrate = 迁移 BetterBibTeX 设置/引用
better-bibtex_preferences_advanced_import_export-prefs = 
    .label = 导出 Better BibTeX 设置…
better-bibtex_preferences_advanced_import_prefs = 
    .label = 导入 Better BibTeX 设置/引用…
better-bibtex_preferences_advanced_tab_postscript = postscript
    .label = { better-bibtex_preferences_advanced_tab_postscript }
better-bibtex_preferences_advanced_tab_strings = @string 定义
    .label = { better-bibtex_preferences_advanced_tab_strings }
better-bibtex_preferences_auto-abbrev = 
    .label = 在没有显式设置的情况下自动缩写期刊名
better-bibtex_preferences_auto-abbrev_style = 缩写格式：
better-bibtex_preferences_auto-export = 自动导出
better-bibtex_preferences_auto-export_delay = 延迟自动导出，等待
better-bibtex_preferences_auto-export_explanation = 您只能在这里查看和删除导出。要添加自动导出，照常执行导出并启用那里的“保持更新”选项。
better-bibtex_preferences_auto-export_fields_cached = 
    .label = 已缓存
better-bibtex_preferences_auto-export_fields_error = 错误
better-bibtex_preferences_auto-export_fields_journal-abbrev = 
    .label = 使用期刊名缩写
better-bibtex_preferences_auto-export_fields_notes = 
    .label = 导出笔记
better-bibtex_preferences_auto-export_fields_recursive = 
    .label = 导出所有子分类
better-bibtex_preferences_auto-export_git_message = Better BibTeX for Zotero 更新了 { $type }
better-bibtex_preferences_auto-export_idle = 空闲时
    .label = { better-bibtex_preferences_auto-export_idle }
better-bibtex_preferences_auto-export_immediate = 修改时
    .label = { better-bibtex_preferences_auto-export_immediate }
better-bibtex_preferences_auto-export_off = 暂停
    .label = { better-bibtex_preferences_auto-export_off }
better-bibtex_preferences_auto-export_remove = 
    .label = 删除
better-bibtex_preferences_auto-export_run = 
    .label = 立即导出
better-bibtex_preferences_auto-export_status = 状态
better-bibtex_preferences_auto-export_status_done = 已完成
better-bibtex_preferences_auto-export_status_error = 错误
better-bibtex_preferences_auto-export_status_preparing = 准备中
better-bibtex_preferences_auto-export_status_running = 运行中
better-bibtex_preferences_auto-export_status_scheduled = 已预定
better-bibtex_preferences_auto-export_target = 输出文件
better-bibtex_preferences_auto-export_translator = 格式
better-bibtex_preferences_auto-export_type_collection = 分类
better-bibtex_preferences_auto-export_type_library = 库
better-bibtex_preferences_auto-export_updated = 已更新
better-bibtex_preferences_bulk-warning = 批量更改引用时发出警告
better-bibtex_preferences_citekey_auto-pin-delay = 自动固定引用，等待
better-bibtex_preferences_citekey_aux-scanner_import = 
    .label = 扫描 AUX 文件时，对 Zotero 中没有的引用，尝试从附属的 bib 文件导入条目
better-bibtex_preferences_citekey_fold = 
    .label = 强制引用为纯文本
better-bibtex_preferences_citekey_format = 引用格式公式
better-bibtex_preferences_citekey_format_installed = 当前引用格式公式
better-bibtex_preferences_citekey_search = 
    .label = 启用引用搜索
better-bibtex_preferences_citekey_uniqueness = 
    .label = 保持引用唯一
better-bibtex_preferences_citekey_uniqueness_case = 
    .label = 查重时忽略大小写
better-bibtex_preferences_citekey_uniqueness_conflict = 当与固定引用冲突时，非固定引用将被
better-bibtex_preferences_citekey_uniqueness_conflict_change = 添加后缀（导致引用更改）
    .label = { better-bibtex_preferences_citekey_uniqueness_conflict_change }
better-bibtex_preferences_citekey_uniqueness_conflict_keep = 保留（导致引用重复）
    .label = { better-bibtex_preferences_citekey_uniqueness_conflict_keep }
better-bibtex_preferences_citekey_uniqueness_scope = 检查范围：
better-bibtex_preferences_citekey_uniqueness_scope_global = 在所有文库中唯一
    .label = { better-bibtex_preferences_citekey_uniqueness_scope_global }
better-bibtex_preferences_citekey_uniqueness_scope_library = 在每个文库中唯一
    .label = { better-bibtex_preferences_citekey_uniqueness_scope_library }
better-bibtex_preferences_export_automatic-tags = 
    .label = 导出时包含自动标签
better-bibtex_preferences_export_biblatex_ascii = 
    .label = 将 unicode 导出为纯文本的 latex 命令
better-bibtex_preferences_export_biblatex_biblatex-extract-eprint = 
    .label = 将 JSTOR/Google Books/PubMed 信息从 URL 字段提取到 eprint 字段
better-bibtex_preferences_export_biblatex_extended-name-format = 
    .label = 使用 BibLaTeX 扩展名称格式 (需要 biblatex 3.5)
better-bibtex_preferences_export_bibtex_ascii = 
    .label = 将 unicode 导出为纯文本的 latex 命令（推荐）
better-bibtex_preferences_export_bibtex_urls = 将 URL 添加到 BibTeX 导出的
better-bibtex_preferences_export_bibtex_urls_note = “note”字段
    .label = { better-bibtex_preferences_export_bibtex_urls_note }
better-bibtex_preferences_export_bibtex_urls_note-url-ish = “note”字段，但假定“url”宏包未加载
    .label = { better-bibtex_preferences_export_bibtex_urls_note-url-ish }
better-bibtex_preferences_export_bibtex_urls_off = 否
    .label = { better-bibtex_preferences_export_bibtex_urls_off }
better-bibtex_preferences_export_bibtex_urls_url = “url”字段
    .label = { better-bibtex_preferences_export_bibtex_urls_url }
better-bibtex_preferences_export_bibtex_urls_url-ish = “url”字段，但假定“url”宏包未加载
    .label = { better-bibtex_preferences_export_bibtex_urls_url-ish }
better-bibtex_preferences_export_sort = 排序 TeX/CSL 输出（有助于对输出进行版本控制），按照：
better-bibtex_preferences_export_sort_off = 关（最快）
    .label = { better-bibtex_preferences_export_sort_off }
better-bibtex_preferences_export_sort_id = 项目创建顺序（较快）
    .label = { better-bibtex_preferences_export_sort_id }
better-bibtex_preferences_export_sort_citekey = 引用（对于非常大的文库较慢）
    .label = { better-bibtex_preferences_export_sort_citekey }
better-bibtex_preferences_export_fields = 字段
    .label = { better-bibtex_preferences_export_fields }
better-bibtex_preferences_export_fields_bibtex-edition-ordinal = 
    .label = 将数字版号导出为英文序数
better-bibtex_preferences_export_fields_bibtex-particle-no-op = 
    .label = 排序时忽略名称前缀
better-bibtex_preferences_export_fields_doi-and-url = 当一个条目同时包含 DOI 和 URL 时，导出
better-bibtex_preferences_export_fields_doi-and-url_both = 全部
    .label = { better-bibtex_preferences_export_fields_doi-and-url_both }
better-bibtex_preferences_export_fields_doi-and-url_doi = DOI
    .label = { better-bibtex_preferences_export_fields_doi-and-url_doi }
better-bibtex_preferences_export_fields_doi-and-url_url = URL
    .label = { better-bibtex_preferences_export_fields_doi-and-url_url }
better-bibtex_preferences_export_fields_doi-and-url_warning = 大多数 BibTeX 样式不支持 DOI/URL 字段，而在支持这些字段的样式中，许多人忘记加载所需的“url”宏包，所以请确保您加载了它。 DOI 和 URL 字段是所谓的“verbatim”字段，如果没有加载“url”包编译可能会失败。
better-bibtex_preferences_export_fields_export-strings = 若某个字段可能是 @string 引用，则将其导出为引用解析结果
better-bibtex_preferences_export_fields_export-strings_detect = 假设单词字段为 @string 变量
    .label = { better-bibtex_preferences_export_fields_export-strings_detect }
better-bibtex_preferences_export_fields_export-strings_match = 匹配下列 @string 声明
    .label = { better-bibtex_preferences_export_fields_export-strings_match }
better-bibtex_preferences_export_fields_export-strings_match_reverse = 匹配下列 @string 声明和值
    .label = { better-bibtex_preferences_export_fields_export-strings_match_reverse }
better-bibtex_preferences_export_fields_export-strings_off = 否
    .label = { better-bibtex_preferences_export_fields_export-strings_off }
better-bibtex_preferences_export_fields_import-strings = 
    .label = 导入时展开下列 @string 变量
better-bibtex_preferences_export_fields_language = 导出语言为
better-bibtex_preferences_export_fields_language_both = 全部
    .label = { better-bibtex_preferences_export_fields_language_both }
better-bibtex_preferences_export_fields_skip = 不导出的字段（逗号分隔）
better-bibtex_preferences_export_jabref-format = 包含 JabRef 元数据
better-bibtex_preferences_export_jabref-format_0 = 否
    .label = { better-bibtex_preferences_export_jabref-format_0 }
better-bibtex_preferences_export_jabref-format_3 = JabRef 3
    .label = { better-bibtex_preferences_export_jabref-format_3 }
better-bibtex_preferences_export_jabref-format_4 = JabRef 4
    .label = { better-bibtex_preferences_export_jabref-format_4 }
better-bibtex_preferences_export_jabref-format_5 = JabRef 5
    .label = { better-bibtex_preferences_export_jabref-format_5 }
better-bibtex_preferences_export_jabref-format_warn = 导出用于 JabRef 的字段：时间戳、附件标题以及条目所属分类的组。 请注意，启用该选项将会禁用导出缓存，这将严重影响自动导出功能的性能。
better-bibtex_preferences_export_quality-report = 
    .label = 包含有关导出条目潜在问题的注释
better-bibtex_preferences_export_quick-copy = 快速复制
    .label = { better-bibtex_preferences_export_quick-copy }
better-bibtex_preferences_export_quick-copy_explanation = 快速复制/拖放引用
better-bibtex_preferences_export_quick-copy_format = 快速复制格式
better-bibtex_preferences_export_quick-copy_citekeys = 引用
    .label = { better-bibtex_preferences_export_quick-copy_citekeys }
better-bibtex_preferences_export_quick-copy_eta-template = Eta 模板
    .label = { better-bibtex_preferences_export_quick-copy_eta-template }
better-bibtex_preferences_export_quick-copy_latex = LaTeX 引用
    .label = { better-bibtex_preferences_export_quick-copy_latex }
better-bibtex_preferences_export_quick-copy_latex_command = LaTeX 命令
    .label = { better-bibtex_preferences_export_quick-copy_latex_command }
better-bibtex_preferences_export_quick-copy_org-mode = Org-mode 选择链接
    .label = { better-bibtex_preferences_export_quick-copy_org-mode }
better-bibtex_preferences_export_quick-copy_org-mode_citekey = 使用 Better BibTeX 引用
    .label = { better-bibtex_preferences_export_quick-copy_org-mode_citekey }
better-bibtex_preferences_export_quick-copy_org-mode_zotero = 使用 Zotero 条目键
    .label = { better-bibtex_preferences_export_quick-copy_org-mode_zotero }
better-bibtex_preferences_export_quick-copy_org-ref = org-ref 引用
    .label = { better-bibtex_preferences_export_quick-copy_org-ref }
better-bibtex_preferences_export_quick-copy_org-ref3 = org-ref v3 引用
    .label = { better-bibtex_preferences_export_quick-copy_org-ref3 }
better-bibtex_preferences_export_quick-copy_pandoc = Pandoc 引用
    .label = { better-bibtex_preferences_export_quick-copy_pandoc }
better-bibtex_preferences_export_quick-copy_pandoc_brackets = 
    .label = 为 Pandoc 引用加方括号
better-bibtex_preferences_export_quick-copy_roam-cite-key = Roam 引用
    .label = { better-bibtex_preferences_export_quick-copy_roam-cite-key }
better-bibtex_preferences_export_quick-copy_rtf-scan = RTF 扫描标记
    .label = { better-bibtex_preferences_export_quick-copy_rtf-scan }
better-bibtex_preferences_export_quick-copy_select-link = Zotero 选择链接
    .label = { better-bibtex_preferences_export_quick-copy_select-link }
better-bibtex_preferences_export_quick-copy_select-link_citekey = 使用 Better BibTeX 引用
    .label = { better-bibtex_preferences_export_quick-copy_select-link_citekey }
better-bibtex_preferences_export_quick-copy_select-link_zotero = 使用 Zotero 条目键
    .label = { better-bibtex_preferences_export_quick-copy_select-link_zotero }
better-bibtex_preferences_open = 
    .label = 打开 Better BibTeX 首选项…
better-bibtex_preferences_postscript_warn = 
    .value = 在 postscript 中使用“translator.options.exportPath”将禁用缓存。导出将明显减慢。
better-bibtex_preferences_prefpane_loading = 正在加载 Better BibTeX
better-bibtex_preferences_rescan-citekeys = 
    .label = 重新扫描固定的引用
better-bibtex_preferences_reset-cache = 
    .label = 清除缓存
better-bibtex_preferences_tab_auto-export = 自动导出
    .label = { better-bibtex_preferences_tab_auto-export }
better-bibtex_preferences_tab_citekey = 引用
    .label = { better-bibtex_preferences_tab_citekey }
better-bibtex_preferences_tab_export = 导出
    .label = { better-bibtex_preferences_tab_export }
better-bibtex_preferences_tab_import = 导入
    .label = { better-bibtex_preferences_tab_import }
better-bibtex_preferences_tab_misc = 杂项
    .label = { better-bibtex_preferences_tab_misc }
better-bibtex_report-errors = 发送 Better BibTeX 调试日志…
better-bibtex_server-url = 
    .title = 通过 HTTP 导出 Better BibTeX
    .buttonlabelaccept = 确定
better-bibtex_server-url_description = 下载地址：
better-bibtex_server-url_format = 将项目下载为
better-bibtex_server-url_or = 或
better-bibtex_startup_auto-export = 正在开始自动导出
better-bibtex_startup_auto-export_load = 正在初始化自动导出
better-bibtex_startup_installing-translators = 正在安装集成的翻译器
better-bibtex_startup_journal-abbrev = 加载期刊名缩写
better-bibtex_startup_key-manager = 正在启动引用管理器
better-bibtex_startup_serialization-cache = 正在启动序列化缓存
better-bibtex_startup_waiting-for-zotero = 正在等待 Zotero 数据库
better-bibtex_translate_error_target_no_parent = { $path } 没有父文件夹
better-bibtex_translate_error_target_not_a_file = { $path } 存在，但不是文件
better-bibtex_units_seconds = 秒
better-bibtex_workers_status = 后台导出共已开始：{ $total }，正在运行：{ $running }
better-bibtex_zotero-pane_add-citation-links = 引用图：添加引用链接…
better-bibtex_zotero-pane_citekey_pin_inspire-hep = 固定来自 InspireHEP 的引用
better-bibtex_zotero-pane_citekey_refresh = 刷新 BibTeX 引用
better-bibtex_zotero-pane_citekey_unpin = 取消固定 BibTeX 引用
better-bibtex_zotero-pane_bibtex_to_clipboard = Copy BibTeX to clipboard
better-bibtex_zotero-pane_biblatex_to_clipboard = Copy BibLaTeX to clipboard
better-bibtex_zotero-pane_column_citekey = { -citation-key }
better-bibtex_zotero-pane_patch-dates = 从“其他”字段复制添加日期/修改日期
better-bibtex_zotero-pane_sentence-case = BBT 句首大写
better-bibtex_zotero-pane_show_collection-key = 下载 Better BibTeX 导出…
better-bibtex_zotero-pane_tag_duplicates = 标记重复的引用
better-bibtex_zotero-pane_tex-studio = 推送条目至 TeXstudio
betterbibtex-item-pane-header = { -citation-key }
