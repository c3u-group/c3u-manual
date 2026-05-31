# 插件开发

插件是 skill、命令、hooks 和 MCP 配置的打包分发单元。与单个 skill 不同，插件可以包含多个 subagent 和多个 script 的组合体。

## 创建插件

插件目录基本结构：

```text
my-plugin/
├── plugin.json          # 插件元数据
├── skills/
│   └── my-skill.md      # 插件携带的 skill
├── agents/
│   └── my-agent.md      # 专用 subagent
├── hooks/
│   └── hooks.json       # 自动化 hooks
└── scripts/
    └── setup.py         # 辅助脚本
```

`plugin.json` 示例：

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Custom data processing plugin",
  "skills": ["skills/my-skill.md"],
  "agents": ["agents/my-agent.md"]
}
```

## 本地安装与测试

```bash
claude plugin add --path ./my-plugin
```

## 发布

将插件推送到 GitHub 仓库，其他人通过 `/plugin install github.com/user/repo` 安装。

## 注意

插件涉及多组件协作时，注意主 Agent 的注意力稀释问题（参见 [Subagent 编排](./subagents.md)）。
