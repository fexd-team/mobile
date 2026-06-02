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

当前版本提供 127 个公开导出。完整机器可读清单见 `packages/mobile/components.manifest.json`，AI/Agent 使用建议见 `packages/mobile/AGENTS.md` 与 `packages/mobile/skills/fexd-mobile/SKILL.md`。

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

## 🤖 AI Skills

`@fexd/mobile` 随 npm 包发布 AI Agent Skills、`AGENTS.md`、`llms.txt` 和 `components.manifest.json`，帮助 AI 编辑器读取真实组件用法、Props、源码路径和禁用组件清单。

推荐在消费项目中使用 `@fexd/tools` 注册：

```bash
pnpm add -D @fexd/tools
fexd-tools skills install
```

也可以在项目脚本中加入：

```json
{
  "scripts": {
    "prepare:skills": "fexd-tools skills install"
  }
}
```

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
