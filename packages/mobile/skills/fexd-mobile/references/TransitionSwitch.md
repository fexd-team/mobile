---
name: TransitionSwitch
description: 切换过渡
---

# TransitionSwitch 切换过渡

基于 `react-transition-group` 的 `TransitionGroup` + `CSSTransition`，在 `animateKey` 变化时对单个子节点做进入/离开动画（`fade`、`slide`、`slide-cover` 等），可配合前进/后退方向切换动画类名。

```tsx
import { TransitionSwitch } from '@fexd/mobile'
```

## 基础用法

```tsx
import { useState } from 'react'
import { TransitionSwitch, Button } from '@fexd/mobile'

export default function Example() {
  const [step, setStep] = useState(0)

  return (
    <>
      <Button onClick={() => setStep((s) => s + 1)}>next</Button>
      <TransitionSwitch animateKey={step} animate="fade" speed="normal">
        <div key={step}>Step {step}</div>
      </TransitionSwitch>
    </>
  )
}
```

子节点应随逻辑切换；`animateKey` 用于驱动 `CSSTransition` 的 `key`。源码中默认 `animate` 为 `'slide'`，`speed` 为 `'normal'`（见 `packages/mobile/src/exports/TransitionSwitch/index.tsx` 的 `defaultProps`）。`speed` 传入数字时为自定义动画时长（毫秒）。

## Props

`TransitionSwitchProps` 定义于 `packages/mobile/src/exports/TransitionSwitch/type.tsx`，在 `JSXDivProps` 基础上增加下列字段；其余属性透传至内部 `TransitionGroup`（与类型上的 `JSXDivProps` 扩展一致，以源码为准）。

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `direction` | `'forward' \| 'back'` | 动画方向，影响 enter/exit 的 CSS 类名后缀 |
| `animateKey` | `any` | 传给 `CSSTransition` 的 `key`，变化时触发动画 |
| `animate` | `'fade' \| 'slide' \| 'slide-cover'` | 动画类型 |
| `speed` | `'none' \| 'fastest' \| 'fast' \| 'normal' \| 'slow' \| 'slowest' \| 'test' \| number` | 预设档位或自定义毫秒数 |
| （继承） | `JSXDivProps` | 标准 div 类 React 属性（含 `className`、`children` 等） |

## 相关组件

- `TransitionFade`、`TransitionSlideUp` 等独立过渡组件
- 架构说明见 `skills/fexd-mobile/architecture.md` 中 Transition 相关章节

<!--
Source:
- packages/mobile/src/exports/TransitionSwitch/type.tsx
- packages/mobile/src/exports/TransitionSwitch/index.tsx
- packages/mobile/src/exports/TransitionSwitch/style.less
-->
