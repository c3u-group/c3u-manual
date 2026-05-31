# 常用命令

## 斜杠命令

| 命令 | 作用 |
|------|------|
| [`/init`](#init) | 扫描项目，自动生成 `CLAUDE.md` |
| [`/plan`](#plan) | 先出方案，确认后再执行 |
| [`@文件/文件夹`](#at) | 将文件内容注入对话上下文 |
| [`/clear`](#clear) | 清空对话历史，开启全新会话 |
| [`/compact`](#compact) | 压缩上下文，保留关键决策 |
| [`/model`](#model) | 切换模型 |
| [`/rewind`](#rewind)（或两次 `Esc`） | 回退到之前的对话节点 |
| [`/help`](#help) | 查看完整帮助 |

完整命令列表见 [附录](../05-appendix/reference.md)。

## 键盘快捷键

| 快捷键 | 作用 |
|------|------|
| `Esc` / `Ctrl + C` | 停止当前操作 |
| `Tab` | 自动补全文件路径和命令 |
| `Shift + Tab` | 切换 auto-accept / plan 模式 |
| `Ctrl + G` | 打开编辑器编辑 Prompt 或 Plan |
| `!` | 临时执行 shell 命令 |
| `&` | 后台执行命令（`/tasks` 查看进度） |
| `\ + Enter` | 换行 |

## 命令详解

### `/init` {#init}

扫描项目目录，自动生成 `CLAUDE.md`，后续可用自然语言修改。

```text
/init
```

### `/plan` {#plan}

先分析需求出方案，确认后再执行。仅影响当前请求，下一次对话恢复正常模式。

需要所有操作都先出方案的，用 `Shift + Tab` 切换到 plan 模式——该模式下每次交互都先生成方案等待确认，适合复杂任务全程谨慎操作。再次 `Shift + Tab` 切回。

```text
/plan 处理 data/raw/ 下的 TG 数据，归一化、计算 DTG、提取特征温度、画对比图
```

### `@文件/文件夹` {#at}

将文件内容注入对话。输入 `@` 按 `Tab` 补全，也可将文件拖入终端。

```text
读取 @data/TGA_raw.csv 的前 10 行
参考 @scripts/baseline.py 的处理流程
```

### `/clear` {#clear}

清空全部对话历史，文件修改不受影响。任务切换时使用。

```text
/clear
```

### `/compact` {#compact}

将对话压缩为摘要，释放上下文，保留关键决策。

```text
/compact
/compact 保留认证模块的改动
```

### `/model` {#model}

会话中切换模型。

```text
/model                # 打开选择器
/model flash          # 切到轻量模型
```

### `/rewind` {#rewind}

回退到历史检查点（等同于两次 `Esc`）。Claude 每次修改前自动创建检查点，可选择仅回退代码、仅回退对话、或全部回退。

```text
/rewind
```

### `/help` {#help}

查看完整命令列表和配置选项。

```text
/help
```
