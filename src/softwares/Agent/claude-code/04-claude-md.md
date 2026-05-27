# 项目配置

## 什么是 CLAUDE.md

`CLAUDE.md` 是给 AI 看的 `Readme` 文件，在 `claude` 启动时自动读取，用于统一环境配置和编码规范。用 `/init` 创建，用自然语言让 `claude` 修改，也可以手动修改。

CLAUDE.md 和 AGENTS.md 是专为 AI 设计的项目上下文文件，让 Agent 启动时自动读取代码风格、目录约定和测试步骤，无需每次从零理解项目。

## 三种类型

| 类型 | 路径 | 共享范围 | 适用场景 |
|------|------|---------|---------|
| 用户全局 | `~/.claude/CLAUDE.md` | 仅自己 | 个人编码风格、画图规范、Git 习惯。所有项目通用 |
| 项目共享 | `./CLAUDE.md`（子目录也生效） | 团队全员 | 项目背景、目录约定、团队规范。随仓库共享 |
| 项目私有 | `./.claude/CLAUDE.md` | 仅自己 | 个人调试配置、本地路径。不进入 Git，不与他人共享 |

> 三类文件同时存在时，Claude Code 会全部读取，项目级会覆盖全局级的冲突项。

## 用户全局模板

推荐在 `~/.claude/CLAUDE.md` 中配置个人全局规范。

```markdown
Write concisely, academically; no hyperbole, redundancy, or decoration. Omit unnecessary parentheses, quotes, backticks. Hedge only with justification.
Files: UTF-8, LF; use markup for super/subscript, not Unicode chars; no absolute paths.
Python: venv, PEP 8, 4 spaces, ruff linting, pytest (≥80% cov.), NumPy docstrings, clean notebooks.
Data: CSV in `data/raw/` (read-only) & `data/processed/`, with data dictionary.
Figures: Times New Roman 11pt (EN), SimSun (CN), viridis, SVG + 300 dpi PNG.
Git: Conventional Commits (`feat:`, `fix:`, etc.), small commits, pull before push.
Docs: structured notes under `docs/experiments/`, `analysis/`, `meetings/`; use relative path
LaTeX: xelatex, bibtex, vector PDF figures.
Security: no secrets in commits; use env vars.
```

## 项目级模板

```markdown
## 目录约定
- 算例：`cases/`，后处理脚本：`scripts/`，图表输出：`figures/`
- 参考 PDF：`refs/`，原始数据：`data/`

## 画图规范
- 字体：Times New Roman 11pt，配色：viridis / inferno
- 格式：PDF 矢量图，300 dpi，figures/ 目录下
```

## 编写要点

- **粒度适中**：写项目背景（一两句话）、目录约定、常用命令即可，不需要长篇大论。AI 会自己读代码，`CLAUDE.md` 是补上下文
- **什么该写**： AI 从代码里看不出来的，如 Python 环境名、画图规范、数据目录结构、团队约定
- **什么不该写**：代码细节、API 文档。这些直接读代码更准，写在 `CLAUDE.md` 里反而容易过时
- **用 `/init` 起步**：在项目目录下运行 `/init`，AI 自动扫描项目生成初稿，再补充调整
