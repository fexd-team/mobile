---
name: showDialog
description: import { showDialog } from '@fexd/mobile'
---

# showDialog

```ts
import { showDialog } from '@fexd/mobile'
```

对 `Dialog` 的命令式封装：`createModalAPI(Dialog, { shareMask: true, onConflict: modalConflict.handlers.hidden })`。

## 基础用法

```tsx
import { showDialog } from '@fexd/mobile'

showDialog({
  title: '标题',
  content: '内容',
  actions: [{ content: '确定', onClick: () => {} }],
})
```

## API

### 函数签名

参数类型为 `Dialog` props 去掉 `visible`、`onClose`、`children`、`destroyOnExit` 后的交集，并符合 `createModalAPI` 的 `MethodConfig`（可包含 `content`、`stationId` 等）。`Dialog` 字段定义见 `packages/mobile/src/exports/Dialog/type.tsx`（如 `title`、`theme`、`actions`、`buttonFactory` 及各 `button*` 配置，以及继承自 `Modal` 的蒙层、动画、`onConflict` 等）。

源码预置：

- `shareMask: true`
- `onConflict: modalConflict.handlers.hidden`

### 返回值

```ts
{
  close: () => void
  update: (updateProps: ModalMethodProps<DialogProps>) => void
  promise: Promise<void>
}
```

`promise` 在 `onDestroyed` 时 resolve。

### 异步用法

```ts
await showDialog({ title: '提示', content: '...' }).promise
```

<!--
Source:
- packages/mobile/src/exports/showDialog/index.ts
- packages/mobile/src/exports/showDialog/style.less
-->
