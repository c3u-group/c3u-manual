# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

mdBook 项目，构建 C3U（清洁燃烧与碳循环利用）课题组通用手册。内容涵盖实验操作、软件教程、资源指南、常用模板。

## Build

```bash
mdbook build        # 输出到 book/
mdbook serve        # 本地预览 http://localhost:3000
```

## File conventions

- 书籍源文件在 `src/`，SUMMARY.md 定义目录结构
- 各章节按顶层目录分组（如 `src/softwares/claude-code/`），图片随章节放置
- 新建章节时同步更新 `src/SUMMARY.md` 和各章节顶层目录（如 `src/softwares/softwares.md` ）

## Language & tone

- 正文中文，代码/命令/路径保留原文
- 学术平实风格，不用 emoji
