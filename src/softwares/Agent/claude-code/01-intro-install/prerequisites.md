# 前置知识

以下概念和操作贯穿整篇教程，花几分钟过一遍，后续阅读会更顺畅。

## 术语表

| 术语 | 含义 |
|------|------|
| 终端 | 命令行窗口。Windows 上为 PowerShell，macOS/Linux 上为 Terminal。 |
| CLI | 命令行界面。Claude Code 本质上是 CLI 工具。 |
| ~ | 用户目录简写。Windows 上即 `C:\Users\你的用户名`。 |
| API Key | 调用 API 的密钥。Claude Code 免费安装，通过 DeepSeek API Key 调用模型，按用量收费。 |
| 模型 | AI 的推理引擎。轻量模型便宜快速，旗舰模型推理更深。可用 `/model` 切换。 |
| Token | AI 处理文本的最小单位，约 0.5 个中文字。API 按 token 计费。 |
| 上下文窗口 | 模型单次能处理的最大 token 数。对话和文件内容超出窗口时，较早的内容会被截断，此时需要 `/compact` 压缩或 `/clear` 清空。 |
| Prompt | 输入给 AI 的指令。 |
| 上下文 | AI 当前能看到的对话历史和文件内容。 |
| 斜杠命令 | 以 `/` 开头的指令，如 `/plan`、`/init`。 |
| Agent | 能主动读写文件、执行命令的 AI。 |
| JSON | 结构化文本格式，配置文件用它。 |
| Git | 版本控制工具，记录每次修改、支持回退和协作。 |
| VSCode | 微软开源代码编辑器，可装 Claude Code 扩展在编辑器内使用 AI。 |

## 打开终端

**Windows**：按 `Win` 键，输入 `powershell`，回车。

**macOS**：按 `Cmd + Space`，输入 `terminal`，回车。

**Linux**：在应用菜单中搜索 `Terminal`。

打开后看到的是一个等待输入命令的窗口，光标前显示当前所在目录，这就是终端。

## 终端快捷键

| 快捷键 | 作用 |
|--------|------|
| `↑` / `↓` | 浏览已执行过的命令 |
| `Tab` | 自动补全文件名/目录名 |
| `Ctrl + C` | 终止当前正在执行的命令 |
| `Ctrl + L` | 清屏 |
| `Ctrl + A` | 光标跳到行首 |
| `Ctrl + E` | 光标跳到行尾 |
| `Ctrl + 点击` | 直接打开链接或文件路径 |

## 基本命令

```bash
pwd                     # 显示当前所在目录的完整路径
ls                      # 列出当前目录下的文件和子目录
cd 目标目录               # 切换到指定目录
```

示例：

```bash
cd Desktop              # 进入 Desktop 目录
cd ..                   # 返回上一级
cd ~                    # 回到用户主目录
```

## 文件操作

```bash
touch file.txt           # 创建空文件，或更新文件修改时间
cp a.txt b.txt          # 复制文件
mv a.txt b.txt          # 移动/重命名文件
rm file.txt             # 删除文件（不可逆，无回收站）
mkdir newdir            # 新建目录
```

以 `.` 开头的文件或目录为隐藏项（如 `.claude.json`、`.gitignore`），`ls` 默认不显示，需加 `-a` 参数：

```bash
ls -a                    # 列出所有文件，包括隐藏项
```

## 查看与搜索

```bash
cat file.txt            # 显示文件全部内容
head -n 5 file.txt      # 查看前 5 行
grep "关键词" file.txt   # 搜索文件中包含关键词的行
```

## 环境变量

```bash
export HTTPS_PROXY=http://127.0.0.1:7890   # 设置代理（仅当前终端有效）
```

环境变量是系统级的配置值，`export` 可临时设置，终端关闭即失效。

## 下载文件

```bash
curl -O https://example.com/file.zip       # 下载文件
```

## 重定向与管道

```bash
command > file.txt      # 将命令输出写入文件（覆盖）
command >> file.txt     # 将命令输出追加到文件末尾
command1 | command2     # 将 command1 的输出传给 command2
```

常用组合：

```bash
ls | grep "py"                  # 列出当前目录中文件名含 "py" 的条目
cat data.csv | head -n 5        # 查看 CSV 前 5 行
```

## 路径

**绝对路径**：从根目录开始的完整路径，如 `/home/user/data/raw.csv`。

**相对路径**：从当前目录出发的路径，如 `data/raw.csv` 或 `../figures/output.pdf`（`..` 表示上一级）。

教程中的命令均在终端中执行，用 `cd` 进入项目目录后再操作。
