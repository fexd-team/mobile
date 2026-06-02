# Fexd Mobile

<p align="center">
  <a href="https://fexd-team.github.io/mobile/">
    <img width="200" src="https://fexd-team.github.io/mobile/logo.png" />
  </a>
</p>

<p align="center">一个基于 React 的移动端组件库</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@fexd/mobile">
    <img src="https://img.shields.io/npm/v/@fexd/mobile.svg" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/@fexd/mobile">
    <img src="https://img.shields.io/npm/dm/@fexd/mobile.svg" alt="npm downloads" />
  </a>
  <a href="https://github.com/fexd-team/mobile/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@fexd/mobile.svg" alt="license" />
  </a>
</p>

## ✨ 特性

- 🚀 **丰富** - 参考业内多个成熟组件库，综合组件类型多样，适用于多种业务场景
- 🎯 **灵活** - 颗粒细、功能全、体积小（gzipped 平均 7kb），按需加载，便于组合
- 💡 **易用** - 各组件的属性设计上，汇总了各类技术方案中的良好实践
- 📦 **开箱即用** - 提供完整的 TypeScript 类型定义
- 🎨 **主题定制** - 支持 CSS 变量，轻松实现主题定制
- 🌐 **国际化** - 内置多语言支持

## 📦 安装

```bash
yarn add @fexd/mobile
# 或者
npm install @fexd/mobile --save
# 或者
pnpm add @fexd/mobile
```

## 🔨 使用

### 基础使用

```tsx
import { Button, toast } from '@fexd/mobile'
import '@fexd/mobile/es/style.css'

function App() {
  return (
    <Button
      onClick={() => {
        toast.info('Hello Fexd Mobile!')
      }}
    >
      点击我
    </Button>
  )
}
```

### 按需加载

配合 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 实现按需加载：

```js
// babel.config.js
module.exports = {
  plugins: [
    [
      'babel-plugin-import',
      {
        libraryName: '@fexd/mobile',
        libraryDirectory: 'lib/exports', // or 'es/exports'
        camel2DashComponentName: false,
        style: (name) => `${name}/style.less`, // or `${name}/style.css`
      },
      '@fexd/mobile',
    ],
  ],
}
```

### TypeScript

`@fexd/mobile` 使用 TypeScript 编写，提供完整的类型定义文件：

```tsx
import type { ButtonProps } from '@fexd/mobile'

const CustomButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />
}
```

## 📱 稳定导出

当前版本提供 127 个公开导出。完整机器可读清单见 `components.manifest.json`，AI/Agent 使用建议见 `AGENTS.md` 与 `skills/fexd-mobile/SKILL.md`。

### 输入与表单

Button, Input, LineInput, BlockInput, CellInput, TextArea, Form, Checkbox, Radio, Switch, Stepper, Rate, Slider, Picker, CascadePicker, DatePicker, TimePicker

### 反馈

ActionSheet, Dialog, Modal, Popup, toast, notify, loading, Overlay, Alert, Spinner, FullpageSpinner

### 展示与布局

Badge, Avatar, Empty, Result, ProgressBar, Swiper, Steps, Timeline, Cell, Space, Grid, ScrollView, Collapse, Divider, Flex, View, Watermark

### 导航与基础能力

NavBar, TabBar, Tabs, Provider, Portal, ErrorBoundary, Hook, Iconfont, Image

> Calendar、Card、Skeleton、Search 等带 `.developing` 标记的组件尚未公开导出，请不要在业务代码中使用。

## 🎨 主题定制

Fexd Mobile 支持通过 CSS 变量进行主题定制：

```css
:root {
  --exd-primary-color: #1890ff;
  --exd-success-color: #52c41a;
  --exd-warning-color: #faad14;
  --exd-error-color: #f5222d;
  --exd-font-size-base: 14px;
  --exd-border-radius-base: 4px;
}
```

也可以使用 Less 变量：

```less
@import '~@fexd/mobile/es/theme/vars.less';

// 覆盖变量
@primary-color: #1890ff;
```

## 🌍 浏览器支持

现代浏览器以及 Android >= 5.0、iOS >= 10.0

| Chrome | Firefox | Safari | Android | iOS     |
| ------ | ------- | ------ | ------- | ------- |
| >= 49  | >= 45   | >= 10  | >= 5.0  | >= 10.0 |

## 📖 文档

完整文档请访问：[https://fexd-team.github.io/mobile/](https://fexd-team.github.io/mobile/)

## 🤖 AI Skills —— 让 AI 编辑器理解 @fexd/mobile

`@fexd/mobile` 随 npm 包发布了完整的 **AI Agent Skills** 文档。安装组件库后，可以通过 `@fexd/tools` 把这些文档注册到 Cursor、Codex、Claude Code、OpenCode 等常见 AI Agent 的 skills 目录。

### 发布了什么？

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

### 使用 fexd-tools 统一安装

```bash
pnpm add -D @fexd/tools
fexd-tools skills install
```

也可以在消费项目中添加脚本：

```json
{
  "scripts": {
    "prepare:skills": "fexd-tools skills install"
  }
}
```

默认会把 `fexd-mobile` skill 链接到常见 agent 的项目级目录：

```text
.cursor/skills/fexd-mobile
.agents/skills/fexd-mobile
.claude/skills/fexd-mobile
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

**AI 没有加载 skill？**

> 先确认目标目录下存在 `fexd-mobile/SKILL.md`，然后重启对应 AI 编辑器或新开一个会话。部分工具只在启动时扫描 skills。

**更新 @fexd/mobile 后文档没变？**

> 默认安装方式使用链接，更新依赖后内容会跟随 `node_modules` 更新。如果使用复制模式，需要重新执行 `fexd-tools skills install --copy --force`。

**monorepo 怎么配置？**

> 在 workspace 根目录运行 `fexd-tools skills install`。如果脚本从子目录执行，可以加 `--cwd <workspace-root>` 明确指定根目录。

**支持哪些 AI 编辑器？**

> 内置 CLI 支持 Cursor、Codex、Claude Code、OpenCode（Codex / OpenCode 共用 `.agents/skills`）。

## 🤝 参与共建

我们欢迎所有的贡献。请先阅读我们的 [贡献指南](https://fexd-team.github.io/mobile/contributing.html)。

您可以将任何想法作为 [Pull Requests](https://github.com/fexd-team/mobile/pulls) 或 [Issues](https://github.com/fexd-team/mobile/issues) 提交。

### 本地开发

```bash
# 克隆项目
git clone https://github.com/fexd-team/mobile.git

# 安装依赖
yarn

# 启动开发服务器
yarn dev

# 构建组件库
yarn build

# 创建新组件
yarn new:component --name=YourComponent
```

## 📄 许可证

[ISC](https://github.com/fexd-team/mobile/blob/main/LICENSE)

Copyright (c) 2020-present, fexd-team
