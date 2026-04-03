# 主题定制与样式修改

## Contents

- [样式引入方式](#样式引入方式)
- [Less 变量方案](#less-变量方案推荐) — 全局设计变量、色板、组件变量
- [CSS 变量方案](#css-变量方案实验性) — 运行时主题切换
- [组件级样式修改策略](#组件级样式修改策略) — 4 种策略按优先级排列

## 样式引入方式

```less
// Less 全量引入（推荐）
@import '~@fexd/mobile/es/style.less';
```

```js
// babel-plugin-import 按需引入
;[
  'import',
  {
    libraryName: '@fexd/mobile',
    libraryDirectory: 'es/exports',
    style: (name) => `${name}/style.less`,
  },
  '@fexd/mobile',
]
```

## Less 变量方案（推荐）

Less 变量利用惰性求值特性，后定义的变量值会覆盖先定义的。

### 覆盖方式

**在 Less 文件中直接覆盖：**

```less
@import '~@fexd/mobile/es/style.less';
@color-primary: #ff6b00;
@size-scale: 1.2;
```

**通过构建工具注入（webpack）：**

```js
{
  loader: 'less-loader',
  options: {
    lessOptions: {
      modifyVars: { 'color-primary': '#ff6b00', 'size-scale': '1.2' },
      javascriptEnabled: true,
    },
  },
}
```

**Vite：**

```js
export default {
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: { 'color-primary': '#ff6b00', 'size-scale': '1.2' },
        javascriptEnabled: true,
      },
    },
  },
}
```

### 全局设计变量

**尺寸缩放：**

```less
@size-scale: 1; // 基础缩放因子，影响所有组件尺寸
```

**功能色：**

```less
@color-primary: @color-blue;
@color-info: @color-blue;
@color-success: @color-green;
@color-warning: @color-orange;
@color-danger: @color-red;
@color-disable: @ant-color-gray-6;
```

**中性色：**

```less
@color-gray-title: @ant-color-gray-10;
@color-gray-primary: @ant-color-gray-10;
@color-gray-secondary: @ant-color-gray-7;
@color-gray-disable: @ant-color-gray-6;
@color-gray-border: @ant-color-gray-5;
@color-gray-divider: @ant-color-gray-4;
@color-gray-background: @ant-color-gray-3;
```

**动画速度：** `@transition-speed-{none|fastest|fast|normal|slow|slowest}`，值同 Transition 系统预设（0~700ms）。

**Ant Design 色板：** 内置完整色板 `@ant-color-{color}-{1~12}`，颜色包括 blue、red、green、orange、yellow、gray、purple、cyan 等。完整列表见 `src/theme/ant-colors.less`。

### 组件级 Less 变量

每个组件定义自己的 Less 变量，格式为 `@{component}-{property}`。示例：

```less
@button-height: 44px * @size-scale;
@button-font-size: 16px * @size-scale;
@button-border-radius: 4px * @size-scale;
```

各组件的完整变量列表见 `references/{Name}.md` 样式定制章节，或读取源码 `type.tsx` 中的 `DOC_{Name}StyleVars` 接口。

## CSS 变量方案（实验性）

支持运行时主题切换，但 API 可能变化。

**引入：**

```less
@import '~@fexd/mobile/src/theme/vars.cssvars.less';
```

所有 CSS 变量使用 `--exd-` 前缀：

```css
:root {
  --exd-color-primary: #1890ff;
  --exd-size-scale: 1;
}
```

**运行时切换：**

```js
document.documentElement.style.setProperty('--exd-color-primary', '#ff6b00')
```

**局部作用域 / 暗色模式：**

```css
.dark-section {
  --exd-color-primary: #177ddc;
}

@media (prefers-color-scheme: dark) {
  :root {
    --exd-color-primary: #177ddc;
    --exd-color-gray-title: rgba(255, 255, 255, 0.85);
    --exd-color-gray-background: #141414;
  }
}
```

## 组件级样式修改策略

按优先级从低到高：

### 1. className / style prop

最直接，适合单实例覆盖：

```jsx
<Button className="my-button" style={{ borderRadius: 20 }}>
  按钮
</Button>
```

### 2. Less 变量覆盖

全局或构建时生效，适合统一风格：

```less
@import '~@fexd/mobile/es/style.less';
@button-border-radius: 20px;
```

### 3. CSS 变量覆盖

运行时生效，适合动态主题：

```css
.my-theme {
  --exd-button-border-radius: 20px;
}
```

### 4. 样式穿透（CSS 选择器覆盖）

通过类名选择器覆盖。组件类名命名约定：`exd-{component-name}`，变体：`exd-{component-name}-{variant}`。

```less
.exd-button {
  &.exd-button-primary {
    background: linear-gradient(135deg, #667eea, #764ba2);
  }
}
```
