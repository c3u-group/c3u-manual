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
| `MessageDisplay` | 消息显示前，可转换或隐藏文本 |

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

## 条件匹配 `if`

`if` 字段支持通配符匹配工具调用的具体参数，仅在匹配时才触发 hook。比 `matcher` 粒度更细——`matcher` 限定工具类型，`if` 限定具体操作内容：

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "",
      "hooks": [{
        "type": "command",
        "command": "echo 'About to commit...'",
        "if": "Bash(git commit*)"
      }]
    }]
  }
}
```

`if` 同样支持 `Write(*.py)`、`Read(*.env)` 等文件匹配模式。

## `continueOnBlock`

PostToolUse hook 拒绝工具调用时，默认会中断 agent。设置 `continueOnBlock: true` 后，hook 可拒绝某次工具调用但不终止 agent——agent 收到拒绝信号后调整策略继续执行：

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write",
      "hooks": [{
        "type": "command",
        "command": "python lint-check.py ${CLAUDE_CODE_LAST_FILE}",
        "if": "Write(*.py)",
        "continueOnBlock": true
      }]
    }]
  }
}
```

## 读取 effort level

Hook 可通过环境变量 `$CLAUDE_EFFORT` 或输入中的 `effort.level` 字段获取当前推理深度，用于在不同 effort 下执行不同逻辑：

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "if [ \"$CLAUDE_EFFORT\" = \"xhigh\" ]; then echo 'Ultracode mode: running full validation'; else echo 'Standard check'; fi"
      }]
    }]
  }
}
```

## `MessageDisplay` hook

新增事件类型，在消息显示给用户之前触发，可转换或隐藏消息文本：

```json
{
  "hooks": {
    "MessageDisplay": [{
      "matcher": "",
      "hooks": [{
        "type": "command",
        "command": "sed 's/SECRET_KEY=..../SECRET_KEY=****/' "
      }]
    }]
  }
}
```

## `args` 数组传参

`args: string[]` 字段直接以数组形式传递参数，Claude Code 直接启动命令而不经过 shell，避免引号转义问题：

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "notify-user",
        "args": ["--title", "Command Running", "--message", "Executing: ${CLAUDE_CODE_LAST_COMMAND}"]
      }]
    }]
  }
}
```
