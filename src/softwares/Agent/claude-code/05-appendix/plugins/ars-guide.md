# Academic Research Skills 使用指南

ARS 是一套 Claude Code 学术研究技能包，覆盖从文献调研到论文定稿的全流程。安装后用自然语言描述任务，AI 自动匹配对应 skill 和模式。也可用 `/ars-*` 命令直接指定。

## 安装

```bash
claude plugin marketplace add Imbad0202/academic-research-skills
claude plugin install academic-research-skills
```

> GitHub 访问可能不稳定，如安装失败，先设置代理：
> macOS / Linux：`export HTTPS_PROXY=http://127.0.0.1:7890`
> Windows：`$env:HTTPS_PROXY=http://127.0.0.1:7890`

## 四个 Skill

### deep-research — 文献调研

13 个 Agent，7 种模式。

```text
"Research the impact of AI on higher education"      → full
"Give me a quick brief on X"                         → quick
"Do a systematic review on X with PRISMA"            → systematic-review
"Guide my research on X"                             → socratic（意图模糊时默认）
"Fact-check these claims"                            → fact-check
"Do a literature review on X"                        → lit-review
"Review this paper's research quality"               → review
```

### academic-paper — 论文撰写

12 个 Agent，10 种模式。支持 6 种论文结构、5 种引用格式。中英双语摘要。

```text
"Write a paper on X"                                  → full
"Guide me through writing a paper"                    → plan（模糊时默认）
"Build a paper outline"                               → outline-only
"I have a draft, here are reviewer comments"          → revision
"Parse these reviewer comments into a roadmap"        → revision-coach
"Write an abstract for this paper"                    → abstract-only
"Turn this into a literature review paper"            → lit-review
"Convert to LaTeX" / "Convert citations to IEEE"      → format-convert
"Check citations"                                     → citation-check
"Generate an AI disclosure statement for NeurIPS"     → disclosure
```

### academic-paper-reviewer — 论文审查

7 个 Agent，6 种模式。模拟主编 + 3 审稿人 + 魔鬼代言人（专门从反面攻击论点，暴露最弱环节），0-100 品质量表。≥80 接受、65-79 小修、50-64 大修、<50 退稿。

```text
"Review this paper"                                   → full
"Quick assessment of this paper"                      → quick
"Guide me to improve this paper"                      → guided
"Check the methodology"                               → methodology-focus
"Verify the revisions"                                → re-review
"Calibrate this reviewer against my gold set"         → calibration
```

### academic-pipeline — 全流程编排

10 阶段调度器，两个学术诚信闸门（Stage 2.5 / 4.5）不可跳过。

```text
"I want to write a complete research paper"           → 从 Stage 1 开始
"I already have a paper, review it"                   → 从 Stage 2.5 进入
"I received reviewer comments"                        → 从 Stage 4 进入
```

Pipeline 结束自动产出**过程记录**与 6 维度协作质量评估。

## Slash 命令

日常使用不需要记命令，自然语言描述任务即可。以下命令供精确调用。

**调研**

| 命令 | 作用 |
|------|------|
| `/ars-lit-review "主题"` | 文献综述，输出带注释的参考文献列表 |

**写作**

| 命令 | 作用 |
|------|------|
| `/ars-plan` | Socratic 式章节规划，不确定怎么开头时用 |
| `/ars-outline` | 详细大纲 + 证据图谱 |
| `/ars-full` | 完整论文 |
| `/ars-abstract` | 双语摘要 + 关键词 |

**修订**

| 命令 | 作用 |
|------|------|
| `/ars-revision-coach` | 解析审稿意见，生成修订路线图 + 回复信骨架 |
| `/ars-revision` | 按审稿意见修订稿件 |
| `/ars-citation-check` | 引用完整性检查 |
| `/ars-format-convert` | 格式转换：LaTeX / DOCX / PDF / Markdown |
| `/ars-disclosure` | 生成期刊特异的 AI 使用声明 |

**审查**

| 命令 | 作用 |
|------|------|
| `/ars-reviewer` | 模拟同行评审：主编 + 3 审稿人 + 魔鬼代言人（自动调用 Opus） |

**管理**

| 命令 | 作用 |
|------|------|
| `/ars-mark-read` | 标记已读文献 |
| `/ars-unmark-read` | 撤销已读标记 |

## 核心特性

- **反幻觉**：Semantic Scholar API 逐条验证引用，可选 `ARS_CLAIM_AUDIT=1` 开启 claim 级审计
- **风格校准**：投喂 3 篇过往论文，AI 学习写作风格
- **反谄媚**：魔鬼代言人让步前需评分 ≥4/5，连续让步触发警报
- **学术诚信闸门**：Stage 2.5/4.5 不可跳过，检测实现错误、幻觉结果、框架锁定等 7 类失败模式
- **跨模型验证**：设置 `ARS_CROSS_MODEL` 可用第二模型独立审查
- **输出格式**：MD + DOCX + LaTeX（APA 7.0 / IEEE / Chicago）→ PDF
- **费用参考**：一篇 1.5 万字论文全程约 $4–6
- **人机协作**：每个阶段需用户确认，AI 是副驾驶

## 更多

[GitHub](https://github.com/Imbad0202/academic-research-skills) · v3.9.4.2 · CC BY-NC 4.0
