# 配置 LiteLLM 对接 DeepSeek

本章在 LiteLLM 中配置模型路由，解决两个问题：认证转换（Bearer → x-api-key）和模型名称映射（Claude 名称 → DeepSeek 模型）。

## 工作原理

Claude for Office 发送 Anthropic Messages API 格式请求（`/v1/messages`），认证头为 `Authorization: Bearer`，模型名称为 Claude 系列（如 `claude-sonnet-4-20250514`）。

LiteLLM 接收请求后完成两步转换再转发至 DeepSeek：

```
Claude for Office                         LiteLLM                        DeepSeek
  POST /v1/messages  ──→  认证: Bearer → x-api-key  ──→  POST /v1/messages
  Authorization: Bearer    模型: claude-sonnet → deepseek-chat    x-api-key: sk-xxx
  model: claude-sonnet     转发至 api.deepseek.com/anthropic       model: deepseek-chat
```

## 创建 LiteLLM 虚拟密钥

为 Claude for Office 生成一个 API key，该 key 填入稍后的插件配置中：

```bash
curl -X POST http://localhost:4000/key/generate \
  -H "Authorization: Bearer sk-change-me-to-a-random-string" \
  -H "Content-Type: application/json" \
  -d '{
    "models": ["claude-sonnet-4-20250514"],
    "metadata": {"user": "claude-for-office"}
  }'
```

返回示例：

```json
{
  "key": "sk-abc123def456...",
  "models": ["claude-sonnet-4-20250514"],
  ...
}
```

记录此 `key` 值，后续在 Office 插件中填入。

> `master_key` 是 `config.yaml` 中 `general_settings.master_key` 的值。注意区分：`master_key` 用于管理 LiteLLM 本身；虚拟 `key` 用于客户端（Office 插件）连接。

## 配置模型路由

编辑 `config.yaml`，将 Claude 模型名称映射到 DeepSeek：

```yaml
general_settings:
  master_key: sk-change-me-to-a-random-string

model_list:
  - model_name: claude-sonnet-4-20250514
    litellm_params:
      model: deepseek/deepseek-chat
      api_base: https://api.deepseek.com/anthropic
      api_key: os.environ/DEEPSEEK_API_KEY
  - model_name: claude-opus-4-20250514
    litellm_params:
      model: deepseek/deepseek-reasoner
      api_base: https://api.deepseek.com/anthropic
      api_key: os.environ/DEEPSEEK_API_KEY
```

`model_name` 为 Claude 模型名称（对 Office 插件暴露的名称），`model` 为实际调用的 DeepSeek 模型。`api_key: os.environ/DEEPSEEK_API_KEY` 表示从环境变量读取。

设置环境变量：

```bash
export DEEPSEEK_API_KEY=sk-your-deepseek-api-key
```

重启 LiteLLM 使配置生效。

## 验证路由

发送 Anthropic 格式请求测试，模拟 Claude for Office 的行为（Bearer 认证 + Claude 模型名）：

```bash
curl -X POST https://your-domain.com/v1/messages \
  -H "Authorization: Bearer sk-abc123def456..." \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-sonnet-4-20250514",
    "max_tokens": 256,
    "messages": [{"role": "user", "content": "Reply with just: OK"}]
  }'
```

返回正常响应则链路通畅。

## 下一步

代理配置完成后，进入[配置插件](./04-office-config.md)在 Office 中填入连接信息。
