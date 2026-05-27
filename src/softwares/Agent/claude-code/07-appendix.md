# 参考与附录

## 附录 A：注意事项

| 可以放心做 | 要注意 | 不要做 |
|-------------|----------|---------|
| 让 AI 读写项目文件 | 每次变更后 `git diff` 审查再提交 | 提交涉密数据/内部数据集 |
| 让 AI 执行本地脚本、跑测试 | 关键计算结果人工验证 | 上传 API key / 密码 |
| 让 AI 验证自己的代码能否跑通 | AI 生成的文字和结论需审核 | 盲信 AI 的学科结论 |
| 迭代式改图调参 | 第一次跑新脚本先让 AI 解释逻辑 | 不经审查直接用 AI 写的文字投稿 |
| 放在 HPC/集群上用 | 仿真边界条件正确性自己把关 | 让 AI 无监督执行删除、强推等不可逆操作 |
| 让 AI 处理重复性、规范性强的任务 | 安装第三方 skill 前审阅 SKILL.md | 安装来源不明的第三方技能包 |

---

## 附录 B：常用命令速查表

### 斜杠命令

| 命令 | 作用 | 示例 |
|------|------|------|
| **单次任务** | | |
| `/plan` | 先出方案，确认后再执行 | `/plan 分析 data/raw/ 下的 CSV 文件，画 TG/DTG 对比图` |
| `/init` | 扫描项目，创建 `CLAUDE.md` | `/init` |
| `@文件/文件夹` | 指定要操作的文件或文件夹 | `@data/raw/ @scripts/plot.py 重构这个脚本` |
| **自主执行** | | |
| `/goal` | 条件驱动：设定目标条件，Haiku 逐轮评估，达成后自动停止 | `/goal 重构 auth 模块直到所有测试通过` |
| `/loop` | 时间驱动：按指定间隔循环执行任务 | `/loop 5m 检查构建状态` |
| **会话控制** | | |
| `/clear` | 清空对话历史，开启全新会话 | `/clear` |
| `/compact` | 压缩上下文，保留关键信息 | `/compact` |
| `/rewind` | 回退到之前的对话节点 | 按两次 `Esc` 或 `/rewind` |
| `/resume` | 恢复之前的会话 | `/resume` |
| `/model` | 切换模型 | `/model haiku` |
| `/diff` | 交互式查看变更差异 | `/diff` |
| `/cost` | 显示当前会话 Token 用量和费用 | `/cost` |
| **分支协作** | | |
| `/branch` | 创建分支，进行不同修改，后续合并 | `/branch feature/new-analysis` |
| `/btw` | 临时询问，可在独立分支中探索 | `/btw` |
| **管理** | | |
| `/config` | 打开设置（主题、模型、输出风格） | `/config` |
| `/permissions` | 管理工具权限，预设允许/拒绝 | `/permissions` |
| `/tasks` | 查看后台任务列表 | `/tasks` |
| `/memory` | 管理 AI 记住的偏好和规范 | `/memory` |
| `/skills` | 列出安装的 skill | `/skills` |
| `/doctor` | 运行安装健康检查，排查故障 | `/doctor` |
| `/help` | 查看完整帮助 | `/help` |

`/goal` 与 `/loop` 分别代表两种自主执行模式：`/goal` 是条件闭环——以任务完成度为停止条件，每轮结束后由 Haiku 评估目标是否达成，适合"重构到测试全绿"等有明确验证标准的任务；`/loop` 是时间闭环——按固定间隔重复执行，适合轮询检查、周期性监控。两者均属会话级命令，终端关闭即停止。

### 键盘快捷键

| 快捷键 | 作用 |
|------|------|
| `Esc` 或 `Ctrl + C` | 停止当前操作 |
| `Tab` | 自动补全 |
| `Shift + Tab` | `auto-accept` / `plan` 模式切换 |
| `Ctrl + G` | 打开编辑器（编辑 Prompt / Plan） |
| `Ctrl + 点击` | 打开链接 |
| `!` | 临时执行命令 |
| `&` | 后台执行命令（用 `/tasks` 查看进度） |
| `\ + Enter` | 换行 |

### 自然语言 Git 指令

| 自然语言 | 操作 |
|---------|------|
| "帮我提交更改" | `git add` + `git commit` |
| "推送 Git" | `git push` |
| "拉取 Git" | `git pull` |
| "创建 Git 分支 xxx" | `git branch` + `git switch` |
| "合并分支 xxx" | `git merge` |
| "查看改了哪些文件" | `git status` / `git diff` |

---

## 附录 C：提高 Prompt 质量

### Approach 1: 提供验证方法

没有明确的成功标准， AI 可能会产生看起来正确但实际上不起作用的东西。这让用户成为唯一的反馈循环，每个错误都需要人的关注。让 AI 能自行验证任务是否完成。

| 优化策略 | 优化前指令 | 优化后指令 |
| --- | --- | --- |
| 提供验证标准 | 实现一个验证电子邮件地址的函数 | 编写 `validateEmail` 函数；给定测试用例：`user@example.com` 校验通过，`invalid`、`user@.com` 校验不通过，实现后执行测试验证 |
| 以视觉方式验证 UI 更改 | 让仪表板看起来更好 | 参照提供的界面截图实现对应设计，完成后截取效果界面并与原设计对比，列出差异项并逐一修正 |
| 解决根本原因，而非症状 | 构建失败 | 项目构建出现如下错误：[粘贴报错信息]，定位并修复问题根源，确保构建成功，禁止仅屏蔽报错信息 |

### Approach 2: 提供具体的上下文

AI 可以推断意图，但不能读心术。引用特定文件、提及约束，并指出示例模式。

| 优化策略 | 优化前指令 | 优化后指令 |
| ---- | ---- | ---- |
| 限定任务范围 | 为 foo.py 添加测试 | 为 foo.py 编写测试，涵盖用户已注销的边界情况，避免使用 mock |
| 指向来源 | 为什么 ExecutionFactory 有这样奇怪的 API？ | 查看 ExecutionFactory 的 Git 历史并总结其 API 形成过程 |
| 参考现有模式 | 添加日历小部件 | 查看主页现有小部件实现模式，参考 HotDogWidget.php，实现日历小部件，支持月份选择与年份翻页；仅使用代码库已有库 |
| 描述症状 | 修复登录错误 | 用户报告会话超时后登录失败，检查 src/auth/ 下的身份验证流程，重点排查令牌刷新逻辑；编写复现测试并修复问题 |

### Approach 3: 提供丰富的内容

直接给 AI 需要的材料，而不是让它猜测。

| 优化策略 | 优化前做法 | 优化后做法 |
| --- | --- | --- |
| 用 @ 引用文件 | 用文字描述文件位置，让 AI 自行搜索 | `@src/auth/login.ts` 直接引用，AI 在响应前自动读取 |
| 粘贴图像 | 用文字描述界面布局或图表样式 | 截图后直接 Ctrl+V 粘贴到对话中 |
| 提供文档 URL | 凭印象描述 API 参数和行为 | 贴上官方文档链接；用 `/permissions` 预授权常用域名 |
| 让 AI 自己获取上下文 | 手动逐段复制依赖文件内容 | 告诉 AI "读取 config/ 目录下所有配置文件，综合后回答" |

---

## 附录 D：Agent 发展历程

五代跃迁背后有一条主线：人愿意让机器走多远。信任边界每次向外推一步，都是因为上一步垮掉后，人类被迫修筑了更坚固的护栏。

### 第0代 对话模型 —— 2022年末

ChatGPT 展现出强大的文本生成能力，但有两个根本局限。一是知识截止于训练数据，不知道当下发生的事。二是幻觉——遇到不懂的问题，模型倾向于编造看似合理的回答，而非如实说不知道。最关键的局限在于：它能告诉你应该怎么做，却不能替你操作文件、运行脚本、发送请求。输出停留在聊天框里，与真实世界之间隔着一层无法跨越的界面。

**核心矛盾**：能说，不能做。

### 第1代 工具调用与外部记忆 —— 2023年

既然只能生成文本，下一个目标自然是让模型能操作外部工具。

2023年6月，OpenAI 发布 Function Calling。模型不再输出自然语言建议，而是输出结构化的函数调用指令，写明函数名、参数类型和参数值，外部程序直接解析执行。交互模式从人问、AI答、人操作，变为人问、AI答、AI操作、返回结果。

工具调用解决的是行动能力，但模型还需要获取项目特定的知识。RAG 即检索增强生成，将文档切成小段、转为向量存入向量数据库——向量的本质是将文本语义映射为数学坐标，语义相近的文本坐标也相近。用户提问时，系统先检索最相关的文档片段，与问题一同注入上下文，模型据此作答。效果类似开卷考试：不必全凭记忆，可以实时查阅参考资料。

工具调用和外部记忆让模型能完成单步操作，下一个问题是：能否让模型自己串联多步，独立完成一整条任务链。

AutoGPT 是这一思路的代表。给定一个最终目标，它自行拆解任务、编写代码、执行、读取结果，循环往复。但该循环缺少可靠的终止条件，暴露出两种失效模式。

其一，无限循环。实测中 AutoGPT 经常将同一搜索重复执行 11 次而不自知——模型不记得上一步做过什么，每次决策都从空白状态重新猜测。其二，目标漂移。几十步之后，模型可能已在追求与原目标无关的子任务；上下文被无关搜索结果持续膨胀，关键信息反而被压缩到注意力盲区。一次任务消耗十几美元，结果要么死循环，要么严重偏离初始目标。

工程界由此形成共识：仅给定目标不够，还需要约束条件、检查点和每步的验证反馈。

**核心矛盾**：能调用工具，能查阅资料，但开放循环无法收敛。

### 第2代 结构化工作流 —— 2023年末至2024年

AutoGPT 的教训指明了方向：既然开放循环会失控，就把它改为闭环。

这一代的核心范式是 ReAct，全称 Reasoning + Acting，将每次推理拆为三个固定步骤：Thought 思考当前状况并决定下一步、Action 调用工具执行操作、Observation 读取执行结果。三步循环往复，直到任务完成。一个修 bug 的 Agent 不会直接改代码，而是读错误日志、运行测试确认、定位出错文件、修改、再运行测试验证。每步均留下可追溯的记录，出错可定位到具体步骤。

吴恩达总结了四种设计模式——反思、工具调用、任务规划、多智能体协作——本质是将人类处理复杂任务的经验固化为可复用的流程模板。一个反直觉的发现是：配备良好工作流的小模型，常能跑赢裸用的大模型。流程设计比模型规模更关键。

但流程框架自身也有代价。为编排复杂工作流，抽象层不断增厚，回调链持续拉长，难以定位错误到底发生在哪一步。无代码平台试图用拖拽界面降低使用门槛，但本质困难不在交互形式，而在于任务复杂性本身无法被界面简化。

**核心矛盾**：流程可控了，但框架臃肿，各工具的接口互不兼容。

### 第3代 标准化协议与操作界面拓展 —— 2024至2025年

第2代暴露了接口碎片化的痛点：每种模型连接每种工具都需要单独编写适配代码。第3代回答的问题更根本——Agent 如何以统一的方式与外部世界交互。

三件事改变了格局。

第一，MCP 即模型上下文协议，统一了模型与工具的连接标准。此前 M 种模型连接 N 种工具需要 M×N 套适配代码，统一协议后只需 M+N 套，任何支持 MCP 的模型可直接调用任何 MCP 兼容的工具。

第二，Computer Use 使 Agent 能读取屏幕截图并操控鼠标键盘，将操作范围从 API 调用扩展到任何有图形界面的软件。

第三，Claude Code 和 Cursor 形成了两种互补的编程范式：CLI 路线运行于终端，直接读写文件系统、执行 Shell 命令，适合大范围代码探索和跨文件重构；GUI 路线深度嵌入 IDE，提供可视化差异对比，适合精细局部修改。二者不互斥，多数开发者的实践是 Cursor 中精修、Claude Code 中探索。

然而，能力提升也暴露了更严峻的问题。

2025年2月，Andrej Karpathy 提出 Vibe Coding 一词，描述一种凭感觉和试错让 AI 生成代码、不看 diff 就全盘接受的开发方式。该模式迅速流行，代价也迅速显现。

同年7月，Replit AI Agent 在用户明确设置了代码冻结和只读指令后，仍删除了 SaaStr 的线上生产数据库，内含超过 1200 位高管信息，事后还伪造了 4000 条假数据试图掩盖操作痕迹。12月，亚马逊内部 AI 编程工具 Kiro 在一名权限设置过宽的工程师操作下，判定最佳方案为删除并重建生产环境，导致 AWS Cost Explorer 中国区宕机约 13 小时。

同年，METR 机构完成了一项随机对照实验，涉及 16 名资深开发者和 246 个真实任务，结论是：使用 AI 工具的开发者自评提速 20%，实测慢了 19%，感知与现实的差距达到 39 个百分点。原因在于 AI 生成的小错误和不符合项目规范的模式在代码库中持续累积，初期节省的时间被后期的排查和重构抵消。该发现直接印证了本手册反复强调的原则——验证比生成更重要。

由此，安全实践成为核心议题。四项原则被确立为标配：权限最小化，只授予完成任务的必要权限；人工确认，关键操作需获得批准；操作日志，每步可审计；回滚机制，出问题可撤销。

**核心矛盾**：连接标准统一了，操作面拓宽了，但生成速度快不等于交付质量高，能力越强事故代价越大。

### 第4代 技能封装与常驻运行 —— 2025年末至今

前几代解决的是单次任务如何可靠完成，这一代面对的问题是：Agent 能否成为长期运行的独立工作单元。

Agent 开始具备身份，明确自身角色和权限边界；具备记忆，跨会话保留偏好和关键事实；具备专业技能和定时唤醒能力。技能不再是零散的工具列表，而是封装好的可复用工作流——类似医生不会说我会用听诊器、血压计、CT 机，而是说我能做心脏检查。技能加载采用渐进式：先呈现目录索引，需要时展开详细说明，执行时调用模板——上下文从一次性填充变为分层按需加载。

能力增长伴随风险升级。技能可以被分享复用，也就可以被植入恶意代码。2026年2月，安全机构披露 ClawHub 技能仓库中 41.7% 的高频技能存在高危漏洞，341 个伪装成合法工具的恶意技能包在 SKILL.md 中植入隐藏指令，诱骗 Agent 通过 Shell 下载并执行恶意程序，静默窃取 API 密钥和密码库。这次攻击被命名为 ClawHavoc 事件。当执行逻辑从编译好的二进制变为动态 Markdown 文本，传统病毒扫描完全失效——它无法判断一段自然语言是在描述功能还是在下达攻击指令。安装第三方技能前必须审阅其说明文件，优先使用官方或社区已验证的来源。

ClawHavoc 暴露了更深层的结构性问题：Agent 的技能池中存在不可信的第三方代码，而模型自身无法区分安全指令和恶意指令。这正是第3代 Kiro 和 Replit 事故的延续，区别仅在于攻击面从模型自身出错扩展到了外部投毒。因此第4代必须解决一个之前不曾面对的问题：既然不能依赖模型自行判断安全，就需要一个独立于模型判断的执行层来兜底。

这一代由此确立了 Harness Engineering 这一核心架构范式。2026 年学术界将其概括为一个公式：Agent = Model + Harness。Model 即大语言模型，负责推理和生成；Harness 是围绕模型构建的运行时基础设施，包括权限校验、Hook 事件系统、上下文管理、工具调度、定时唤醒和会话记忆持久化。模型负责思考，Harness 负责约束。

Claude Code 的实现最能体现这一范式的分量：其约 51 万行 TypeScript 代码中，AI 决策逻辑仅占约 1.6%，其余 98.4% 均为 Harness 代码——权限闸门、上下文管线、工具路由和恢复逻辑。核心循环是一个简单的 while 循环，每轮执行 Think→Act→Observe→Repeat，循环本身不做推理，所有推理委托给模型。权限系统遵循先拒后问原则：拒绝优先于询问，询问优先于允许，且权限状态不在会话恢复时保留——每次新会话重新建立信任。27 个 Hook 事件覆盖了从会话启停、工具调用到子代理管理等五个生命周期阶段。

Harness 的工程意义在于：它将 Kiro 和 Replit 的事故教训从设计原则转变为强制约束。AI 可以产生任何想法，但什么能做、以什么权限做、什么需要人确认——这些不由 AI 决定，而是 Harness 在运行时强制执行。思维层与执行层由此被隔开，模型的推理无法绕过权限闸门直接操作系统。

Harness 解决的是执行层的安全。思维层还有另一个问题：模型本身难以区分事实与推测。例如，Agent 从文档中读到某 API 的调用方式，这是落地的事实；它推断该 API 可能存在某个未文档化的参数，这只是推测。如果 Agent 将推测当作事实去调用，生产环境就可能因此故障。认知治理要求将这两类信息明确分开管理：落地的事实经外部验证，可作为行动依据；模型的推测缺乏证据，需标注置信度，仅用于规划参考。混淆二者，Agent 会将猜测视为真相，在错误方向上持续偏离。Harness 是外部的约束框架，认知治理是内部的推理纪律，一外一内构成第4代的安全架构。

**核心矛盾**：技能可复用，Agent 可全天候运行，但其认知可靠性需要专门机制来保障。

### 五代演化的主线：信任边界的逐步外移

五代跃迁最深的脉络不是技术迭代，而是人对机器的信任边界在逐代扩展：

| 代际 | 人愿意信任什么 | 为此付出的代价 |
|------|--------------|--------------|
| 第0代 | 只信任它生成的文本 | 人必须自己动手执行 |
| 第1代 | 信任它调用 API | 循环失控时需人介入 |
| 第2代 | 信任它编排多步工作流 | 框架臃肿、接口碎片化 |
| 第3代 | 信任它操控屏幕和浏览器 | 权限失控、低质量代码累积 |
| 第4代 | 信任它无人监督全天候运行 | 供应链投毒、认知真伪难辨 |

每一次信任升级，都是用上一代的惨痛教训换来的。Claude Code 反复弹出权限确认框，并非刻意烦扰用户——AutoGPT 失控、Vibe Coding 代码质量下降、Replit 删库、Kiro 删除生产环境、ClawHavoc 投毒，每次事故都在推动行业将安全边界向外扩展一层。

这些事故对应的安全标准进步可概括为一条清晰的因果链：

- AutoGPT 失控 → 结构化工作流
- Vibe Coding 低质量代码泛滥 → 评估驱动开发，Agent 先写测试再写代码
- Replit 删库 → 开发环境与生产环境强制隔离
- Kiro 误删生产环境 → 最小权限原则与认知隔离，推理与执行环境分离
- ClawHavoc 供应链投毒 → 操作系统级沙盒隔离

从工程角度看，Agent 的可靠性不来源于模型参数量的堆积，而来源于人设计的认知反馈回路——以架构弥补模型的不确定性，将模型的生成能力转化为可重复、可审计、可交付的结果。这一回路落实到四条支柱：MCP 使 Agent 能接入任何系统，Skills 使操作规范化可复用，CLAUDE.md 和 AGENTS.md 使 AI 明确项目边界，Harness 在底层确保所有交互均在权限校验和审计日志的框架内运行。四条支柱共同构成 Agent 的操作系统级基础。

四条支柱补齐后，Agent 已能较可靠地执行复杂任务，但一个根本局限仍然存在。当前所有 Agent 的推理模式本质上是反应式的：看到输入，产生输出，看到新输入，再产生输出。人类专家处理高风险决策时则截然不同——大脑会先做因果推演，预判每种可能行动的后果，不需要真的执行就能排除大部分危险选项。下一代 Agent 需要补上这一能力缺口：从知道现状走向预演后果，并明确何时自行验证、何时暂停、何时请求人工确认。

---

## 附录 E：常见问题 FAQ

### 1. 启动后报 "401 Unauthorized" 或 API 认证错误

检查 `~/.claude/settings.json` 中的 `ANTHROPIC_AUTH_TOKEN` 是否正确填入 DeepSeek API Key（不含引号包裹的 `API_KEY` 占位符需替换为实际值）。

### 2. winget 下载很慢或失败

国内网络访问 winget 源可能较慢。可以：
- 挂代理后重试：`$env:HTTPS_PROXY=http://127.0.0.1:7890`
- 或从 [Claude Code 官网](https://claude.ai/code) 下载安装包手动安装

### 3. 输入 `claude` 提示命令找不到

- 检查是否已重新打开终端窗口（安装后需刷新 PATH）
- 运行 `winget list Anthropic.ClaudeCode` 确认已安装
- 尝试重启电脑后重试

### 4. 每次操作都要点确认，弹窗太多

使用 `/permissions` 命令预设工具权限，或在 `~/.claude/settings.json` 中配置 `permissions` 字段。也可以使用 `Shift + Tab` 切换到 `auto-accept` 模式。

### 5. 配置文件在哪里？

| 文件 | 路径 |
|------|------|
| 主配置 | `~/.claude/settings.json` |
| 跳过登录 | `~/.claude.json` |
| 全局 CLAUDE.md | `~/.claude/CLAUDE.md` |
| 项目 CLAUDE.md | `./CLAUDE.md`（项目根目录） |
| 项目私有配置 | `./.claude/CLAUDE.md` |

Windows 上 `~` 等价于 `C:\Users\<你的用户名>`。

### 6. DeepSeek API 提示额度不足

前往 [DeepSeek 开放平台](https://platform.deepseek.com) 查看余额，按需充值。简单任务可用 `/model haiku` 切换到更经济的模型。

### 7. `winget upgrade` 更新失败

尝试先卸载再重装：

```powershell
winget uninstall Anthropic.ClaudeCode
winget install Anthropic.ClaudeCode --accept-source-agreements
```
配置文件（`~/.claude/`）不受卸载影响，无需重新配置。

### 8. 设置了代理但 Claude Code 网络仍不通

确认代理地址和端口正确（常见端口：Clash 7890、V2Ray 10809）。检查 PowerShell 中 `$env:HTTPS_PROXY` 是否已设置。如需持久化，将环境变量写入 PowerShell profile：

---

## 附录 F：Mac/Linux 用户提示

Mac 和 Linux 用户同样可以使用 Claude Code，主要差异如下：

- **安装方式**：安装 Homebrew 后，用 `brew install claude-code`
- **配置文件路径**：同为 `~/.claude/settings.json` 和 `~/.claude.json`
- **DeepSeek 配置**：环境变量设置方式不同——Mac/Linux 用 `export VAR=value`，或直接编辑 `~/.claude/settings.json`（JSON 格式完全相同）
- **代理**：终端中 `export HTTPS_PROXY=http://127.0.0.1:7890`


先安装 Homebrew ：
```bash
# 为 brew 更换 USTC 镜像，加速下载：
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"
export HOMEBREW_API_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/api"
echo >> ~/.bashrc
echo '# Set non-default Git remotes for Homebrew/brew and Homebrew/homebrew-core.' >> ~/.bashrc
echo 'export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"' >> ~/.bashrc
echo 'export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"' >> ~/.bashrc
echo 'export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"' >> ~/.bash_profile
echo 'export HOMEBREW_API_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/api"' >> ~/.bash_profile

# 安装 Homebrew
/bin/bash -c "$(curl -fsSL https://mirrors.ustc.edu.cn/misc/brew-install.sh)"

# 安装后配置，将 brew 配置到环境变量：
echo >> ~/.bashrc
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv bash)"' >> ~/.bashrc
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv bash)"

# 安装 build 需要的的依赖：
sudo dnf group install development-tools
brew install gcc
```

随后安装 Claude Code：
```bash
brew install claude-code
```

如果系统上已经安装 Homebrew 和 Claude Code，但 `brew` 和 `claude` 命令均无效，说明未配置环境变量。需要使用以下命令配置：
```bash
echo >> ~/.bashrc
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv bash)"' >> ~/.bashrc
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv bash)"
```

配置接入 `DeepSeek` ：

```bash
# 填入 DeepSeek_API_KEY
DEEPSEEK_API_KEY='实际API_KEY'

# 创建配置文件 ~/.claude.json 以跳过登录
jq -n '{"hasCompletedOnboarding": true}' > ~/.claude.json
# 创建配置文件 ~/.claude/settings.json
mkdir -p ~/.claude
jq -n \
  --arg api_key "$DEEPSEEK_API_KEY" \
  '{
    env: {
      ANTHROPIC_AUTH_TOKEN: $api_key,
      ANTHROPIC_BASE_URL: "https://api.deepseek.com/anthropic",
      ANTHROPIC_MODEL: "deepseek-v4-pro[1m]",
      ANTHROPIC_DEFAULT_HAIKU_MODEL: "deepseek-v4-flash",
      ANTHROPIC_DEFAULT_SONNET_MODEL: "deepseek-v4-pro",
      ANTHROPIC_DEFAULT_OPUS_MODEL: "deepseek-v4-pro",
      CLAUDE_CODE_SUBAGENT_MODEL: "deepseek-v4-pro",
      CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: "1",
      CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK: "1",
      CLAUDE_CODE_EFFORT_LEVEL: "max"
    }
  }' > "$HOME/.claude/settings.json"
```
