# 安装

## Windows

### 设置安装路径

按 `Win` 键，输入 `powershell`，回车，执行：

```powershell
$env:C3U_APPS_ROOT = "D:\Apps"
$env:C3U_GIT_SERVER = "<IP>:<PORT>"
```

> 可将 `D:\Apps` 改为其他磁盘或路径。全文免管理员权限。

### Claude Code 与 uv（单文件程序）

直接下载到 bin 目录，无需安装：

```powershell
New-Item -ItemType Directory -Force -Path $env:C3U_APPS_ROOT\bin
Invoke-WebRequest -Uri "http://${env:C3U_GIT_SERVER}/api/packages/Zxzz106/generic/claude-code/2.1.169/claude.exe" -OutFile "$env:C3U_APPS_ROOT\bin\claude.exe"
Invoke-WebRequest -Uri "http://${env:C3U_GIT_SERVER}/..." -OutFile "$env:C3U_APPS_ROOT\bin\uv.exe"
```

### Git

```powershell
Start-Process -Wait -FilePath "Git-2.XX.X-64-bit.exe" -ArgumentList "/DIR=""$env:C3U_APPS_ROOT\Git"" /VERYSILENT /NORESTART /ALLUSERS=0"
```

### Visual Studio Code

需使用 **User Installer**（非 System Installer）：

```powershell
Start-Process -Wait -FilePath "VSCodeUserSetup-x64-XX.X.X.exe" -ArgumentList "/DIR=""$env:C3U_APPS_ROOT\VSCode"" /VERYSILENT /MERGETASKS=!runcode"
```

### Python

```powershell
Start-Process -Wait -FilePath "python-3.12.X-amd64.exe" -ArgumentList "/quiet InstallAllUsers=0 PrependPath=0 TargetDir=""$env:C3U_APPS_ROOT\Python"""
```

### Pandoc

使用 zip 包解压，免安装：

```powershell
Expand-Archive -Path "pandoc-XX.X-windows-x86_64.zip" -DestinationPath "$env:C3U_APPS_ROOT\Pandoc"
```

### 设置 PATH

```powershell
$binPaths = @(
    "$env:C3U_APPS_ROOT\bin",
    "$env:C3U_APPS_ROOT\Git\bin",
    "$env:C3U_APPS_ROOT\Python",
    "$env:C3U_APPS_ROOT\Python\Scripts",
    "$env:C3U_APPS_ROOT\Pandoc"
)
[Environment]::SetEnvironmentVariable("Path", ($binPaths -join ";") + ";" + [Environment]::GetEnvironmentVariable("Path", "User"), "User")
```

> 重新打开终端，使 PATH 生效。

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

然后安装 Claude Code：

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