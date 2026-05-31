# MCP Server 开发

MCP（Model Context Protocol）让 Claude Code 连接到外部服务。本章讲如何构建自定义 MCP Server——让 AI 直接查询你的数据库、调用你的本地程序。

## 基本原理

MCP Server 是本地运行的进程，通过标准输入/输出（stdio）或 HTTP 与 Claude Code 通信。Server 暴露一组工具（tool），Claude 在需要时自动调用。

## 快速开始

用 Python 构建一个简单的 MCP Server：

```python
# server.py
from mcp.server import Server, stdio_server
from mcp.types import Tool, TextContent

server = Server("my-server")

@server.tool()
async def query_database(query: str) -> list[TextContent]:
    """Query the experiment database."""
    results = db.search(query)
    return [TextContent(type="text", text=str(results))]

if __name__ == "__main__":
    stdio_server.run(server)
```

## 注册到 Claude Code

在 `.claude/mcp.json` 中配置：

```json
{
  "mcpServers": {
    "my-server": {
      "command": "python",
      "args": ["path/to/server.py"]
    }
  }
}
```

## 常用 MCP SDK

| 语言 | SDK |
|------|-----|
| Python | `mcp` (官方) |
| TypeScript | `@modelcontextprotocol/sdk` |
| Go | `github.com/mark3labs/mcp-go` |

详细的 MCP 协议规范见 [Model Context Protocol 官方文档](https://modelcontextprotocol.io)。
