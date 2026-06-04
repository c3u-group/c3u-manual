# 插件开发

Plugin 是 skill、slash command、agent、hook 和 script 的打包分发单元。与单个 skill 不同，plugin 可以把多条 skill 和多个 agent 组织成一个完整 pipeline，用 hook 自动触发、用 script 做预处理——这些组件协同才能解决复杂问题。

## 何时做成 Plugin

单个 skill 文件适合固化一种重复操作（如 TG 数据处理）。以下情况考虑打包成 plugin：

- 一个任务需要多个 skill 分工协作
- 需要专用 Subagent 承担独立子任务
- 需要在特定事件自动触发（hook）
- 需要分发给课题组其他人，一键安装

## 目录结构

```text
my-plugin/
├── .claude-plugin/
│   ├── plugin.json        # 插件元数据
│   └── marketplace.json   # 市场列表信息
├── skills/                # skill 定义
│   └── my-skill/
│       └── SKILL.md
├── commands/              # slash 命令入口
│   └── my-command.md
├── agents/                # 专用 Subagent
│   └── my-agent.md
├── hooks/                 # 自动化 hook
│   └── hooks.json
└── scripts/               # 机械性操作（格式校验、转换、计算等）
    └── setup.py
```

## plugin.json

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Custom data processing plugin",
  "author": "Your Name",
  "license": "MIT"
}
```

skills、commands、agents 由目录自动发现，无需在 plugin.json 中声明。

## 组件协同

Plugin 的各组件通过文件系统或约定的数据格式（如 YAML 状态文件）传递状态。一个典型的处理 pipeline：

1. **slash command** 作为入口（如 `/process-tg`），接收用户参数
2. **skill** 定义处理流程和规范，指导 agent 行为
3. **agent** 执行具体任务——读数据、写脚本、画图，完成后返回摘要
4. **hook** 在关键节点自动触发（如 agent 产出图表后自动运行校验脚本）
5. **script** 做所有机械性操作——凡是能写成确定性逻辑的（校验、转换、计算、格式检查），用 script 而非 LLM，省 token 且结果可靠

各组件的职责边界：skill 管"怎么做"，agent 管"做"，hook 管"什么时候触发"，script 管"确定性的校验和转换"。不把验证逻辑写进 skill prompt——prompt 不保证执行，script 保证。

## Subagent 编排与模型选择

Plugin 包含多个 agent 时，需要处理两个问题：给每个 agent 分配合适的模型，以及防止主 Agent 协调不过来的注意力稀释。

### 模型选择

| 模型 | 适用场景 |
|------|---------|
| deepseek-v4-flash | 简单探索、文件搜索、格式检查 |
| deepseek-v4-pro | 编码实现、数据分析、复杂推理 |

策略：轻量 agent（文件扫描、格式校验）用 flash，核心 agent（数据处理、代码生成）用 pro。在 agent 定义文件的 frontmatter 中指定 `model:`。

### 注意力稀释

当 Subagent 数量增多，主 Agent 需要在多个子任务间协调，指令遵循性可能下降。几条设计原则：

- **一次只派一个复杂任务**：不要让主 Agent 同时追踪 3 个以上需要深度推理的 Subagent
- **明确验收标准**：每个 Subagent 的任务要有可验证的交付物（文件、测试结果），不是"检查一下"
- **分批汇总**：Subagent 全部完成后，再让主 Agent 统一汇总，而非边执行边整合
- **agent prompt 写清楚输入输出**：减少主 Agent 揣测 Subagent 行为的认知负担

### 自定义 Agent

在 `agents/` 目录下创建 `.md` 文件：

```markdown
---
name: data-processor
description: Process experimental data files
model: deepseek-v4-pro
tools: Read, Write, Bash, Grep
---

You are a data processing specialist. When given a directory of CSV files:
1. Read headers and identify columns
2. Normalize data as requested
3. Generate plots using matplotlib
4. Return summary of results
```

在 slash command 或 skill 中通过 `@data-processor` 调用。

## 本地安装与测试

```bash
claude plugin add --path ./my-plugin
```

修改后重新加载：`/reload-plugins`。组件之间通过文件系统传递结果，便于单独调试。

## 发布

推送到 GitHub 仓库，在 Releases 页面创建版本。其他人通过以下方式安装：

```bash
claude plugin marketplace add github.com/user/repo
claude plugin install repo
```

## 注意

- 插件涉及多组件时，主 Agent 注意力稀释是核心风险，见上文 [Subagent 编排与模型选择](#subagent-编排与模型选择)
- 把验证逻辑放在 script 而非 prompt——script 确定性执行，prompt 不保证
- agent prompt 中写清楚输入输出格式和验收标准，减少主 Agent 的协调负担
