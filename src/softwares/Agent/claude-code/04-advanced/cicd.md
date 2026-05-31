# CI/CD 集成

Claude Code 可集成到 GitHub Actions 等 CI/CD 流水线中，实现自动化的代码审查、文档生成和测试。

## GitHub Actions 示例

```yaml
name: Claude Code Review
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Claude Code Review
        env:
          ANTHROPIC_AUTH_TOKEN: ${{ secrets.DEEPSEEK_API_KEY }}
          ANTHROPIC_BASE_URL: "https://api.deepseek.com/anthropic"
          ANTHROPIC_MODEL: "deepseek-v4-pro"
        run: |
          claude --print "Review this PR diff and report issues: $(git diff origin/${{ github.base_ref }})"
```

## 常见场景

| 场景 | 做法 |
|------|------|
| PR 代码审查 | Claude 读取 diff，输出审查意见 |
| 文档生成 | 代码合并后自动更新 API 文档 |
| 变更日志 | 从 commit 历史自动生成 CHANGELOG |
| 测试生成 | 新代码合并后补充测试用例 |

## 注意事项

- CI 环境中的 API Key 通过 GitHub Secrets 注入，不要硬编码
- 使用 `--print` 模式输出结果到 CI 日志，不进入交互模式
- CI 流水线中 Claude 的操作通常是只读的（审查、生成报告），避免让 AI 在无人监督下修改代码
