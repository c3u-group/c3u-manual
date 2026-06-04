# Superpowers 使用指南

Superpowers 是 Claude Code 核心贡献者 Jesse Vincent 开发的 14 个工程规范 skill，覆盖开发全流程——从头脑风暴到分支收尾。安装后 AI 在匹配任务时自动调用对应 skill。

## 安装

```bash
claude plugin marketplace add https://github.com/anthropics/claude-plugins-official
claude plugin install superpowers
```

## 设计阶段

### brainstorming

动手前先厘清需求，避免方向性返工。AI 用苏格拉底式问答确认你的意图、约束和验收标准，而不是直接猜测实现。

触发：描述一个新功能、组件或改动，AI 自动介入。

### writing-plans

将需求拆解为 2-5 分钟粒度的实施计划，精确到文件路径和验证步骤。在独立会话中可逐条执行和审查。

触发：需求明确后说"帮我写一个实施计划"。

## 实现阶段

### executing-plans

按既定计划逐步执行，每步完成输出结果供审查。与 writing-plans 配对使用。

触发：有实施计划后说"按计划执行"。

### test-driven-development

强制 TDD 纪律：先写失败测试 → 最小实现 → 重构。适用于任何功能或 bug 修复。

触发：说"实现这个功能"，AI 自动先写测试。

### subagent-driven-development

将实施计划中的独立任务派发给 Subagent 并行执行，完成后自动汇总审查。

触发：执行含多个独立任务的计划时自动激活。

### writing-skills

教你按 TDD 方法创建自定义 skill——先写验收标准，再写 skill 内容，最后验证。

触发：说"帮我写一个 skill"。

## 调试阶段

### systematic-debugging

4 阶段调试法：根因调查 → 模式分析 → 假设验证 → 实施修复。不会让你跳过诊断直接改代码。

触发：遇到 bug 或测试失败时自动激活。

### verification-before-completion

声明"做完了"之前强制运行验证命令（测试、lint、构建），杜绝"我感觉没问题"。

触发：任务接近完成时自动激活。

## 协作阶段

### requesting-code-review

系统性地审查代码——对照原始需求检查规格符合度，同时检查代码质量。在合并或发 PR 前使用。

触发：完成主要功能后说"帮我审查代码"。

### receiving-code-review

处理审查反馈：先理解每条意见，再逐一核实修正。不会盲目接受所有建议。

触发：收到 code review 反馈后自动激活。

### dispatching-parallel-agents

检测 2 个以上互不依赖的任务时，自动并行派发 Subagent，而非串行排队。

触发：同时做多件独立的事时自动激活。

## 分支管理

### using-git-worktrees

为每个功能或任务创建隔离的 Git Worktree，代码不污染主分支。出问题直接丢弃 worktree 即可。

触发：开始新功能时自动激活。

### finishing-a-development-branch

完整的分支收尾流程：验证测试 → 提供 4 个选项（合并 / 发 PR / 保留 / 丢弃）→ 清理。确保不遗漏任何步骤。

触发：实现完成、测试通过后自动激活。

## 元技能

### using-superpowers

每次对话启动时自动注入，告诉 AI 如何查找和调用上述 13 个 skill。用户无需手动触发。

## 推荐组合

| 场景 | 使用的 Skill |
|------|-------------|
| 新功能开发 | brainstorming → writing-plans → test-driven-development → verification-before-completion |
| Bug 修复 | systematic-debugging → test-driven-development → verification-before-completion |
| 大型任务 | writing-plans → subagent-driven-development → requesting-code-review → finishing-a-development-branch |
| 代码审查 | requesting-code-review / receiving-code-review |
| 创建自定义 Skill | writing-skills |
| 分支隔离开发 | using-git-worktrees → ... → finishing-a-development-branch |

## 更多

[GitHub](https://github.com/obra/superpowers) · v5.1.0 · MIT
