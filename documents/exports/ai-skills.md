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

`@fexd/mobile` 随 npm 包发布了完整的 **AI Agent Skills** 文档。安装组件库后，AI 编辑器（Cursor / Windsurf / Claude Code 等）即可通过这些文档精准理解每个组件的用法、Props、架构设计和最佳实践。

### 发布了什么？

`npm install @fexd/mobile` 后，`node_modules` 中包含以下 AI 文档：

```
node_modules/@fexd/mobile/
├── AGENTS.md                          # AI 上下文入口
└── skills/
    └── fexd-mobile/
        ├── SKILL.md                   # 主入口：任务路由 + 架构速览
        ├── catalog.md                 # 128 个组件分类目录
        ├── architecture.md            # IO 分层 / Modal 体系 / Transition
        ├── theming.md                 # 主题定制方案
        ├── utilities.md               # Hooks / 工厂函数 / 命令式 API
        ├── source-navigation.md       # 源码导航指南
        └── references/                # 130 份组件详细文档
            ├── Button.md
            ├── Modal.md
            ├── Form.md
            └── ...
```

### 方式一：使用 skills-npm 自动配置（推荐）

[skills-npm](https://github.com/antfu/skills-npm) 能自动扫描 `node_modules` 中的 skills 并创建符号链接到 AI 编辑器的 skills 目录。

**1. 安装**

```bash
npm i -D skills-npm
# 或
pnpm add -D skills-npm
```

**2. 在项目 `package.json` 中添加 `prepare` 脚本**

```json
{
  "scripts": {
    "prepare": "skills-npm"
  }
}
```

之后每次 `npm install` 时，skills-npm 会自动扫描 `node_modules/@fexd/mobile/skills/fexd-mobile/SKILL.md`，在 `.cursor/skills/`（或 `.claude/skills/` 等）下创建符号链接。

**3. 手动触发一次（如果 `prepare` 尚未执行）**

```bash
npx skills-npm
```

**4. 将符号链接加入 `.gitignore`**

skills-npm 默认会自动更新 `.gitignore`，如果没有，手动添加：

```gitignore
skills/npm-*
```

完成后效果：

```
.cursor/skills/
└── npm-fexd-mobile-fexd-mobile/ → node_modules/@fexd/mobile/skills/fexd-mobile/
```

> skills-npm 默认从 `package.json` 的 `dependencies` / `devDependencies` 扫描。如需扫描全部 `node_modules`，可配置 `source: 'node_modules'`。详见 [skills-npm 配置文档](https://github.com/antfu/skills-npm#configuration)。

### 方式二：手动创建符号链接

如果不想引入额外依赖：

```bash
# macOS / Linux
mkdir -p .cursor/skills
ln -s ../../node_modules/@fexd/mobile/skills/fexd-mobile .cursor/skills/fexd-mobile

# Windows (管理员终端)
mklink /D .cursor\skills\fexd-mobile node_modules\@fexd\mobile\skills\fexd-mobile
```

记得在 `.gitignore` 中忽略：

```gitignore
.cursor/skills/fexd-mobile
```

### 配置完成后

在 AI 编辑器中用自然语言提问即可，AI 会自动加载对应的组件文档：

```
👤 "用 DatePicker 做一个日期范围选择"
🤖 → 读取 references/DatePicker.md，给出完整示例代码

👤 "怎么自定义 Button 的主题色？"
🤖 → 读取 references/Button.md + theming.md，给出 Less 变量覆盖方案

👤 "省市区三级联动怎么做？"
🤖 → 读取 references/CascadePicker.md，给出级联选择器方案

👤 "这个库有哪些弹窗组件？"
🤖 → 读取 catalog.md，列出反馈类组件清单
```

### 常见问题

**skills-npm 找不到 skills？**

> 确保 `@fexd/mobile` 版本 >= 0.1.32。该版本起 `package.json` 的 `files` 字段包含 `skills` 目录。

**更新 @fexd/mobile 后文档没变？**

> 符号链接指向 `node_modules`，`npm update` 后内容自动更新。如果使用 skills-npm，执行 `npx skills-npm` 可重新链接。

**monorepo 怎么配置？**

> 在根目录运行 `npx skills-npm --recursive`，会递归扫描所有 workspace 包。

**支持哪些 AI 编辑器？**

> skills-npm 自动检测 Cursor、Windsurf、Claude Code 等，为每个编辑器创建对应的符号链接。手动方式需查阅目标编辑器的 skills 目录位置。
