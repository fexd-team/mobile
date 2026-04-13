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

## 📱 组件列表

### 基础组件

- **Button** - 按钮
- **Icon** - 图标
- **Image** - 图片
- **Cell** - 单元格
- **Space** - 间距

### 表单组件

- **Input** - 输入框
- **TextArea** - 文本域
- **Checkbox** - 复选框
- **Radio** - 单选框
- **Switch** - 开关
- **Stepper** - 步进器
- **Rate** - 评分
- **Slider** - 滑块
- **Picker** - 选择器
- **DatePicker** - 日期选择器
- **TimePicker** - 时间选择器
- **Calendar** - 日历
- **Cascader** - 级联选择
- **Form** - 表单

### 反馈组件

- **ActionSheet** - 动作面板
- **Dialog** - 对话框
- **Toast** - 轻提示
- **Modal** - 模态框
- **Popup** - 弹出层
- **Loading** - 加载
- **Notify** - 通知
- **Overlay** - 遮罩层
- **Alert** - 警告提示

### 展示组件

- **Badge** - 徽标
- **Tag** - 标签
- **Card** - 卡片
- **Avatar** - 头像
- **Progress** - 进度条
- **Skeleton** - 骨架屏
- **Empty** - 空状态
- **Divider** - 分割线
- **NoticeBar** - 通知栏
- **CountDown** - 倒计时
- **Timeline** - 时间轴
- **Steps** - 步骤条
- **Watermark** - 水印

### 导航组件

- **NavBar** - 导航栏
- **TabBar** - 标签栏
- **Tabs** - 标签页
- **Menu** - 菜单
- **Breadcrumb** - 面包屑
- **Pagination** - 分页
- **Dropdown** - 下拉菜单

### 业务组件

- **List** - 列表
- **Grid** - 宫格
- **Swiper** - 轮播
- **Gallery** - 图片预览
- **ImagePicker** - 图片选择器
- **SwipeAction** - 滑动操作
- **Collapse** - 折叠面板
- **Search** - 搜索
- **NumberKeyboard** - 数字键盘
- **ShareSheet** - 分享面板

### 布局组件

- **Flex** - 弹性布局
- **View** - 视图容器
- **ScrollView** - 滚动视图
- **Sticky** - 粘性布局
- **Elevator** - 电梯导航

### 高级组件

- **Portal** - 传送门
- **Transition** - 过渡动画
- **ErrorBoundary** - 错误边界
- **Provider** - 上下文提供者
- **Hook** - 自定义 Hooks

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
