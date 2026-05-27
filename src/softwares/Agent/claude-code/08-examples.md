# 使用示例

以下场景覆盖工科研究中常见任务，逐一展示 Claude Code 各项功能的使用方式。每个示例包含情景说明、示范 Prompt 和要点。

**使用建议**：这些 Prompt 是起点而非模板。根据实际数据文件、变量名和研究目标调整后使用。

## /plan — 先规划再执行

`/plan` 让 AI 先出方案、等确认后再动手，适用于步骤多、易走偏的复杂任务。

### 场景：TG 数据处理与分析管线

`data/raw/` 下有多组不同升温速率的 TG 实验数据，需要清洗、归一化、计算转化率、提取特征温度、画 TG/DTG 对比图——步骤多，方向错了浪费 token。

**示范 Prompt**：

```text
/plan 处理 data/raw/ 下的 TG 数据：读取所有 CSV，自动识别温度列和重量列，归一化为转化率 α（0-1），计算 DTG，提取各升温速率下的特征温度（T_onset, T_peak, T_end），画 TG/DTG 对比图。先给出完整方案，确认后再执行。
```

**AI 工作流**：

1. 列出 `data/raw/` 下的文件，读取前两个 CSV 的前 20 行，观察列名规律
2. 输出方案：数据清洗策略、列名匹配规则、归一化公式、特征温度提取方法、图表布局
3. 用户确认或修正后，按方案逐步执行
4. 每步完成后输出中间结果供检查

**要点**：`/plan` 的核心价值是"先对齐方向再投入执行"。复杂任务（多步管线、架构重构）优先用 `/plan`；简单明确的单步操作不必用。

## /goal — 条件驱动的自主循环

`/goal` 设定目标条件，AI 逐轮自评是否达成，达成自动停止。适合有明确验证标准的任务（如"重构到测试全绿"）。

### 场景：重构动力学计算脚本

旧脚本 `scripts/old/kinetics_calc.m` 是 MATLAB 写的 Fraser-Suzuki 分峰拟合，迁移到 Python 后发现拟合在某些升温速率下发散、测试用例不通过。

**示范 Prompt**：

```text
/goal 重构 scripts/kinetics_calc.py：修复分峰拟合在高升温速率下发散的问题，添加边界约束，确保 3 个测试用例全部通过，测试覆盖率 ≥80%。每轮修改后运行 pytest 验证，直到所有条件满足。
```

**AI 工作流**：

1. 读取脚本和测试文件，运行 `pytest` 获取当前失败列表
2. 诊断发散原因（初始猜测值不合理、缺少参数边界）
3. 添加 `bounds` 约束，改进初始值估计策略
4. 运行测试 → 仍有失败 → 调整 → 再运行
5. 全部通过后补充测试用例到 80% 覆盖率，自动停止

**要点**：`/goal` vs `/plan` 的选择——`/goal` 适合"修到正确为止"的闭环任务，有清晰的对错标准；`/plan` 适合"先商量做什么"的开放任务。

## Skill — 调用专业工作流

Skills 是按需加载的专业能力模块。社区 skill 通过插件安装，自定义 skill 在 `.claude/skills/` 下编写 `.md` 文件。详见 [工具与扩展](./06-tools.md#skills)。

### 场景：实验方案头脑风暴（superpowers:brainstorming）

设计实验前，先用 brainstorming skill 梳理思路：变量、边界条件、对照组设置、可能的坑。

**示范 Prompt**：

```text
我在设计一组生物质热解实验，研究升温速率和粒径对产物分布的影响。帮我梳理实验矩阵：哪些自变量和因变量，升温速率选哪几个水平，粒径如何分级，需要设哪些对照组，数据采集需要注意什么。
```

AI 会自动调用 brainstorming skill，以结构化方式引导讨论——先理解目标、再列出变量和约束、最后给出方案选项和权衡分析，而非直接抛出一个未经推敲的答案。

### 场景：论文语言润色（nature-skills:nature-polishing）

英文稿写完后，用 nature-polishing skill 按 Nature 系列期刊的行文风格润色。

**示范 Prompt**：

```text
Polish the following abstract to Nature-leaning academic English. Keep all scientific claims unchanged, improve clarity and conciseness:

[粘贴摘要文本]
```

### 场景：固化团队标准流程（自定义 Skill）

课题组有固定的 TG 数据处理标准——读 CSV、归一化、提取特征温度、用特定色图和字体出图。把这个流程写成一个 skill，之后说一句话就按标准执行。

在 `.claude/skills/tg-processing.md` 中编写：

```markdown
# TG Data Processing

Process thermogravimetric data from raw CSV to publication-ready figures.

## Steps
1. Read all CSVs from data/raw/, auto-detect temperature
   and weight columns by keyword match
2. Normalize to conversion α (0-1): α = (m0-m)/(m0-mf)
3. Compute DTG via np.gradient with smoothing
4. Extract characteristic temperatures:
   T_onset (α=0.05), T_peak (max DTG), T_end (α=0.95)
5. Plot: upper panel TG (α vs T), lower panel DTG
   Font: Times New Roman 11pt, colormap: viridis
   Export SVG + 300 dpi PNG to figures/

## Validation
- Check α range is strictly [0, 1]
- Verify T_onset < T_peak < T_end
- Report residual mass at end temperature
```

使用 Skill：

```text
Process TG data按照 tg-processing skill
```

**要点**：Skill 的核心价值是把"每次都要说一遍的规范"固化为"调一次就到位"。换人不换结果。

## MCP — 连接外部工具与数据

MCP（Model Context Protocol）让 AI 直接连接外部服务——数据库、文献库、实验室管理系统——查询数据而非描述数据。

### 场景：从文献数据库查询物性参数

计算燃烧动力学时需要标准生成焓、比热容等物性参数，传统做法是翻手册或逐个查文献。

**示范 Prompt**（需预先配置数据库 MCP 服务器）：

```text
查询 CaO、CaCO₃、Ca(OH)₂ 的标准生成焓（ΔfH°298）和定压热容 Cp(T) 系数（a, b, c, d），温度范围 298–1500 K。列出数据并注明来源。
```

AI 通过 MCP 直接查询物性数据库，返回结构化数据和文献出处，无需手动翻手册再手动输入。

**要点**：MCP 的价值在于消除"数据搬运"环节——AI 查到的数据直接进入后续计算脚本，不会在复制粘贴中引入笔误。

## Subagent — 并行处理多组数据

Subagent 派生子 Agent 并行处理独立任务，适合多组互不依赖的实验数据同时分析。

### 场景：多组样品同时处理

有 4 个样品（不同 Ca/S 摩尔比）的 TG 数据分别在 4 个子目录下，每个需要独立做归一化、DTG 计算和特征温度提取。

**示范 Prompt**：

```text
data/raw/ 下有 4 个子目录 CaS-0.5/ CaS-1.0/ CaS-1.5/ CaS-2.0/，每个目录里是同一升温速率的 TG 数据。每组数据独立处理：归一化、计算 DTG、提取特征温度（T_onset, T_peak, T_end）。4 组数据相互独立，并行处理，最后汇总比较表。
```

AI 会为每个子目录派生独立 Subagent，并行读取、计算、提取，最后汇总为一张对比表。4 组互不依赖的数据不必排队串行。

**要点**：Subagent 的前提是任务间无依赖。如果后一步依赖前一步的结果，应串行而非并行。

## WebSearch — 检索网络信息

AI 在需要外部信息时会自动发起网络搜索，也可以显式要求。

### 场景：文献验证与补充引用

算完活化能后，想知道文献中同类生物质热解的 Ea 范围和典型值，用于对比验证。

**示范 Prompt**：

```text
Search for reported activation energies (Ea) of biomass pyrolysis from Kissinger method in the last 5 years, for cellulose and lignin. List the Ea ranges and compare with our calculated values (cellulose ~180 kJ/mol, lignin ~140 kJ/mol). Include DOI links for key references.
```

AI 搜索后返回文献中的 Ea 范围和关键文献链接，同时给出与计算值的对比判断（在合理范围 / 偏高 / 偏低）。

### 场景：错误排查

代码报错时，直接粘贴错误信息让 AI 搜索：

```text
运行 scipy.optimize.curve_fit 时报错："RuntimeError: Optimal parameters not found: Number of calls to function has reached maxfev = 1000"。搜索这个错误的原因和解决方案。
```

## Git — 自然语言版本控制

Claude Code 支持自然语言操作 Git——提交、分支、审查，不需要记命令行参数。

### 场景：小步提交与回滚

**示范 Prompt**：

```text
帮我提交更改。数据清洗脚本和绘图脚本分开两次提交。
提交信息用 Conventional Commits 格式。
```

```text
查看刚才的提交改了哪些文件。
```

```text
TG 数据处理的结果不对，回滚到上一次提交时的状态。
```

```text
创建一个分支 feature/kinetics-fitting，把动力学计算相关的改动放到这个分支上。
```

**要点**：频繁小步提交是使用 Agent 的核心安全习惯——AI 生成代码速度快，`git diff` 审查每次变更、确认无误再提交、出问题果断回滚。

## 构建 LLM-Wiki 文献知识库

用 Claude Code 搭建 LLM 驱动的文献 wiki，自动解析、归类、索引 PDF，语义检索加联网扩充，以 mdBook 等轻量级文档库渲染为可读网站。以下步骤从零开始，每步给出示范 Prompt 和预期产出。

**情景**：课题组积累了上百篇文献 PDF 散落在不同文件夹，每次查相关工作时翻目录、手动摘要、靠记忆找——效率随文献量增长而迅速下降。

**社区参考**：
- [LLM-Wiki](https://github.com/Oshayr/LLM-Wiki)：Claude Code 插件，自动构建交叉引用知识库，支持语义搜索、知识图谱、过期检测
- [nashsu/llm_wiki](https://github.com/nashsu/llm_wiki)：跨平台桌面应用，两阶段思维链提取 + LanceDB 向量检索 + Louvain 社区发现自动分组；基准测试召回率 58.2% → 71.4%（启用向量搜索）
- [sage-wiki](https://github.com/xoai/sage-wiki)：Go 实现，可扩展至 10 万篇文档，BM25 + 向量混合检索 + RRF 融合排序
- [mdbook-bib](https://lib.rs/crates/mdbook-bib)：mdBook 书目预处理器，支持 BibLaTeX 和 Zotero 集成，`{{#cite key}}` 语法在 Markdown 中引用文献

以上项目的共性架构：**原始文档层（不可变）→ LLM 编译层（Wiki 页面）→ 展示层（静态网站）**，层层可独立更新。

### 第 1 步：设计架构，规划技术栈

```text
/plan 搭建 LLM-Wiki 文献知识库。需求：(1) 自动提取 PDF 元数据和全文，(2) 按课题/方法/结论自动归类生成 Markdown 页面，(3) 自然语言语义检索文献内容，(4) 支持 WebSearch 联网补充，(5) 最终以 mdBook 渲染为可读网站，方便全组翻阅。

技术选型考虑：PDF 解析用 PyMuPDF，向量数据库用 ChromaDB 或 LanceDB，embedding 用 text-embedding-3-small 或 BAAI/bge 系列，检索策略用 BM25 + 向量混合检索 + 重排序，前端用 mdBook + GitHub Pages 部署。给出完整架构方案，确认后再写代码。
```

### 第 2 步：搭建文献导入与解析管线

```text
实现文献导入模块：扫描指定目录下所有 PDF，用 PyMuPDF 提取文本和元数据（标题、作者、年份、DOI），SHA256 去重，写入 data/literature_index.json。处理不了的 PDF（扫描版、加密）记录到 error_log.txt。元数据缺失的，调用 LLM 从首段文本推断补全。每篇文章分配唯一 ID，后续所有引用以此 ID 为锚。
```

### 第 3 步：向量化与混合检索

```text
实现索引与检索模块：
- 对每篇文献的摘要和正文分段做 embedding，存入 ChromaDB。分段策略：摘要单独一段，正文按标题层级切段，每段 256 token 左右、重叠 25 token
- 检索采用混合策略：BM25（精确术语匹配）+ 向量余弦相似度，RRF (Reciprocal Rank Fusion) 融合排序，取 top-5 结果
- 每条记录保留文献 ID、章节标题和页码，支持定位到原文段落
- 返回格式：LLM 生成答案 + 引用段落原文 + 出处标注（文献标题/章节/页码）
```

**关于检索性能**：nashsu/llm_wiki 的基准测试表明，纯关键词检索召回率为 58.2%，加入向量语义搜索后提升至 71.4%。对于中文科研文献，建议用 BAAI/bge-large-zh-v1.5 作为 embedding 模型，对 CJK 文本的分词和语义捕获能力优于 OpenAI embedding。

### 第 4 步：接入 WebSearch 联网扩充

```text
搜索功能加 --web flag：用户查询时，本地 ChromaDB 检索结果 + 同时 WebSearch 搜索近 3 年相关论文，联网结果纳入上下文生成综合回答。联网来源标注 URL 和检索时间，以 [web] 标签区分本地文献 [local]，防止用户误判出处。
```

### 第 5 步：LLM 编译 Wiki 页面

**两阶段编译**（参考 nashsu/llm_wiki 的两步 CoT 策略，两步分离优于单次生成）：

```text
第一阶段 — LLM 分析：遍历文献库，逐篇提取研究主题、关键方法、主要结论、与本组工作的关联，输出结构化 JSON。

第二阶段 — 页面生成：根据分析结果，按主题层级自动归并相关文献，生成 Markdown wiki 页面。页面结构：
- 综述页（如 "煤焦气化"）：列出子主题、关键共识、争议点
- 专题页（如 "煤焦气化/CO₂气化/碱金属催化"）：列出相关文献列表、每篇摘要与核心结论、超链接到 PDF
- 文献详情页：完整元数据、摘要、关键图表引用、BibTeX 导出
```

### 第 6 步：mdBook 配置与发布

以 mdBook 作为 wiki 渲染引擎——纯 Markdown 文件，Git 版本控制，单命令构建为带全文搜索的静态网站，适合课题组内部查阅和对外展示。

**目录结构**：

```text
wiki/
├── book.toml              # mdBook 配置
├── src/
│   ├── SUMMARY.md         # 自动生成的导航树
│   ├── topics/            # LLM 生成的主题综述页
│   ├── papers/            # LLM 生成的文献详情页
│   ├── search.md          # 检索入口（嵌入 Streamlit 或直接跳转 CLI）
│   └── assets/            # 图表、BibTeX 等附件
├── theme/                 # 自定义样式
└── pdfs/                  # 原始 PDF 软链接
```

**`book.toml` 推荐配置**：

```toml
[book]
title = "C3U Literature Wiki"
authors = ["C3U Group"]
language = "zh-CN"

[build]
build-dir = "book"

[output.html]
default-theme = "navy"
git-repository-url = "https://github.com/c3u/literature-wiki"
edit-url-template = "https://github.com/c3u/literature-wiki/edit/main/{path}"
site-url = "/literature-wiki/"

[output.html.search]
limit-results = 20
use-boolean-and = true
boost-title = 2
heading-split-level = 2

[preprocessor.bib]
bibliography = "refs.bib"
render-bib = "cited"
```

启用 `mdbook-bib` 预处理器后，在 Markdown 中用 `{{#cite key}}` 引用文献，mdBook 构建时自动渲染为格式化参考文献列表。Zotero 用户可直接配置 `zotero-uid` 从公开库自动拉取 `.bib` 文件。

**部署到 GitHub Pages**：

```text
创建 GitHub Actions workflow：每次 push 到 main 分支，自动执行 pip install -r requirements.txt && python build_wiki.py（LLM 重新编译页面）&& mdbook build，将 book/ 目录推送到 gh-pages 分支，5 分钟内自动发布。
```

### 第 7 步：测试与迭代

```text
导入 10 篇课题组已读过的文献作为测试集，分别测试：(1) PDF 元数据提取准确率（目标 >90%），(2) 检索召回率——问 5 个已知答案的问题，看能否找到对应文献及段落，(3) 联网搜索是否返回合理补充结果，(4) 生成的 wiki 页面主题归类是否合理、超链接是否有效。输出测试报告和修改清单，逐项修复后重新验证。
```

**要点**：

- **检索可信度是科研场景的底线**——语义检索结果必须附原文段落以供核对，禁止 AI 对文献内容做无出处的概括
- LLM-Wiki 的价值在于"随文献增长持续受益"——建好导入和检索管道后，每篇新文献入库即可被检索
- 混合检索（BM25 + 向量）在实际场景中显著优于纯向量检索：纯向量易漏精确术语，纯关键词易漏语义接近但用词不同的内容
- 联网搜索结果与本地文献结果须有明确视觉区分（如 `[web]` / `[local]` 标签），避免混淆来源
- 整个项目可保存为课题组 Skill，新成员一键初始化自己的文献库后即用
- 已存在多个成熟开源方案（LLM-Wiki、nashsu/llm_wiki、sage-wiki），不必从零造轮子——可用 Claude Code 直接克隆对应仓库，按本组需求适配配置和主题

## 综合示例：从原始数据到可投稿图表

以下流程演示如何将多个功能串联，完成一个完整的科研数据处理闭环。

**情景**：收到一批新的生物质 TG-FTIR 联用数据，需要从原始 CSV 出到可用于论文的图表和分析。

**第 1 步：探索数据，制定方案**

```text
/plan 分析 data/raw/tg-ftir/ 下的数据：TG 数据（温度、质量）和 FTIR 数据（波数、吸光度）。先看数据结构，给出完整的分析方案——TG 提取什么特征参数，FTIR 鉴定哪些官能团释放，画什么图。
```

**第 2 步：TG 数据处理**

```text
按确认的方案处理 TG 数据：归一化、DTG、提取 T_onset/T_peak/T_end/残炭率。每组升温速率的结果写入 data/processed/tg_summary.csv。
```

**第 3 步：FTIR 三维图 + 特征温度切片**

```text
画 FTIR 3D 瀑布图（波数 × 温度 × 吸光度），再用 T_onset、T_peak、T_end 三个特征温度做切片，画 3 条单波数-吸光度曲线叠在同一个坐标轴上。
```

**第 4 步：动力学计算**

```text
用 tg_summary.csv 中的峰值温度计算 Kissinger 和 FWO 活化能，画拟合图，标注 R²。
```

**第 5 步：生成 LaTeX 表格**

```text
汇总各升温速率下的特征温度和动力学参数，生成 LaTeX 三线表，写入 tables/kinetics_summary.tex。
```

**第 6 步：润色图注和结果描述**

```text
Polish the following figure caption and results paragraph to Nature-leaning English:

[粘贴图注和结果段落]
```

**第 7 步：提交**

```text
帮我提交所有更改，每个步骤分开提交。
```

---

以上示例的共同逻辑：给 AI 明确的目标、输入数据和验收标准，让它通过"探索 → 执行 → 验证"的闭环交付结果。每步完成后的审查和验证不是多余动作，而是安全有效使用 Agent 的前提——这和做研究没有本质区别。
