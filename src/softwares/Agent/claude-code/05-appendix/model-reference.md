# 模型与成本速查

## DeepSeek 模型

Claude Code 通过 DeepSeek API 接入，可用以下模型：

| 模型 | 特点 | 适用场景 |
|------|------|---------|
| `deepseek-v4-pro` | 旗舰模型，推理深度强 | 复杂分析、多步规划、代码重构 |
| `deepseek-v4-flash` | 轻量快速，成本低 | 简单任务、文件搜索、格式转换 |

两个模型均支持 1M token 上下文窗口。配置中的 `[1m]` 后缀即表示启用 1M 窗口。

1M 上下文意味着单次对话可以容纳约 75 万英文单词或完整的代码库。对于大项目或长文档处理无需分段载入，可一次性加载全部上下文。

## 推理深度（Effort Level）

`CLAUDE_CODE_EFFORT_LEVEL` 控制模型的推理投入程度：

| 级别 | 说明 |
|------|------|
| `low` | 最小推理，简单搜索和格式检查 |
| `medium` | 常规推理，日常编码任务 |
| `high` | 深度推理，复杂重构和多文件改动 |
| `xhigh` | 超高推理（Opus 4.7 及以上），适合对正确性要求最高的任务 |
| `max` | 极限推理投入，仅用于最难的问题（边际收益递减，容易 overthinking） |
| `ultracode` | 最高级别，在 `xhigh` 推理基础上自动启用多 Agent 动态工作流——分解任务、并行派发 Subagent、对抗验证、综合合成 |

在会话中可通过 `/effort` 临时切换，无需修改配置文件。

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
