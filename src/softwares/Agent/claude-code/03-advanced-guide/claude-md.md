# 项目配置（CLAUDE.md）

CLAUDE.md 是给 AI 看的 README，启动时自动读取。把项目背景、目录约定、编码规范写进去，AI 不用每次从零理解你的项目。

用 `/init` 自动生成初稿，之后直接用自然语言让它修改。

## 三种类型

| 类型 | 路径 | 共享范围 |
|------|------|---------|
| 用户全局 | `~/.claude/CLAUDE.md` | 仅自己，所有项目通用 |
| 项目共享 | `./CLAUDE.md` | 团队全员，随仓库共享 |
| 项目私有 | `./.claude/CLAUDE.md` | 仅自己，不入 Git |

三类同时存在时 Claude 全部读取，项目级覆盖全局级的冲突项。

## 写什么

写 AI 从代码里看不出来的东西：

- 项目背景（一两句话）
- 目录约定（数据在哪、输出在哪）
- 画图规范（字体、配色、格式）
- 常用命令（构建、测试、运行）

不该写：代码细节和 API 文档——直接读代码更准，写进 CLAUDE.md 反而容易过时。

## 用户全局模板

```markdown
Write concisely, academically; no hyperbole, redundancy, or decoration.
Files: UTF-8, LF; use markup for super/subscript, not Unicode chars.
Python: venv, PEP 8, 4 spaces, ruff linting, pytest (≥80% cov.), NumPy docstrings.
Data: CSV in data/raw/ (read-only) & data/processed/, with data dictionary.
Figures: Times New Roman 11pt (EN), SimSun (CN), viridis, SVG + 300 dpi PNG.
Git: Conventional Commits (feat:, fix:), small commits, pull before push.
Security: no secrets in commits; use env vars.
```

## 项目级模板

```markdown
## 目录约定
- 算例：cases/，后处理脚本：scripts/，图表输出：figures/
- 参考 PDF：refs/，原始数据：data/

## 画图规范
- 字体：Times New Roman 11pt，配色：viridis / inferno
- 格式：PDF 矢量图，300 dpi
```

## 编写要点

- 每行问自己：删掉这行，AI 会犯错吗？不会就删
- 控制在 ~200 行以内，内容过多时可拆分为多个文件放到 `.claude/rules/`，用 `@import` 引入
- 用 `/init` 起步，再手动调整
