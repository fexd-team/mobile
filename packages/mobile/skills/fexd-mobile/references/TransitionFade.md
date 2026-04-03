---
name: TransitionFade
description: 淡入淡出过渡
---

# TransitionFade 淡入淡出过渡

由 `createTransition` 工厂基于 CSS 类名 `exd-fade` 生成的过渡组件，用于子节点显隐时的淡入淡出（与 [react-transition-group](https://reactcommunity.org/react-transition-group/css-transition) 的 `CSSTransition` 行为一致，**不使用**其 `timeout` 属性，时长由 `speed` 控制）。

```tsx
import { TransitionFade } from '@fexd/mobile'
```

## 基础用法

```tsx
import React, { useState } from 'react'
import { TransitionFade, Button } from '@fexd/mobile'

export default function Example() {
  const [show, setShow] = useState(true)

  return (
    <>
      <Button onClick={() => setShow((s) => !s)}>Toggle</Button>
      <TransitionFade in={show} unmountOnExit={false} speed="normal">
        <div>Content</div>
      </TransitionFade>
    </>
  )
}
```

更多组合演示见 `packages/mobile/src/exports/TransitionFade/demos/demo1/index.tsx`。

## 动画速度 `speed`

`TransitionSpeed` 定义于 `packages/mobile/src/exports/createTransition/type.tsx`。字符串预设与毫秒值在 `packages/mobile/src/exports/createTransition/index.tsx` 的 `SPEED_MAP` 中对应如下：

| 预设      | 时长   |
| --------- | ------ |
| `none`    | 0ms    |
| `fastest` | 100ms  |
| `fast`    | 200ms  |
| `normal`  | 300ms  |
| `slow`    | 500ms  |
| `slowest` | 700ms  |
| `debug`   | 5000ms |

亦可传入 `number`（毫秒）。工厂默认 `speed` 为 `'normal'`，默认 `unmountOnExit` 为 `true`（可在使用时覆盖）。

## Props

`TransitionFadeProps` 在 `packages/mobile/src/exports/TransitionFade/type.tsx` 中为空对象类型（无组件独有字段）。组件实际类型为 `React.FC<TransitionProps>`，下列属性来自 `packages/mobile/src/exports/createTransition/type.tsx` 的 `TransitionProps`：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `in` | `boolean` | 是否进入「显示」状态 |
| `speed` | `TransitionSpeed` | 动画速度：上述预设名或毫秒数字 |
| `children` | `React.ReactNode` | 单个子节点（由 `CSSTransition` 包裹） |
| `style` | `React.CSSProperties` | 行内样式；传入数字 `speed` 时会合并 `transitionDuration` / `animationDuration` |
| `mountOnEnter` | `boolean` | 见 react-transition-group |
| `unmountOnExit` | `boolean` | 退出后是否卸载子树；库默认 `true` |
| `easing` | `string \| { enter?: string; exit?: string }` | 缓动 |
| `addEndListener` | （见 `Transition.d.ts`） | 结束监听 |
| `onEnter` / `onEntering` / `onEntered` | （见 `Transition.d.ts`） | 进入阶段回调 |
| `onExit` / `onExiting` / `onExited` | （见 `Transition.d.ts`） | 退出阶段回调 |
| `appear` / `enter` / `exit` | `boolean` | 来自 `TransitionActions`，控制是否执行对应过渡 |

其余未列字段若透传至 `CSSTransition`，以 `createTransition/index.tsx` 与 `Transition.d.ts` 为准。

## 相关组件

`TransitionNone`、`TransitionSlideUp`、`TransitionSlideDown`、`TransitionFadeSlideUp`、`TransitionFadeSlideDown`：同一工厂模式，类名与视觉效果不同。

<!--
Source:
- packages/mobile/src/exports/TransitionFade/type.tsx
- packages/mobile/src/exports/TransitionFade/index.zh.md
- packages/mobile/src/exports/TransitionFade/index.ts
- packages/mobile/src/exports/TransitionFade/demos/
- packages/mobile/src/exports/TransitionFade/style.less
-->
