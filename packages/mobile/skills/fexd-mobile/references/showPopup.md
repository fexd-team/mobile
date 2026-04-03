---
name: showPopup
description: import { showPopup } from '@fexd/mobile'
---

# showPopup

```ts
import { showPopup } from '@fexd/mobile'
```

对 `Popup` 的命令式封装：`createModalAPI(Popup, { shareMask: true, onConflict: modalConflict.handlers.mask })`。

## 基础用法

```tsx
import { showPopup } from '@fexd/mobile'

showPopup({
  title: '标题',
  content: <div>内容</div>,
})
```

## API

### 函数签名

参数为 `Popup` props 去掉 `visible`、`onClose`、`children`、`destroyOnExit` 后的类型，并符合 `createModalAPI` 的 `MethodConfig`（含 `content`、`stationId` 等）。`Popup` / `PurePopupProps` 见 `packages/mobile/src/exports/Popup/type.tsx`（如 `title`、`header`、`headerLeft`、`headerRight`、`round` 及继承自 `Modal` 的字段）。

源码预置：

- `shareMask: true`
- `onConflict: modalConflict.handlers.mask`

### 返回值

```ts
{
  close: () => void
  update: (updateProps: ModalMethodProps<PopupProps>) => void
  promise: Promise<void>
}
```

`promise` 在 `onDestroyed` 时 resolve。`showPicker` 等内部依赖该 `promise` 以在关闭后继续逻辑。

### 异步用法

```ts
await showPopup({ title: '...', content: '...' }).promise
```

<!--
Source:
- packages/mobile/src/exports/showPopup/index.ts
- packages/mobile/src/exports/showPopup/style.less
-->
