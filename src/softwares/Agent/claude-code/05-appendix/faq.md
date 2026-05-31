# 常见问题与故障排查

## 启动报错

### 输入 claude 提示命令找不到

- 检查是否重新打开了终端（安装后需刷新 PATH）
- 运行 `winget list Anthropic.ClaudeCode`（Windows）或 `brew list claude-code`（macOS）确认已安装
- 尝试重启电脑

### 启动报 "401 Unauthorized"

检查 `~/.claude/settings.json` 中的 `ANTHROPIC_AUTH_TOKEN` 是否正确填入了 DeepSeek API Key。

### 启动后无响应或直接报错

1. 运行 `/doctor` 检查安装状态
2. 确认 `~/.claude/settings.json` 格式正确（多余的逗号、引号不匹配、行内 `#` 注释都会导致 JSON 解析失败）
3. 确认 API Key 有效且有余额

## 权限问题

### 每次操作都要确认

使用 `/permissions` 预设工具权限，或按 `Shift + Tab` 切换到 auto-accept 模式。日常推荐 default 模式，简单重复操作时临时切 auto-accept，完成后切回。

## API 与费用

### DeepSeek API 提示额度不足

前往 [DeepSeek 开放平台](https://platform.deepseek.com) 查看余额和充值。

## 生成质量

### 生成内容质量差

- 检查 CLAUDE.md 是否提供了足够的项目背景
- 用 `/model` 切换到更强的模型（如 pro）
- 重新组织 Prompt：明确输入、输出格式和验收标准
- 用 `/clear` 清空上下文后重试（上下文过长时模型注意力会下降）

## 文件访问

### 文件未被 AI 读取

- 检查 `.claudeignore` 是否排除了该文件
- 用 `@文件路径` 显式引用

### .claudeignore 不生效

确认文件位于项目根目录，格式与 `.gitignore` 相同，每行一个 glob 模式。修改后需重启 Claude Code 或 `/clear`。

## 安装与更新

### winget 下载很慢或失败

从 [Claude Code 官网](https://claude.ai/code) 下载安装包手动安装。

### winget upgrade 更新失败

```powershell
winget uninstall Anthropic.ClaudeCode
winget install Anthropic.ClaudeCode --accept-source-agreements
```

配置文件（`~/.claude/`）不受卸载影响。

### Claude Code 更新后行为异常

1. 检查 `~/.claude/settings.json` 是否与新版本兼容
2. 检查已安装插件是否有更新：`/plugin`
3. 清理并重新安装：卸载 → 重装
