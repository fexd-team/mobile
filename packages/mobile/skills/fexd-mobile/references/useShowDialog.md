---
name: useShowDialog
description: 由 createUseModalAPI(showDialog) 生成的 Hook：在组件树内挂载专用 ModalStation，并返回带固定 stationId 的 showDialog 封装，便于将对话框渲染到指定驿站。
---

# useShowDialog

由 `createUseModalAPI(showDialog)` 生成的 Hook：在组件树内挂载专用 `ModalStation`，并返回带固定 `stationId` 的 `showDialog` 封装，便于将对话框渲染到指定驿站。

```tsx
import { useShowDialog } from '@fexd/mobile'
```

## 基础用法

在页面（或布局）中调用 Hook，将返回的第二个元素（驿站节点）插入 JSX，再用第一个函数打开对话框。

```tsx
import { useShowDialog } from '@fexd/mobile'

function Page() {
  const [showDialog, stationNode] = useShowDialog()

  return (
    <>
      {stationNode}
      <button
        type="button"
        onClick={() =>
          showDialog({
            title: 'Title',
            content: 'Content',
          })
        }
      >
        Open
      </button>
    </>
  )
}
```

`content` 可为 `React.ReactNode`，或函数 `(controller) => React.ReactNode`，其中 `controller` 与下方返回值一致。

## API / 参数

### 返回值

| 项 | 类型 | 说明 |
| --- | --- | --- |
| 第一项 | `(config) => ModalMethodController<DialogProps>` | 与 `showDialog` 等价，但会自动合并 `stationId`，`config` 中**不要**再传 `stationId` |
| 第二项 | `React.ReactElement` | `<ModalStation id={...} />`，需渲染到 React 树中 |

### `showDialog(config)` 的配置

与命令式 `showDialog` 一致，类型为 `MethodConfig` 去掉 `stationId` 后的对象（见 `createModalAPI/type.tsx`、`showDialog/index.ts`）。常见字段包括对应 `Dialog` 的 props（如 `title`、`actions`、`content` 等），以及 `modalId`、`onDestroyed` 等；**不包含** `visible`、`onClose`、`children`、`destroyOnExit`（由命令式层注入）。

### `ModalMethodController`

| 属性      | 类型                    | 说明               |
| --------- | ----------------------- | ------------------ |
| `close`   | `() => void`            | 关闭当前实例       |
| `update`  | `(updateProps) => void` | 更新 props         |
| `promise` | `Promise<void>`         | 弹层销毁后 resolve |

## 实现说明

- `packages/mobile/src/exports/useShowDialog/index.tsx`：`createUseModalAPI(showDialog)`。
- `stationId` 在 Hook 内通过 `useMemo` + `uniqueId('modal-station')` 固定，保证同一组件实例复用同一驿站。

## 相关

- `showDialog`、`Dialog`、`ModalStation`、`createUseModalAPI`

<!--
Source:
- packages/mobile/src/exports/useShowDialog/index.tsx
- packages/mobile/src/exports/useShowDialog/style.less
-->
