# 安装

## Windows

### 安装 Claude Code 和 Git

按 `Win` 键，输入 `powershell`，回车，执行：

```powershell
winget install Anthropic.ClaudeCode
winget install Git.Git
```

### 推荐：安装常用软件

安装 Visual Studio Code ：
```powershell
winget install Microsoft.VisualStudioCode```

安装 Python ：
```powershell
winget install Python.Python.3.12```

安装 uv（Python 包管理器，替代 pip）：
```powershell
winget install astral-sh.uv```

安装 Pandoc（文档格式转换，学术写作常用）：
```powershell
winget install pandoc```

### Visual Studio Code 集成

在 VSCode 扩展市场搜索安装 `Claude Code for VS Code`。安装后左侧出现 Claude Code 面板，可在编辑器内对话。右上角出现 Claude Code 图标，可打开新的 Claude Code 窗口。

在 VSCode 扩展市场搜索安装 `Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code` 可安装简体中文语言包。重新打开 VSCode 可切换到简体中文。按 `Ctrl + Shift + P` 打开命令面板，输入 `>Configure Display Language` 可更改显示语言。

常用快捷键：

| 快捷键 | 作用 |
|--------|------|
| `Ctrl + Shift + P` | 命令面板 |
| `Ctrl + P` | 快速打开文件 |
| `Ctrl + F` | 查找 |
| `Ctrl + D` | 选中相同词，连续按可多选 |
| `Ctrl + Enter` | 在下方另起一行 |
| `鼠标中键` | 多光标编辑 |
| ``Ctrl + ` `` | 切换终端 |

设置中可开启 `Claude Code: Use Terminal` 以默认使用 CLI 模式，功能更全；但 CLI 模式对新手可能不够友好，熟悉后再切。

## macOS / Linux

### 安装 Homebrew

```bash
# 为 brew 更换 USTC 镜像，加速下载：
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"
export HOMEBREW_API_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/api"

# 安装 Homebrew
/bin/bash -c "$(curl -fsSL https://mirrors.ustc.edu.cn/misc/brew-install.sh)"
```

安装完成后，需按终端提示完成配置。

### 安装 Claude Code

这一步会从 Anthropic 下载软件包，可能需要开启代理：
```bash
export HTTPS_PROXY=http://127.0.0.1:7890
```

然后安装的 Claude Code
```bash
brew install claude-code
```

> 如果报错找不到 `brew` 命令，说明上一步的安装后配置没做或没生效，照 brew 安装完成后的屏幕提示操作即可。

### 推荐：安装常用软件

安装 Visual Studio Code ：
```bash
brew install --cask visual-studio-code
```

安装 Git ：
```bash
brew install git
```

安装 Python ：
```bash
brew install python
```

安装 uv（Python 包管理器，替代 pip）：
```bash
brew install uv
```

安装 Pandoc（文档格式转换，学术写作常用）：
```bash
brew install pandoc
```

### VSCode 集成

在 VSCode 扩展市场搜索安装 `Claude Code for VS Code`。安装后左侧出现 Claude Code 面板，可在编辑器内对话。右上角出现 Claude Code 图标，可打开新的 Claude Code 窗口。

在 VSCode 扩展市场搜索安装 `Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code` 可安装简体中文语言包。重新打开 VSCode 可切换到简体中文。按 `Cmd + Shift + P` 打开命令面板，输入 `>Configure Display Language` 可更改显示语言。

常用快捷键：

| 快捷键 | 作用 |
|--------|------|
| `Cmd + Shift + P` | 命令面板 |
| `Cmd + F` | 查找 |
| `Cmd + D` | 选中相同词，连续按可多选 |
| `Cmd + Enter` | 在下方另起一行 |
| `鼠标中键` | 多光标编辑 |
| ``Cmd + ` `` | 切换终端 |

设置中可开启 `Claude Code: Use Terminal` 以默认使用 CLI 模式，功能更全；但 CLI 模式对新手可能不够友好，熟悉后再切。