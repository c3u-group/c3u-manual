# 常见问题

## 启动报 "401 Unauthorized"

检查 `~/.claude/settings.json` 中的 `ANTHROPIC_AUTH_TOKEN` 是否正确填入了 DeepSeek API Key。

## winget 下载很慢或失败

从 [Claude Code 官网](https://claude.ai/code) 下载安装包手动安装。

## 输入 claude 提示命令找不到

- 检查是否重新打开了终端（安装后需刷新 PATH）
- 运行 `winget list Anthropic.ClaudeCode` 确认已安装
- 尝试重启电脑

## 每次操作都要确认

使用 `/permissions` 预设工具权限，或按 `Shift + Tab` 切换到 auto-accept 模式。

## DeepSeek API 提示额度不足

前往 [DeepSeek 开放平台](https://platform.deepseek.com) 查看余额和充值。

## winget upgrade 更新失败

```powershell
winget uninstall Anthropic.ClaudeCode
winget install Anthropic.ClaudeCode --accept-source-agreements
```

配置文件（`~/.claude/`）不受卸载影响。
