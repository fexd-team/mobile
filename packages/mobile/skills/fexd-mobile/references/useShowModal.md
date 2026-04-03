---
name: useShowModal
description: 由 createUseModalAPI(showModal) 生成的 Hook：在组件树内挂载专用 ModalStation，并返回带固定 stationId 的 showModal 封装。
---

# useShowModal

由 `createUseModalAPI(showModal)` 生成的 Hook：在组件树内挂载专用 `ModalStation`，并返回带固定 `stationId` 的 `showModal` 封装。

```tsx
import { useShowModal } from '@fexd/mobile'
```

## 基础用法

```tsx
import { useShowModal } from '@fexd/mobile'

function Page() {
  const [showModal, stationNode] = useShowModal()

  return (
    <>
      {stationNode}
      <button
        type="button"
        onClick={() =>
          showModal({
            content: <div>Modal body</div>,
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
| 第一项 | `(config) => ModalMethodController<ModalProps>` | 自动合并 `stationId`，`config` 中勿传 `stationId` |
| 第二项 | `React.ReactElement`                            | `<ModalStation id={...} />`，须挂载在树中         |

### `showModal(config)`

与 `showModal` 命令式 API 相同（`MethodConfig` 去掉 `stationId`）。配置对应 `Modal` 的 props（如 `placement`、`transition`、`content` 等），不含 `visible`、`onClose`、`children`、`destroyOnExit`。

### `ModalMethodController`

| 属性      | 类型                    | 说明           |
| --------- | ----------------------- | -------------- |
| `close`   | `() => void`            | 关闭           |
| `update`  | `(updateProps) => void` | 更新           |
| `promise` | `Promise<void>`         | 销毁后 resolve |

## 实现说明

- `packages/mobile/src/exports/useShowModal/index.tsx`：`createUseModalAPI(showModal)`。

## 相关

- `showModal`、`Modal`、`ModalStation`、`createUseModalAPI`

<!--
Source:
- packages/mobile/src/exports/useShowModal/index.tsx
- packages/mobile/src/exports/useShowModal/style.less
-->
