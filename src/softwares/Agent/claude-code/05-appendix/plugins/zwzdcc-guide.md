# zwzdcc-plugins 使用指南

自用 Plugin 集合，含学术文献精读、写作检查、方案推敲与 Scopus 文献检索。

## 安装

```bash
claude plugin marketplace add Zxzz106/zwzdcc-plugins
claude plugin install intensive-reading@zwzdcc-plugins
claude plugin install academic-writing-check@zwzdcc-plugins
claude plugin install grill-me@zwzdcc-plugins
claude plugin install scopus-api@zwzdcc-plugins
```

> GitHub 访问可能不稳定，如安装失败，先设置代理：
> macOS / Linux：`export HTTPS_PROXY=http://127.0.0.1:7890`
> Windows：`$env:HTTPS_PROXY=http://127.0.0.1:7890`

安装后重启 Claude Code。

## intensive-reading — 文献精读

六阶段论文精读标注管线，在原文基础上叠加分层中文标注，读者可从表层理解逐步深入，无需在多个信息源间切换。

| 阶段 | Agent | 功能 |
|------|-------|------|
| 0 | Main | 初始化工作目录，复制源文件与规则 |
| 1 | `phase1-cleaner` | OCR 伪影清理、标题规范化、章节拆分 |
| 2 | `phase2-surveyor` | 领域调研、前置知识引导、术语表、附录 |
| 3 | `phase3-annotator` (×N) | 逐段并行翻译与标注 |
| 4 | Main | 合并全部标注段落 |
| 5 | `phase5-auditor` | 跨章节一致性审计与修正 |

标注保留原文全部内容，使用五种标记：前置理论（`▶`）、段落分析（`▷`）、关键概念（`◆`）、注意事项（`※`）、延伸阅读（`→`）。

用法：

```text
intensive reading of path/to/paper.md
```

支持 `.md` 文件、PDF（通过 mineru_2md 提取）和 URL（通过 WebFetch）。输出为 `intensive-<basename>.md`，与源文件同目录。

## academic-writing-check — 学术写作检查

检查学术写作中的常见问题：过度声称、修辞膨胀、引用准确性、格式、术语一致性、结构完整性。按类别报告违规项，附行号引用和修正建议。

用法：

```text
academic writing check
```

## grill-me — 方案推敲

就方案或设计持续追问用户，逐个遍历决策树分支，直至达成共识。适用于需求梳理、架构推演、风险评估。

用法：

```text
grill me
```

## scopus-api — Scopus 文献检索

基于 Elsevier Scopus API 与 Crossref 的 MCP 工具集，提供文献搜索、摘要检索、期刊指标、引用查询、作者搜索与全文下载（含 XML→Markdown 自动转换，保留公式、表格、参考文献）。学科优化面向传统工程领域（MECH、CIVI、CENG、MATE、EENG、ENER）。

安装后自动注册 MCP tools，在对话中直接调用。需预先安装 uv，并在系统环境变量中配置 `SCOPUS_API_KEY`：

Windows（PowerShell）：
```powershell
[Environment]::SetEnvironmentVariable("SCOPUS_API_KEY", "你的API_KEY", "User")
```

macOS / Linux（写入 `~/.zshrc` 或 `~/.bashrc`，终端重启后生效）：
```bash
echo 'export SCOPUS_API_KEY="你的API_KEY"' >> ~/.zshrc
```

| Tool | 功能 | 数据源 |
|------|------|--------|
| `search_scopus` | 布尔文献搜索 | Scopus |
| `get_abstract` | 获取摘要与元数据 | Scopus |
| `get_journal_metrics` | 期刊指标：CiteScore、SJR、SNIP、分区 | Scopus |
| `crossref_citations` | 批量 DOI 引用查询 | Crossref |
| `search_author` | 作者搜索 | Scopus |
| `download_fulltext` | 全文 XML 下载并转 Markdown | ScienceDirect |

`get_journal_metrics` 按 CiteScore 百分位推算分区（≥75: Q1）。`download_fulltext` 自动转换 ScienceDirect XML 为 Markdown，保留公式（LaTeX）、表格、图片标题与参考文献。

首次使用前需预热 uv 缓存（安装 Python 依赖）：
```bash
claude -p --permission-mode bypassPermissions 'Warm uv cache for scopus-api@zwzdcc-plugins: run uv run ${CLAUDE_PLUGIN_ROOT}/servers/mcp_server.py --test'
```

> Scopus API 需机构订阅。在 [Elsevier Developer Portal](https://dev.elsevier.com/apikey/manage) 创建 API Key 并设置系统环境变量 `SCOPUS_API_KEY`。Crossref 免费无需密钥。

## 更多

[GitHub](https://github.com/Zxzz106/zwzdcc-plugins)
