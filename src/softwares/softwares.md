# 软件工具

团队常用的软件工具教程与配置指南。

- [Agent 工具](./Agent/claude-code/intro.md) — 命令行 AI 编程助手，能主动读写文件、执行命令、操作 Git，适合科研数据处理、代码开发和文档编写
  - [介绍与安装](./Agent/claude-code/01-intro-install/index.md) — 功能概览、环境搭建与 API 配置
    - [Claude Code 介绍](./Agent/claude-code/01-intro-install/overview.md) — 功能概览与适用场景
    - [前置知识](./Agent/claude-code/01-intro-install/prerequisites.md) — 终端基本操作，cd/ls/pwd，路径概念
    - [安装](./Agent/claude-code/01-intro-install/install.md) — Claude Code 安装、更新与 VSCode 集成
    - [配置](./Agent/claude-code/01-intro-install/config.md) — DeepSeek API 接入、设置文件与验证
  - [快速上手](./Agent/claude-code/02-quick-start/index.md) — 从启动到完成第一个任务的入门指南
    - [基础使用](./Agent/claude-code/02-quick-start/basic-usage.md) — 启动、`/plan` 初体验
    - [常用命令](./Agent/claude-code/02-quick-start/commands.md) — 斜杠命令速查、键盘快捷键
    - [Prompt 技巧](./Agent/claude-code/02-quick-start/prompt-tips.md) — Prompt 写作技巧与最佳实践
  - [进阶指南](./Agent/claude-code/03-advanced-guide/index.md) — 项目配置、版本控制与扩展机制
    - [项目配置（CLAUDE.md）](./Agent/claude-code/03-advanced-guide/claude-md.md) — 三类配置文件的使用与编写
    - [Git 协同](./Agent/claude-code/03-advanced-guide/git.md) — 自然语言 Git 操作，版本控制核心概念
    - [工具与扩展](./Agent/claude-code/03-advanced-guide/tools.md) — 内置工具、Skills、MCP、Hooks
    - [权限与安全](./Agent/claude-code/03-advanced-guide/security.md) — 权限模式、`.claudeignore`、secrets 拦截
  - [高级用法](./Agent/claude-code/04-advanced/index.md) — 插件开发、Subagent 编排等高级扩展
    - [插件开发](./Agent/claude-code/04-advanced/plugins.md) — 自定义插件开发与发布
    - [Subagent 编排](./Agent/claude-code/04-advanced/subagents.md) — 多 Agent 协作、模型选择与成本控制
    - [Hooks 进阶](./Agent/claude-code/04-advanced/hooks-advanced.md) — 条件 hooks、自动化模板
    - [MCP Server 开发](./Agent/claude-code/04-advanced/mcp-dev.md) — 构建自定义 MCP Server
    - [CI/CD 集成](./Agent/claude-code/04-advanced/cicd.md) — 在自动化流水线中使用 Claude Code
  - [附录](./Agent/claude-code/05-appendix/index.md) — 速查参考、常见问题与完整示例
    - [参考信息](./Agent/claude-code/05-appendix/reference.md) — 注意事项、命令速查表、Prompt 质量指南、Agent 发展历程
    - [常见问题](./Agent/claude-code/05-appendix/faq.md) — FAQ 与 Mac/Linux 平台提示
    - [使用示例](./Agent/claude-code/05-appendix/examples.md) — 从原始数据到可投稿图表的完整闭环示例
    - [故障排查](./Agent/claude-code/05-appendix/troubleshooting.md) — 常见报错与解决方法
    - [模型与成本速查](./Agent/claude-code/05-appendix/model-reference.md) — DeepSeek 模型与 Claude 模型对照

- [Claude for Office](./Agent/claude-for-office/intro.md) — Microsoft Office 插件，通过 LiteLLM 桥接 DeepSeek 模型，在 Word/Excel/PPT 中直接调用 AI
  - [安装插件](./Agent/claude-for-office/01-plugin-install.md) — 从 Microsoft AppSource 安装并选择 Enterprise gateway 模式
  - [部署 LiteLLM](./Agent/claude-for-office/02-litellm-deploy.md) — pip 或 Docker 部署 LiteLLM 代理，配置 HTTPS 与 CORS
  - [配置 LiteLLM](./Agent/claude-for-office/03-litellm-config.md) — Bearer→x-api-key 认证转换，Claude→DeepSeek 模型名称映射
  - [配置插件](./Agent/claude-for-office/04-office-config.md) — 在 Office 插件中填入代理地址，常见问题排查
