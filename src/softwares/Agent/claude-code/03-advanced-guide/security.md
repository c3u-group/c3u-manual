# 权限与安全

Claude Code 能执行命令和读写文件，能力越强，安全越重要。

## 权限模式

三种级别，用 `Shift + Tab` 或 `/permissions` 切换：

| 模式 | 行为 |
|------|------|
| default | 每步操作需确认 |
| auto-accept | 自动执行所有操作 |
| plan | 只读模式，先出方案等确认 |

日常推荐 default。简单重复操作可临时切 auto-accept，完成后切回。

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
