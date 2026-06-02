---
nav:
  title: 文档
  order: 1

group:
  title: Skills
  order: 1

title: Skills
mobileDemoFixed: false
---

## 🤖 AI Skills —— 让 AI 编辑器理解 @fexd/mobile

`@fexd/mobile` 随 npm 包发布了完整的 **AI Agent Skills** 文档。安装组件库后，可以通过 `@fexd/tools` 提供的统一入口一键把这些文档注册到 Cursor、Codex、Claude Code、OpenCode 等常见 AI Agent 的 skills 目录，让 AI 在生成页面、查 API、改样式时优先读取组件库的真实用法。

### 📦 发布了什么？

`npm install @fexd/mobile` 后，`node_modules` 中包含以下 AI 文档：

```text
node_modules/@fexd/mobile/
├── AGENTS.md                          # AI 上下文入口
├── llms.txt                           # 通用 LLM 入口
├── components.manifest.json           # 公开导出 / 开发中组件 / 源码路径清单
└── skills/
    └── fexd-mobile/
        ├── SKILL.md                   # 主入口：任务路由 + 架构速览
        ├── catalog.md                 # 127 个公开导出分类目录
        ├── architecture.md            # IO 分层 / Modal 体系 / Transition
        ├── theming.md                 # 主题定制方案
        ├── utilities.md               # Hooks / 工厂函数 / 命令式 API
        ├── source-navigation.md       # 源码导航指南
        └── references/                # 127 份组件详细文档
            ├── Button.md
            ├── Modal.md
            ├── Form.md
            └── ...
```

### 🚀 推荐：使用 fexd-tools 统一安装

`fexd-tools skills install` 会扫描当前项目 `node_modules` 和 workspace 包里的 `skills/*/SKILL.md`，可以同时安装 `@fexd/mobile`、`@fexd/tools` 以及其他依赖包发布的 skills。相比 `skills-npm`，这个入口不需要引入额外工具，也更适合仍在使用 Node 14/16 的项目。

如果项目里还没有直接安装 `@fexd/tools`，建议先添加为开发依赖，确保 `package.json` 脚本里能稳定找到命令：

```bash
pnpm add -D @fexd/tools
# 或
npm i -D @fexd/tools
```

然后执行：

```bash
fexd-tools skills install
```

在消费项目里建议加一个脚本，团队成员安装依赖后手动跑一次即可：

```json
{
  "scripts": {
    "prepare:skills": "fexd-tools skills install"
  }
}
```

然后执行：

```bash
npm run prepare:skills
```

默认会把 `fexd-mobile` skill，以及项目里其他符合规范的 skills，安装到常见 agent 的项目级目录，并自动把这些链接写入 `.gitignore`：

```text
.cursor/skills/fexd-mobile         # Cursor 项目目录
.agents/skills/fexd-mobile         # Codex / OpenCode 项目目录
.claude/skills/fexd-mobile         # Claude Code 项目目录
```

其中 `fexd-mobile` 目录默认是指向当前项目 `node_modules/@fexd/mobile/skills/fexd-mobile` 的链接。更新 `@fexd/mobile` 后，skill 内容会随 `node_modules` 自动更新。

### 指定 Agent

只想配置某几个 agent 时，使用 `--agents`：

```bash
fexd-tools skills install --agents cursor
fexd-tools skills install --agents cursor,claude-code,opencode
```

可选值：

| agent         | project 安装位置              |
| ------------- | ----------------------------- |
| `cursor`      | `.cursor/skills/fexd-mobile`  |
| `codex`       | `.agents/skills/fexd-mobile`  |
| `claude-code` | `.claude/skills/fexd-mobile`  |
| `opencode`    | `.agents/skills/fexd-mobile`  |
| `common`      | 以上常见 agent 的集合，默认值 |

### 安装到全局目录

默认只写项目目录，不会修改用户目录。需要给某个工具配置全局 skill 时，显式指定 `--scope global`：

```bash
fexd-tools skills install --agents codex --scope global
fexd-tools skills install --agents claude-code --scope global
```

全局目录规则：

| agent         | global 安装位置                                                           |
| ------------- | ------------------------------------------------------------------------- |
| `cursor`      | `~/.cursor/skills/fexd-mobile`                                            |
| `codex`       | `$CODEX_HOME/skills/fexd-mobile` 或 `~/.codex/skills/fexd-mobile`         |
| `claude-code` | `$CLAUDE_CONFIG_DIR/skills/fexd-mobile` 或 `~/.claude/skills/fexd-mobile` |
| `opencode`    | `~/.agents/skills/fexd-mobile`                                            |

如需项目目录和全局目录都安装：

```bash
fexd-tools skills install --agents codex --scope both
```

### 常用参数

| 参数               | 作用                                                                 |
| ------------------ | -------------------------------------------------------------------- |
| `--agents <list>`  | 指定 agent，支持 `common,cursor,codex,claude-code,opencode`          |
| `--scope <scope>`  | 安装范围，支持 `project,global,both`，默认 `project`                 |
| `--cwd <path>`     | 指定消费项目目录，适合 monorepo 或脚本从子目录执行                   |
| `--copy`           | 直接复制 skill 目录，不创建链接                                      |
| `--force`          | 目标已存在普通文件/目录时强制覆盖                                    |
| `--dry-run`        | 只打印安装计划，不写文件                                             |
| `--no-gitignore`   | 不自动更新 `.gitignore`                                              |
| `--include <list>` | 只安装匹配的包名、skill 名或 `package:skill`，支持 `*`               |
| `--exclude <list>` | 排除匹配的包名、skill 名或 `package:skill`，支持 `*`                 |
| `--config <path>`  | 指定 `skills.config.js` / `skills.config.cjs` / `skills.config.json` |
| `--no-config`      | 不读取项目里的 skills install 配置                                   |

先预览安装计划：

```bash
fexd-tools skills install --dry-run
```

Windows 环境如果链接权限受限，可以使用复制模式：

```bash
fexd-tools skills install --copy
```

也可以用白名单只安装指定范围：

```bash
fexd-tools skills install @fexd/mobile
fexd-tools skills install --include @fexd/*
fexd-tools skills install --exclude @fexd/legacy-skill
```

### 🔗 手动创建符号链接

如果不想通过 CLI，也可以手动创建链接：

```bash
# macOS / Linux
mkdir -p .cursor/skills
ln -s ../../node_modules/@fexd/mobile/skills/fexd-mobile .cursor/skills/fexd-mobile

# Windows
mklink /J .cursor\skills\fexd-mobile node_modules\@fexd\mobile\skills\fexd-mobile
```

记得在 `.gitignore` 中忽略：

```gitignore
.cursor/skills/fexd-mobile
.agents/skills/fexd-mobile
.claude/skills/fexd-mobile
```

### 💬 配置完成后

在 AI 编辑器中用自然语言提问即可，AI 会自动加载对应的组件文档：

```text
👤 "用 DatePicker 做一个日期范围选择"
🤖 → 读取 references/DatePicker.md，给出完整示例代码

👤 "怎么自定义 Button 的主题色？"
🤖 → 读取 references/Button.md + theming.md，给出 Less 变量覆盖方案

👤 "省市区三级联动怎么做？"
🤖 → 读取 references/CascadePicker.md，给出级联选择器方案

👤 "这个库有哪些弹窗组件？"
🤖 → 读取 catalog.md，列出反馈类组件清单
```

### ❓ 常见问题

**执行命令后 AI 没有加载 skill？**

> 先确认目标目录下存在 `fexd-mobile/SKILL.md`，然后重启对应 AI 编辑器或新开一个会话。部分工具只在启动时扫描 skills。

**更新 @fexd/mobile 后文档没变？**

> 默认安装方式使用链接，更新依赖后内容会跟随 `node_modules` 更新。如果使用了 `--copy`，需要重新执行 `fexd-tools skills install --copy --force`。

**monorepo 怎么配置？**

> 在 workspace 根目录运行 `fexd-tools skills install`。如果脚本从子目录执行，可以加 `--cwd <workspace-root>` 明确指定根目录。

**为什么默认不安装全局目录？**

> 项目级目录更适合团队共享，也不会改动用户环境。Codex 等工具如果需要用户级 skill，可以显式执行 `fexd-tools skills install --agents codex --scope global`。

**支持哪些 AI 编辑器？**

> 内置 CLI 支持 Cursor、Codex、Claude Code、OpenCode（Codex / OpenCode 共用 `.agents/skills`）。其他工具如果兼容这些目录，也可以通过手动链接接入。
