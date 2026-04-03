---
name: useThrottleFn
description: 对函数做节流封装；wait <= 0 时直接返回用 useMemoizedFn 包裹的原始函数（不节流）。
---

# useThrottleFn

对函数做节流封装；`wait <= 0` 时直接返回用 `useMemoizedFn` 包裹的原始函数（不节流）。

```tsx
import { useThrottleFn } from '@fexd/mobile'
```

## 基础用法

```tsx
import { useThrottleFn } from '@fexd/mobile'

function ScrollArea() {
  const onScroll = useThrottleFn((e: React.UIEvent) => {
    console.log(e.currentTarget.scrollTop)
  }, 100)

  return <div onScroll={onScroll} style={{ overflow: 'auto', height: 200 }} />
}
```

## API / 参数

### `useThrottleFn(fn, wait)`

| 参数   | 类型                                | 说明                              |
| ------ | ----------------------------------- | --------------------------------- |
| `fn`   | `T extends (...args: any[]) => any` | 任意函数                          |
| `wait` | `number`                            | 节流间隔（毫秒）；`<= 0` 时不节流 |

### 返回值

- 类型与 `fn` 相同（`T`）
- `wait > 0`：返回 `throttle(memoizedFn, wait)`（`throttle` 来自 `@fexd/tools`）
- `wait <= 0`：返回 `useMemoizedFn(fn)`（`ahooks`）

依赖 `wait` 变化会重建节流函数；`fn` 的引用由 `useMemoizedFn` 稳定化。

## 实现说明

- `packages/mobile/src/exports/useThrottleFn/index.tsx`

## 相关

- `useTouch`（内部使用 `useThrottleFn` 处理触摸/鼠标更新）

<!--
Source:
- packages/mobile/src/exports/useThrottleFn/index.tsx
- packages/mobile/src/exports/useThrottleFn/style.less
-->
