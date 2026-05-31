# 参考信息

## 斜杠命令速查

| 命令 | 作用 |
|------|------|
| `/init` | 扫描项目，生成 `CLAUDE.md` |
| `/plan` | 先出方案，确认后执行 |
| `@文件` | 将文件内容注入上下文 |
| `/goal` | 设定目标条件，自动循环执行直到达成 |
| `/clear` | 清空对话历史 |
| `/compact` | 压缩上下文，保留关键信息 |
| `/rewind` | 回退到历史检查点 |
| `/resume` | 恢复历史会话 |
| `/rename` | 给会话命名 |
| `/model` | 切换模型 |
| `/branch` | 创建并行分支 |
| `/diff` | 查看变更差异 |
| `/cost` | 显示 token 用量 |
| `/config` | 打开设置 |
| `/permissions` | 管理工具权限 |
| `/tasks` | 查看后台任务 |
| `/memory` | 编辑记忆文件 |
| `/plugin` | 管理插件 |
| `/skills` | 列出已安装 skill |
| `/doctor` | 运行健康检查 |
| `/help` | 查看帮助 |

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
