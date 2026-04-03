---
name: Portal
description: 将子节点渲染到当前组件树外的 DOM 节点（默认 document.body）。
---

# Portal 传送门

将子节点渲染到当前组件树外的 DOM 节点（默认 `document.body`）。

```tsx
import { Portal } from '@fexd/mobile'
```

## 基础用法

示例来源：`packages/mobile/src/exports/Portal/demos/demo1/index.tsx`。

```tsx
import React from 'react'
import { Portal } from '@fexd/mobile'

export default () => (
  <div>
    <Portal>
      <p style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 99999 }}>
        Rendered at portal target
      </p>
    </Portal>
  </div>
)
```

## Props

`PortalProps` 定义于 `packages/mobile/src/exports/Portal/type.tsx`。

| 属性        | 类型              | 说明                               |
| ----------- | ----------------- | ---------------------------------- |
| `children`  | `React.ReactNode` | 子节点（必选）                     |
| `className` | `string`          | 可选类名                           |
| `to`        | `any`             | 挂载目标节点，默认 `document.body` |

## 样式定制

本组件 `type.tsx` 未导出 Less 样式变量表。

<!--
Source:
- packages/mobile/src/exports/Portal/type.tsx
- packages/mobile/src/exports/Portal/index.zh.md
- packages/mobile/src/exports/Portal/index.tsx
- packages/mobile/src/exports/Portal/demos/
- packages/mobile/src/exports/Portal/style.less
-->
