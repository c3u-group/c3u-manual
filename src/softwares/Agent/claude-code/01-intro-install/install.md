# 安装

## Windows

### 设置安装路径

按 `Win` 键，输入 `powershell`，回车，执行：

```powershell
$env:C3U_APPS_ROOT = "D:\Apps"
$env:C3U_GIT_SERVER = "<IP>:<PORT>"
```

> 可将 `D:\Apps` 改为其他磁盘或路径。全文免管理员权限。

### Claude Code

```powershell
New-Item -ItemType Directory -Force -Path $env:C3U_APPS_ROOT\bin
Invoke-WebRequest -Uri "http://${env:C3U_GIT_SERVER}/api/packages/Zxzz106/generic/claude-code/2.1.169/claude.exe" -OutFile "$env:C3U_APPS_ROOT\bin\claude.exe"
```

### uv

```powershell
Invoke-WebRequest -Uri "http://${env:C3U_GIT_SERVER}/api/packages/Zxzz106/generic/uv/0.11.19/uv-x86_64-pc-windows-msvc.zip" -OutFile "$env:TEMP\uv.zip"
Expand-Archive -Path "$env:TEMP\uv.zip" -DestinationPath "$env:C3U_APPS_ROOT\bin"
[Environment]::SetEnvironmentVariable("UV_PYTHON_BIN_DIR", "$env:C3U_APPS_ROOT\uv\python\shims", "User")
[Environment]::SetEnvironmentVariable("UV_PYTHON_INSTALL_DIR", "$env:C3U_APPS_ROOT\uv\python\versions", "User")
[Environment]::SetEnvironmentVariable("UV_TOOL_BIN_DIR", "$env:C3U_APPS_ROOT\uv\tools\shims", "User")
[Environment]::SetEnvironmentVariable("UV_TOOL_DIR", "$env:C3U_APPS_ROOT\uv\tools\versions", "User")
[Environment]::SetEnvironmentVariable("UV_CACHE_DIR", "$env:C3U_APPS_ROOT\uv\cache", "User")
```

### Git

```powershell
Invoke-WebRequest -Uri "http://${env:C3U_GIT_SERVER}/api/packages/Zxzz106/generic/git/2.54.0/PortableGit-2.54.0-64-bit.7z.exe" -OutFile "$env:TEMP\PortableGit.exe"
Start-Process -Wait -FilePath "$env:TEMP\PortableGit.exe" -ArgumentList "-o`"$env:C3U_APPS_ROOT\Git`" -y"
[Environment]::SetEnvironmentVariable("GIT_INSTALL_ROOT", "$env:C3U_APPS_ROOT\Git", "User")
```

### Visual Studio Code

从官方下载 User Installer：

```powershell
Invoke-WebRequest -Uri "https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user" -OutFile "$env:TEMP\VSCodeUserSetup.exe"
Start-Process -Wait -FilePath "$env:TEMP\VSCodeUserSetup.exe" -ArgumentList "/DIR=""$env:C3U_APPS_ROOT\VSCode"" /VERYSILENT /MERGETASKS=!runcode"
```

### Python

```powershell
Invoke-WebRequest -Uri "http://${env:C3U_GIT_SERVER}/api/packages/Zxzz106/generic/python/3.14.6/python-3.14.6-amd64.exe" -OutFile "$env:TEMP\python.exe"
Start-Process -Wait -FilePath "$env:TEMP\python.exe" -ArgumentList "/quiet InstallAllUsers=0 PrependPath=0 TargetDir=""$env:C3U_APPS_ROOT\Python"""
```

### Pandoc

```powershell
Invoke-WebRequest -Uri "http://${env:C3U_GIT_SERVER}/api/packages/Zxzz106/generic/pandoc/3.10/pandoc-3.10-windows-x86_64.zip" -OutFile "$env:TEMP\pandoc.zip"
Expand-Archive -Path "$env:TEMP\pandoc.zip" -DestinationPath "$env:TEMP\pandoc_extract"
New-Item -ItemType Directory -Force -Path "$env:C3U_APPS_ROOT\Pandoc"
Move-Item -Path "$env:TEMP\pandoc_extract\pandoc-3.10\*" -Destination "$env:C3U_APPS_ROOT\Pandoc" -Force
```

### 设置 PATH

```powershell
$binPaths = @(
    "$env:C3U_APPS_ROOT\bin",
    "$env:C3U_APPS_ROOT\uv\python\shims",
    "$env:C3U_APPS_ROOT\uv\tools\shims",
    "$env:C3U_APPS_ROOT\Git\cmd",
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