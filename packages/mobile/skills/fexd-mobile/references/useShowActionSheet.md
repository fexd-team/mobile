---
name: useShowActionSheet
description: 在组件树局部挂载独立 ModalStation，并返回绑定该站点的 showActionSheet 调用函数，避免与全局默认站点冲突。由 createUseModalAPI(showActionSheet) 生成。
---

# useShowActionSheet

在组件树局部挂载独立 `ModalStation`，并返回绑定该站点的 `showActionSheet` 调用函数，避免与全局默认站点冲突。由 `createUseModalAPI(showActionSheet)` 生成。

```tsx
import { useShowActionSheet } from '@fexd/mobile'
```

## 基础用法

```tsx
function Page() {
  const [showActionSheet, actionSheetStation] = useShowActionSheet()

  return (
    <>
      {actionSheetStation}
      <button
        type="button"
        onClick={() =>
          showActionSheet({
            content: '标题或自定义内容',
            actions: [{ content: 'OK', onClick: () => {} }],
          })
        }
      >
        Open
      </button>
    </>
  )
}
```

必须把返回的 `actionSheetStation`（`ModalStation` 元素）渲染进当前组件子树，否则弹层无法挂载到预期站点。

## API

### 签名

```ts
function useShowActionSheet(): [
  (config: ShowActionSheetConfig) => ModalMethodController<ActionSheetProps>,
  React.ReactElement,
]
```

### `ShowActionSheetConfig`

与命令式 `showActionSheet` 的参数相同，但**不能**传 `stationId`（由 hook 内 `uniqueId('modal-station')` 固定绑定）。

类型上等价于：

```ts
Omit<MethodConfig<ActionSheetProps>, 'stationId'>
```

即：`ActionSheet` 的 props（去掉由 API 管理的 `visible`、`onClose`、`children`、`destroyOnExit` 等）加上可选 `content`（`React.ReactNode` 或渲染函数）、以及 `createModalAPI` 支持的字段（如 `modalId` 等）。具体以 `createModalAPI/type.tsx` 中 `MethodConfig` 与 `ActionSheetProps` 为准。

### 返回值 `[show, station]`

| 项        | 说明                                                                             |
| --------- | -------------------------------------------------------------------------------- |
| `show`    | 调用后打开 ActionSheet，返回 `{ close, update, promise }`（见 `createModalAPI`） |
| `station` | 需渲染的 `<ModalStation id={...} />`                                             |

### 与全局 `showActionSheet` 的差异

`packages/mobile/src/exports/showActionSheet/index.ts` 使用 `createModalAPI(ActionSheet, { shareMask: true, onConflict: modalConflict.handlers.mask })`。Hook 版本仅额外注入 `stationId`，互斥与遮罩行为与上述一致。

<!--
Source:
- packages/mobile/src/exports/useShowActionSheet/index.tsx
- packages/mobile/src/exports/useShowActionSheet/style.less
-->
