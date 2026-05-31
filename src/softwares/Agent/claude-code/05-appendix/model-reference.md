# 模型与成本速查

## DeepSeek 模型

Claude Code 通过 DeepSeek API 接入，可用以下模型：

| 模型 | 特点 | 适用场景 |
|------|------|---------|
| `deepseek-v4-pro` | 旗舰模型，推理深度强 | 复杂分析、多步规划、代码重构 |
| `deepseek-v4-flash` | 轻量快速，成本低 | 简单任务、文件搜索、格式转换 |

两个模型均支持 1M token 上下文窗口。配置中的 `[1m]` 后缀即表示启用 1M 窗口。

## 费用

具体价格见 [DeepSeek API 定价](https://api-docs.deepseek.com/zh-cn/quick_start/pricing/)。当前会话用量可通过 `/cost` 查看。

## 配置参考

`~/.claude/settings.json` 中的模型配置字段：

| 字段 | 作用 |
|------|------|
| `ANTHROPIC_MODEL` | 默认主模型 |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | 轻量任务模型 |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | 中等任务模型 |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | 复杂任务模型 |
| `CLAUDE_CODE_SUBAGENT_MODEL` | Subagent 默认模型 |
