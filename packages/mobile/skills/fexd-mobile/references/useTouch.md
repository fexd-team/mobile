---
name: useTouch
description: 在目标元素上监听触摸与鼠标事件，归一化为相对目标矩形的坐标与位移，维护多点 `touches` 状态，并在 `onStart` / `onMove` / `onEnd` 生命周期回调中通知（回调经节流，间隔由 `rate` 控制）。`TouchData` / `UseTouchOption` 定义在 `useTouch/index.ts`（无单独 `type.tsx`）。
---

# useTouch

在目标元素上监听触摸与鼠标事件，归一化为相对目标矩形的坐标与位移，维护多点 `touches` 状态，并在 `onStart` / `onMove` / `onEnd` 生命周期回调中通知（回调经节流，间隔由 `rate` 控制）。`TouchData` / `UseTouchOption` 定义在 `useTouch/index.ts`（无单独 `type.tsx`）。

```tsx
import { useTouch, START_EVENT, MOVE_EVENT, END_EVENT } from '@fexd/mobile'
```

## 基础用法

```tsx
import { useRef } from 'react'
import { useTouch } from '@fexd/mobile'

function Pad() {
  const ref = useRef<HTMLDivElement>(null)
  const { main, touches } = useTouch(ref, {
    onMove: () => {
      /* 在回调参数 nextTouches 中读取坐标 */
    },
  })

  return <div ref={ref} style={{ width: 300, height: 200, touchAction: 'none' }} />
}
```

`target` 可为 `ref` 或 DOM：`target?.current ?? target`。

## API / 参数

### `useTouch(target, option?)`

#### `UseTouchOption`

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `rate` | `number` | `16` | 节流等待（毫秒），传给内部 `useThrottleFn` |
| `disabled` | `boolean` | - | 为真时不处理事件 |
| `preventDefault` | `boolean` | `true` | 是否 `preventDefault`；`touchstart`/`touchend` 默认不阻止以免破坏点击，鼠标按下后会按条件阻止 |
| `stopPropagation` | `boolean` | `false` | 是否 `stopPropagation` |
| `onStart` | `(touches: TouchData[], prevTouches: TouchData[]) => void` | - | 对应触摸开始 / mousedown |
| `onMove` | 同上 | - | touchmove / mousemove |
| `onEnd` | 同上 | - | touchend / mouseup / mouseleave（鼠标在 document 上监听 move/up） |

#### `TouchData`

| 字段                               | 说明                                         |
| ---------------------------------- | -------------------------------------------- |
| `key`                              | 由坐标生成的字符串键                         |
| `x`, `y`                           | 相对目标元素的客户端坐标差（`toFixed` 2 位） |
| `percentX`, `percentY`             | 相对目标宽高百分比                           |
| `dX`, `dY`                         | 与上一点位的增量                             |
| `dPercentX`, `dPercentY`           | 增量百分比                                   |
| `offsetX`, `offsetY`               | 与本次手势起点的偏移                         |
| `offsetPercentX`, `offsetPercentY` | 起点偏移百分比                               |
| `tracks`                           | 轨迹历史（按 `key` 去重合并）                |

### 返回值

| 属性      | 类型                     | 说明         |
| --------- | ------------------------ | ------------ |
| `touches` | `TouchData[]`            | 当前触点列表 |
| `main`    | `TouchData \| undefined` | `touches[0]` |

### 常量导出

| 常量          | 值          | 说明                                              |
| ------------- | ----------- | ------------------------------------------------- |
| `START_EVENT` | `'onStart'` | 内部传给 `run(restOption, lifecycle, ...)` 的 key |
| `MOVE_EVENT`  | `'onMove'`  | 同上                                              |
| `END_EVENT`   | `'onEnd'`   | 同上                                              |

## 实现说明

- 触摸：`touchstart` / `touchmove` / `touchend` 绑定在 `target`。
- 鼠标：`mousedown` 在 `target`，`mousemove` / `mouseup` / `mouseleave` 在 `document.documentElement`（除 start 外），结束时空数组触发 `onEnd` 并重置 `mouseDown` 状态。

## 相关

- `useThrottleFn`

<!--
Source:
- packages/mobile/src/exports/useTouch/index.ts
- packages/mobile/src/exports/useTouch/style.less
-->
