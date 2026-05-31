# 工具与扩展

本章依次介绍[内置工具](#内置工具)、[Skills](#skills)、[MCP](#mcp)、[Hooks](#hooks)、[Subagent](#subagent)和 [Plugin](#plugin)。

## 内置工具

### 代码智能

安装 LSP（语言服务器协议）插件后，AI 可获取变量类型、接口实现、跳转到定义和查找引用，显著提升代码分析效率。

Python 项目推荐安装 pyright：

```bash
pip install pyright
```

然后在安装 LSP plugin ：

```bash
claude plugin install pyright-lsp
```

### 网络搜索

AI 在需要外部信息时会自动发起搜索，也可以显式要求：

```text
搜索 CaO 的标准摩尔生成焓，注明出处
```

用 `WebFetch` 拉取网页内容：

```text
分析 https://example.com/article 这篇文献的方法部分
```

## Skills

Skills 是按需加载的专业能力模块，在 `.claude/skills/<skill名>/SKILL.md` 下编写。AI 在匹配任务时自动调用，也可手动 `/skillname`。不会写可以让 Claude 帮忙。

例如创建 `.claude/skills/tg-processing/SKILL.md`：

```markdown
---
name: tg-processing
description: Process TGA data, plot TG/DTG curves, extract characteristic temperatures
---

## Steps
1. Read CSV (columns: Time, Temp, Mass, DTG)
2. Normalize Mass to TG(%)
3. Plot TG and DTG overlay, different conditions in different colors
4. Extract Ti, Tmax, Tb using tangent method
5. Save to figures/, 300 dpi, Times New Roman
```

之后说"Process TGA data"，Claude 自动按此流程执行。多个 skill 可打包成 Plugin 分发，见本章末尾。

## MCP

MCP（Model Context Protocol）让 Claude Code 连接到外部服务：数据库、API、文档平台等。安装后在对话中自动可用。

### 推荐 MCP

**[Tavily MCP](https://www.tavily.com/)** — 联网搜索与网页抓取，支持研究级深度检索。安装方式参考 Tavily 文档，或直接跟 Claude 说"帮我安装 Tavily MCP"。

其他 MCP server 安装方式类似，一般在 `.claude/mcp.json` 中配置。

## Hooks

Hooks 在特定事件时自动触发脚本。在 `.claude/settings.json` 中配置。

**示例** — 需要用户关注时弹窗通知（Windows）：

```json
{
  "hooks": {
    "Notification": [{
      "matcher": "",
      "hooks": [{
        "type": "command",
        "command": "powershell.exe -Command \"[System.Windows.Forms.MessageBox]::Show('Claude Code needs your attention', 'Claude Code')\""
      }]
    }]
  }
}
```

## Subagent

复杂任务上下文太长，一个人（单个会话）记不住全部细节，容易出错。解决办法是拆成多个独立子任务，各自交给一个 Subagent 单独处理——每个 Subagent 有自己的上下文空间，只专注一件事，做完返回摘要给主 Agent。

直接说"并行处理这 4 组数据"，Claude 自动派发 Subagent。也可指定 agent：

```text
@data-processor 处理 data/raw/CaS-1.0/ 和 data/raw/CaS-2.0/
```

输入 `@` 按 `Tab` 可补全已定义的 agent 名。末尾加 `&` 可放入后台执行，用 `/tasks` 查看进度。用 `/agents` 管理 agent。

自定义与编排见 [插件开发](../04-advanced/plugins.md)。

## Plugin

Plugin 是 skill、命令、hook、agent 的打包分发单元，通过 `/plugin install` 安装。可以安装社区 plugin，也可以自己开发（见 [插件开发](../04-advanced/plugins.md)）。

### 推荐 Plugin

> GitHub 访问可能不稳定，如安装失败，先设置代理：
> macOS / Linux：`export HTTPS_PROXY=http://127.0.0.1:7890`
> Windows：`$env:HTTPS_PROXY=http://127.0.0.1:7890`

### Superpowers

14 个工程规范 skill，覆盖开发全流程。详细用法见 [附录](../05-appendix/plugins/superpowers-guide.md)。

安装插件：
```bash
claude plugin install superpowers
```

| Skill | 用途 |
|-------|------|
| brainstorming | 苏格拉底式问答，先厘清需求再动手 |
| writing-plans | 拆解为文件级任务清单，含验证步骤 |
| executing-plans | 按计划逐步执行，过程可审查 |
| test-driven-development | 先写失败测试，再写最小实现，最后重构 |
| systematic-debugging | 根因调查 → 模式分析 → 假设验证 → 修复 |
| verification-before-completion | 声明完成前强制运行验证命令 |
| requesting-code-review | 系统性代码审查：规格符合度 + 质量 |
| dispatching-parallel-agents | 检测独立任务，并行派发 Subagent |
| using-git-worktrees | 为任务创建隔离 Git Worktree，不污染主分支 |
| finishing-a-development-branch | 验证测试 → 合并/PR → 清理的完整收尾 |

### andrej-karpathy-skills

Karpathy 提出的四条编码纪律，遏制 AI 常见顽疾。详细说明见 [附录](../05-appendix/plugins/karpathy-guide.md)。

添加仓库：
```bash
claude plugin marketplace add forrestchang/andrej-karpathy-skills
```

安装插件：
```bash
claude plugin install andrej-karpathy-skills@karpathy-skills
```

| 原则 | 含义 |
|------|------|
| Think Before Coding | 写代码前陈述假设，不确定时主动提问 |
| Simplicity First | 只做要求的，不过早抽象，不加未请求的功能 |
| Surgical Changes | 只改目标代码，不趁机重构无关文件 |
| Goal-Driven Execution | 定义可验证目标（如"先写复现测试，再让它通过"） |

### academic-research-skills

学术研究全流程：文献调研、论文撰写、同行评审、pipeline 编排。详细用法见 [附录](../05-appendix/plugins/ars-guide.md)。

添加仓库：
```bash
claude plugin marketplace add Imbad0202/academic-research-skills
```

安装插件：
```bash
claude plugin install academic-research-skills
```

| Skill | 用途 |
|-------|------|
| deep-research | 13 Agent，7 模式：完整研究、系统综述、事实核查、Socratic 引导等 |
| academic-paper | 12 Agent，10 模式：大纲、全文、修订、引文检查、LaTeX 转换等 |
| academic-paper-reviewer | 7 Agent，6 模式：主编 + 3 审稿人 + 魔鬼代言人，0-100 品质量表 |
| academic-pipeline | 10 阶段全流程：调研→撰写→审查→修订→再审→定稿 |

以上覆盖的是安装和使用现成的 Plugin。若需要自己开发 Plugin，见[插件开发](../04-advanced/plugins.md)。
