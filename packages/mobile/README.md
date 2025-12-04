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
