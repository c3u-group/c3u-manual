# 配置

## 获取 DeepSeek API Key

前往 [DeepSeek 开放平台](https://platform.deepseek.com)，注册、实名认证、充值后创建 API Key，复制备用。

## Windows（终端）

Claude Code 首次启动会要求登录 Anthropic 账号。使用 DeepSeek API 时无需登录，通过配置文件跳过即可。在 PowerShell 中执行：

设置 API Key（替换为已创建的 DeepSeek API Key）：

```powershell
$env:DEEPSEEK_API_KEY='你的API_KEY'
```

创建配置文件：

```powershell
[Environment]::SetEnvironmentVariable("DEEPSEEK_API_KEY", $env:DEEPSEEK_API_KEY, "User")

# Claude Code 默认要求登录 Anthropic 账号，此文件跳过该步骤
@{ hasCompletedOnboarding = $true } | ConvertTo-Json | Out-File $env:USERPROFILE\.claude.json -Encoding UTF8

# 创建配置文件，将 Claude Code 指向 DeepSeek API
New-Item -ItemType Directory -Force -Path $env:USERPROFILE\.claude
@{
    env = @{
        ANTHROPIC_AUTH_TOKEN = $env:DEEPSEEK_API_KEY         # API 密钥
        ANTHROPIC_BASE_URL = "https://api.deepseek.com/anthropic"  # 将请求发往 DeepSeek
        ANTHROPIC_MODEL = "deepseek-v4-pro[1m]"               # 默认模型
        ANTHROPIC_DEFAULT_HAIKU_MODEL = "deepseek-v4-flash"   # 轻量任务模型
        ANTHROPIC_DEFAULT_SONNET_MODEL = "deepseek-v4-pro"    # 中等任务模型
        ANTHROPIC_DEFAULT_OPUS_MODEL = "deepseek-v4-pro"      # 复杂任务模型
        CLAUDE_CODE_SUBAGENT_MODEL = "deepseek-v4-pro"        # Subagent 模型
        CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC = "1"   # 禁用非必要网络请求
        CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK = "1"  # 禁用非流式回退
        CLAUDE_CODE_EFFORT_LEVEL = "max"                 # 推理深度设为最高
    }
} | ConvertTo-Json | Out-File $env:USERPROFILE\.claude\settings.json -Encoding UTF8
```

## macOS / Linux

在终端中执行：

设置 API Key（替换为已创建的 DeepSeek API Key）：

```bash
DEEPSEEK_API_KEY='你的API_KEY'
```

创建配置文件：

```bash
# Claude Code 默认要求登录 Anthropic 账号，此文件跳过该步骤
echo '{"hasCompletedOnboarding": true}' > ~/.claude.json

# 创建配置文件，将 Claude Code 指向 DeepSeek API
# 各字段说明见下方注释，JSON 不支持行内注释，请勿在配置内添加 # 号
mkdir -p ~/.claude
cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "$DEEPSEEK_API_KEY",
    "ANTHROPIC_BASE_URL": "https://api.deepseek.com/anthropic",
    "ANTHROPIC_MODEL": "deepseek-v4-pro[1m]",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-v4-flash",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek-v4-pro",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek-v4-pro",
    "CLAUDE_CODE_SUBAGENT_MODEL": "deepseek-v4-pro",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK": "1",
    "CLAUDE_CODE_EFFORT_LEVEL": "max"
  }
}
EOF
```

各字段含义：

| 字段 | 含义 |
|------|------|
| `ANTHROPIC_AUTH_TOKEN` | API 密钥 |
| `ANTHROPIC_BASE_URL` | API 请求地址，此处指向 DeepSeek |
| `ANTHROPIC_MODEL` | 默认主模型，`[1m]` 表示启用 1M token 上下文窗口 |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | 轻量任务模型（如文件搜索、格式检查） |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | 中等任务模型 |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | 复杂任务模型（深度推理、多步规划） |
| `CLAUDE_CODE_SUBAGENT_MODEL` | Subagent 默认模型 |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | 禁用非必要网络请求（如版本检查） |
| `CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK` | 禁用非流式回退 |
| `CLAUDE_CODE_EFFORT_LEVEL` | 推理深度（`max` 为最高） |

## VSCode 跳过登录

VSCode 插件除上述步骤外，还需在设置中禁用登录提示：

1. 右下角齿轮 → 设置，或 `Cmd + ,`(macOS) / `Ctrl + ,`(Windows/Linux)
2. 搜索 `claudeCode.disableLoginPrompt`，勾选启用

## 验证

关闭终端重新打开，输入：

```bash
claude --version
```

显示版本号即配置成功。之后在项目目录下输入 `claude` 即可启动。
