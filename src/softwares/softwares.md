# 软件工具

团队常用的软件工具教程与配置指南。

- [Agent 工具](./Agent/claude-code/intro.md) — 命令行 AI 编程助手，能主动读写文件、执行命令、操作 Git，适合科研数据处理、代码开发和文档编写
  - [安装与配置](./Agent/claude-code/01-install.md) — DeepSeek API 接入，Claude Code 安装与验证，VSCode 集成
  - [基础使用](./Agent/claude-code/02-basic-usage.md) — 启动、`/plan` 初体验、Prompt 写作技巧
  - [常用命令](./Agent/claude-code/03-commands.md) — 斜杠命令速查、键盘快捷键
  - [项目配置](./Agent/claude-code/04-claude-md.md) — `CLAUDE.md` 三类配置文件的使用与编写
  - [Git 协同](./Agent/claude-code/05-git.md) — 自然语言 Git 操作，版本控制核心概念
  - [工具与扩展](./Agent/claude-code/06-tools.md) — 内置工具、Skills、MCP、Hooks、Subagents
  - [参考与附录](./Agent/claude-code/07-appendix.md) — 注意事项、命令速查表、Prompt 质量指南、Agent 发展历程、FAQ、Mac/Linux 提示
  - [使用示例](./Agent/claude-code/08-examples.md) — 从原始数据到可投稿图表的完整闭环示例

- [Claude for Office](./Agent/claude-for-office/intro.md) — Microsoft Office 插件，通过 LiteLLM 桥接 DeepSeek 模型，在 Word/Excel/PPT 中直接调用 AI
  - [安装插件](./Agent/claude-for-office/01-plugin-install.md) — 从 Microsoft AppSource 安装并选择 Enterprise gateway 模式
  - [部署 LiteLLM](./Agent/claude-for-office/02-litellm-deploy.md) — pip 或 Docker 部署 LiteLLM 代理，配置 HTTPS 与 CORS
  - [配置 LiteLLM](./Agent/claude-for-office/03-litellm-config.md) — Bearer→x-api-key 认证转换，Claude→DeepSeek 模型名称映射
  - [配置插件](./Agent/claude-for-office/04-office-config.md) — 在 Office 插件中填入代理地址，常见问题排查
