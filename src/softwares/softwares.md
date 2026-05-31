# 软件工具

团队常用的软件工具教程与配置指南。

- [Agent 工具](./Agent/index.md) — AI 编程助手与智能办公工具
  - [Claude Code](./Agent/claude-code/intro.md) — 命令行 AI 编程助手，读写文件、执行命令、操作 Git
    - [介绍与安装](./Agent/claude-code/01-intro-install/index.md) — 功能概览、环境搭建与 API 配置
    - [快速上手](./Agent/claude-code/02-quick-start/index.md) — 启动、`/plan` 初体验与常用命令
    - [进阶指南](./Agent/claude-code/03-advanced-guide/index.md) — CLAUDE.md 配置、Git 协同、工具与扩展、权限安全
    - [高级用法](./Agent/claude-code/04-advanced/index.md) — 插件开发、Subagent 编排、Hooks 进阶、MCP Server、CI/CD
    - [附录](./Agent/claude-code/05-appendix/index.md) — 速查参考、常见问题、完整示例、故障排查、模型对照
  - [Claude for Office](./Agent/claude-for-office/intro.md) — Office 插件，在 Word/Excel/PPT 中调用 AI
    - [安装插件](./Agent/claude-for-office/01-plugin-install.md) — 从 Microsoft AppSource 安装并选择 Enterprise gateway 模式
    - [部署 LiteLLM](./Agent/claude-for-office/02-litellm-deploy.md) — pip 或 Docker 部署 LiteLLM 代理，配置 HTTPS 与 CORS
    - [配置 LiteLLM](./Agent/claude-for-office/03-litellm-config.md) — Bearer→x-api-key 认证转换，Claude→DeepSeek 模型名称映射
    - [配置插件](./Agent/claude-for-office/04-office-config.md) — 在 Office 插件中填入代理地址，常见问题排查
