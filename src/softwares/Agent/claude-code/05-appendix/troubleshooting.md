# 故障排查

## 启动后无响应或报错

1. 运行 `/doctor` 检查安装状态
2. 确认 `~/.claude/settings.json` 格式正确（多余的逗号、引号不匹配会导致 JSON 解析失败）
3. 确认 API Key 有效且有余额

## 生成内容质量差

- 检查 CLAUDE.md 是否提供了足够的项目背景
- 用 `/model` 切换到更强的模型（如 pro）
- 重新组织 Prompt：明确输入、输出格式和验收标准
- 用 `/clear` 清空上下文后重试（上下文过长时模型注意力会下降）

## 权限弹窗过多

- 使用 `/permissions` 预设常用工具的权限
- 在信任的项目目录中可切换到 auto-accept 模式（`Shift + Tab`）

## Claude Code 更新后行为异常

1. 检查 `~/.claude/settings.json` 是否与新版本兼容
2. 检查已安装插件是否有更新：`/plugin`
3. 清理并重新安装：卸载 → 重装

## 文件未被 AI 读取

- 检查 `.claudeignore` 是否排除了该文件
- 用 `@文件路径` 显式引用

## .claudeignore 不生效

确认文件位于项目根目录，格式与 `.gitignore` 相同，每行一个 glob 模式。修改后需重启 Claude Code 或 `/clear`。
