# 参考信息

## 斜杠命令速查

| 命令 | 作用 |
|------|------|
| `/init` | 扫描项目，生成 `CLAUDE.md` |
| `/plan` | 先出方案，确认后执行 |
| `@文件` | 将文件内容注入上下文 |
| `/goal` | 设定完成条件，跨回合自动迭代直到达成 |
| `/effort` | 调节推理深度（`low` → `medium` → `high` → `xhigh` → `max` → `ultracode`） |
| `/code-review` | 审查代码正确性（`--comment` 发布到 PR，`--fix` 直接修复） |
| `/loop` | 定时重复执行任务，省略间隔则自动调速 |
| `/clear` | 清空对话历史 |
| `/compact` | 压缩上下文，保留关键信息 |
| `/rewind` | 回退到历史检查点 |
| `/resume` | 恢复历史会话 |
| `/rename` | 给会话命名 |
| `/model` | 切换模型 |
| `/branch` | 创建并行分支 |
| `/diff` | 查看变更差异 |
| `/cost` | 显示 token 用量 |
| `/usage` | 按类别查看用量驱动因素（skill、subagent、plugin、MCP） |
| `/config` | 打开设置 |
| `/permissions` | 管理工具权限 |
| `/tasks` | 查看后台任务 |
| `/agents` | 查看所有 Subagent 运行状态 |
| `/memory` | 编辑记忆文件 |
| `/plugin` | 管理插件 |
| `/skills` | 列出已安装 skill |
| `/reload-skills` | 重新扫描 skill 目录，无需重启会话 |
| `/doctor` | 运行健康检查 |
| `/help` | 查看帮助 |
| `/theme` | 自定义终端配色主题 |
| `/release-notes` | 查看交互式版本更新说明 |
| `/powerup` | 交互式教学课程 |

## 键盘快捷键速查

| 快捷键 | 作用 |
|------|------|
| `Esc` / `Ctrl + C` | 停止当前操作 |
| `Tab` | 自动补全 |
| `Shift + Tab` | 切换 auto-accept / plan 模式 |
| `Ctrl + G` | 打开编辑器 |
| `!` | 临时执行命令 |
| `&` | 后台执行 |
| `\ + Enter` | 换行 |
| `Ctrl + R` | 搜索对话历史 |

## Anthropic 专有命令

以下命令需 Anthropic 账号，DeepSeek API 用户不可用：

| 命令 | 作用 |
|------|------|
| `/ultraplan` | 云端草拟计划，网页审核后远程或本地运行 |
| `/ultrareview` | 云端 bug 搜索代理舰队，结果流式回传 |
| `/autofix-pr` | 终端开启 PR 自动修复（监听 CI 和审查评论） |
| `/voice` | 语音模式交互 |
| `/team-onboarding` | 生成新成员上手指南 |

## 自然语言 Git 速查

| 你说 | Claude 做 |
|------|-----------|
| 帮我提交更改 | `git add` + `git commit` |
| 推送 Git | `git push` |
| 拉取 Git | `git pull` |
| 创建分支 xxx | `git branch` + `git switch` |
| 合并分支 xxx | `git merge` |
| 查看改了什么 | `git status` / `git diff` |
| 放弃还没提交的修改 | `git checkout -- .` |
| 撤销上一次提交，保留修改 | `git reset --soft HEAD~1` |

## 配置文件位置

| 文件 | 路径 |
|------|------|
| 主设置 | `~/.claude/settings.json` |
| 跳过登录 | `~/.claude.json` |
| 全局 CLAUDE.md | `~/.claude/CLAUDE.md` |
| 项目 CLAUDE.md | `./CLAUDE.md` |
| 项目私有 | `./.claude/CLAUDE.md` |
| Skills | `.claude/skills/` |
| MCP 配置 | `.claude/mcp.json` |
| 自定义 Agent | `.claude/agents/` |

## 注意事项

| 可以放心做 | 要注意 | 不要做 |
|-----------|--------|--------|
| 让 AI 读写项目文件 | 每次变更后审查再提交 | 提交涉密数据 |
| 让 AI 执行脚本、跑测试 | 关键结果人工验证 | 上传 API key / 密码 |
| 让 AI 验证自己的代码 | AI 生成的结论需审核 | 盲信 AI 的学科结论 |
| 迭代式改图调参 | 第一次跑新脚本先看逻辑 | 不经审查直接投稿 |
| 处理重复性、规范性任务 | 安装第三方 skill 前审阅内容 | 安装来源不明的 skill |
