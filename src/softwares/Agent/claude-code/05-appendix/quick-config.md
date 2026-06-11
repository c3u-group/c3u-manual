# 快速配置

按顺序完成以下步骤即可使用 DeepSeek API + Claude Code。

## 1. 安装

按 `Win` 键，输入 `powershell`，回车，执行：

```powershell
$env:C3U_APPS_ROOT = "D:\Apps"
$env:C3U_GIT_SERVER = "<IP>:<PORT>"
```

> 可将 `D:\Apps` 改为其他磁盘或路径。全文免管理员权限。

单文件程序（直接下载，无需安装）：

```powershell
New-Item -ItemType Directory -Force -Path $env:C3U_APPS_ROOT\bin
Invoke-WebRequest -Uri "http://${env:C3U_GIT_SERVER}/api/packages/Zxzz106/generic/claude-code/2.1.169/claude.exe" -OutFile "$env:C3U_APPS_ROOT\bin\claude.exe"
Invoke-WebRequest -Uri "http://${env:C3U_GIT_SERVER}/..." -OutFile "$env:C3U_APPS_ROOT\bin\uv.exe"
```

Git / VSCode / Python（静默安装，免管理员）：

```powershell
Start-Process -Wait -FilePath "Git-2.XX.X-64-bit.exe" -ArgumentList "/DIR=""$env:C3U_APPS_ROOT\Git"" /VERYSILENT /NORESTART /ALLUSERS=0"
Start-Process -Wait -FilePath "VSCodeUserSetup-x64-XX.X.X.exe" -ArgumentList "/DIR=""$env:C3U_APPS_ROOT\VSCode"" /VERYSILENT /MERGETASKS=!runcode"
Start-Process -Wait -FilePath "python-3.12.X-amd64.exe" -ArgumentList "/quiet InstallAllUsers=0 PrependPath=0 TargetDir=""$env:C3U_APPS_ROOT\Python"""
```

Pandoc（zip 解压，免安装）：

```powershell
Expand-Archive -Path "pandoc-XX.X-windows-x86_64.zip" -DestinationPath "$env:C3U_APPS_ROOT\Pandoc"
```

设置 PATH：

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

## 2. 配置 Git

关闭终端重新打开，执行（替换为自己的姓名和邮箱）：

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## 3. 获取 API Key

前往 [DeepSeek 开放平台](https://platform.deepseek.com)，注册、实名认证、充值后创建 API Key，复制备用。

## 4. 配置 API

在 PowerShell 中执行：

设置 API Key（替换为已创建的 DeepSeek API Key）：

```powershell
$env:DEEPSEEK_API_KEY='你的API_KEY'
```

创建配置文件：

```powershell
[Environment]::SetEnvironmentVariable("DEEPSEEK_API_KEY", $env:DEEPSEEK_API_KEY, "User")
@{ hasCompletedOnboarding = $true } | ConvertTo-Json | Out-File $env:USERPROFILE\.claude.json -Encoding UTF8

New-Item -ItemType Directory -Force -Path $env:USERPROFILE\.claude
@{
    env = @{
        ANTHROPIC_AUTH_TOKEN = $env:DEEPSEEK_API_KEY
        ANTHROPIC_BASE_URL = "https://api.deepseek.com/anthropic"
        ANTHROPIC_MODEL = "deepseek-v4-pro[1m]"
        ANTHROPIC_DEFAULT_HAIKU_MODEL = "deepseek-v4-flash"
        ANTHROPIC_DEFAULT_SONNET_MODEL = "deepseek-v4-pro"
        ANTHROPIC_DEFAULT_OPUS_MODEL = "deepseek-v4-pro"
        CLAUDE_CODE_SUBAGENT_MODEL = "deepseek-v4-pro"
        CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC = "1"
        CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK = "1"
        CLAUDE_CODE_EFFORT_LEVEL = "max"
        CLAUDE_CODE_AUTO_COMPACT_WINDOW = "200000"
        DISABLE_AUTO_COMPACT = "1"
        CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY = "1"
        CLAUDE_CODE_PLUGIN_PREFER_HTTPS = "1"
        DISABLE_DOCTOR_COMMAND = "1"
        DISABLE_LOGIN_COMMAND = "1"
        DISABLE_LOGOUT_COMMAND = "1"
        DO_NOT_TRACK = "1"
        DISABLE_UPGRADE_COMMAND = "1"
    }
} | ConvertTo-Json | Out-File $env:USERPROFILE\.claude\settings.json -Encoding UTF8
```

## 5. VSCode 插件

打开 VSCode，在扩展市场（`Ctrl + Shift + X`）搜索安装：

- `Claude Code for VS Code` — 在编辑器内使用 Claude Code
- `Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code` — 简体中文界面

## 6. VSCode 跳过登录

VSCode 插件需在设置中禁用登录提示：

1. 左下角齿轮 → 设置，或 `Ctrl + ,`
2. 搜索 `claudeCode.disableLoginPrompt`，勾选启用

## 7. 启动

关闭终端重新打开，在项目目录下输入 `claude` 即可启动。

## 8. 安装推荐 Plugin

启动后在 Claude Code 中依次执行。

使用步骤 1 中设置的 `$env:C3U_GIT_SERVER`，执行：

```powershell
claude plugin marketplace add https://github.com/anthropics/claude-plugins-official
claude plugin marketplace add http://$env:C3U_GIT_SERVER/Zxzz106/andrej-karpathy-skills.git
claude plugin marketplace add http://$env:C3U_GIT_SERVER/Zxzz106/academic-research-skills.git
claude plugin marketplace add http://$env:C3U_GIT_SERVER/Zxzz106/c3u-ccplugins.git
```

### pyright-lsp

Python LSP 支持，提供代码智能（类型提示、跳转定义、查找引用）：

```bash
uv tool install pyright
claude plugin install pyright-lsp
```

### superpowers

14 个工程规范 skill，覆盖开发全流程。详细用法见 [插件指南](./plugins/superpowers-guide.md)：

```bash
claude plugin install superpowers
```

### andrej-karpathy-skills

Karpathy 四条编码原则（先想再写、简洁优先、精准修改、目标驱动）。详细用法见 [插件指南](./plugins/karpathy-guide.md)：

```bash
claude plugin install andrej-karpathy-skills@karpathy-skills
```

### academic-research-skills

学术研究全流程（文献调研、论文撰写、同行评审、修订）。详细用法见 [插件指南](./plugins/ars-guide.md)：

```bash
claude plugin install academic-research-skills
```

### c3u-ccplugins

自用 plugin 集合，按功能域划分为文献检索、文献加工、输出审查与文档转换 4 个 plugin。详细用法见 [插件指南](./plugins/c3u-ccplugins-guide.md)：

```bash
claude plugin install literature-retrieval@c3u-ccplugins
claude plugin install literature-processing@c3u-ccplugins
claude plugin install critique@c3u-ccplugins
claude plugin install file-converter@c3u-ccplugins
```

literature-retrieval 依赖 uv，需 Scopus API Key（超星仅需机构 IP，无需密钥）：前往 [Elsevier Developer Portal](https://dev.elsevier.com/apikey/manage) 创建 Scopus API Key，然后设置环境变量：

```powershell
[Environment]::SetEnvironmentVariable("SCOPUS_API_KEY", "你的API_KEY", "User")
```

file-converter 依赖 uv，需 MinerU API Key：前往 [MinerU 开放平台](https://mineru.net/apiManage/token) 创建，然后设置环境变量：

```powershell
[Environment]::SetEnvironmentVariable("MINERU_API_KEY", "你的API_KEY", "User")
```

首次使用前预热 uv 缓存：

```bash
claude -p --permission-mode bypassPermissions 'Warm uv cache for literature-retrieval@c3u-ccplugins: run uv run ${CLAUDE_PLUGIN_ROOT}/servers/chaoxing/mcp_server.py --test && uv run ${CLAUDE_PLUGIN_ROOT}/servers/scopus/mcp_server.py --test'
claude -p --permission-mode bypassPermissions 'Warm uv cache for file-converter@c3u-ccplugins: run uv run ${CLAUDE_PLUGIN_ROOT}/servers/mcp_server.py --test'
```
