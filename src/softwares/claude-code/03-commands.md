# 常用命令

## 斜杠命令

| 命令 | 作用 |
|------|------|
| **任务** | |
| [`/init`](#init) | 扫描项目，创建 `CLAUDE.md` |
| [`/plan`](#plan) | 先出方案，确认后再执行 |
| [`@文件/文件夹`](#at-files) | 指定要操作的文件或文件夹（前后加个空格） |
| [`/goal`](#goal) | 设定目标条件，Haiku 逐轮评估，达成后自动停止 |
| **会话控制** | |
| [`/clear`](#clear) | 在不相关的任务之间，清空上下文，开启全新会话 |
| [`/model`](#model) | 切换模型，简单任务用 Haiku 更快更省 |
| [`/rewind` 或 两次 `Esc`](#rewind) | 回退到之前的对话节点 |
| **分支协作** | |
| [`/branch`](#branch) | 创建分支，进行不同修改，后续合并 |
| [`/btw`](#btw) | 临时询问，可切换分支 |
| **管理** | |
| [`/context`](#context) | 显示上下文用量明细 |
| [`/permissions`](#permissions) | 管理工具权限，预设允许/拒绝 |
| [`/tasks`](#tasks) | 查看后台任务列表 |
| [`/memory`](#memory) | 管理 AI 记住的偏好和规范 |
| [`/plugin`](#plugin) | 安装和管理插件 |
| [`/skills`](#skills) | 列出安装的 skill |
| [`/help`](#help) | 查看完整帮助 |

## 键盘快捷键

| 快捷键 | 作用 |
|------|------|
| [`Esc` 或 `Ctrl + C`](#esc) | 停止当前操作 |
| [`Tab`](#tab) | 自动补全 |
| [`Shift + Tab`](#shift-tab) | `auto-accept` / `plan` 模式切换 |
| [`Ctrl + G`](#ctrl-g) | 打开编辑器（编辑 Prompt / Plan） |
| [`Ctrl + 点击`](#ctrl-click) | 打开链接 |
| [`!`](#bang) | 临时执行命令 |
| [`&`](#and) | 后台执行命令（用 `/tasks` 查看进度） |
| [`\ + Enter`](#newline) | 换行 |
| **终端操作** | |
| `↑ / ↓` | 浏览历史命令 |
| `Ctrl + A` | 光标跳到行首 |
| `Ctrl + E` | 光标跳到行尾 |
| `Ctrl + W` | 删除光标前一个单词 |
| `Ctrl + K` | 删除光标到行尾 |
| `Ctrl + U` | 删除光标到行首 |
| `Ctrl + L` | 清屏 |
| `Ctrl + R` | 搜索历史命令 |

## 常用 Bash 命令

| 命令 | 作用 |
|------|------|
| **文件操作** | |
| [`ls`](#bash-ls) | 列出目录内容 |
| [`cd`](#bash-cd) | 切换工作目录 |
| [`pwd`](#bash-pwd) | 显示当前目录路径 |
| [`mkdir`](#bash-mkdir) | 创建目录 |
| [`cp`](#bash-cp) | 复制文件或目录 |
| [`mv`](#bash-mv) | 移动或重命名 |
| [`rm`](#bash-rm) | 删除文件或目录 |
| [`cat` / `less`](#bash-cat-less) | 查看文件内容 |
| [`head` / `tail`](#bash-head-tail) | 查看文件头尾 |
| [`grep`](#bash-grep) | 搜索文本 |
| [`find`](#bash-find) | 搜索文件 |
| **系统信息** | |
| [`which`](#bash-which) | 查找命令所在路径 |
| [`df`](#bash-df) | 查看磁盘空间 |
| [`du`](#bash-du) | 查看目录大小 |
| [`top` / `ps`](#bash-top-ps) | 查看系统进程 |
| **网络** | |
| [`curl`](#bash-curl) | 下载文件或发起 API 请求 |
| [`ssh`](#bash-ssh) | 远程登录 |
| [`tar`](#bash-tar) | 打包或解压 |
| **进程与权限** | |
| [`kill`](#bash-kill) | 终止进程 |
| [`chmod`](#bash-chmod) | 修改文件权限 |

## 命令详解

### 任务类

#### `/init` {#init}

扫描当前项目目录结构，自动生成项目级 `CLAUDE.md` 文件（位于 `./CLAUDE.md` 或 `./.claude/CLAUDE.md`），内容涵盖项目结构、技术栈、编码规范和常用命令。Claude 每次启动时自动读取该文件，因此 `CLAUDE.md` 赋予了 AI 跨会话的项目记忆。

`/init` 生成的是初稿，后续可用自然语言让 Claude 修改，也可用 `/memory` 在外部编辑器中手动编辑。

> 环境变量 `CLAUDE_CODE_NEW_INIT=1` 启用新版交互式 `/init`，会分多阶段引导填写项目信息。

#### `/plan` {#plan}

让 Claude 先分析需求、制定方案，用户审核确认后再动手实现。内部使用 Plan Agent（只读模式）扫描代码库并输出结构化计划：任务分解、涉及文件、实现路径、风险点。

工作流：输入需求 → Claude 输出方案 → 审核调整（可用 `Ctrl+G` 手动编辑 plan） → 确认后 Claude 按计划逐步执行。

`Shift+Tab` 可将会话切换为 plan 模式（默认每步先出方案等确认）。也可在 CLI 启动时指定：`claude --permission-mode plan`。

#### `@文件/文件夹` {#at-files}

将文件或目录内容注入当前对话上下文。输入 `@` 后按 `Tab` 自动补全路径。支持一次引用多个文件。用法：前后留空格，如 `读取 @data/input.csv 的前 10 行`。

- **拖放**：按住 `Shift`，将文件从文件管理器拖入终端窗口，自动以 `@` 路径形式插入
- **目录引用**：`@src/` 加载目录结构信息
- **多文件**：`@file1.py @file2.py` 同时引用

> `@` 加载的内容仅当前会话有效，不会持久化到会话历史。

#### `/goal` {#goal}

设定一个可验证的完成条件，Claude 自动循环工作直到目标达成或达到回合上限。每轮完成后，由独立的 Haiku 模型充当评判者，根据对话记录判断目标是否满足：

- **满足** → 显示 "Goal achieved"，汇报耗时、回合数、token 用量
- **未满足** → Haiku 给出原因，主模型据此调整方向继续

```text
/goal 所有测试通过且 lint 无报错，或最多 20 轮后停止
/goal 生成一组参数使 R² > 0.95，最多 15 轮
```

关键要点：
- 判断仅基于对话记录（测试输出、命令结果等），Haiku 不直接访问文件系统
- 目标需**可验证**（测试退出码、文件数、错误计数），主观描述（"看起来不错"）会失效
- 务必加回合上限防止无限循环，条件上限 4000 字符
- 用 `/goal clear` 手动终止

### 会话控制类

#### `/clear` {#clear}

清空当前会话的全部对话历史，等同于重启 Claude Code。文件系统的修改不受影响（已写入的文件保留）。历史会话不会删除，可通过 `/resume` 找回。

适用场景：任务 A 完成后切换任务 B，上下文与之前完全无关时使用。同一任务的延续应使用 `/compact` 而非 `/clear`。

`/compact` 作为轻量替代：将对话历史压缩为结构化摘要，保留关键决策，释放上下文窗口空间。

```text
/compact                         # 基础压缩
/compact 保留认证模块的改动       # 指定保留重点
```

#### `/model` {#model}

会话中即时切换模型，无需退出重启。

```text
/model             # 打开交互选择器
/model opus        # 切换到 Opus（最强推理，适合复杂架构和多步规划）
/model sonnet      # 切换到 Sonnet（日常主力，编码/重构/调试）
/model haiku       # 切换到 Haiku（最快最省，适合简单编辑和样板代码）
```

推荐策略：Sonnet 起步 → 遇复杂问题切 Opus → 简单重复任务用 Haiku。

#### `/rewind` 或双击 `Esc` {#rewind}

回退到当前对话的历史检查点。Claude 每次修改代码前自动创建检查点，`/rewind` 提供四种撤销模式：

| 模式 | 效果 | 适用场景 |
|------|------|----------|
| 回退代码和对话 | 完整撤销，回到检查点 | 方向全错，重新来 |
| 仅回退对话，保留代码 | 代码不动，对话清除 | 对话被无关内容污染 |
| 仅回退代码，保留对话 | 代码还原，Claude 记住讨论 | 方案 A 失败，保留经验换方向 |
| 压缩历史释放上下文 | 对话压缩为摘要，释放 token | 长会话接近上下文上限 |

> 检查点只追踪 Claude 的修改，用户手动编辑和 bash 命令不在追踪范围内。

### 分支协作类

#### `/branch` {#branch}

从当前对话节点创建全新并行会话分支。新分支继承创建点之前的完整对话历史和上下文，原会话沿原方向继续。两条分支此后各自独立演进，不会互相污染。

```text
/branch                        # 从当前点创建分支
claude --resume "session-id" --fork-session  # 从 CLI 创建分支
```

典型场景：纠结用方案 A 还是 B，先实现 A，再 `/branch` 出去试 B，两边结果对比后保留好的，丢弃失败的。

与 `/rewind` 的区别：`/rewind` 是撤销回到过去；`/branch` 是分叉同时保有原路和新路。

#### `/btw` {#btw}

"By The Way"——在主任务运行期间，提出一个独立的临时问题（2026 年 3 月上线，v2.1.72）。答案在终端内联显示，按 `Esc` 关闭，问题和答案**不会进入主对话历史**，不占用上下文窗口。

```text
/btw 那个配置文件在哪个目录？
/btw 当前 Python 环境用的什么虚拟环境？
```

关键特性：
- **只读**：不能编辑文件、运行命令或创建工件
- **单轮**：一个问题一个答案，无后续追问
- **复用缓存**：继承主会话的 prompt 缓存，token 消耗极低

如果 /btw 的回答触发了更多疑问，需要进一步追问（如读取文件或生成代码），可在 /btw 答案显示时按 **`F`** 键将此次问答 fork 为一个独立分支会话。完成后用 `/resume` 回到原主会话继续。

使用场景：
- 长任务运行中确认某个细节（配置路径、API 用法）
- 检查 Claude 当前的处理思路
- 任何不想打断主任务的零散问题

#### `/resume` {#resume}

打开历史会话列表，选择之前的对话恢复继续。

```text
/resume                       # 打开会话选择器
/resume fix-login-bug         # 按名称恢复
claude -c                     # CLI 恢复最近会话
claude -r "session-name"      # CLI 按名称恢复
claude --continue             # CLI 恢复上次会话
```

建议用 `/rename <名称>` 给会话起名，方便后续查找。

### 管理类

#### `/context` {#context}

显示当前上下文窗口的可视化用量明细：总 token 占用、各文件/模块的 token 分布、缓存命中率。接近上下文上限时主动查看，决定是否需要 `/compact` 或 `/clear`。

#### `/permissions` {#permissions}

管理工具权限策略，可对 Bash 命令、文件读写、网络请求等按"允许/每次询问/拒绝"三级控制。

权限可作用在三个层级：项目级（`.claude/settings.json`）、用户级（`~/.claude/settings.json`）、全局设置。别名：`/allowed-tools`。

#### `/tasks` {#tasks}

查看后台运行的任务列表，包括异步执行的 Bash 命令（`&` 启动）和子 Agent。可查看各任务的运行状态、输出日志，或终止异常任务。

#### `/memory` {#memory}

在系统编辑器中打开记忆文件进行编辑。提供四个选项：用户记忆（`~/.claude/CLAUDE.md`）、项目记忆（`./CLAUDE.md`）、本地项目记忆（`./.claude/CLAUDE.md`）、托管策略记忆。保存后立即生效。

与 `/init` 的区别：`/init` 创建新文件，`/memory` 编辑已有文件。日常维护用 `/memory`，也可直接在对话中用自然语言要求 Claude 修改 CLAUDE.md。

#### `/plugin` {#plugin}

打开插件市场，安装和管理第三方插件。插件是 skill、命令、hooks 和 MCP 配置的打包分发单元。

```text
/plugin                                   # 打开插件管理界面
/plugin install github.com/user/plugin    # 从 GitHub 安装
claude plugin add --path ./my-plugin      # 本地安装
```

全局安装的插件 skill 使用 `plugin-name:skill-name` 命名空间，项目本地插件的 skill 不带前缀。

#### `/skills` {#skills}

列出所有已安装和可用的 skill。skill 是预定义的指令式工作流模板（`SKILL.md` 文件），可按需加载。支持关键词过滤：`/skills security`。执行时用 `/skill名称` 或由 Claude 自动匹配激活。

skill 的加载位置：项目级 `.claude/skills/`、用户级 `~/.claude/skills/`、以及插件中携带的 skill。

#### `/help` {#help}

查看完整帮助信息，包括所有可用命令、快捷键和配置选项。

## 快捷键详解

#### `Esc` 或 `Ctrl + C` {#esc}

中断 Claude 当前的输出生成或命令执行。输出已生成的部分保留在对话中，后续可继续补充提问。

#### `Tab` {#tab}

在输入框中自动补全文件路径、命令名或 `@` 引用的文件名。多次按 Tab 在候选项中切换。

#### `Shift + Tab` {#shift-tab}

切换工作模式：
- **auto-accept 模式**：Claude 自动执行所有工具调用，无需每次确认。适合信任度高的简单操作。
- **plan 模式**：类似 `/plan`，每步操作前先出方案等确认。

#### `Ctrl + G` {#ctrl-g}

打开外部编辑器编辑当前 prompt 或 plan。编辑器中支持多行输入、语法高亮，保存并退出后提交给 Claude。

#### `Ctrl + 点击` {#ctrl-click}

在终端中点击对话中出现的文件路径或 URL，直接在系统默认程序中打开。

#### `!` {#bang}

在对话中直接执行 shell 命令，输出结果即时显示。等价于在终端中运行，但不会退出 Claude。用法：直接输入 `!ls -la` 或 `!python script.py`。

#### `&` {#and}

在对话中后台执行 shell 命令，不阻塞对话继续。用 `/tasks` 查看运行状态和输出。适合编译、训练等长时间任务。

#### `\ + Enter` {#newline}

在输入框中插入换行，实现多行输入。先按 `\` 再按 `Enter`。

## 常用 Bash 命令详解

### 文件操作

#### `ls` {#bash-ls}

```bash
ls                 # 列出当前目录
ls -la             # 详细信息，含隐藏文件、权限
ls -lh             # 人类可读的文件大小
ls dir/            # 列出指定目录
```

#### `cd` {#bash-cd}

```bash
cd dir/            # 进入子目录
cd ..              # 返回上级
cd ~               # 返回 home 目录
cd -               # 返回上一次所在目录
```

#### `pwd` {#bash-pwd}

打印当前工作目录的绝对路径。

#### `mkdir` {#bash-mkdir}

```bash
mkdir dir/         # 新建目录
mkdir -p a/b/c/    # 递归创建多级目录（父目录不存在时自动创建）
```

#### `cp` {#bash-cp}

```bash
cp a.txt b.txt     # 复制文件
cp -r src/ dst/    # 递归复制整个目录
cp -i a.txt b.txt  # 覆盖前提示确认
```

#### `mv` {#bash-mv}

```bash
mv a.txt b.txt     # 重命名
mv a.txt dir/      # 移动到目录
mv -i a.txt b.txt  # 覆盖前提示确认
```

#### `rm` {#bash-rm}

```bash
rm file.txt        # 删除文件
rm -r dir/         # 递归删除目录
rm -i *.txt        # 逐个确认删除
```

> 注意：`rm` 不可逆，无回收站。删除前可用 `ls` 先确认匹配的文件列表。

#### `cat` / `less` {#bash-cat-less}

`cat` 一次性输出全部内容；`less` 分页浏览，适合大文件。

```bash
cat file.txt       # 全部输出
cat -n file.txt    # 带行号输出
less file.txt      # 分页浏览（↑↓ 滚动，/ 搜索，q 退出）
```

#### `head` / `tail` {#bash-head-tail}

```bash
head file.txt      # 前 10 行
head -n 20 file    # 前 20 行
tail file.txt      # 末尾 10 行
tail -n 20 file    # 末尾 20 行
tail -f file.log   # 持续追踪末尾新增内容（Ctrl+C 退出）
```

#### `grep` {#bash-grep}

```bash
grep "error" file.log             # 搜索匹配行
grep -r "pattern" dir/            # 递归搜索目录
grep -i "error" file.log          # 忽略大小写
grep -n "error" file.log          # 显示行号
grep -v "debug" file.log          # 排除匹配行
grep -A 3 "error" file.log        # 匹配行及其后 3 行
```

#### `find` {#bash-find}

```bash
find . -name "*.py"               # 按文件名查找
find . -type d -name "data"       # 查找目录
find . -mtime -7                  # 最近 7 天修改的文件
```

### 系统信息

#### `which` {#bash-which}

```bash
which python                      # 查找命令的绝对路径
which -a python                   # 列出所有匹配
```

#### `df` {#bash-df}

```bash
df -h                             # 磁盘分区使用情况（人类可读）
df -h /home                       # 指定挂载点
```

#### `du` {#bash-du}

```bash
du -sh dir/                       # 目录总大小
du -h --max-depth=1 dir/          # 一级子目录各自大小
```

#### `top` / `ps` {#bash-top-ps}

`top` 实时刷新进程列表（`q` 退出）；`ps` 输出当前进程快照。

```bash
top                               # 实时进程列表
ps aux                            # 所有进程详情
ps aux | grep python              # 过滤特定进程
```

### 网络

#### `curl` {#bash-curl}

```bash
curl -O https://example.com/file.zip    # 下载文件（保留原名）
curl -o name.zip https://example.com/f  # 下载并重命名
curl -L https://example.com             # 跟随重定向
curl -X POST -d "key=val" https://api   # POST 请求
```

#### `ssh` {#bash-ssh}

```bash
ssh user@host                     # 密码或密钥登录
ssh -p 2222 user@host             # 指定端口
ssh -X user@host                  # 启用 X11 转发
```

#### `tar` {#bash-tar}

```bash
tar -czf archive.tar.gz dir/      # 打包并 gzip 压缩
tar -xzf archive.tar.gz           # 解压 .tar.gz
tar -cjf archive.tar.bz2 dir/     # 打包并 bzip2 压缩
tar -xjf archive.tar.bz2          # 解压 .tar.bz2
```

### 进程与权限

#### `kill` {#bash-kill}

先通过 `ps` 或 `top` 获取 PID，再终止。

```bash
kill 1234                         # 正常终止（SIGTERM）
kill -9 1234                      # 强制终止（SIGKILL）
pkill -f "python script.py"       # 按进程名终止
```

#### `chmod` {#bash-chmod}

```bash
chmod +x script.sh                # 添加可执行权限
chmod 755 script.sh               # rwxr-xr-x
chmod 644 file.txt                # rw-r--r--
chmod -R 755 dir/                 # 递归修改目录及文件
```
