# c3u-ccplugins 使用指南

自用 Plugin 集合，按功能域划分为 5 个 plugin：文献检索、文档转换、会话管理、输出审查与文献加工。

## 安装

```bash
claude plugin marketplace add https://github.com/c3u-group/c3u-ccplugins
claude plugin install literature-retrieval@c3u-ccplugins
claude plugin install file-converter@c3u-ccplugins
claude plugin install logbook@c3u-ccplugins
claude plugin install critique@c3u-ccplugins
claude plugin install literature-processing@c3u-ccplugins
```

安装后重启 Claude Code。

## literature-retrieval — 文献检索

两个 MCP server 合一：`scopus-api` 封装 Elsevier Scopus API + Crossref（英文文献）；`chaoxing-api` 封装超星发现（中文期刊）。安装后自动注册 MCP tools，对话中直接调用。

### scopus-api — Scopus 检索

需在系统环境变量中配置 `SCOPUS_API_KEY`：

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
| `search_scopus` | 布尔文献搜索，支持字段限定、学科过滤、年份范围 | Scopus |
| `get_abstract` | 获取摘要与元数据（COMPLETE 视图含参考文献列表） | Scopus |
| `get_journal_metrics` | 期刊指标：CiteScore、SJR、SNIP、分区 | Scopus |
| `crossref_citations` | 批量 DOI 引用查询 | Crossref |
| `search_author` | 作者搜索（Scopus Author ID、h 指数、所属机构） | Scopus |
| `download_fulltext` | 全文 XML 下载并转 Markdown（公式、表格、参考文献） | ScienceDirect |
| `export_ris` | 导出 RIS 参考文献（建议提供 `cn_title`/`cn_abstract` 双语元数据） | Scopus + Crossref |

`get_journal_metrics` 按 CiteScore 百分位推算分区（≥75: Q1）。学科优化面向传统工程领域（ENGI、CENG、MATE、MECH、CIVI、EENG、ENER）。Crossref 免费无需密钥。

> Scopus API 需机构订阅。在 [Elsevier Developer Portal](https://dev.elsevier.com/apikey/manage) 创建 API Key。

### chaoxing-api — 超星期刊检索

IP 认证（机构 SSO），无需 API Key。自动管理 cookie（`~/.cache/chaoxing-api/cookies`），过期后自动重登录。

| Tool | 功能 |
|------|------|
| `search_qikan` | 布尔期刊文献搜索，支持字段限定、逻辑运算、年份范围 |
| `download_fulltext` | 全文下载：`pdf`（扫描版）、`html`（结构化 Markdown）、`both` |
| `export_ris` | 导出 RIS 参考文献（元数据均为中文，直接透传） |

`search_qikan` 字段码：`T`（标题）、`A`（作者）、`K`（关键词）、`S`（文摘）、`O`（作者单位）、`Su`（主题）、`Z`（全部字段）、`Y`（年）、`Clc`（中图分类号）。简单关键词搜索用 `Z=` 或 `Su=`。场内运算符 `*`（AND）、`|`（OR）、`-`（NOT）；场间 `AND`、`OR`、`NOT`（大写，两侧空格）。`"..."` 精确、`'...'` 模糊。示例：

```
Z=碳捕集
Su=钙循环*碳捕集
(A=杨振宁|周培源 AND O=清华大学) OR A=钱学森 AND 2000<Y<2016 NOT K=断层
```

所有符号必须 ASCII 半角。结果为零时检查：ASCII 半角、AND/OR/NOT 大写带空格、括号配对、含空格词组加引号。

> 超星发现须机构 IP 订阅。无结果时先确认网络在机构 IP 范围内。

### 预热 uv 缓存

首次使用前预热（安装 Python 依赖）：

```bash
claude -p --permission-mode bypassPermissions 'Warm uv cache for literature-retrieval@c3u-ccplugins: run uv run ${CLAUDE_PLUGIN_ROOT}/servers/chaoxing/mcp_server.py --test && uv run ${CLAUDE_PLUGIN_ROOT}/servers/scopus/mcp_server.py --test'
```

## file-converter — 文档转 Markdown

基于 MinerU API v4 的 MCP 工具集，将文档转换为 Markdown。支持 PDF、DOCX、PPTX、XLSX、图片、HTML 等格式。异步两步流程：上传返回 `batch_id`，轮询下载结果。

需在 [MinerU 开放平台](https://mineru.net/apiManage/token) 创建 API Key，并在系统环境变量中配置 `MINERU_API_KEY`：

Windows（PowerShell）：
```powershell
[Environment]::SetEnvironmentVariable("MINERU_API_KEY", "你的API_KEY", "User")
```

macOS / Linux：
```bash
echo 'export MINERU_API_KEY="你的API_KEY"' >> ~/.zshrc
```

| Tool | 功能 |
|------|------|
| `convert_to_markdown` | 上传文件，返回 `batch_id` |
| `get_conversion_result` | 按 `batch_id` 查询并下载结果 |

PDF 超过 200 页自动拆分，每块 ≤200 页。文件上限 200 MB。模型：`vlm`（默认）、`pipeline`、`MinerU-HTML`（HTML 自动选用）。

首次使用前预热 uv 缓存：
```bash
claude -p --permission-mode bypassPermissions 'Warm uv cache for file-converter@c3u-ccplugins: run uv run ${CLAUDE_PLUGIN_ROOT}/servers/mcp_server.py --test'
```

## logbook — 会话管理

五个 session-management skill，均为纯 skill 插件，无运行时依赖。

| Skill | 功能 | 输出 |
|-------|------|------|
| `logbook:handoff` | 会话上下文结构化交接，三种模式（quick/standard/thorough） | `HANDOFF.md` |
| `logbook:resume-handoff` | 从 HANDOFF.md 恢复会话，确认理解后生成 TODO 逐项执行 | 已执行任务 |
| `logbook:decision-record` | 结构化决策记录（背景、选项对比、理由、复评条件） | `DECISIONS.md`（或 `--adr` 模式每决策一文件） |
| `logbook:capture-insights` | 项目洞察与发现记录，按主题归类 | `INSIGHTS.md` |
| `logbook:refocus` | 会话中注意力回顾，四问逐步引导 | 无（可指定路径输出笔记） |

用法：

```text
/handoff                     # 标准交接（默认）
/handoff quick               # 快速交接（仅核心信息）
/决策记录 采用 X 方案而非 Y 方案  # 追加决策记录
/capture-insights            # 记录项目洞察
/refocus                     # 会话中回顾
```

## critique — 输出审查

两个 skill：`grill-me`（方案推敲）与 `ai-writing-check`（AI 写作审查）。均只报告问题，不自动修改。

### grill-me — 方案推敲

就方案或设计持续追问用户，逐个遍历决策树分支，直至达成共识。适用于需求梳理、架构推演、风险评估。

用法：

```text
grill me
```

### ai-writing-check — AI 写作审查

检查 LLM 生成文本的 19 项常见缺陷，分四组：

| 组别 | 项数 | 关注点 |
|------|:----:|--------|
| 修辞与证据边界 | 10 | 绝对化、过度拔高、修辞膨胀、主观排序、替人决策、虚假归因、强行升华、表演共情、预设站队、伪造精确 |
| 引用与格式 | 4 | 引述准确性、引述语境、引述密度、格式规范 |
| 结构与术语 | 3 | 结构自洽、术语一致性、数据呈现 |
| 语言自然度 | 2 | 翻译腔（8 种常见中英对译模式）、括号与破折号密度 |

按类别报告违规项，附行号引用和修正建议。

用法：

```text
check AI writing
```

## literature-processing — 文献加工

两个 skill：`intensive-reading`（七阶段论文精读标注）与 `bilingual-translation`（段落级中英双语翻译）。

### intensive-reading — 论文精读

七阶段论文精读标注流程，在原文基础上叠加分层中文标注，读者可从表层理解逐步深入，无需在多个信息源间切换。

| 阶段 | Agent | 功能 |
|------|-------|------|
| 0 | `phase0-initializer` | 初始化工作目录，处理源文件（PDF 通过 mineru-2md MCP 提取），复制规则 |
| 1 | `phase1-cleaner` | OCR 伪影清理、标题规范化、章节拆分 |
| 2 | `phase2-surveyor` | 领域调研、前置知识引导、术语表、附录 |
| 3 | `phase3-annotator` (×N) | 逐段并行翻译与标注 |
| 4 | Main | 合并全部标注段落 |
| 5 | `phase5-auditor` | 跨章节一致性审计与修正 |
| 6 | `phase6-html` | 转为独立 HTML 文件（通过 pandoc） |

标注保留原文全部内容，使用五种标记：前置理论（`▶`）、段落分析（`▷`）、关键概念（`◆`）、注意事项（`※`）、延伸阅读（`→`）。

用法：

```text
精读 path/to/paper.md
```

支持 `.md` 文件、PDF（通过 mineru-2md MCP 提取）和 URL（通过 WebFetch）。输出为 `intensive-<basename>.md` 和 `intensive-<basename>.html`，与源文件同目录。支持中断恢复。

### bilingual-translation — 双语翻译

段落级中英双语交替输出。四步流程：按标题分段 → 并行翻译（N 个 haiku agent）→ 交替合并 → 导出。仅支持 `.md` 文件，不叠加标注标记。

用法：

```text
双语翻译 path/to/paper.md
```

## 更多

[GitHub](https://github.com/c3u-group/c3u-ccplugins)
