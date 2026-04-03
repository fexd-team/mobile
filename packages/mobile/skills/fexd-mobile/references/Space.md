---
name: Space
description: 在子元素之间插入统一间距，支持水平/垂直方向、对齐、分隔符与换行。
---

# Space 间隔布局

在子元素之间插入统一间距，支持水平/垂直方向、对齐、分隔符与换行。

```tsx
import { Space } from '@fexd/mobile'
```

## 基础用法

```tsx
import { Space, Button } from '@fexd/mobile'

export default () => (
  <>
    <Space align="center">
      <Button>A</Button>
      <Button>B</Button>
    </Space>
    <Space direction="vertical" gap={20}>
      <Button>A</Button>
      <Button>B</Button>
    </Space>
    <Space align="center" split={<span>|</span>}>
      <Button fill="none">One</Button>
      <Button fill="none">Two</Button>
    </Space>
    <Space wrap>{/* manyButtons */}</Space>
  </>
)
```

`wrap` 仅在 `direction` 为水平时有效。示例源码参考：`packages/mobile/src/exports/Space/demos/demo1/index.tsx`。

## Props

### Space（`SpaceProps`）

定义于 `packages/mobile/src/exports/Space/type.tsx`。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 子节点 | `any` | — |
| align | 交叉轴对齐；`direction === 'horizontal'` 且未传时，运行时会按 `center` 处理 | `'start' \| 'end' \| 'center' \| 'baseline'` | — |
| direction | 排列方向 | `'vertical' \| 'horizontal'` | `'horizontal'`（`Space.defaultProps`） |
| gap | 间距；单值或 `[横向, 纵向]` | `GapType \| [GapType, GapType]` | `'small'`（8px，见 `Space/index.tsx` 中 `spaceGapMap`） |
| split | 子项之间的分隔节点 | `React.ReactNode` | — |
| wrap | 是否自动换行（仅水平方向有意义） | `boolean` | `false` |
| className | 类名 | `string` | — |

`GapType` = `number \| 'small' \| 'middle' \| 'large'`（定义于同文件）。

## 样式变量

定义于 `packages/mobile/src/exports/Space/type.tsx`（`SpaceStyleVars` / `DOC_SpaceStyleVars`）。

| 变量          | 说明             | 默认 |
| ------------- | ---------------- | ---- |
| `@size-scale` | 全局尺寸缩放比例 | `1`  |

<!--
Source:
- packages/mobile/src/exports/Space/type.tsx
- packages/mobile/src/exports/Space/index.zh.md
- packages/mobile/src/exports/Space/index.tsx
- packages/mobile/src/exports/Space/demos/
- packages/mobile/src/exports/Space/style.less
-->
