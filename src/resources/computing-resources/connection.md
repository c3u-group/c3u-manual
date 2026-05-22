# 连接方式

## Windows 服务器（1-6号机）

Windows 服务器置于办公室内。如需远程访问，使用 Windows 自带的远程桌面连接（RDP）：

1. 按 `Win + R`，输入 `mstsc` 并回车
2. 输入目标服务器的 IP 地址，点击连接
3. 输入账号密码登录

## Linux 服务器（7-8号机）

Linux 服务器通过 SSH 连接，在终端中执行：

```bash
ssh -p <port> username@hostname
```

或者使用 [MobaXterm](https://mobaxterm.mobatek.net/) 等 SSH 客户端软件连接。



校园网内可直接连接。校外访问需先连接学校 VPN，再通过 SSH 登录。

### SSH 密钥登录（推荐）

为避免每次输入密码，可配置 SSH 密钥。

先在自己的电脑上生成 SSH 密钥对：
```bash
ssh-keygen
```
会出现多个询问，全部接受即可。在用户主目录下会出现 `.ssh` 文件夹，包含 `id_ed25519` 和 `id_ed25519.pub` 文件。其中，`id_ed25519` 为私钥，不可泄漏；`id_ed25519.pub`，可对外分发。关于非对称加密算法的相关知识，可自行了解。

`id_ed25519.pub` 中的内容粘贴进服务器上的 `~/.ssh/authorized_keys` 文件中，即可实现免密码登录。

```bash
ssh-copy-id -p <port> username@hostname
```

### 传输文件

使用 MobaXterm 软件连接上服务器后，左侧会出现服务器上的文件列表，本地可直接拖入；右键点击文件也可以下载。

对于更频繁的文件传输需求，推荐使用 `sshfs` 进行传输。

对于 Windows 系统，分别安装 [WinFSP](https://github.com/winfsp/winfsp/releases/), [SSHFS-Win](https://github.com/winfsp/sshfs-win/releases/), [SSHFS-Win Manager](https://github.com/evsar3/sshfs-win-manager/releases) 软件。前两个软件也可使用 `winget` 安装：
```powershell
winget install SSHFS-Win.SSHFS-Win
```
启动 SSHFS-Win Manager 软件，远程文件夹将在 Windows 文件资源管理器中映射为一块磁盘，与本地无缝集成。

对于 macOS 系统，可用 Homebrew 安装 `fuse-t` 和 `fuse-t-sshfs` ：
```zsh
brew install --cask fuse-t
brew tap macos-fuse-t/homebrew-cask/fuse-t-sshfs
```
