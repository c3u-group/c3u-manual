# 安装

[Windows](#windows) · [macOS / Linux](#macos--linux)

## Windows

### 安装 Claude Code

按 `Win` 键，输入 `powershell`，回车，执行：

```powershell
winget install Anthropic.ClaudeCode --accept-source-agreements
winget install Git.Git --accept-source-agreements
```

### 更新

```powershell
winget upgrade Anthropic.ClaudeCode
```

### 可选：安装常用软件

（推荐）安装 Visual Studio Code ：
```powershell
winget install Microsoft.VisualStudioCode --accept-source-agreements
```

安装 Conda ：
```powershell
winget install CondaForge.Miniforge --accept-source-agreements
```

安装 Python ：
```powershell
winget install Python.Python.3.12 --accept-source-agreements
```

安装 NodeJS ：
```powershell
winget install OpenJS.NodeJS.LTS --accept-source-agreements
```

### Visual Studio Code 集成

在 VSCode 扩展市场搜索安装 `Claude Code for VS Code`。安装后左侧出现 Claude Code 面板，可在编辑器内对话。右上角出现 Claude Code 图表，可打开新的 Claude Code 窗口。

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
| `Ctrl + `` ` | 切换终端 |

设置中可开启 `Claude Code: Use Terminal` 以默认使用 CLI 模式，功能更全；但 CLI 模式对新手不够友好，熟悉后再切。

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

安装完成后，按屏幕提示完成后续配置。Linux 还需额外安装编译依赖（如 `sudo dnf group install development-tools`），照终端提示做即可。

### 安装 Claude Code

```bash
brew install claude-code
```

> 如果报错找不到 `brew` 命令，说明上一步的安装后配置没做或没生效，照 brew 安装完成后的屏幕提示操作即可。

### 更新

```bash
brew upgrade claude-code
```

### 可选：安装常用软件

安装 Visual Studio Code ：
```bash
brew install --cask visual-studio-code
```

安装 Conda ：
```bash
brew install --cask miniforge
```

### VSCode 集成

在 VSCode 扩展市场搜索安装 `Claude Code for VS Code`。安装后左侧出现 Claude Code 面板，可在编辑器内对话。右上角出现 Claude Code 图表，可打开新的 Claude Code 窗口。

在 VSCode 扩展市场搜索安装 `Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code` 可安装简体中文语言包。重新打开 VSCode 可切换到简体中文。按 `Cmd + Shift + P` 打开命令面板，输入 `>Configure Display Language` 可更改显示语言。

常用快捷键：

| 快捷键 | 作用 |
|--------|------|
| `Cmd + Shift + P` | 命令面板 |
| `Cmd + F` | 查找 |
| `Cmd + D` | 选中相同词，连续按可多选 |
| `Cmd + Enter` | 在下方另起一行 |
| `鼠标中键` | 多光标编辑 |
| `Cmd + `` ` | 切换终端 |

设置中可开启 `Claude Code: Use Terminal` 以默认使用 CLI 模式，功能更全；但 CLI 模式对新手不够友好，熟悉后再切。