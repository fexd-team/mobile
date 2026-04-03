---
name: useTween
description: 基于 @fexd/tools 的 Tween 实例，将数值从当前值过渡到目标值；followValue 变化时会调用 to(followValue) 跟随动画。
---

# useTween

基于 `@fexd/tools` 的 `Tween` 实例，将数值从当前值过渡到目标值；`followValue` 变化时会调用 `to(followValue)` 跟随动画。

```tsx
import { useTween } from '@fexd/mobile'
```

## 基础用法

```tsx
import { useTween } from '@fexd/mobile'

function Demo({ target }: { target: number }) {
  const { value } = useTween(target, { duration: 300 })

  return <div style={{ width: value }} />
}
```

## API / 参数

### `useTween(followValue, config?)`

| 参数          | 类型          | 说明                                                       |
| ------------- | ------------- | ---------------------------------------------------------- |
| `followValue` | `number`      | 依赖变化时内部执行 `to(followValue)`，驱动补间 toward 该值 |
| `config`      | `TweenConfig` | 初始传给 `new Tween(config)`，并可在 `run` 时覆盖          |

#### `TweenConfig`（`useTween/index.tsx`）

| 属性       | 类型                                        | 说明                                      |
| ---------- | ------------------------------------------- | ----------------------------------------- |
| `from`     | `number`                                    | 初始内部状态默认 `config.from ?? 0`       |
| `to`       | `number`                                    | 目标值；`followValue` 效果等价于动态 `to` |
| `duration` | `number`                                    | 动画时长                                  |
| `ease`     | `EasingFunction`（`@fexd/tools/es/easing`） | 缓动函数                                  |
| `loop`     | `boolean`                                   | 是否循环                                  |

### 返回值

| 属性       | 类型                    | 说明                                                             |
| ---------- | ----------------------- | ---------------------------------------------------------------- |
| `value`    | `number`                | 当前补间值（`update` 事件驱动）                                  |
| `setValue` | `useGetState` 的 setter | 直接设内部状态                                                   |
| `getValue` | `() => number`          | 读当前值                                                         |
| `run`      | `(config?) => void`     | `tween.stop().config({ from: getValue(), ...config }).restart()` |
| `to`       | `(to: number) => void`  | `run({ to })`                                                    |
| `stop`     | `tween.stop`            | 停止动画                                                         |
| `core`     | `Tween`                 | 底层实例                                                         |

### 副作用

- 挂载时注册 `tween.on('update', setValue)`，卸载时 `off`。
- `followValue` 在 `useEffect` 中触发 `to(followValue)`。

## 实现说明

- `packages/mobile/src/exports/useTween/index.tsx`

## 相关

- `@fexd/tools` 的 `Tween`、缓动类型

<!--
Source:
- packages/mobile/src/exports/useTween/index.tsx
- packages/mobile/src/exports/useTween/style.less
-->
