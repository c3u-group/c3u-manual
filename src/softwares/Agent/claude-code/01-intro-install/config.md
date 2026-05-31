# 配置

[Windows](#windows) · [macOS / Linux](#macos--linux)

## 获取 DeepSeek API Key

前往 [DeepSeek 开放平台](https://platform.deepseek.com)，注册、实名认证、充值后创建 API Key，复制备用。

## Windows

```powershell
$env:DEEPSEEK_API_KEY='你的API_KEY'
[Environment]::SetEnvironmentVariable("DEEPSEEK_API_KEY", $env:DEEPSEEK_API_KEY, "User")

# 跳过登录
@{ hasCompletedOnboarding = $true } | ConvertTo-Json | Out-File $env:USERPROFILE\.claude.json -Encoding UTF8

# 创建设置文件
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

## macOS / Linux

```bash
DEEPSEEK_API_KEY='你的API_KEY'

# 跳过登录
echo '{"hasCompletedOnboarding": true}' > ~/.claude.json

# 创建设置文件
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

## 验证

关闭终端重新打开，输入：

```bash
claude --version
```

显示版本号即配置成功。之后在项目目录下输入 `claude` 即可启动。
