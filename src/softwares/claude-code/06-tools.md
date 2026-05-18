# 工具与扩展

Claude Code 可以调用多种工具，这是 Agent 能区别于 ChatBot 的根本原因。本章涵盖的核心能力包括：内置工具（文件读写、命令执行、网络搜索）、Skills 技能封装、MCP 标准化连接，以及 Hooks 和 Subagents 等编排机制。

## 内置工具

| 类别 | 功能 |
|-----|-----------------|
| 文件操作 | 读取文件、编辑代码、创建新文件、重命名和重新组织 |
| 搜索 | 按模式查找文件、使用正则表达式搜索内容、探索代码库 |
| 执行 | 运行 `shell` 命令、启动服务器、运行测试、使用 Git |
| 网络 | 搜索网络、获取文档、查找错误消息 |
| 代码智能 | 编辑后查看类型错误和警告、跳转到定义、查找引用（需要[代码智能插件](https://code.claude.com/docs/zh-CN/discover-plugins#code-intelligence)） |

### 网络内容

Claude Code 支持 `WebSearch` 网络搜索，以及 `WebFetch` 网页拉取。在提示词中包含相应表述，AI 会自动调用。

```text
Search for the standard molar enthalpy of formation of CaO.
Please analyze the content at https://example.com/article
```

### 代码智能

通常，Claude 基于 `grep` 模式匹配检索文件内字段。语言服务器协议（Language Server Protocol, LSP）通过构建抽象语法树（Abstract Syntax Tree, AST）建立代码元素间的内在关联，使 AI 能够直接获取变量类型、接口实现、调用层次、跳转到定义和查找引用，可显著提升代码分析效率。

对于 Python 项目，推荐安装 Python LSP 插件。

先安装 LSP Server ：
```powershell
pip install pyright
```

在 Claude 中安装插件：
```text
/plugin install pyright-lsp
```

## 扩展功能

除了内置工具外，Claude Code 还支持多种扩展机制。

### Skills

Skills 是按需加载的专业化能力模块，本质上就是存提示词的文档。它的加载采用渐进式披露（详见[附录 D：Agent 发展历程](./07-appendix.md#附录-dagent-发展历程)）：第一层只给出 skill 索引，让 AI 知道有哪些可用技能；第二层在任务匹配时加载完整说明；第三层在执行时加载引用的脚本或模板。上下文不会被一次性塞满，而是按需分层的知识系统。

- 社区 skills 可通过插件安装
- 自定义 skill：在 `.claude/skills/` 目录下创建 `<skill>.md` 文件，编写专门指令
- 适用于：固化重复性工作流、制定团队专属规范

**示例** — 创建 `.claude/skills/tga-processing.md`：

```markdown
---
name: tga-processing
description: Process TGA data, plot TG/DTG curves, extract characteristic temperatures
---

## Workflow
1. Read CSV file (column names: Time, Temp, Mass, DTG)
2. Group by oxygen concentration, normalize Mass to TG(%)
3. Overlay plot of TG and DTG, different oxygen concentrations in different colors
4. Extract Ti, Tmax, Tb using the tangent method
5. Save to figures/, 300 dpi, Times New Roman
```

之后在任何项目中说"Process TGA data"，或调用 `/tga-processing` ，Claude Code 自动按此流程执行。

#### 一些推荐的 skill

**[Superpowers](https://claude.com/plugins/superpowers)** — 给 AI 编程加上软件工程纪律（14 个 skill）：

- `brainstorming` — 结构化头脑风暴，先厘清需求再动手
- `writing-plans` — 拆解为 2-5 分钟粒度的任务清单
- `executing-plans` — 按计划逐步执行，过程可审查
- `systematic-debugging` — 系统性定位 Bug，先诊断再修复
- `test-driven-development` — 先写测试，再写实现
- `verification-before-completion` — 完成前自动验证修改结果
- `subagent-driven-development` — 派发子 Agent 并行执行独立任务
- `dispatching-parallel-agents` — 调度并行子代理，加速多任务处理
- `requesting-code-review` — 完成大功能后主动发起代码审查
- `receiving-code-review` — 处理审查反馈，逐条核实修正
- `using-git-worktrees` — Git worktree 隔离沙箱，不污染主分支
- `finishing-a-development-branch` — 分支收尾、合并或发 PR
- `writing-skills` — 编写自定义 Skill 定义
- `using-superpowers` — 会话启动时自动注入

```text
/plugin install superpowers
```

**[andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills)** — 一个 skill，四条约束，遏制 AI 编程的常见顽疾：

- **Think Before Coding**：写代码前先陈述假设、发现歧义时主动提问，而非直接猜测实现
- **Simplicity First**：不做未要求的功能、不过早抽象、不加入"以备将来"的灵活性
- **Surgical Changes**：只改任务要求的代码，不趁机重构无关文件，不删除"看不懂的死代码"
- **Goal-Driven Execution**：把模糊指令转化为可验证的目标（如"先写复现测试，再让它通过"）

```text
/plugin marketplace add forrestchang/andrej-karpathy-skills
/plugin install andrej-karpathy-skills@karpathy-skills
```

**[nature-skills](https://github.com/Yuan1z0825/nature-skills)** — 符合 Nature 期刊标准的学术写作与绘图工具集（9 个 skill）：

- `nature-figure` — 出版级科研绘图，多面板图表，Nature 配色与字体规范
- `nature-polishing` — 学术英语润色与中译英，Nature 风格句式与语态控制
- `nature-writing` — 草拟或重构论文章节（摘要、引言、结果、讨论），从作者提供的研究声明出发构建论证
- `nature-citation` — 自动匹配 Nature/Science/Cell 系列期刊的参考文献
- `nature-response` — 逐点回复审稿意见，语气校准，处理大修与小修
- `nature-reader` — 论文全文双语对照解读，保留图表位置与原文锚点
- `nature-paper2ppt` — 从论文自动生成组会 PPT，按论证逻辑组织幻灯片
- `nature-data` — 生成符合 Nature FAIR 标准的数据可用性声明
- `nature-academic-search` — 跨源文献检索、引文验证与参考文件管理

```text
/plugin marketplace add https://github.com/Yuan1z0825/nature-skills
/plugin install nature-skills
```

### MCP

MCP（Model Context Protocol）让 Claude Code 连接到外部服务，如数据库、API、文档平台等。通过 MCP，AI 可以直接查询数据、调用远程接口；也可以自行构建 MCP ，调用本地程序。

安装一个基于 LLM 的文档翻译 MCP ：
```powershell

```

安装一个接入 MinerU 以将其他文件格式转换为 Markdown 的格式转换 MCP ：
```powershell

```

### Hooks

Hooks 是在特定事件（如提交前、保存文件后）自动触发的脚本。在 `.claude/settings.json` 中配置。

在请求输入时，通知用户：
```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "powershell.exe -Command \"[System.Reflection.Assembly]::LoadWithPartialName('System.Windows.Forms'); [System.Windows.Forms.MessageBox]::Show('Claude Code needs your attention', 'Claude Code')\""
          }
        ]
      }
    ]
  }
}
```

在提交更改前，更新 `CLAUDE.md` ：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "agent",
            "prompt": "Run `git diff --cached` and `git diff` to see what's about to be committed. Check: (1) is there a CLAUDE.md in the repo root? (2) do any changed files live in a subdirectory that has its own CLAUDE.md? For any CLAUDE.md found, if the diff introduces new directories, new commands, new dependencies, or architectural changes under its scope, update it. Keep changes minimal. Skip if the diff is just bug fixes or minor edits.",
            "if": "Bash(git commit*)",
            "timeout": 120,
            "statusMessage": "Updating CLAUDE.md before git commit..."
          }
        ]
      }
    ]
  }
}
```

### Subagents

将独立任务委派给 subagents 并行执行。Subagents 拥有独立上下文，不会膨胀主对话。完成后返回摘要。

- 适用于：多组数据同时处理、文献整理 + 代码开发并行推进
- 触发方式：直接说"并行做 A 和 B"，或使用 `/agents` 命令
