---
name: showActionSheet
description: import { showActionSheet } from '@fexd/mobile'
---

# showActionSheet

```ts
import { showActionSheet } from '@fexd/mobile'
```

对 `ActionSheet` 的命令式封装：`createModalAPI(ActionSheet, { shareMask: true, onConflict: modalConflict.handlers.mask })`。

## 基础用法

```tsx
import { showActionSheet } from '@fexd/mobile'

const { close, update, promise } = showActionSheet({
  actions: [
    { content: '选项 A', onClick: () => {} },
    { content: '取消', onClick: () => close() },
  ],
})

await promise
```

## API

### 函数签名

参数为 `ActionSheet` 的 props 中去掉命令式占位字段后的类型，并与 `createModalAPI` 的配置合并（见 `createModalAPI/type.tsx`：`Omit<ActionSheetProps, 'visible' | 'onClose' | 'children' | 'destroyOnExit'>`，且可含 `content`、`stationId` 等）。

源码预置：

- `shareMask: true`
- `onConflict: modalConflict.handlers.mask`

常用 `ActionSheet` 字段见 `packages/mobile/src/exports/ActionSheet/type.tsx`（如 `actions`、`buttonFactory` 及继承自 `Popup`/`Modal` 的标题、蒙层、动画等）。

### 返回值

```ts
{
  close: () => void
  update: (updateProps: ModalMethodProps<ActionSheetProps>) => void
  promise: Promise<void>
}
```

`promise` 在弹窗 `onDestroyed` 时 resolve。`content` 可为 `ReactNode` 或 `(controller) => ReactNode`，与 `createModalAPI` 一致。

### 异步用法

```ts
showActionSheet({ actions: [...] })
await showActionSheet({ actions: [...] }).promise
```

<!--
Source:
- packages/mobile/src/exports/showActionSheet/index.ts
- packages/mobile/src/exports/showActionSheet/style.less
-->
