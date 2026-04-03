---
name: View
description: 带 display: flex 布局习惯的容器组件，用于纵向/横向分区、固定高度区域与内容区 flex 伸缩等常见移动端版面（实验性分组文档曾归类于 dumi，此处仅保留类型与用法说明）。
---

# View 基础视图

带 `display: flex` 布局习惯的容器组件，用于纵向/横向分区、固定高度区域与内容区 `flex` 伸缩等常见移动端版面（实验性分组文档曾归类于 dumi，此处仅保留类型与用法说明）。

```tsx
import { View } from '@fexd/mobile'
```

## 基础用法

```tsx
import { View } from '@fexd/mobile'
;<View className="container" height={250}>
  <View height={50} auto={false} center>
    header
  </View>
  <View direction="row">
    <View width={80} auto={false} center>
      sider
    </View>
    <View center>content</View>
  </View>
  <View height={50} auto={false} center>
    footer
  </View>
</View>
```

示例思路与 `packages/mobile/src/exports/View/demos/demo1/index.tsx` 一致。

## Props

`ViewProps` 定义于 `packages/mobile/src/exports/View/type.tsx`，在 `JSXDivProps` 上增加：

| 属性        | 类型                                                     | 说明                                |
| ----------- | -------------------------------------------------------- | ----------------------------------- |
| `direction` | `'column' \| 'column-reverse' \| 'row' \| 'row-reverse'` | flex-direction                      |
| `auto`      | `boolean`                                                | 与布局样式配合（见组件样式实现）    |
| `height`    | `number`                                                 | 高度（数值，单位与样式一致）        |
| `width`     | `number`                                                 | 宽度                                |
| `center`    | `true \| 'vertical' \| 'horizontal'`                     | 对齐方式                            |
| `ref`       | `React.Ref<ViewRef>`                                     | 引用，`ViewRef` 为 `HTMLDivElement` |
| （继承）    | `JSXDivProps`                                            | 标准 div 属性                       |

## 样式变量

源码 Less 中与类名前缀相关变量见 `packages/mobile/src/exports/View/style.less` / `index.zh.md` 所述：`@view-prefix` 默认 `'exd-view'`。

## 相关组件

- `ScrollView`、`Space`、`Grid`

<!--
Source:
- packages/mobile/src/exports/View/type.tsx
- packages/mobile/src/exports/View/index.zh.md
- packages/mobile/src/exports/View/index.tsx
- packages/mobile/src/exports/View/demos/
- packages/mobile/src/exports/View/style.less
-->
