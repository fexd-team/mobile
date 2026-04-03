---
name: useSize
description: 监听目标 DOM 尺寸变化（ResizeObserver），返回当前 width、height（来自 getBoundingClientRect）。
---

# useSize

监听目标 DOM 尺寸变化（`ResizeObserver`），返回当前 `width`、`height`（来自 `getBoundingClientRect`）。

```tsx
import { useSize } from '@fexd/mobile'
```

## 基础用法

```tsx
import { useRef } from 'react'
import { useSize } from '@fexd/mobile'

function Box() {
  const ref = useRef<HTMLDivElement>(null)
  const { width, height } = useSize(ref)

  return (
    <div ref={ref}>
      size: {width} x {height}
    </div>
  )
}
```

也可传入 DOM 元素本身（非 ref）：内部使用 `target?.current ?? target`。

## API / 参数

### `useSize(target)`

| 参数     | 类型                                   | 说明                                     |
| -------- | -------------------------------------- | ---------------------------------------- |
| `target` | `React.RefObject<Element>` 或 DOM 节点 | 被观察的元素；`ref` 时观察 `ref.current` |

### 返回值

| 属性     | 类型     | 说明                 |
| -------- | -------- | -------------------- |
| `width`  | `number` | 最近一次回调中的宽度 |
| `height` | `number` | 最近一次回调中的高度 |

初始状态为 `{ width: 0, height: 0 }`，首次布局后会更新。

## 实现说明

- 依赖 `resize-observer-polyfill`。
- `getBoundingClientRect` 通过 `@fexd/tools` 的 `run` 调用。

## 相关

- `ResizeObserver`

<!--
Source:
- packages/mobile/src/exports/useSize/index.tsx
- packages/mobile/src/exports/useSize/style.less
-->
