# 快速配置

按顺序完成以下步骤即可使用 DeepSeek API + Claude Code。

## 1. 安装

按 `Win` 键，输入 `powershell`，回车，执行：

```powershell
winget install Anthropic.ClaudeCode --accept-source-agreements
winget install Git.Git --accept-source-agreements
winget install Microsoft.VisualStudioCode --accept-source-agreements
winget install Python.Python.3.12 --accept-source-agreements
winget install --id Astral.uv --accept-source-agreements
winget install --id JohnMacFarlane.Pandoc --accept-source-agreements
```

## 2. 获取 API Key

前往 [DeepSeek 开放平台](https://platform.deepseek.com)，注册、实名认证、充值后创建 API Key，复制备用。

## 3. 配置 API

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
    }
} | ConvertTo-Json | Out-File $env:USERPROFILE\.claude\settings.json -Encoding UTF8
```

## 4. VSCode 跳过登录

VSCode 插件除上述终端配置外，还需在设置中禁用登录提示：

1. 右下角齿轮 → 设置，或 `Ctrl + ,`
2. 搜索 `claudeCode.disableLoginPrompt`，勾选启用

## 5. 启动

关闭终端重新打开，在项目目录下输入 `claude` 即可启动。

## 6. 安装推荐 Plugin

启动后在 Claude Code 中依次执行。如 GitHub 连接不稳定，先设置代理：

```bash
export HTTPS_PROXY=http://127.0.0.1:7890
```

```bash
pip install pyright
claude plugin install pyright-lsp
claude plugin install superpowers
claude plugin marketplace add forrestchang/andrej-karpathy-skills
claude plugin install andrej-karpathy-skills@karpathy-skills
claude plugin marketplace add Imbad0202/academic-research-skills
claude plugin install academic-research-skills
```
