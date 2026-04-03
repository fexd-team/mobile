---
name: NotFound
description: 空状态展示，与 Empty 共用类型：可自定义图标与文案。
---

# NotFound 未找到

空状态展示，与 `Empty` 共用类型：可自定义图标与文案。

```tsx
import { NotFound } from '@fexd/mobile'
```

## 基础用法

示例来源：`packages/mobile/src/exports/NotFound/demos/demo1/index.tsx`。

```tsx
import React from 'react'
import { NotFound } from '@fexd/mobile'
import { HelpCircleOutline } from '@fexd/icons'

export default () => (
  <>
    <NotFound />
    <NotFound text="No page here" />
    <NotFound icon={<HelpCircleOutline />} />
  </>
)
```

## Props

`NotFoundProps` 定义于 `packages/mobile/src/exports/NotFound/type.tsx`，等价于 `EmptyProps`（`packages/mobile/src/exports/Empty/type.tsx`）：继承 `JSXDivProps`。

| 属性         | 类型                  | 说明                        |
| ------------ | --------------------- | --------------------------- |
| `icon`       | `React.ReactNode`     | 自定义图标                  |
| `iconStyle`  | `React.CSSProperties` | 图标容器样式                |
| `text`       | `React.ReactNode`     | 主文案                      |
| （children） | —                     | `JSXDivProps` 的 `children` |
| （其余）     | —                     | 其余标准 div 属性           |

## 样式定制

`Empty` / `NotFound` 的 Less 变量见 `EmptyStyleVars`（`packages/mobile/src/exports/Empty/type.tsx`）。

<!--
Source:
- packages/mobile/src/exports/NotFound/type.tsx
- packages/mobile/src/exports/NotFound/index.zh.md
- packages/mobile/src/exports/NotFound/index.tsx
- packages/mobile/src/exports/NotFound/demos/
- packages/mobile/src/exports/NotFound/style.less
-->
