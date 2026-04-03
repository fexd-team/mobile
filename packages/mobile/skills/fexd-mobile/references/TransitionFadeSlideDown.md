---
name: TransitionFadeSlideDown
description: 淡入 + 向下滑入过渡
---

# TransitionFadeSlideDown 淡入 + 向下滑入过渡

由 `createTransition` 工厂基于样式类生成的过渡组件：显隐时伴随淡出/淡入与自上而下的位移动画（具体类名前缀见样式源码 `packages/mobile/src/exports/TransitionFadeSlideDown/`）。

```tsx
import { TransitionFadeSlideDown } from '@fexd/mobile'
```

## 基础用法

```tsx
import React, { useState } from 'react'
import { TransitionFadeSlideDown, Button } from '@fexd/mobile'

export default function Example() {
  const [show, setShow] = useState(true)

  return (
    <>
      <Button onClick={() => setShow((s) => !s)}>Toggle</Button>
      <TransitionFadeSlideDown in={show} unmountOnExit={false} speed="normal">
        <div>Content</div>
      </TransitionFadeSlideDown>
    </>
  )
}
```

与其它过渡组件同框演示见 `packages/mobile/src/exports/TransitionFade/demos/demo1/index.tsx`。

## 动画速度 `speed`

与 `TransitionFade` 相同，见 `packages/mobile/src/exports/createTransition/type.tsx` 的 `TransitionSpeed` 与 `createTransition/index.tsx` 的 `SPEED_MAP`：`none`(0) / `fastest`(100) / `fast`(200) / `normal`(300) / `slow`(500) / `slowest`(700) / `debug`(5000)，或传入毫秒 `number`。

工厂默认 `speed` 为 `'normal'`，默认 `unmountOnExit` 为 `true`。

## Props

`TransitionFadeSlideDownProps` 在 `packages/mobile/src/exports/TransitionFadeSlideDown/type.tsx` 中为空对象类型。运行时 props 为 `TransitionProps`（`packages/mobile/src/exports/createTransition/type.tsx`），字段说明与 `packages/mobile/skills/fexd-mobile/references/TransitionFade.md` 中 **Props** 表一致。

## 相关组件

`TransitionFade`、`TransitionFadeSlideUp`、`TransitionSlideDown`、`TransitionSlideUp`、`TransitionNone`。

<!--
Source:
- packages/mobile/src/exports/TransitionFadeSlideDown/type.tsx
- packages/mobile/src/exports/TransitionFadeSlideDown/index.ts
- packages/mobile/src/exports/TransitionFadeSlideDown/style.less
-->
