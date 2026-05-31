# Hooks 进阶

Hooks 可以在 Claude Code 的生命周期事件中自动触发脚本或 Agent。进阶用法包括条件匹配、多 hook 链和自定义事件处理。

## Hook 事件类型

| 事件 | 触发时机 |
|------|---------|
| `PreToolUse` | 工具调用前，可拦截或修改 |
| `PostToolUse` | 工具调用后，可处理结果 |
| `Notification` | 需要用户关注时 |
| `Stop` | Agent 停止时 |
| `SessionStart` | 会话启动时 |

## 条件匹配

通过 `matcher` 限定 hook 的生效范围：

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "echo 'Running command...'",
        "if": "Bash(git commit*)"
      }]
    }]
  }
}
```

`matcher` 支持工具名（`Bash`、`Write`、`Read` 等），`if` 支持通配符匹配具体操作。

## 多 Hook 链

同一事件可注册多个 hook，按顺序执行：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "echo 'Step 1: lint check'" },
          { "type": "command", "command": "echo 'Step 2: format check'" }
        ]
      }
    ]
  }
}
```

## 实用模板

**自动格式化**：

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write",
      "hooks": [{
        "type": "command",
        "command": "ruff format ${CLAUDE_CODE_LAST_FILE}",
        "if": "Write(*.py)"
      }]
    }]
  }
}
```

**会话启动注入**：

```json
{
  "hooks": {
    "SessionStart": [{
      "matcher": "",
      "hooks": [{
        "type": "agent",
        "prompt": "检查项目依赖是否完整，如有缺失提醒用户安装"
      }]
    }]
  }
}
```
