---
name: Divider
description: 用于分隔内容的线条，支持中间文案与垂直方向。
---

# Divider 分割线

用于分隔内容的线条，支持中间文案与垂直方向。

```tsx
import { Divider } from '@fexd/mobile'
```

## 基础用法

示例来源：`packages/mobile/src/exports/Divider/demos/demo1/index.tsx`。

```tsx
import React from 'react'
import { Divider } from '@fexd/mobile'

export default () => <Divider />
```

带文字：

```tsx
<Divider>No more</Divider>
```

垂直分割线：

```tsx
<div>
  <span>First</span>
  <Divider vertical />
  <span>Second</span>
</div>
```

## Props

`DividerProps` 定义于 `packages/mobile/src/exports/Divider/type.tsx`。

| 属性       | 类型                        | 说明                                |
| ---------- | --------------------------- | ----------------------------------- |
| `children` | `React.ReactNode`           | 分割线中间文案                      |
| `ref`      | `React.Ref<HTMLDivElement>` | 根节点 ref                          |
| `vertical` | `boolean`                   | 是否为垂直分割线                    |
| （其余）   | —                           | 继承 `JSXDivProps`（标准 div 属性） |

## 样式定制

`DividerStyleVars` 见同目录 `type.tsx`（`DOC_DividerStyleVars`）。

<!--
Source:
- packages/mobile/src/exports/Divider/type.tsx
- packages/mobile/src/exports/Divider/index.zh.md
- packages/mobile/src/exports/Divider/index.tsx
- packages/mobile/src/exports/Divider/demos/
- packages/mobile/src/exports/Divider/style.less
-->
