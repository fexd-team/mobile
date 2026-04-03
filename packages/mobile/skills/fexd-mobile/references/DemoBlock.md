---
name: DemoBlock
description: 用于文档或演示中包裹示例区块，支持标题、横向排列与朴素样式。
---

# DemoBlock 示例容器

用于文档或演示中包裹示例区块，支持标题、横向排列与朴素样式。

```tsx
import { DemoBlock } from '@fexd/mobile'
```

## 基础用法

示例来源：`packages/mobile/src/exports/DemoBlock/demos/demo1.tsx`。

```tsx
import React from 'react'
import { DemoBlock, Button } from '@fexd/mobile'

export default () => (
  <>
    <DemoBlock title="默认纵向布局">
      <Button>按钮</Button>
      <Button>按钮</Button>
    </DemoBlock>

    <DemoBlock title="横向布局" inline>
      <Button>按钮</Button>
      <Button>按钮</Button>
    </DemoBlock>

    <DemoBlock title="朴素样式" plain>
      <Button>按钮</Button>
    </DemoBlock>
  </>
)
```

## Props

`DemoBlockProps` 定义于 `packages/mobile/src/exports/DemoBlock/type.tsx`：`PureDemoBlockProps` 与 `Omit<JSXDivProps, 'ref' | 'children'>` 合并。

| 属性       | 类型                      | 说明                                               |
| ---------- | ------------------------- | -------------------------------------------------- |
| `ref`      | `React.Ref<DemoBlockRef>` | `DemoBlockRef` 为 `HTMLDivElement`                 |
| `title`    | `string`                  | 区块标题                                           |
| `inline`   | `boolean`                 | 横向排布内容                                       |
| `plain`    | `boolean`                 | 朴素标题样式                                       |
| `children` | `any`                     | 示例内容                                           |
| （其余）   | —                         | 继承 `JSXDivProps` 中除 `ref`、`children` 外的属性 |

## 样式定制

Less 变量见 `DemoBlockStyleVars`（`packages/mobile/src/exports/DemoBlock/type.tsx`），例如 `@demo-block-background`、`@demo-block-padding`、`@demo-block-title-font-size` 等。

<!--
Source:
- packages/mobile/src/exports/DemoBlock/type.tsx
- packages/mobile/src/exports/DemoBlock/index.zh.md
- packages/mobile/src/exports/DemoBlock/index.tsx
- packages/mobile/src/exports/DemoBlock/demos/
- packages/mobile/src/exports/DemoBlock/style.less
-->
