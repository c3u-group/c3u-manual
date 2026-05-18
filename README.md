# 清洁燃烧与碳循环利用团队通用手册

基于 [mdBook](https://rust-lang.github.io/mdBook/) 构建的课题组在线手册，涵盖管理规范、设备操作、软件教程、资源指南与常用模板。

## 快速开始

```bash
# 安装 mdBook
cargo install mdbook

# 本地预览
mdbook serve

# 构建静态文件到 book/
mdbook build
```

## 目录结构

```
c3u-manual/
├── src/
│   ├── SUMMARY.md              # 目录定义
│   ├── equipments/             # 实验操作
│   ├── softwares/              # 软件教程
│   │   └── claude-code/        #   Claude Code 章节
│   ├── resources/              # 资源指南
│   └── templates/              # 常用模板
├── theme/                      # 自定义 CSS/JS
└── book.toml                   # mdBook 配置
```

## 贡献

1. 在 `src/` 下对应目录创建 Markdown 文件
2. 在 `src/SUMMARY.md` 中注册章节
3. 图片随章节放置，使用相对路径引用
4. 提交前运行 `mdbook build` 确认无报错

正文使用中文，代码、命令、路径保留原文。
