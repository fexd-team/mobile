---
nav:
  title: 文档
  order: 1

group:
  title: 主题定制
  order: 1

title: 主题定制
mobileDemoFixed: false
---

# 主题定制

FEXD Mobile 组件库提供了两种主题定制方式：

## 定制方式对比

| 特性           | Less 变量（推荐） | CSS 变量（实验性）      |
| :------------- | :---------------- | :---------------------- |
| **稳定性**     | ✅ 生产可用       | ⚠️ 实验阶段             |
| **定制时机**   | 编译时            | 运行时                  |
| **动态主题**   | ❌ 不支持         | ✅ 支持                 |
| **浏览器兼容** | 所有浏览器        | 现代浏览器（不支持 IE） |
| **性能**       | 无运行时开销      | 轻微运行时开销          |
| **推荐场景**   | 大多数项目        | 需要动态主题切换的场景  |

### 选择建议

- ✅ **推荐使用 Less 变量**：稳定可靠，适合大多数生产环境
- ⚠️ **谨慎使用 CSS 变量**：实验性功能，仅在确实需要运行时动态主题切换时使用

---

## Less 变量方式（推荐）

Less 变量方式是编译时的主题定制方案，**稳定可靠**，适合大多数场景。

### 定制方式

#### 方式一：覆盖 Less 变量

在你的项目中创建一个 Less 文件，**先引入组件库样式，再覆盖变量**：

```less
// custom-theme.less

// 先引入组件库样式
@import '@fexd/mobile/es/style.less';

// 再覆盖变量（利用 Less 的懒计算特性，后定义的变量会生效）
@size-scale: 1.2; // 放大所有尺寸
@color-primary: #722ed1; // 修改主色调为紫色
```

> **注意**：由于 Less 变量是懒计算的（lazy evaluation），变量值取决于最后一次定义。所以必须先 `@import` 再定义变量，否则组件库内部的变量定义会覆盖你的配置。

#### 方式二：配置 Less-loader（Webpack）

在构建工具中配置 `less-loader` 的 `modifyVars` 选项：

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'color-primary': '#722ed1',
                  'size-scale': '1.2',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  // 配合 babel-plugin-import 自动引入样式
  // 在 babel-loader 中配置
}
```

**配合 babel-plugin-import 自动引入样式**：

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

#### 方式三：Vite 配置

```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'color-primary': '#722ed1',
          'size-scale': '1.2',
        },
        javascriptEnabled: true,
      },
    },
  },
})
```

**配合 vite-plugin-style-import 自动引入样式**：

首先安装插件：

```bash
npm install vite-plugin-style-import --save-dev
```

然后配置 Vite：

```js
// vite.config.js
import { defineConfig } from 'vite'
import styleImport from 'vite-plugin-style-import'

export default defineConfig({
  plugins: [
    styleImport({
      libs: [
        {
          libraryName: '@fexd/mobile',
          esModule: true,
          resolveStyle: (name) => {
            return `@fexd/mobile/es/exports/${name}/style.less`
          },
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'color-primary': '#722ed1',
          'size-scale': '1.2',
        },
        javascriptEnabled: true,
      },
    },
  },
})
```

---

## 全局变量

以下是组件库提供的全局 Less 变量，定义在 `theme/vars.less` 中：

### 尺寸变量

| 变量名        | 说明                                 | 默认值 |
| :------------ | :----------------------------------- | :----- |
| `@size-scale` | 全局尺寸缩放比例，影响所有组件的尺寸 | `1`    |

### 基础色彩

| 变量名          | 说明 | 默认值    |
| :-------------- | :--- | :-------- |
| `@color-red`    | 红色 | `#f5222d` |
| `@color-yellow` | 黄色 | `#fadb14` |
| `@color-orange` | 橙色 | `#fa8c16` |
| `@color-blue`   | 蓝色 | `#1890ff` |
| `@color-green`  | 绿色 | `#52c41a` |
| `@color-white`  | 白色 | `#fff`    |
| `@color-gray`   | 灰色 | `#bfbfbf` |
| `@color-black`  | 黑色 | `#141414` |

### 功能色

| 变量名           | 说明   | 默认值          |
| :--------------- | :----- | :-------------- |
| `@color-primary` | 主色调 | `@color-blue`   |
| `@color-info`    | 信息色 | `@color-blue`   |
| `@color-success` | 成功色 | `@color-green`  |
| `@color-warning` | 警告色 | `@color-orange` |
| `@color-danger`  | 危险色 | `@color-red`    |
| `@color-disable` | 禁用色 | `#bfbfbf`       |

### 中性色（文字/边框/背景）

| 变量名                     | 说明       | 默认值    |
| :------------------------- | :--------- | :-------- |
| `@color-gray-title`        | 标题文字色 | `#262626` |
| `@color-gray-primary`      | 主要文字色 | `#262626` |
| `@color-gray-secondary`    | 次要文字色 | `#8c8c8c` |
| `@color-gray-disable`      | 禁用文字色 | `#bfbfbf` |
| `@color-gray-border`       | 边框色     | `#d9d9d9` |
| `@color-gray-divider`      | 分割线色   | `#f0f0f0` |
| `@color-gray-background`   | 背景色     | `#f5f5f5` |
| `@color-gray-table-header` | 表头背景色 | `#fafafa` |

---

## 色板系统

组件库基于 [Ant Design 色板](https://ant.design/docs/spec/colors-cn) 提供了完整的色彩系统，每种颜色包含 10 个色阶（1-10，数字越大颜色越深）。

### 可用色板

| 色板名称 | 变量前缀                | 主色（6 号） | 语义       |
| :------- | :---------------------- | :----------- | :--------- |
| 薄暮红   | `@ant-color-red-*`      | `#f5222d`    | 斗志、奔放 |
| 火山橙   | `@ant-color-volcano-*`  | `#fa541c`    | 醒目、澎湃 |
| 日暮橙   | `@ant-color-orange-*`   | `#fa8c16`    | 温暖、欢快 |
| 金盏花   | `@ant-color-gold-*`     | `#faad14`    | 活力、积极 |
| 日出黄   | `@ant-color-yellow-*`   | `#fadb14`    | 出生、阳光 |
| 青柠绿   | `@ant-color-lime-*`     | `#a0d911`    | 自然、生机 |
| 极光绿   | `@ant-color-green-*`    | `#52c41a`    | 健康、创新 |
| 明青色   | `@ant-color-cyan-*`     | `#13c2c2`    | 希望、坚强 |
| 拂晓蓝   | `@ant-color-blue-*`     | `#1890ff`    | 包容、科技 |
| 极客蓝   | `@ant-color-geekblue-*` | `#2f54eb`    | 探索、钻研 |
| 酱紫色   | `@ant-color-purple-*`   | `#722ed1`    | 优雅、浪漫 |
| 洋红色   | `@ant-color-magenta-*`  | `#eb2f96`    | 明快、感性 |
| 中性灰   | `@ant-color-gray-*`     | `#bfbfbf`    | 中性色板   |

### 色阶使用示例

```less
// 使用色板变量
.my-component {
  // 浅色背景
  background-color: @ant-color-blue-1; // #e6f7ff

  // 边框颜色
  border-color: @ant-color-blue-3; // #91d5ff

  // 主色
  color: @ant-color-blue-6; // #1890ff

  // 深色 hover 态
  &:hover {
    color: @ant-color-blue-7; // #096dd9
  }
}
```

### 中性色板

中性色板包含 13 个色阶，用于文字、边框、背景等场景：

| 变量名               | 色值      | 常见用途 |
| :------------------- | :-------- | :------- |
| `@ant-color-gray-1`  | `#ffffff` | 纯白背景 |
| `@ant-color-gray-2`  | `#fafafa` | 表头背景 |
| `@ant-color-gray-3`  | `#f5f5f5` | 页面背景 |
| `@ant-color-gray-4`  | `#f0f0f0` | 分割线   |
| `@ant-color-gray-5`  | `#d9d9d9` | 边框     |
| `@ant-color-gray-6`  | `#bfbfbf` | 禁用态   |
| `@ant-color-gray-7`  | `#8c8c8c` | 次要文字 |
| `@ant-color-gray-8`  | `#595959` | 正文文字 |
| `@ant-color-gray-9`  | `#434343` | -        |
| `@ant-color-gray-10` | `#262626` | 标题文字 |
| `@ant-color-gray-11` | `#1f1f1f` | -        |
| `@ant-color-gray-12` | `#141414` | 黑色     |
| `@ant-color-gray-13` | `#000000` | 纯黑     |

---

## 组件变量

除了全局变量外，部分组件还提供了组件级别的 Less 变量。具体变量请参考各组件文档中的「样式变量」章节。

### 已支持样式变量的组件

- [Radio 单选框](/exports/data/radio) - 颜色、尺寸、间距
- [Checkbox 复选框](/exports/data/checkbox) - 颜色、尺寸、间距
- [Button 按钮](/exports/data/button) - 尺寸
- [Switch 开关](/exports/data/switch) - 尺寸
- [NavBar 导航栏](/exports/navigation/nav-bar) - 高度
- [Spinner 加载指示器](/exports/display/spinner) - 尺寸
- 更多组件持续完善中...

---

## 最佳实践

### 1. 统一主题色

```less
// 定义品牌色
@brand-color: #722ed1;

// 覆盖组件库主色
@color-primary: @brand-color;
@color-info: @brand-color;
```

### 2. 适配不同屏幕尺寸

```less
// 大屏设备放大组件
@size-scale: 1.2;

// 小屏设备缩小组件
@size-scale: 0.9;
```

### 3. 暗色主题

```less
// 暗色主题配置示例
@color-gray-title: @ant-color-gray-3;
@color-gray-primary: @ant-color-gray-4;
@color-gray-secondary: @ant-color-gray-6;
@color-gray-background: @ant-color-gray-11;
```

---

## CSS 变量方式（实验性）

> ⚠️ **实验性功能**：CSS 变量模式目前处于实验阶段，API 可能会在未来版本中调整。生产环境建议优先使用 Less 变量方式。

组件库还支持 **CSS 变量模式**，允许在运行时动态修改主题样式，非常适合需要动态切换主题（如浅色/深色模式）的场景。

### 优势对比

| 特性       | Less 变量（推荐） | CSS 变量（实验性）      |
| :--------- | :---------------- | :---------------------- |
| 稳定性     | ✅ 稳定           | ⚠️ 实验性               |
| 修改时机   | 编译时            | 运行时                  |
| 主题切换   | 需要重新编译      | 无需重新编译            |
| 动态修改   | ❌ 不支持         | ✅ 支持                 |
| 浏览器兼容 | 所有浏览器        | 现代浏览器（不支持 IE） |
| 性能       | 无运行时开销      | 有轻微运行时开销        |
| 生产推荐   | ✅ 推荐           | ⚠️ 谨慎使用             |

### 使用 CSS 变量模式

> ⚠️ **注意**：此功能处于实验阶段，建议在测试环境中谨慎使用。

组件库提供了预生成的 CSS 变量版本样式文件（`.cssvars.less`），**无需任何构建工具配置**，直接引入即可使用。

#### 特点

- ✅ **开箱即用**：无需配置 `modifyVars` 或 Less 插件
- ✅ **已包含初始化**：`.cssvars.less` 文件已内置 CSS 变量初始化
- ✅ **按需引入**：每个组件独立，按需引入即可
- ⚠️ **实验性**：API 可能在未来版本中调整

#### 使用步骤

**方式 1：按需引入（推荐）**

直接引入需要使用的组件的 `.cssvars.less` 版本样式：

```typescript
// 引入需要使用的组件的 CSS 变量版本样式
import '@fexd/mobile/es/exports/Button/style.cssvars.less'
import '@fexd/mobile/es/exports/Radio/style.cssvars.less'

// 然后正常使用组件
import { Button, Radio } from '@fexd/mobile'
```

**方式 2：配合 babel-plugin-import 自动引入（推荐）**

使用 `babel-plugin-import` 插件可以自动引入组件的 CSS 变量版本样式，无需手动引入。

首先安装插件：

```bash
npm install babel-plugin-import --save-dev
```

然后配置 Babel：

```javascript
// babel.config.js
module.exports = {
  plugins: [
    [
      'babel-plugin-import',
      {
        libraryName: '@fexd/mobile',
        libraryDirectory: 'lib/exports', // or 'es/exports'
        camel2DashComponentName: false,
        style: (name) => `${name}/style.cssvars.less`,
      },
      '@fexd/mobile',
    ],
  ],
}
```

配置完成后，直接使用组件即可，样式会自动引入：

```typescript
// 无需手动引入样式
import { Button, Radio } from '@fexd/mobile'

// 样式会自动引入为：
// import '@fexd/mobile/lib/exports/Button/style.cssvars.less';
// import '@fexd/mobile/lib/exports/Radio/style.cssvars.less';
```

**方式 3：全量引入**

如果需要一次性引入所有组件的 CSS 变量版本样式：

```typescript
// 引入所有组件的 CSS 变量版本样式
import '@fexd/mobile/es/style.cssvars.less'

// 正常使用组件
import { Button, Radio } from '@fexd/mobile'
```

或者只引入全局主题变量：

```typescript
// 只引入全局主题变量（颜色、尺寸等）
import '@fexd/mobile/es/theme/vars.cssvars.less'

// 按需引入组件样式
import '@fexd/mobile/es/exports/Button/style.cssvars.less'
```

> **说明**：`.cssvars.less` 文件已经包含了该组件需要的 CSS 变量初始化（在 `:root` 中定义），无需额外引入初始化文件。

#### 完整示例

**示例 1：手动引入**

```typescript
// main.tsx
import React from 'react'
import ReactDOM from 'react-dom'

// 1. 引入组件的 CSS 变量版本样式
import '@fexd/mobile/es/exports/Button/style.cssvars.less'
import '@fexd/mobile/es/exports/Radio/style.cssvars.less'

// 2. 正常使用组件
import { Button, Radio } from '@fexd/mobile'

function App() {
  return (
    <div>
      <Button type="primary">主按钮</Button>
      <Radio checked>单选框</Radio>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**示例 2：使用 babel-plugin-import 自动引入**

```javascript
// babel.config.js
module.exports = {
  plugins: [
    [
      'babel-plugin-import',
      {
        libraryName: '@fexd/mobile',
        libraryDirectory: 'lib/exports', // or 'es/exports'
        camel2DashComponentName: false,
        style: (name) => `${name}/style.cssvars.less`,
      },
      '@fexd/mobile',
    ],
  ],
}
```

```typescript
// main.tsx
import React from 'react'
import ReactDOM from 'react-dom'

// 无需手动引入样式，babel-plugin-import 会自动引入
import { Button, Radio } from '@fexd/mobile'

function App() {
  return (
    <div>
      <Button type="primary">主按钮</Button>
      <Radio checked>单选框</Radio>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### 自定义主题

#### 方式 1：通过 CSS 覆盖

创建自定义样式文件，覆盖 CSS 变量：

```css
/* custom-theme.css */
:root {
  /* 全局颜色 */
  --exd-color-primary: #722ed1;
  --exd-color-success: #52c41a;

  /* 全局尺寸缩放 */
  --exd-size-scale: 1.2;

  /* 组件级变量 */
  --exd-alert-padding-vertical: 8px;
  --exd-radio-icon-size: 28px;
}
```

然后在入口文件中引入（确保在组件样式之后）：

```typescript
// 先引入组件的 CSS 变量版本样式
import '@fexd/mobile/es/exports/Button/style.cssvars.less'

// 再引入自定义主题覆盖默认值
import './custom-theme.css'
```

#### 方式 2：通过 JavaScript 动态修改

```typescript
// 修改单个变量
document.documentElement.style.setProperty('--exd-color-primary', '#722ed1')

// 批量修改
const customTheme = {
  '--exd-color-primary': '#722ed1',
  '--exd-color-success': '#52c41a',
  '--exd-size-scale': '1.2',
}

Object.entries(customTheme).forEach(([key, value]) => {
  document.documentElement.style.setProperty(key, value)
})
```

#### 方式 3：主题切换（浅色/深色模式）

```typescript
// 定义主题配置
const themes = {
  light: {
    '--exd-color-primary': '#1890ff',
    '--exd-color-gray-title': '#262626',
    '--exd-color-gray-primary': '#262626',
    '--exd-color-gray-secondary': '#8c8c8c',
    '--exd-color-gray-background': '#f5f5f5',
  },
  dark: {
    '--exd-color-primary': '#177ddc',
    '--exd-color-gray-title': '#f5f5f5',
    '--exd-color-gray-primary': '#f0f0f0',
    '--exd-color-gray-secondary': '#bfbfbf',
    '--exd-color-gray-background': '#1f1f1f',
  },
}

// 切换主题函数
function applyTheme(themeName: 'light' | 'dark') {
  const theme = themes[themeName]
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value)
  })
}

// 使用示例
applyTheme('dark') // 切换到深色模式
applyTheme('light') // 切换到浅色模式

// 也可以监听系统主题变化
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
prefersDark.addEventListener('change', (e) => {
  applyTheme(e.matches ? 'dark' : 'light')
})
```

### 可用的 CSS 变量

#### 全局变量

```css
/* 尺寸 */
--exd-size-scale: 1; /* 全局缩放比例 */

/* 基础颜色 */
--exd-color-primary: #1890ff;
--exd-color-success: #52c41a;
--exd-color-warning: #fa8c16;
--exd-color-danger: #f5222d;
--exd-color-info: #1890ff;

/* 中性色 */
--exd-color-gray-title: #262626;
--exd-color-gray-primary: #262626;
--exd-color-gray-secondary: #8c8c8c;
--exd-color-gray-border: #d9d9d9;
--exd-color-gray-divider: #f0f0f0;
--exd-color-gray-background: #f5f5f5;
```

#### 组件变量示例

```css
/* Alert 组件 */
--exd-alert-padding-vertical: 6px;
--exd-alert-padding-horizontal: 14px;
--exd-alert-border-radius: 4px;
--exd-alert-info-background: rgb(229, 246, 253);
--exd-alert-info-color: rgb(1, 67, 97);

/* Radio 组件 */
--exd-radio-default-color: #bfbfbf;
--exd-radio-active-color: #1890ff;
--exd-radio-icon-size: 24px;
--exd-radio-content-font-size: 15px;
```

> 更多组件变量请在浏览器开发者工具中查看 `:root` 元素的样式，或参考生成的 `cssvars/style.css` 文件。

### 互动演示

以下演示展示了 CSS 变量的动态主题切换能力，**所有主题切换都是实时生效，无需重新编译**。

#### 演示 1：一键切换主题

```tsx
import React, { useState } from 'react'
import { Button, Radio, Slider, Switch, Space } from '@fexd/mobile'

export default () => {
  const [theme, setTheme] = useState('default')

  const applyTheme = (themeName) => {
    const themes = {
      default: {
        '--exd-color-primary': '#1890ff',
        '--exd-size-scale': '1',
      },
      purple: {
        '--exd-color-primary': '#722ed1',
        '--exd-size-scale': '1',
      },
      green: {
        '--exd-color-primary': '#52c41a',
        '--exd-size-scale': '1',
      },
      large: {
        '--exd-color-primary': '#1890ff',
        '--exd-size-scale': '1.2',
      },
      small: {
        '--exd-color-primary': '#fa8c16',
        '--exd-size-scale': '0.85',
      },
    }

    const selectedTheme = themes[themeName]
    Object.entries(selectedTheme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })

    setTheme(themeName)
  }

  return (
    <div>
      <h3>选择主题：</h3>
      <Space wrap style={{ marginBottom: 20 }}>
        <Button type={theme === 'default' ? 'primary' : 'default'} onClick={() => applyTheme('default')}>
          默认蓝色
        </Button>
        <Button type={theme === 'purple' ? 'primary' : 'default'} onClick={() => applyTheme('purple')}>
          优雅紫色
        </Button>
        <Button type={theme === 'green' ? 'primary' : 'default'} onClick={() => applyTheme('green')}>
          清新绿色
        </Button>
        <Button type={theme === 'large' ? 'primary' : 'default'} onClick={() => applyTheme('large')}>
          大尺寸
        </Button>
        <Button type={theme === 'small' ? 'primary' : 'default'} onClick={() => applyTheme('small')}>
          小尺寸
        </Button>
      </Space>

      <div
        style={{
          background: '#f5f5f5',
          padding: 20,
          borderRadius: 8,
          marginTop: 20,
        }}
      >
        <h4 style={{ margin: '0 0 16px 0' }}>组件效果预览：</h4>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button type="primary" block>
            主按钮
          </Button>
          <Button type="default" block>
            次按钮
          </Button>
          <Radio checked>单选框选项</Radio>
          <Switch defaultChecked />
          <Slider defaultValue={60} />
        </Space>
      </div>

      <p style={{ marginTop: 16, fontSize: 12, color: '#999' }}>
        💡 提示：点击主题按钮可以实时切换主题，无需重新编译或刷新页面
      </p>
    </div>
  )
}
```

#### 演示 2：实时调整 CSS 变量

```tsx
import React, { useState, useEffect } from 'react'
import { Button, Slider, Space, Radio } from '@fexd/mobile'

export default () => {
  const [primaryColor, setPrimaryColor] = useState('#1890ff')
  const [sizeScale, setSizeScale] = useState(1)
  const [borderRadius, setBorderRadius] = useState(4)

  useEffect(() => {
    document.documentElement.style.setProperty('--exd-color-primary', primaryColor)
  }, [primaryColor])

  useEffect(() => {
    document.documentElement.style.setProperty('--exd-size-scale', String(sizeScale))
  }, [sizeScale])

  useEffect(() => {
    // 修改按钮圆角（square 形状的圆角）
    document.documentElement.style.setProperty('--exd-btn-border-radius-square', `${borderRadius}px`)
  }, [borderRadius])

  const presetColors = [
    { name: '蓝色', value: '#1890ff', desc: '清新科技' },
    { name: '紫色', value: '#722ed1', desc: '优雅高贵' },
    { name: '绿色', value: '#52c41a', desc: '自然健康' },
    { name: '红色', value: '#f5222d', desc: '热情活力' },
    { name: '橙色', value: '#fa8c16', desc: '温暖友好' },
    { name: '青色', value: '#13c2c2', desc: '科技未来' },
  ]

  const sectionStyle = {
    background: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  }

  return (
    <div>
      <div style={sectionStyle}>
        <h4 style={{ margin: '0 0 12px 0' }}>主色调选择</h4>
        <Space wrap>
          {presetColors.map((color) => (
            <Button
              key={color.value}
              type={primaryColor === color.value ? 'primary' : 'default'}
              onClick={() => setPrimaryColor(color.value)}
              style={primaryColor === color.value ? {} : { borderColor: color.value, color: color.value }}
            >
              {color.name}
              <br />
              <span style={{ fontSize: 10, opacity: 0.7 }}>{color.desc}</span>
            </Button>
          ))}
        </Space>
      </div>

      <div style={sectionStyle}>
        <h4 style={{ margin: '0 0 12px 0' }}>尺寸缩放</h4>
        <p style={{ margin: '0 0 8px 0' }}>
          当前缩放：<strong>{sizeScale.toFixed(1)}x</strong>
        </p>
        <Slider min={0.7} max={1.5} step={0.1} value={sizeScale} onChange={setSizeScale} />
        <p style={{ fontSize: 12, color: '#999', marginTop: 8, marginBottom: 0 }}>
          💡 调整此滑块可以统一缩放所有组件的尺寸
        </p>
      </div>

      <div style={sectionStyle}>
        <h4 style={{ margin: '0 0 12px 0' }}>圆角大小</h4>
        <p style={{ margin: '0 0 8px 0' }}>
          当前圆角：<strong>{borderRadius}px</strong>
        </p>
        <Slider min={0} max={20} step={1} value={borderRadius} onChange={setBorderRadius} />
        <p style={{ fontSize: 12, color: '#999', marginTop: 8, marginBottom: 0 }}>
          💡 调整按钮的圆角大小，从直角到圆角
        </p>
      </div>

      <div style={sectionStyle}>
        <h4 style={{ margin: '0 0 12px 0' }}>效果预览</h4>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button type="primary" shape="square" block>
            主按钮
          </Button>
          <Button type="default" shape="square" block>
            次按钮
          </Button>
          <Radio checked>单选框选项</Radio>
        </Space>
      </div>

      <div style={sectionStyle}>
        <h4 style={{ margin: '0 0 12px 0' }}>当前 CSS 变量值</h4>
        <pre
          style={{
            background: '#ffffff',
            padding: 12,
            borderRadius: 4,
            fontSize: 12,
            margin: 0,
            overflow: 'auto',
            border: '1px solid #d9d9d9',
          }}
        >
          {`--exd-color-primary: ${primaryColor};
--exd-size-scale: ${sizeScale};
--exd-btn-border-radius-square: ${borderRadius}px;`}
        </pre>
      </div>
    </div>
  )
}
```

#### 演示 3：深色模式切换

```tsx
import React, { useState } from 'react'
import { Button, Space, Switch } from '@fexd/mobile'

export default () => {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = (dark) => {
    setIsDark(dark)

    const themes = {
      light: {
        '--exd-color-primary': '#1890ff',
        '--exd-color-gray-1': '#ffffff',
        '--exd-color-gray-2': '#fafafa',
        '--exd-color-gray-3': '#f5f5f5',
        '--exd-color-gray-6': '#bfbfbf',
        '--exd-color-gray-8': '#595959',
        '--exd-color-gray-10': '#262626',
      },
      dark: {
        '--exd-color-primary': '#177ddc',
        '--exd-color-gray-1': '#141414',
        '--exd-color-gray-2': '#1f1f1f',
        '--exd-color-gray-3': '#2a2a2a',
        '--exd-color-gray-6': '#595959',
        '--exd-color-gray-8': '#bfbfbf',
        '--exd-color-gray-10': '#f5f5f5',
      },
    }

    const theme = themes[dark ? 'dark' : 'light']
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })

    // 同时修改页面背景色
    document.body.style.background = dark ? '#141414' : '#ffffff'
    document.body.style.color = dark ? '#f5f5f5' : '#262626'
  }

  return (
    <div>
      <Space align="center" style={{ marginBottom: 20 }}>
        <span>☀️ 浅色模式</span>
        <Switch checked={isDark} onChange={toggleTheme} />
        <span>🌙 深色模式</span>
      </Space>

      <div
        style={{
          background: isDark ? '#1f1f1f' : '#f5f5f5',
          color: isDark ? '#f5f5f5' : '#262626',
          padding: 20,
          borderRadius: 8,
          border: isDark ? '1px solid #434343' : '1px solid #d9d9d9',
        }}
      >
        <h4 style={{ margin: '0 0 16px 0' }}>组件效果预览</h4>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button type="primary" block>
            主按钮
          </Button>
          <Button type="default" block>
            次按钮
          </Button>
          <p style={{ margin: '16px 0 0 0' }}>
            当前模式：<strong>{isDark ? '深色模式' : '浅色模式'}</strong>
          </p>
        </Space>
      </div>

      <p style={{ marginTop: 16, fontSize: 12, color: '#999' }}>💡 提示：深色模式可以减少眼睛疲劳，在夜间使用更舒适</p>
    </div>
  )
}
```

### 技术原理

#### CSS 变量的工作机制

组件库的 `.cssvars.less` 文件包含三个关键部分：

1. **Less 变量定义**（保留，供编译时使用）

```less
@btn-height: 44px;
@btn-font-size: 15px;
@btn-border-radius: 4px;
```

2. **CSS 变量初始化**（引用 Less 变量）

```less
:root {
  --exd-btn-height: @btn-height;
  --exd-btn-font-size: @btn-font-size;
  --exd-btn-border-radius: @btn-border-radius;
}
```

3. **样式代码**（使用 CSS 变量）

```less
.exd-btn {
  height: calc(var(--exd-btn-height) * var(--exd-size-scale));
  font-size: var(--exd-btn-font-size);
  border-radius: var(--exd-btn-border-radius);
}
```

#### CSS 变量的继承链

组件库内部的变量会引用其他 CSS 变量，形成继承链：

```less
// 基础变量
@color-gray: var(--exd-color-gray);
@color-primary: var(--exd-color-primary);

// 组件变量（引用基础变量）
@radio-default-color: var(--exd-color-gray);
@radio-active-color: var(--exd-color-primary);

// CSS 变量初始化
:root {
  --exd-radio-default-color: @radio-default-color; // 实际值为 var(--exd-color-gray)
  --exd-radio-active-color: @radio-active-color; // 实际值为 var(--exd-color-primary)
}
```

这样当你修改基础变量时，所有引用它的组件变量都会自动更新：

```typescript
// 修改基础主色调
document.documentElement.style.setProperty('--exd-color-primary', '#722ed1')

// 所有引用了 @color-primary 的变量都会自动更新：
// - @radio-active-color ✅
// - @checkbox-active-color ✅
// - @button-primary-bg ✅
// ...
```

#### 调试技巧

1. **在浏览器开发者工具中查看 CSS 变量**

   - 打开开发者工具（F12）
   - 选择 Elements 面板
   - 选择 `<html>` 元素
   - 在 Styles 面板中可以看到所有定义在 `:root` 上的 CSS 变量

2. **实时修改 CSS 变量**

   - 在开发者工具的 Styles 面板中直接修改 CSS 变量值
   - 或者在 Console 中执行：
     ```javascript
     $0.style.setProperty('--exd-color-primary', '#722ed1')
     ```

3. **检查 CSS 变量的计算值**

   - 选择任意元素
   - 在 Computed 面板中可以看到 CSS 变量的最终计算值

### 实际应用场景

#### 1. 多品牌主题

```typescript
// 定义不同品牌的主题
const brandThemes = {
  brandA: {
    '--exd-color-primary': '#1890ff',
    '--exd-color-success': '#52c41a',
  },
  brandB: {
    '--exd-color-primary': '#722ed1',
    '--exd-color-success': '#13c2c2',
  },
}

// 根据当前租户切换品牌主题
function applyBrandTheme(brandName: keyof typeof brandThemes) {
  const theme = brandThemes[brandName]
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value)
  })
}
```

#### 2. 大字体模式

```typescript
// 提供无障碍访问的大字体模式
function toggleLargeFont(enabled: boolean) {
  const scale = enabled ? '1.3' : '1'
  document.documentElement.style.setProperty('--exd-size-scale', scale)
}
```

#### 3. 节日主题

```typescript
// 根据节日自动切换主题色
function applyFestivalTheme() {
  const today = new Date()
  const month = today.getMonth() + 1
  const day = today.getDate()

  if (month === 2 && day === 14) {
    // 情人节 - 粉色主题
    document.documentElement.style.setProperty('--exd-color-primary', '#eb2f96')
  } else if (month === 12 && day >= 20) {
    // 圣诞节 - 红绿主题
    document.documentElement.style.setProperty('--exd-color-primary', '#f5222d')
    document.documentElement.style.setProperty('--exd-color-success', '#52c41a')
  } else if (month === 10 && day <= 7) {
    // 国庆节 - 红色主题
    document.documentElement.style.setProperty('--exd-color-primary', '#f5222d')
    document.documentElement.style.setProperty('--exd-color-success', '#fa8c16')
  }
}
```

#### 4. 响应式主题（根据屏幕尺寸）

```typescript
// 根据屏幕尺寸自动调整组件大小
function applyResponsiveTheme() {
  const width = window.innerWidth

  if (width < 375) {
    // 小屏幕（如 iPhone SE）：缩小组件
    document.documentElement.style.setProperty('--exd-size-scale', '0.9')
  } else if (width >= 414) {
    // 大屏幕（如 iPhone Plus）：放大组件
    document.documentElement.style.setProperty('--exd-size-scale', '1.1')
  } else {
    // 标准屏幕（如 iPhone 12）
    document.documentElement.style.setProperty('--exd-size-scale', '1')
  }
}

// 监听窗口大小变化
window.addEventListener('resize', applyResponsiveTheme)
// 初始化
applyResponsiveTheme()
```

#### 5. 用户偏好持久化

```typescript
// 保存用户的主题偏好到 localStorage
class ThemeManager {
  private storageKey = 'user-theme-preferences'

  // 保存主题设置
  saveTheme(theme: Record<string, string>) {
    localStorage.setItem(this.storageKey, JSON.stringify(theme))
    this.applyTheme(theme)
  }

  // 加载主题设置
  loadTheme(): Record<string, string> | null {
    const saved = localStorage.getItem(this.storageKey)
    if (saved) {
      try {
        const theme = JSON.parse(saved)
        this.applyTheme(theme)
        return theme
      } catch (e) {
        console.error('Failed to load theme:', e)
      }
    }
    return null
  }

  // 应用主题
  applyTheme(theme: Record<string, string>) {
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }

  // 清除主题设置
  clearTheme() {
    localStorage.removeItem(this.storageKey)
  }
}

// 使用示例
const themeManager = new ThemeManager()

// 页面加载时恢复用户上次的主题设置
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = themeManager.loadTheme()
  if (savedTheme) {
    console.log('已加载用户偏好主题')
  }
})

// 用户切换主题时保存
function switchToCustomTheme() {
  themeManager.saveTheme({
    '--exd-color-primary': '#722ed1',
    '--exd-size-scale': '1.2',
  })
}
```

#### 6. 动态跟随系统主题

```typescript
// 自动跟随系统的浅色/深色模式设置
function setupSystemThemeSync() {
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const applySystemTheme = (isDark: boolean) => {
    if (isDark) {
      // 深色模式
      document.documentElement.style.setProperty('--exd-color-primary', '#177ddc')
      document.documentElement.style.setProperty('--exd-color-gray-1', '#141414')
      document.documentElement.style.setProperty('--exd-color-gray-10', '#f5f5f5')
      document.body.style.background = '#141414'
      document.body.style.color = '#f5f5f5'
    } else {
      // 浅色模式
      document.documentElement.style.setProperty('--exd-color-primary', '#1890ff')
      document.documentElement.style.setProperty('--exd-color-gray-1', '#ffffff')
      document.documentElement.style.setProperty('--exd-color-gray-10', '#262626')
      document.body.style.background = '#ffffff'
      document.body.style.color = '#262626'
    }
  }

  // 初始化
  applySystemTheme(darkModeQuery.matches)

  // 监听系统主题变化
  darkModeQuery.addEventListener('change', (e) => {
    applySystemTheme(e.matches)
  })
}

// 在应用启动时调用
setupSystemThemeSync()
```

#### 7. 组件级主题定制

```typescript
// 为特定组件实例定制主题（通过 CSS 作用域）
import React from 'react'
import { Button, Space } from '@fexd/mobile'

function CustomThemedButtons() {
  return (
    <Space direction="vertical">
      {/* 普通按钮 - 使用全局主题 */}
      <Button type="primary">默认主题按钮</Button>

      {/* 自定义主题按钮 - 使用局部 CSS 变量 */}
      <div
        style={
          {
            '--exd-color-primary': '#722ed1',
            '--exd-basic-btn-border-radius': '20px',
          } as React.CSSProperties
        }
      >
        <Button type="primary">紫色圆角按钮</Button>
      </div>

      {/* 另一个自定义主题按钮 */}
      <div
        style={
          {
            '--exd-color-primary': '#52c41a',
            '--exd-size-scale': '1.2',
          } as React.CSSProperties
        }
      >
        <Button type="primary">绿色大按钮</Button>
      </div>
    </Space>
  )
}
```

#### 8. 主题预设管理

```typescript
// 创建主题预设管理系统
const themePresets = {
  default: {
    name: '默认主题',
    colors: {
      '--exd-color-primary': '#1890ff',
      '--exd-color-success': '#52c41a',
      '--exd-size-scale': '1',
    },
  },
  elegant: {
    name: '优雅紫色',
    colors: {
      '--exd-color-primary': '#722ed1',
      '--exd-color-success': '#13c2c2',
      '--exd-size-scale': '1',
    },
  },
  warm: {
    name: '温暖橙色',
    colors: {
      '--exd-color-primary': '#fa8c16',
      '--exd-color-success': '#52c41a',
      '--exd-size-scale': '1',
    },
  },
  highContrast: {
    name: '高对比度',
    colors: {
      '--exd-color-primary': '#000000',
      '--exd-color-success': '#00aa00',
      '--exd-size-scale': '1.2',
    },
  },
}

// 应用预设主题
function applyThemePreset(presetName: keyof typeof themePresets) {
  const preset = themePresets[presetName]
  if (preset) {
    Object.entries(preset.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }
}

// 在 React 组件中使用
function ThemeSwitcher() {
  return (
    <Space wrap>
      {Object.entries(themePresets).map(([key, preset]) => (
        <Button key={key} onClick={() => applyThemePreset(key as keyof typeof themePresets)}>
          {preset.name}
        </Button>
      ))}
    </Space>
  )
}
```

### 注意事项

1. **浏览器兼容性**：CSS 变量不支持 IE 浏览器，如需支持 IE，请使用 Less 变量方式。

2. **变量命名**：所有 CSS 变量都以 `--exd-` 为前缀，覆盖时需使用完整变量名。

3. **性能考虑**：虽然 CSS 变量有轻微的运行时开销，但在现代浏览器中性能影响可以忽略不计。

4. **调试技巧**：
   - 在浏览器开发者工具中查看 `:root` 元素可以看到所有 CSS 变量
   - 可以直接在开发者工具中修改 CSS 变量值进行测试

### 常见问题

**Q: 如何配合 babel-plugin-import 自动引入 CSS 变量版本样式？**

A: 在 Babel 配置中设置 `style` 选项指向 `.cssvars.less` 文件：

```javascript
// babel.config.js
module.exports = {
  plugins: [
    [
      'babel-plugin-import',
      {
        libraryName: '@fexd/mobile',
        libraryDirectory: 'lib/exports', // or 'es/exports'
        camel2DashComponentName: false,
        style: (name) => `${name}/style.cssvars.less`,
      },
      '@fexd/mobile',
    ],
  ],
}
```

配置后，引入组件时会自动引入对应的 `.cssvars.less` 文件。

**Q: 可以同时使用 Less 变量和 CSS 变量吗？**

A: 可以，但建议选择其中一种方式：

- **推荐**：如果只需要编译时定制，使用 Less 变量（稳定）
- **实验性**：如果需要运行时动态切换主题，使用 CSS 变量模式（需谨慎）

**Q: 如何查看所有可用的 CSS 变量？**

A: 在浏览器开发者工具中打开 Elements 面板，选择 `<html>` 元素，在 Styles 面板中可以看到所有定义在 `:root` 上的 CSS 变量。

**Q: 如何在普通模式和 CSS 变量模式之间切换？**

A: 只需要修改引入的样式文件路径：

```typescript
// 普通模式（Less 变量）
import '@fexd/mobile/es/exports/Button/style.less'

// CSS 变量模式（实验性）
import '@fexd/mobile/es/exports/Button/style.cssvars.less'
```

如果使用 `babel-plugin-import`，修改 `style` 配置即可：

```javascript
// 普通模式
module.exports = {
  plugins: [
    [
      'babel-plugin-import',
      {
        libraryName: '@fexd/mobile',
        libraryDirectory: 'lib/exports',
        camel2DashComponentName: false,
        style: (name) => `${name}/style.less`,
      },
      '@fexd/mobile',
    ],
  ],
}

// CSS 变量模式（实验性）
module.exports = {
  plugins: [
    [
      'babel-plugin-import',
      {
        libraryName: '@fexd/mobile',
        libraryDirectory: 'lib/exports',
        camel2DashComponentName: false,
        style: (name) => `${name}/style.cssvars.less`,
      },
      '@fexd/mobile',
    ],
  ],
}
```

**Q: 修改了 CSS 变量但样式没有变化？**

A: 请检查：

- 是否已引入组件的 `.cssvars.less` 文件
- CSS 变量名是否正确（组件变量需要 `--exd-` 前缀，Ant 颜色变量需要 `--ant-color-` 前缀）
- 是否在正确的作用域（通常是 `:root`）设置变量
- 确认使用的是 CSS 变量模式的样式文件（`.cssvars.less`）而非普通模式（`.less`）

**Q: CSS 变量模式有什么已知问题？**

A: 作为实验性功能，CSS 变量模式可能存在以下问题：

- 部分组件的 CSS 变量支持可能不完整
- API 可能在未来版本中调整
- 某些复杂样式计算可能不够精确
- 建议在生产环境优先使用 Less 变量方式
