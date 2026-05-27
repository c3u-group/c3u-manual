# 部署 LiteLLM 代理

LiteLLM 是一个开源的 LLM 代理服务，支持统一接口接入多种模型。这里用它接收 Claude for Office 的请求并转发至 DeepSeek。

提供两种部署方式：pip 直接安装（适合快速测试）和 Docker 部署（推荐用于持续运行）。

## 方式一：pip 安装

```bash
pip install litellm[proxy]
```

安装后验证：

```bash
litellm --version
```

## 方式二：Docker 部署（推荐）

```bash
docker pull ghcr.io/berriai/litellm:main-stable
```

## 启动代理

先创建一个最小配置文件 `config.yaml`：

```yaml
general_settings:
  master_key: sk-change-me-to-a-random-string
```

使用 `openssl` 生成随机密钥替换 `master_key`：

```bash
openssl rand -hex 32
```

启动命令：

```bash
# pip 安装方式
litellm --config config.yaml --port 4000

# Docker 方式
docker run -d \
  --name litellm \
  -p 4000:4000 \
  -v $(pwd)/config.yaml:/app/config.yaml \
  ghcr.io/berriai/litellm:main-stable \
  --config /app/config.yaml --port 4000
```

启动后访问 `http://localhost:4000`，应看到 LiteLLM 的 Web UI 或 JSON 响应。

## 验证代理可用

```bash
curl http://localhost:4000/health
```

返回 `{"status":"healthy"}` 即表示运行正常。

## 配置 HTTPS（必需）

Claude for Office 仅允许 HTTPS 地址。需在 LiteLLM 前加一层反向代理。

### 使用 Caddy（推荐，自动申请证书）

```bash
# 安装 Caddy
sudo apt install caddy   # Debian/Ubuntu

# 编辑 Caddyfile（/etc/caddy/Caddyfile）
your-domain.com {
    reverse_proxy localhost:4000
}
```

```bash
sudo systemctl reload caddy
```

Caddy 会自动通过 Let's Encrypt 申请并续期 TLS 证书。

### 使用 nginx + 自签名证书（内网测试）

```bash
# 生成自签名证书
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# nginx 配置
server {
    listen 443 ssl;
    ssl_certificate     /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

内网使用自签名证书时，需在客户端系统信任该证书，否则 Office 插件可能拒绝连接。

## 配置 CORS（必需）

Claude for Office 插件的 UI 托管在 `https://pivot.claude.ai`，通过浏览器内嵌 iframe 加载网关。网关必须在每个响应中返回 CORS 头，否则浏览器将阻止请求。

在反向代理层添加以下响应头：

### Caddy

```
your-domain.com {
    reverse_proxy localhost:4000
    header Access-Control-Allow-Origin https://pivot.claude.ai
    header Access-Control-Allow-Headers *
    header Access-Control-Allow-Methods "POST, GET, OPTIONS"
}
```

### nginx

```nginx
server {
    listen 443 ssl;
    ssl_certificate     /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        add_header Access-Control-Allow-Origin https://pivot.claude.ai;
        add_header Access-Control-Allow-Headers *;
        add_header Access-Control-Allow-Methods "POST, GET, OPTIONS";
        if ($request_method = OPTIONS) {
            return 204;
        }
    }
}
```

> `Access-Control-Allow-Origin` 必须精确匹配 `https://pivot.claude.ai`，不能使用 `*`。

## 下一步

代理服务运行并配置好 HTTPS 与 CORS 后，进入[配置 LiteLLM](./03-litellm-config.md) 设置模型路由。
