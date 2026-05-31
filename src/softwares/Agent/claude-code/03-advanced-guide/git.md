# Git 协同

## 为什么需要版本控制

改了一大段想回到昨天的版本、想知道某段话是谁什么时候加的、多人同时编辑不想互相覆盖——Git 解决这些问题。它按时间线记录文件的每次变更，可随时查看历史、对比差异、回退到任意版本。

## 核心概念

三个区域：工作目录（正在编辑的文件）→ 暂存区（`git add`，挑出要记录的修改）→ 仓库（`git commit`，存入历史档案）。

每次提交生成一个带编号的快照，附带说明文字，永久可查。

## 首次配置

```bash
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```

## 忽略文件

创建 `.gitignore` 排除不需要追踪的文件：

```gitignore
__pycache__/
*.pyc
.venv/
figures/
.DS_Store
```

## Claude Code 中的 Git

不需要记命令，用自然语言即可：

| 你说 | Claude 做 |
|------|-----------|
| "帮我提交更改" | `git add` + `git commit`（AI 自动生成 commit message） |
| "推送 Git" | `git push` |
| "拉取 Git" | `git pull` |
| "创建分支 xxx" | `git branch` + `git switch` |
| "合并分支 xxx" | `git merge` |
| "查看改了什么" | `git status` / `git diff`（AI 用自然语言解读） |

## 回退变更

**未提交时**：说"放弃所有还没提交的修改"即可。

**已提交时**：

- "撤销上一次提交，但保留修改" → 提交撤销，修改回到暂存区继续编辑
- "撤回上一次提交，修改也不要了" → 永久丢弃（慎用）
- "把某次提交的效果反转掉" → 生成反向提交抵消，比直接删除更安全

**恢复误删**："恢复被我删掉的 xxx 文件，回到上次提交的版本"。

## 核心习惯

AI 生成代码速度快，正确性不随速度提升。每次变更后让 AI 展示 `git diff`，确认无误再提交，出问题果断回滚。VSCode 的源代码管理面板能可视化看到文件修改标记，比命令行更直观。
