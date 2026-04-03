---
name: Overlay
description: 全屏或相对父级的遮罩，可配合过渡与透明背景。
---

# Overlay 遮罩层

全屏或相对父级的遮罩，可配合过渡与透明背景。

```tsx
import { Overlay, TransitionSlideUp } from '@fexd/mobile'
```

## 基础用法

示例来源：`packages/mobile/src/exports/Overlay/demos/demo1/index.tsx`。

```tsx
import React, { useState } from 'react'
import { Button, Overlay, TransitionSlideUp } from '@fexd/mobile'

export default () => {
  const [show, setShow] = useState(false)
  return (
    <>
      <Button onClick={() => setShow((v) => !v)}>Toggle</Button>
      <Overlay visible={show} onClick={() => setShow(false)} />
      <Overlay visible={show} absolute onClick={() => setShow(false)} />
      <Overlay visible={show} transparent onClick={() => setShow(false)}>
        Content
      </Overlay>
      <Overlay visible={show} transition={TransitionSlideUp} onClick={() => setShow(false)} />
    </>
  )
}
```

## Props

`packages/mobile/src/exports/Overlay/type.tsx` 中 `export interface OverlayProps {}` 为空接口，类型文件未声明运行时可用的 props；自动文档未生成组件属性表。遮罩行为以 `packages/mobile/src/exports/Overlay/index.tsx` 实现为准。

## 样式定制

`OverlayStyleVars` 见 `packages/mobile/src/exports/Overlay/type.tsx`（`DOC_OverlayStyleVars`）。

<!--
Source:
- packages/mobile/src/exports/Overlay/type.tsx
- packages/mobile/src/exports/Overlay/index.zh.md
- packages/mobile/src/exports/Overlay/index.tsx
- packages/mobile/src/exports/Overlay/demos/
- packages/mobile/src/exports/Overlay/style.less
-->
