---
name: useShowPopup
description: 由 createUseModalAPI(showPopup) 生成的 Hook：在组件树内挂载专用 ModalStation，并返回带固定 stationId 的 showPopup 封装。
---

# useShowPopup

由 `createUseModalAPI(showPopup)` 生成的 Hook：在组件树内挂载专用 `ModalStation`，并返回带固定 `stationId` 的 `showPopup` 封装。

```tsx
import { useShowPopup } from '@fexd/mobile'
```

## 基础用法

```tsx
import { useShowPopup } from '@fexd/mobile'

function Page() {
  const [showPopup, stationNode] = useShowPopup()

  return (
    <>
      {stationNode}
      <button
        type="button"
        onClick={() =>
          showPopup({
            title: 'Popup',
            content: <div>Body</div>,
          })
        }
      >
        Open
      </button>
    </>
  )
}
```

`content` 可为 `React.ReactNode`，或 `(controller) => React.ReactNode`。

## API / 参数

### 返回值

| 项     | 类型                                            | 说明                                              |
| ------ | ----------------------------------------------- | ------------------------------------------------- |
| 第一项 | `(config) => ModalMethodController<PopupProps>` | 自动合并 `stationId`，`config` 中勿传 `stationId` |
| 第二项 | `React.ReactElement`                            | `<ModalStation id={...} />`，须挂载在树中         |

### `showPopup(config)`

与 `showPopup` 命令式 API 相同（`MethodConfig` 去掉 `stationId`）。配置对应 `Popup` 的 props（如 `title`、`header`、`content`、`round` 等），不含 `visible`、`onClose`、`children`、`destroyOnExit`。

### `ModalMethodController`

| 属性      | 类型                    | 说明           |
| --------- | ----------------------- | -------------- |
| `close`   | `() => void`            | 关闭           |
| `update`  | `(updateProps) => void` | 更新           |
| `promise` | `Promise<void>`         | 销毁后 resolve |

## 实现说明

- `packages/mobile/src/exports/showPopup/index.ts`：`createModalAPI(Popup, { shareMask: true, onConflict: modalConflict.handlers.mask })`。
- `packages/mobile/src/exports/useShowPopup/index.tsx`：`createUseModalAPI(showPopup)`。

## 相关

- `showPopup`、`Popup`、`ModalStation`、`createUseModalAPI`

<!--
Source:
- packages/mobile/src/exports/useShowPopup/index.tsx
- packages/mobile/src/exports/useShowPopup/style.less
-->
