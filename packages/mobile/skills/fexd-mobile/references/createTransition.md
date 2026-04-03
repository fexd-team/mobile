---
name: createTransition
description: 工厂函数：按 CSS 类名前缀创建基于 react-transition-group 的 CSSTransition 包装组件，并映射 speed 到 timeout（含预设档位）。
---

# createTransition

工厂函数：按 CSS 类名前缀创建基于 `react-transition-group` 的 `CSSTransition` 包装组件，并映射 `speed` 到 `timeout`（含预设档位）。

```tsx
import { createTransition } from '@fexd/mobile'
```

内置过渡组件（如 `TransitionFade`）均通过 `createTransition('exd-xxx')` 生成。

## 基础用法

```tsx
import { createTransition } from '@fexd/mobile'

const MyTransition = createTransition('my-prefix', { unmountOnExit: true, speed: 'normal' })

function Demo({ open }: { open: boolean }) {
  return (
    <MyTransition in={open}>
      <div>content</div>
    </MyTransition>
  )
}
```

## 函数签名

实现（`index.tsx`）等价于：

```ts
function create(name: string, defaultProps?: TransitionProps): React.FC<TransitionProps>
```

| 参数           | 说明                                                                                     |
| -------------- | ---------------------------------------------------------------------------------------- |
| `name`         | 传给 `CSSTransition` 的 `classNames` 前缀（会与 `exd-speed-*`、`exd-transition` 等组合） |
| `defaultProps` | 可选；默认含 `unmountOnExit: true`、`speed: 'normal'`                                    |

**返回值**：`React.FC<TransitionProps>`。

### speed 预设（实现内 `SPEED_MAP`）

`none` | `fastest` | `fast` | `normal` | `slow` | `slowest` | `debug` 对应毫秒数；也可传入 **数字** 作为自定义毫秒并写入 `transitionDuration` / `animationDuration`。

## Props（TransitionProps）

`TransitionProps` 继承 `TransitionActions`，并对 `ReactTransitionProps` 与 `EasingProps` 做部分可选 Pick，另含：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `in` | `boolean` | 是否进入（显示） |
| `mountOnEnter` | `boolean` | 首次进入时再挂载 |
| `unmountOnExit` | `boolean` | 退出后卸载 |
| `easing` | `string \| { enter?: string; exit?: string }` | 缓动 |
| `addEndListener` | （见 react-transition-group） | 自定义结束监听 |
| `onEnter` / `onEntering` / `onEntered` / `onExit` / `onExiting` / `onExited` | 过渡生命周期 |
| `appear` / `enter` / `exit` | `boolean` | 来自 `TransitionActions` |
| `style` | `React.CSSProperties` |  |
| `speed` | `TransitionSpeed` | 预设名或数字毫秒 |
| `children` | `React.ReactNode` |  |

`TransitionSpeed` = `'none' \| 'fastest' \| 'fast' \| 'normal' \| 'slow' \| 'slowest' \| 'debug' \| number`。

更完整的回调签名见 `createTransition/Transition.d.ts` 中的 `ReactTransitionProps`。

## 样式变量（TransitionStyleVars）

| 变量                        | 说明       | 默认     |
| --------------------------- | ---------- | -------- |
| `@transition-speed-none`    | 无动画时长 | `0ms`    |
| `@transition-speed-fastest` | 最快       | `100ms`  |
| `@transition-speed-fast`    | 快         | `200ms`  |
| `@transition-speed-normal`  | 正常       | `300ms`  |
| `@transition-speed-slow`    | 慢         | `500ms`  |
| `@transition-speed-slowest` | 最慢       | `700ms`  |
| `@transition-speed-debug`   | 调试       | `5000ms` |

<!--
Source:
- packages/mobile/src/exports/createTransition/type.tsx
- packages/mobile/src/exports/createTransition/index.tsx
- packages/mobile/src/exports/createTransition/style.less
-->
