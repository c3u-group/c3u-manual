# Claude for Office 快速入门

Claude for Office 是 Anthropic 推出的 Microsoft Office 插件，可在 Word、Excel、PowerPoint 中直接调用 Claude 模型。支持文本生成、数据分析、文档润色等功能，无需离开 Office 界面。

## 为什么要用 LiteLLM 桥接

Claude for Office 默认连接 Anthropic 官方 API。如需接入 DeepSeek 等第三方模型，存在三个障碍：

1. **认证方式不同**：Claude for Office（Enterprise gateway 模式）使用 `Authorization: Bearer` 认证，而 DeepSeek Anthropic API 使用 `x-api-key` 头部认证
2. **模型名称受限**：Claude for Office 仅内置 Claude 系列模型名称（如 `claude-sonnet-4-20250514`），无法直接选择 DeepSeek 模型
3. **HTTPS 要求**：Claude for Office 仅允许配置 HTTPS 地址，本地 HTTP 代理无法直接使用

LiteLLM 作为中间代理，同时解决认证转换、模型名称映射和 HTTPS 三个问题：

```
Claude for Office (Word/Excel/PPT)
  ── Bearer ──→ LiteLLM Proxy (HTTPS)
                  │ 认证转换：Bearer → x-api-key
                  │ 名称映射：claude-sonnet-4-20250514 → deepseek-chat
                  ── x-api-key ──→ DeepSeek Anthropic API
```

## 配置流程概览

| 步骤 | 内容 | 章节 |
|------|------|------|
| 1 | 安装 Claude for Office 插件 | [安装插件](./01-plugin-install.md) |
| 2 | 部署 LiteLLM 代理服务 | [部署 LiteLLM](./02-litellm-deploy.md) |
| 3 | 配置 LiteLLM 对接 DeepSeek | [配置 LiteLLM](./03-litellm-config.md) |
| 4 | 在 Office 插件中填入代理地址 | [配置插件](./04-office-config.md) |

## 前置条件

- Word / Excel / PowerPoint 桌面版或网页版
- DeepSeek API Key（从 [DeepSeek 开放平台](https://platform.deepseek.com) 获取）
- 一台可运行 LiteLLM 的服务器（本地或云服务器均可，需配置 HTTPS）
