# Anthropic 专有功能

以下功能需 Anthropic 账号和 Claude Code 官方服务，DeepSeek API 用户不可用。罗列于此供了解生态全貌，如需使用请注册 [Anthropic 账号](https://console.anthropic.com)。

## 云端代理

### Ultraplan (`/ultraplan`)

在终端发起，Claude 在云端草拟执行计划。通过网页编辑器逐节审核、提出修改意见，确认后选择远程执行或拉回本地。

```text
/ultraplan 将认证服务从 session 迁移到 JWT
```

首次运行自动创建默认云端环境，无需手动设置。

### Ultrareview (`/ultrareview`)

云端启动 bug 搜索代理舰队，针对分支或 PR 并行扫描，结果流式回传终端或桌面端。

```text
/ultrareview              # 审查当前分支
/ultrareview main..feature  # 审查指定分支差异
```

也可通过 `claude ultrareview` 集成到 CI 流水线。

### Routines

云端常驻代理，支持三种触发方式：

| 触发类型 | 说明 | 示例场景 |
|---------|------|---------|
| 定时（Cron） | 按 cron 表达式定时启动会话 | 每天凌晨自动拉取 bug 清单并逐个修复 |
| API | 每个 Routine 有独立 HTTP 端点和 Bearer Token | 通过 webhook 触发数据处理流水线 |
| GitHub Webhook | PR、Issue、Push 等事件自动触发 | PR 提交后自动运行测试和代码审查 |

Routines 运行在 claude.ai/code 网页端，享有与 CLI 相同的 skill、hook、MCP 支持。

## 交互增强

### 语音模式 (`/voice`)

通过语音输入代替打字，支持命令如 "refactor the authentication middleware"。

```text
/voice
```

### 计算机使用（Computer Use）

Claude 可直接操作原生 GUI 应用——打开窗口、点击 UI、验证界面变化。桌面端和 CLI 均支持。

```text
打开 Chrome 浏览器，导航到 localhost:3000，截图
```

### 移动推送通知

长任务完成或需要用户介入时，通过移动端推送通知提醒。

## 协作与团队

### Agent View (`/agents`)

单屏查看所有会话的运行状态、阻塞情况和完成进度——类似任务管理面板。终端输入 `claude agents` 或会话内 `/agents`。

### 团队上手 (`/team-onboarding`)

根据本地 Claude Code 使用记录生成新成员上手指南，含常用命令、项目约定和推荐配置。

```text
/team-onboarding
```

## 桌面端特性

Claude Code 桌面端（非 VSCode 插件）支持以下增强：

- 多并行 Claude 会话，拖拽布局
- 内置终端，原生代码编辑
- Diff 查看器（重构专用）
- SSH 远程服务器连接
- 会话回顾：终端失焦期间的操作摘要

## 与 DeepSeek 接入的对比

| 功能 | DeepSeek API | Anthropic 官方 |
|------|-------------|---------------|
| 基础对话与代码编辑 | 支持 | 支持 |
| Skills / MCP / Hooks / Plugin | 支持 | 支持 |
| Subagent / Workflows | 支持 | 支持 |
| Auto mode | 支持 | 支持 |
| Effort 调节 | 支持 | 支持 |
| 1M 上下文 | 取决于模型 | 取决于模型 |
| `/ultraplan` / `/ultrareview` | 不支持 | 支持 |
| Routines（云端代理） | 不支持 | 支持 |
| 语音模式 | 不支持 | 支持 |
| 计算机使用 | 不支持 | 支持 |
| 移动推送 | 不支持 | 支持 |
| 桌面端增强 | 不支持 | 支持 |
| API 成本 | DeepSeek 定价 | Anthropic 定价 |

课题组日常科研工作使用 DeepSeek API 接入即可满足需求。Anthropic 官方服务的优势在于云端代理、多模态交互和协作功能，适合有额外预算且有相应需求的用户。
