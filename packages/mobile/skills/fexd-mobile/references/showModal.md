---
name: showModal
description: import { showModal } from '@fexd/mobile'
---

# showModal

```ts
import { showModal } from '@fexd/mobile'
```

对 `Modal` 的命令式封装：`createModalAPI(Modal, { shareMask: true, onConflict: modalConflict.handlers.hidden })`。

## 基础用法

```tsx
import { showModal } from '@fexd/mobile'

showModal({
  content: <div>自定义内容</div>,
  placement: 'center',
  maskClosable: true,
})
```

## API

### 函数签名

参数为 `Modal` props 去掉 `visible`、`onClose`、`children`、`destroyOnExit` 后的类型，并符合 `createModalAPI` 的 `MethodConfig`（例如 `content`、`stationId`）。`Modal` / `PureModalProps` 见 `packages/mobile/src/exports/Modal/type.tsx`。

源码预置：

- `shareMask: true`
- `onConflict: modalConflict.handlers.hidden`

### 返回值

```ts
{
  close: () => void
  update: (updateProps: ModalMethodProps<ModalProps>) => void
  promise: Promise<void>
}
```

`promise` 在弹窗销毁（`onDestroyed`）后 resolve。`createModalAPI` 内部固定传入 `destroyOnExit` 与 `onClose` 绑定到 `close`。

### 异步用法

```ts
await showModal({ content: '...' }).promise
```

<!--
Source:
- packages/mobile/src/exports/showModal/index.ts
- packages/mobile/src/exports/showModal/style.less
-->
