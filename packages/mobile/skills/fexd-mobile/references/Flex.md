---
name: Flex
description: 基于 12 栅格的弹性布局容器，支持 Flex.Item 的偏移、排序与响应式占位；可通过 targetRef 指定用于计算断点的目标节点。
---

# Flex 弹性布局

基于 12 栅格的弹性布局容器，支持 `Flex.Item` 的偏移、排序与响应式占位；可通过 `targetRef` 指定用于计算断点的目标节点。

```tsx
import { Flex } from '@fexd/mobile'
;<Flex>
  <Flex.Item span={6}>A</Flex.Item>
  <Flex.Item span={6}>B</Flex.Item>
</Flex>
```

## 基础用法

等分栅格与 `justify` 排版：

```tsx
import { Flex } from '@fexd/mobile'
;<Flex justify="space-between">
  <Flex.Item span={3}>item</Flex.Item>
  <Flex.Item span={3}>item</Flex.Item>
</Flex>
```

`Flex.Item` 使用 `offset` / `push` / `pull` / `order` 控制偏移与顺序（完整示例见源码 `packages/mobile/src/exports/Flex/demos/demo1/index.tsx`）。

响应式与自定义断点阈值：

```tsx
import { Flex } from '@fexd/mobile'
;<Flex smValue={500} mdValue={800} lgValue={1000}>
  <Flex.Item xs={2} sm={3} md={4} lg={5}>
    item
  </Flex.Item>
  <Flex.Item xs={{ span: 5, offset: 2 }} sm={{ span: 4, pull: 2 }}>
    item
  </Flex.Item>
</Flex>
```

## Props

### Flex

类型定义：`packages/mobile/src/exports/Flex/type.tsx` → `FlexProps`（并继承 `JSXDivProps`，即原生 `div` 可用属性）。

| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| children | 子节点 | `React.ReactNode` | — |
| targetRef | 响应式布局所参照的容器 ref；未传时由上下文决定 | `React.Ref<HTMLDivElement>` | — |
| vertical | 是否垂直方向布局 | `boolean` | — |
| align | 交叉轴对齐 | `'top' \| 'middle' \| 'bottom'` | `top`（见组件 `defaultProps`） |
| justify | 主轴对齐 | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between'` | `start` |
| wrap | 是否换行 | `boolean` | `true` |
| gutter | 栅格间隔 `[水平, 垂直]`（px） | `[number, number]` | — |
| columns | 列数 | `number` | — |
| border | 是否显示边框 | `boolean` | — |
| center | 是否居中 | `boolean` | — |
| square | 是否正方形单元 | `boolean` | — |
| smValue | `sm` 断点宽度阈值（px） | `number` | — |
| mdValue | `md` 断点宽度阈值（px） | `number` | — |
| lgValue | `lg` 断点宽度阈值（px） | `number` | — |

### Flex.Item

类型定义：`packages/mobile/src/exports/Flex/Item/type.tsx` → `FlexItemProps`（继承 `Omit<JSXDivProps, 'children'>`）。

| 属性              | 说明                                            | 类型                             | 默认值 |
| :---------------- | :---------------------------------------------- | :------------------------------- | :----- |
| children          | 子节点                                          | `ReactNode \| (() => ReactNode)` | —      |
| style             | 内联样式                                        | `React.CSSProperties`            | —      |
| span              | 占位栅格数；为 `0` 时相当于隐藏                 | `number`                         | —      |
| pull              | 向左移动格数                                    | `number`                         | —      |
| push              | 向右移动格数                                    | `number`                         | —      |
| offset            | 左侧间隔格数                                    | `number`                         | —      |
| order             | 排序                                            | `number`                         | —      |
| xs / sm / md / lg | 断点下占位，可为格数或对象（见下方 `itemSize`） | `number \| itemSize`             | —      |

`itemSize`（同文件 `itemSize` 接口）字段：`span`、`pull`、`push`、`offset`、`order`。

## 样式定制

Less 变量（来自文档与样式源码）：`@flex-prefix`，默认 `'exd-flex'`。

## 相关组件

- `Grid`：宫格布局

<!--
Source:
- packages/mobile/src/exports/Flex/type.tsx
- packages/mobile/src/exports/Flex/index.zh.md
- packages/mobile/src/exports/Flex/index.tsx
- packages/mobile/src/exports/Flex/demos/
- packages/mobile/src/exports/Flex/style.less
-->
