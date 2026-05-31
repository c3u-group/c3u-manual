# 工具与扩展

Claude Code 除了内置的文件读写、命令执行、网络搜索，还支持 Skills、MCP、Hooks 三种扩展机制。本章讲如何安装和使用它们——不需要自己开发，直接让 Claude 帮忙装也行，直接说"帮我安装 xxx"即可。

## Skills

Skills 是按需加载的专业能力模块，本质是预定义的指令模板。安装后，AI 在匹配任务时自动调用。

### 安装社区 Skill

直接让 Claude 帮你装，或在 Claude Code 中输入安装命令：

```text
/plugin install superpowers
```

```text
/plugin marketplace add forrestchang/andrej-karpathy-skills
/plugin install andrej-karpathy-skills@karpathy-skills
```

### 常用 Skill 推荐

| Skill | 用途 |
|-------|------|
| [Superpowers](https://claude.com/plugins/superpowers) | 软件工程纪律：头脑风暴、写计划、TDD、代码审查、调试等 14 个 skill |
| [andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) | 四条约束：先想再写、保持简洁、外科手术式修改、目标驱动 |
| [academic-research-skills](https://github.com/Imbad0202/academic-research-skills) | 学术研究辅助：文献综述、论文润色、图表优化、LaTeX 排版 |

## MCP

MCP（Model Context Protocol）让 Claude Code 连接到外部服务：数据库、API、文档平台等。安装后在对话中自动可用。

### 推荐 MCP

**[Tavily MCP](https://tavily.com/mcp)** — 联网搜索与网页抓取，支持研究级深度检索。安装方式参考 Tavily 文档，或直接跟 Claude 说"帮我安装 Tavily MCP"。

其他 MCP server 安装方式类似，一般在 `.claude/mcp.json` 中配置。

## Hooks

Hooks 在特定事件时自动触发脚本。在 `.claude/settings.json` 中配置。

**示例** — 需要用户关注时弹窗通知：

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

## 自定义简单 Skill

在 `.claude/skills/` 下创建 `.md` 文件即可。例如创建 `tg-processing.md`：

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

之后在任何项目中说"Process TGA data"，Claude 自动按此流程执行。不会写也可以直接让 Claude 帮忙写——描述流程，它生成 skill 文件。
