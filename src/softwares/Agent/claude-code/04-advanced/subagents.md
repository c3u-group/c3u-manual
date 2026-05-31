# Subagent 编排

Subagent 将独立任务委派给子 Agent 并行执行。每个 subagent 拥有独立上下文，不会膨胀主对话，完成后返回摘要。

## 基本用法

直接描述并行需求，Claude 自动派生 subagent：

```text
data/raw/ 下有 4 个子目录，每组数据独立处理：归一化、计算 DTG、提取特征温度。4 组相互独立，并行处理，最后汇总比较表。
```

使用 `/agents` 命令查看和管理运行中的 subagent。

## 模型选择与成本

不同模型适合不同角色：

| 模型 | 适用场景 | 成本 |
|------|---------|------|
| deepseek-v4-flash | 简单探索、文件搜索 | 低 |
| deepseek-v4-pro | 日常编码、测试、实现、复杂重构 | 中 |

推荐策略：探索用 flash，实现和复杂任务用 pro。在 `~/.claude/settings.json` 中通过 `CLAUDE_CODE_SUBAGENT_MODEL` 设置 subagent 默认模型。

## 主 Agent 注意力稀释

当 subagent 数量增多时，主 Agent 需要在多个子任务间协调，可能出现指令遵循性下降。几个对策：

- **一次只派一个复杂任务**：不要让主 Agent 同时追踪 3 个以上需要深度推理的 subagent
- **明确验收标准**：每个 subagent 的任务要有可验证的交付物（文件、测试结果）
- **分批汇总**：subagent 全部完成后，再让主 Agent 统一汇总，而非边执行边整合

## 自定义 Subagent

在 `.claude/agents/` 下创建 `.md` 文件定义专用 subagent：

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

之后在对话中可直接调用：`@agents/data-processor 处理 data/raw/ 下的 TG 数据`。
