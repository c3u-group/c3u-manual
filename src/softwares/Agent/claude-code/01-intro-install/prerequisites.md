# 前置知识

如果从未用过命令行，花几分钟了解以下基础即可。已有终端经验的读者可跳过。

## 打开终端

**Windows**：按 `Win` 键，输入 `powershell`，回车。

**macOS**：按 `Cmd + Space`，输入 `terminal`，回车。

**Linux**：在应用菜单中搜索 `Terminal`。

打开后看到的是一个等待输入命令的窗口，光标前显示当前所在目录，这就是终端。

## 基本命令

```bash
pwd                     # 显示当前所在目录的完整路径
ls                      # 列出当前目录下的文件和子目录
cd 目标目录               # 切换到指定目录
```

示例：

```bash
cd Desktop              # 进入 Desktop 目录
cd ..                   # 返回上一级
cd ~                    # 回到用户主目录
```

## 文件操作

```bash
cp a.txt b.txt          # 复制文件
mv a.txt b.txt          # 移动/重命名文件
rm file.txt             # 删除文件（不可逆，无回收站）
mkdir newdir            # 新建目录
```

## 查看与搜索

```bash
cat file.txt            # 显示文件全部内容
grep "关键词" file.txt   # 搜索文件中包含关键词的行
```

## 重定向与管道

```bash
command > file.txt      # 将命令输出写入文件（覆盖）
command >> file.txt     # 将命令输出追加到文件末尾
command1 | command2     # 将 command1 的输出传给 command2
```

常用组合：

```bash
ls | grep "py"                  # 列出当前目录中文件名含 "py" 的条目
cat data.csv | head -n 5        # 查看 CSV 前 5 行
```

## 路径

**绝对路径**：从根目录开始的完整路径，如 `/home/user/data/raw.csv`。

**相对路径**：从当前目录出发的路径，如 `data/raw.csv` 或 `../figures/output.pdf`（`..` 表示上一级）。

教程中的命令均在终端中执行，用 `cd` 进入项目目录后再操作。
