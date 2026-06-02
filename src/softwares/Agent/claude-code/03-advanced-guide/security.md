# 权限与安全

Claude Code 能执行命令和读写文件，能力越强，安全越重要。

## 权限模式

四种模式，用 `Shift + Tab` 循环切换：

| 模式 | 编辑 | 命令执行 | 适用场景 |
|------|------|---------|---------|
| ask before edits | 每次确认 | 每次确认 | 不熟悉项目时，逐操作审查 |
| edit automatically | 自动允许 | 每次确认 | 日常开发，信任文件编辑但要盯命令 |
| plan mode | 只读 | 只读 | 架构探索、方案设计 |
| auto mode | 分类器判断 | 分类器判断 | 长时间自动化任务，安全与效率兼顾 |

## Auto mode

Auto mode 使用独立的分类器模型（Sonnet 4.6）逐操作判断风险等级，分三层裁决：

| 层级 | 判定 | 行为 |
|------|------|------|
| `allow` | 安全操作 | 直接执行，零延迟。涵盖只读命令（`ls`、`cat`、`git status`）、项目内文件编辑、`--version`/`--help`、声明的依赖安装（manifest 未被修改时） |
| `soft_deny` | 危险但有时有意为之 | 分类器判断上下文：用户是否明确要求此操作？包括 `git push --force`、`npm publish`、`curl \| bash`、修改 `.claude/` 配置等 |
| `hard_deny` | 不可逆破坏 | 立即阻止，无例外。包括 `rm -rf /`、磁盘格式化、内核修改等 |

**防滥用机制**：连续 3 次阻止或累计 20 次阻止 → 自动退出 auto mode 切回手动确认。非交互会话直接中止。

### 配置自定义规则

在 `settings.json`（优先使用项目级 `.claude/settings.local.json`，不被 git 追踪）中配置：

```json
{
  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": [
      "Bash(npm run *)",
      "Bash(python -m pytest *)",
      "Bash(ruff check *)",
      "Bash(git status)",
      "Bash(git diff *)",
      "Bash(git add *)",
      "Bash(git commit *)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Bash(curl *)",
      "Bash(wget *)",
      "Bash(git push --force *)",
      "Bash(rm -rf *)"
    ]
  }
}
```

**优先级规则**：`deny` 始终覆盖 `allow`，任一配置层级的 deny 不可被更低层级的 allow 覆盖。配置文件优先级：CLI 参数 > `.claude/settings.local.json` > `.claude/settings.json`（团队共享）> `~/.claude/settings.json`（全局）。

查看完整内置默认规则：

```bash
claude auto-mode defaults
```

启用 auto mode：

```bash
claude --enable-auto-mode
```

## .claudeignore

排除不需要 AI 访问的文件，减少 token 消耗的同时保护敏感信息。在项目根目录创建 `.claudeignore`：

```gitignore
node_modules/
dist/
*.min.js
.env
secrets/
```

效果类似 `.gitignore`，匹配的文件不会被注入上下文。

## Secrets 拦截

Claude Code 内置 secrets 检测，会自动阻止向外部发送疑似 API key、密码、token 等内容。`~/.claude/settings.json` 中的 Key 为本地环境变量注入，不经过对话内容，不受此限制。拦截针对的是对话中输入或代码中硬编码的 Key。不要将涉密数据、内部数据集放入 AI 可读的目录。

## 第三方 Skill

安装前审阅 `SKILL.md` 内容。优先使用官方或社区已验证的来源（如 Claude Code 官方插件市场）。来源不明的 skill 可能包含恶意指令。

## 操作原则

- 关键操作留人确认：远程推送、数据删除、批量修改不要让 AI 在无人监督下执行
- 小步提交，频繁审查：每次变更后 `git diff` 检查
- 出问题果断回滚：Git 历史是最好的安全网
