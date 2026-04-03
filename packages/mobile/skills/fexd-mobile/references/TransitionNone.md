---
name: TransitionNone
description: 无动画过渡
---

# TransitionNone 无动画过渡

由 `createTransition` 工厂生成的过渡组件，仍走 `CSSTransition` 状态机，但视觉上过场可为「无动画」（类名前缀见 `packages/mobile/src/exports/TransitionNone/`）。适用于占位或与 `speed="none"` 配合的瞬时切换。

```tsx
import { TransitionNone } from '@fexd/mobile'
```

## 基础用法

```tsx
import React, { useState } from 'react'
import { TransitionNone, Button } from '@fexd/mobile'

export default function Example() {
  const [show, setShow] = useState(true)

  return (
    <>
      <Button onClick={() => setShow((s) => !s)}>Toggle</Button>
      <TransitionNone in={show} unmountOnExit={false} speed="none">
        <div>Content</div>
      </TransitionNone>
    </>
  )
}
```

与其它过渡组件同框演示见 `packages/mobile/src/exports/TransitionFade/demos/demo1/index.tsx`。

## 动画速度 `speed`

与 `TransitionFade` 相同，见 `packages/mobile/src/exports/createTransition/type.tsx` 的 `TransitionSpeed` 与 `createTransition/index.tsx` 的 `SPEED_MAP`：`none`(0) / `fastest`(100) / `fast`(200) / `normal`(300) / `slow`(500) / `slowest`(700) / `debug`(5000)，或传入毫秒 `number`。

工厂默认 `speed` 为 `'normal'`，默认 `unmountOnExit` 为 `true`。

## Props

`TransitionNoneProps` 在 `packages/mobile/src/exports/TransitionNone/type.tsx` 中为空对象类型。运行时 props 为 `TransitionProps`（`packages/mobile/src/exports/createTransition/type.tsx`），字段说明与 `packages/mobile/skills/fexd-mobile/references/TransitionFade.md` 中 **Props** 表一致。

## 相关组件

`TransitionFade`、`TransitionFadeSlideUp`、`TransitionFadeSlideDown`、`TransitionSlideUp`、`TransitionSlideDown`。

<!--
Source:
- packages/mobile/src/exports/TransitionNone/type.tsx
- packages/mobile/src/exports/TransitionNone/index.ts
- packages/mobile/src/exports/TransitionNone/style.less
-->
