# 配置 Claude for Office 插件

代理服务就绪后，在 Office 插件中填入连接信息使其通过 LiteLLM 调用 DeepSeek。

## 填入代理地址

1. 打开 Word / Excel / PowerPoint
2. 点击功能区 **Claude** 图标打开侧边栏面板
3. 在登录界面选择 **Enterprise gateway**
4. 填写以下信息：

| 字段 | 值 | 说明 |
|------|-----|------|
| **Gateway URL** | `https://your-domain.com` | LiteLLM 代理的 HTTPS 地址 |
| **API token** | `sk-abc123def456...` | 在[配置 LiteLLM](./03-litellm-config.md#创建-litellm-虚拟密钥) 中生成的虚拟密钥 |

5. 点击 **Connect** 测试连接

连接成功后，Claude 面板进入对话界面。插件中的模型选择器显示的是 LiteLLM 映射的 Claude 模型名（`claude-sonnet-4-20250514` 等），实际调用的后端是 DeepSeek。

## 常见问题

### 连接失败，提示 "Unable to connect"

- 确认 Gateway URL 以 `https://` 开头
- 确认反向代理（Caddy/nginx）正在运行，证书有效
- 如使用自签名证书，Office 网页版可能无法信任，尝试桌面版
- 使用 `curl` 从当前网络测试代理是否可达

### 提示认证错误

- 确认 API token 填入的是 LiteLLM 虚拟密钥（`sk-...`），不是 DeepSeek API Key
- 确认虚拟密钥的 `models` 字段包含当前使用的模型名称

### 模型响应异常

- 检查 LiteLLM 日志：`docker logs litellm` 或查看控制台输出
- 确认 `DEEPSEEK_API_KEY` 环境变量已正确设置且余额充足
- DeepSeek Anthropic API 不支持的参数（如图片、`cache_control`、`thinking` 等）会被静默忽略，不影响基本使用

### 如何更新 DeepSeek API Key

修改环境变量后重启 LiteLLM：

```bash
export DEEPSEEK_API_KEY=sk-new-key
# Docker 方式：删除旧容器，用新的环境变量重新启动
docker stop litellm && docker rm litellm
docker run -d --name litellm -p 4000:4000 \
  -e DEEPSEEK_API_KEY=sk-new-key \
  -v $(pwd)/config.yaml:/app/config.yaml \
  ghcr.io/berriai/litellm:main-stable \
  --config /app/config.yaml --port 4000
```
