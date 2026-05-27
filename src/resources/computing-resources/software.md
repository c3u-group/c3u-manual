# 软件环境

Linux 服务器（7-8 号）预装科学计算常用软件，通过 Environment Modules 系统统一管理。

## Environment Modules

Modules 系统用于动态管理不同版本软件的环境变量，避免版本冲突。

### 常用命令

```bash
module avail          # 查看所有可用模块
module list           # 查看当前已加载模块
module load <name>    # 加载指定模块
module unload <name>  # 卸载指定模块
```

### 预装软件

以下软件可通过 `module load` 加载：

| 软件 | 模块名称 | 备注 |
|------|-----------|------|
| Gaussian | `gaussian16` | 需联系管理员加入 `gaussian16` 用户组 |
| COMSOL | `comsol62` |  |
| Fluent | `fluent182` <br/> `fluent2201` <br/> `fluent2601` |  |
| Gromacs | `gromacs2025` |  |
| MATLAB | `matlab/2024a` |  |
| Multiwfn | `multiwfn2601` |  |

具体可用版本以 `module avail` 输出为准。


## Conda

Conda 直接可用，无需额外配置。常用命令：

```bash
conda create -n py312 python=3.12  # 创建环境
conda activate py312               # 激活环境
conda deactivate                   # 退出环境
conda env list                     # 列出所有环境
```

## Claude Code

服务器通过 Homebrew 安装了 Claude Code 。使用前需在 shell 配置文件中添加 Homebrew 路径。

在 `~/.bashrc` 末尾添加：

```bash
echo >> ~/.bashrc
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv bash)"' >> ~/.bashrc
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv bash)"
```

按照 [软件教程 - Claude Code](../../softwares/Agent/claude-code/07-appendix.md#附录-fmaclinux-用户提示) 跳过登录并配置自己的 API-KEY 后，输入 `claude` 即可启动。

## Apptainer

需要 root 权限才能安装的软件，可通过 Apptainer 容器运行，无需管理员介入。

```bash
apptainer build --sandbox ub24-sandbox docker://ubuntu:24.04
apptainer shell -w ub24-sandbox
```

详细用法参见 Apptainer 官方文档。
