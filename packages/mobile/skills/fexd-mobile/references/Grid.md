---
name: Grid
description: 在水平与垂直方向将区域划分为等大的宫格，用于图标+文案或自定义单元格内容；支持 Grid.Item 子组件。
---

# Grid 宫格

在水平与垂直方向将区域划分为等大的宫格，用于图标+文案或自定义单元格内容；支持 `Grid.Item` 子组件。

```tsx
import { Grid } from '@fexd/mobile'

export default () => (
  <Grid>
    <Grid.Item>自定义内容</Grid.Item>
  </Grid>
)
```

## 基础用法

四列宫格与 `icon` / `text`：

```tsx
import { Grid } from '@fexd/mobile'

export default () => (
  <Grid>
    <Grid.Item icon={<span />} text="示例文字" />
    <Grid.Item icon={<span />} text="示例文字" />
  </Grid>
)
```

自定义列数、间距与横向排列：

```tsx
import { Grid } from '@fexd/mobile'

export default () => (
  <Grid columns={3} gutter={[10, 10]} vertical={false}>
    <Grid.Item icon={<span />} text="示例文字" />
  </Grid>
)
```

更多交互与 `square` 等示例见源码 `packages/mobile/src/exports/Grid/demos/demo1/index.tsx`。

## Props

### Grid

类型定义：`packages/mobile/src/exports/Grid/type.tsx` → `GridProps`（继承 `JSXDivProps`）。

| 属性     | 说明                          | 类型               | 默认值 |
| :------- | :---------------------------- | :----------------- | :----- |
| children | 子节点                        | `React.ReactNode`  | —      |
| vertical | 宫格内容是否纵向排列          | `boolean`          | —      |
| gutter   | 水平与垂直间距 `[x, y]`（px） | `[number, number]` | —      |
| columns  | 列数                          | `number`           | —      |
| border   | 是否显示边框                  | `boolean`          | —      |
| center   | 内容是否居中                  | `boolean`          | —      |
| square   | 是否为正方形宫格              | `boolean`          | —      |

实现中默认值为 `vertical=true`、`gutter=[0,0]`、`columns=4`、`border=true`、`center=true`、`square=false`（见 `Grid/index.tsx` 参数解构）。

### Grid.Item

类型定义：`packages/mobile/src/exports/Grid/Item/type.tsx` → `GridItemProps`（继承 `Omit<JSXDivProps, 'children'>`，故可使用 `onClick`、`className` 等 div 属性）。

| 属性     | 说明       | 类型                             | 默认值 |
| :------- | :--------- | :------------------------------- | :----- |
| icon     | 图标区域   | `ReactNode \| (() => ReactNode)` | —      |
| text     | 文案       | `string`                         | —      |
| children | 自定义内容 | `ReactNode \| (() => ReactNode)` | —      |
| extra    | 额外区域   | `ReactNode \| (() => ReactNode)` | —      |

## 样式定制

- `GridStyleVars` / `DOC_GridStyleVars`：`packages/mobile/src/exports/Grid/type.tsx`
- `GridItemStyleVars` / `DOC_GridItemStyleVars`：`packages/mobile/src/exports/Grid/Item/type.tsx`

主要变量示例：`@grid-prefix`、`@grid-font-size`、`@grid-item-icon-size`、`@grid-item-text-font-size` 等；默认值见各接口上 `AUTO_API` 注释。

## 相关组件

- `Flex`：弹性栅格布局

<!--
Source:
- packages/mobile/src/exports/Grid/type.tsx
- packages/mobile/src/exports/Grid/index.zh.md
- packages/mobile/src/exports/Grid/index.tsx
- packages/mobile/src/exports/Grid/demos/
- packages/mobile/src/exports/Grid/style.less
-->
