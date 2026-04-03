---
name: useForcedUpdate
description: 强制触发当前组件重渲染的 Hook，通过更新内部 state 实现。
---

# useForcedUpdate

强制触发当前组件重渲染的 Hook，通过更新内部 state 实现。

```tsx
import { useForcedUpdate } from '@fexd/mobile'
```

## 基础用法

```tsx
function Demo() {
  const [forcedUpdate, renderKey] = useForcedUpdate()

  return (
    <button type="button" onClick={() => forcedUpdate()}>
      rerender (key: {renderKey})
    </button>
  )
}
```

## API

### 签名

```ts
function useForcedUpdate(): [() => void, number]
```

### 返回值

| 项    | 类型         | 说明                                                   |
| ----- | ------------ | ------------------------------------------------------ |
| `[0]` | `() => void` | 调用后触发一次重渲染                                   |
| `[1]` | `number`     | 当前渲染用的随机数 state，每次 `forcedUpdate` 后会变化 |

实现：`useState(Math.random)` 作为初始 state，`setState` 绑定为 `() => Math.random`（见 `packages/mobile/src/exports/useForcedUpdate/index.ts`）。

<!--
Source:
- packages/mobile/src/exports/useForcedUpdate/index.ts
- packages/mobile/src/exports/useForcedUpdate/style.less
-->
