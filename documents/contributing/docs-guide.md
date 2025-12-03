---
nav:
  title: 共建指南

title: 如何编写文档？
order: 60
---

## 技能条件

需要具备以下技能

- [markdown](http://markdown.p2hp.com/basic-syntax/)

## 文档内容

一份组件文档应包含以下内容，可参考 [Button](/documents/exports/data/button) 文档

1. 组件场景概述
2. 组件各项主要功能的使用说明
3. 组件 `API` 属性说明
4. 组件样式拓展 `less` 变量说明（见下方「样式变量文档规范」）
5. 组件代码示例

## 文档规范

- `demo` 另开 `tsx/jsx` 文件编写
- 组件样式使用 `cssModules` 语法编写，开启方式为样式文件命名形如 `*.modules.less` 或 `*.module.css`

## 开始编写文档

结合 [dumi](https://d.umijs.org/zh-CN)，我们可以方便地使用 `markdown` 语法直接编写文档

通过以下命令，启动本地开发模式后，我们可以开始编写组件库文档，并对组件库进行调试

```bash
yarn dev
```

默认情况下，本地开发服务将跑在 http://localhost:8000 端口上

接下来，我们可以参考以下步骤，进行文档编写

## 确定组件归类

首先确定组件的归类，在 `mobile` 中，组件主要分为以下几类

1. 布局类 - `/docs/documents/exports/layout`
2. 导航类 - `/docs/documents/exports/navigation`
3. 展示类 - `/docs/documents/exports/display`
4. 输入类 - `/docs/documents/exports/data`
5. 反馈类 - `/docs/documents/exports/feedback`
6. 其他类 - `/docs/documents/exports/other`
7. 实验类 - `/docs/documents/exports/experimental`
8. 开发中 - `/docs/documents/exports/developing` 快捷命令创建的文档默认为开发中

在确定了组件的归类后，在对应文件夹下，新建对应的 `markdown` 文件，例如

`Button` 组件属于数据输入类，则新建 `/docs/documents/exports/data/Button.md` 文件

## 编写 markdown 文档

`Button` 组件的简易 `markdown` 文档示例如下

````markdown
# Button 按钮

用来让用户的进行点击行为

## 示例

```jsx
import React from 'react'
import { Button, toast } from '@fexd/mobile'

export default () => (
  <>
    <span>简易文档示例</span>
    <Button
      onClick={() => {
        toast.info('点击了')
      }}
    >
      点击
    </Button>
  </>
)
```
````

文档中 `jsx` 部分将得到以下源码展示框，以及右侧的 `demo` 展示窗口

```jsx
import React from 'react'
import { Button, toast } from '@fexd/mobile'

export default () => (
  <>
    <span>简易文档示例</span>
    <Button
      onClick={() => {
        toast.info('点击了')
      }}
    >
      点击
    </Button>
  </>
)
```

关于如何使用 dumi 编写文档，更多资料可以参考官网 [#写组件-demo](https://d.umijs.org/zh-CN/guide/basic#写组件-demo)

## 样式变量文档规范

在组件的 `API` 章节后，应添加「样式变量」章节，用于说明组件支持的 Less 变量定制。

### 章节格式

```markdown
## 样式变量

组件提供了以下 Less 变量，可用于自定义样式：

| 变量名           | 说明     | 默认值   |
| :--------------- | :------- | :------- |
| `@组件名-变量名` | 变量说明 | `默认值` |
```

### 变量类型

1. **组件专属变量**：在组件 `style.less` 中定义的变量，如 `@radio-active-color`、`@btn-inline-size-base`
2. **全局变量引用**：组件使用的全局变量，如 `@size-scale`、`@color-primary`

### 示例

以 Radio 组件为例：

```markdown
## 样式变量

组件提供了以下 Less 变量，可用于自定义样式：

| 变量名                     | 说明       | 默认值           |
| :------------------------- | :--------- | :--------------- |
| `@radio-active-color`      | 选中态颜色 | `@color-primary` |
| `@radio-icon-size`         | 图标尺寸   | `24px`           |
| `@radio-content-font-size` | 内容字号   | `15px`           |
```

### 注意事项

- 变量名使用反引号包裹
- 默认值如果是引用其他变量，保持变量名格式（如 `@color-primary`）
- 默认值如果是具体数值，直接写值（如 `24px`）
- 对于仅使用全局变量的组件，说明使用了哪些全局变量即可

更多关于主题定制的信息，请参考 [主题定制](/exports/theme-customization) 文档。
