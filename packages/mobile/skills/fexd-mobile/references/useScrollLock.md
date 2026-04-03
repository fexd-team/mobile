---
name: useScrollLock
description: 在 lock === true 时为指定 DOM 元素添加滚动锁定（touchmove 默认行为阻止 + 样式类名）。同一元素多次加锁通过内部计数引用配对解锁。
---

# useScrollLock

在 `lock === true` 时为指定 DOM 元素添加滚动锁定（`touchmove` 默认行为阻止 + 样式类名）。同一元素多次加锁通过内部计数引用配对解锁。

```tsx
import { useScrollLock } from '@fexd/mobile'
```

同文件还导出底层方法 `scrollLock`（见下文）；主包入口仅导出 `useScrollLock`。

## 基础用法

```tsx
function Panel({ open }: { open: boolean }) {
  const ref = useRef<HTMLDivElement>(null)

  useScrollLock({
    lock: open,
    elements: [() => ref.current],
  })

  return <div ref={ref}>...</div>
}
```

`elements` 中的项可为元素或返回元素的函数（实现里对每项执行 `scrollLock(run(element))`）。

## API

### `useScrollLock(options)`

```ts
function useScrollLock(options: ScrollLockOptions): void
```

```ts
interface ScrollLockOptions {
  elements: any[]
  lock: boolean
}
```

- `lock` 从 `false` 变为 `true` 时对当前 `elements` 列表加锁；`useEffect` 仅依赖 `[needLock]`，**不在依赖中包含 `elements`**，因此列表引用应在锁定期内保持稳定，否则不会随 `elements` 变化重新绑定。
- 清理函数会对本次加锁返回的 unlock 逐一调用。

### `scrollLock(element)`

```ts
function scrollLock(element: any): () => void
```

- 首次加锁：`classList` 增加 `exd-scroll-lock`，并 `addEventListener('touchmove', preventDefault, { passive: false })`。
- 返回的函数：引用计数减一，到 0 时移除监听与类名。

<!--
Source:
- packages/mobile/src/exports/useScrollLock/index.ts
- packages/mobile/src/exports/useScrollLock/style.less
-->
