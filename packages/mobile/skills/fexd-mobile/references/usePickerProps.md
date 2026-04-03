---
name: usePickerProps
description: 封装选择类表单项：组合 useSelectionFieldProps、控制 Popup 显隐，并提供 renderTrigger / renderPopup。适用于自定义 Picker 等「点击展开—确认/取消」交互。
---

# usePickerProps

封装选择类表单项：组合 `useSelectionFieldProps`、控制 `Popup` 显隐，并提供 `renderTrigger` / `renderPopup`。适用于自定义 Picker 等「点击展开—确认/取消」交互。

```tsx
import { usePickerProps } from '@fexd/mobile'
```

## 基础用法

```tsx
function MyPicker(props: BasicPickerProps<string>) {
  const { renderTrigger, renderPopup, value, setValue } = usePickerProps(props)

  return (
    <>
      {renderTrigger(<span>{value ?? '请选择'}</span>)}
      {renderPopup(<div>picker body</div>)}
    </>
  )
}
```

## API

### 签名

```ts
function usePickerProps<T = string>(props: BasicPickerProps<T>)
```

类型定义见 `packages/mobile/src/exports/usePickerProps/type.tsx`（`BasicPickerProps` / `PureBasicPickerProps` 合并）。

### `BasicPickerProps<T>` 要点

在 `SelectionFieldProps<T>`（即 `IOProps<T>`）基础上包含：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `className` | `string` | 触发器容器类名 |
| `disabled` | `boolean` | 默认 `false`，为真时点击不打开弹层 |
| `ref` | `Ref<HTMLDivElement>` | 挂在触发器外层 `div` |
| `popupProps` | `Omit<PopupProps, 'visible'>` | 传给内部 `Popup`，不含 `visible`（由 hook 控制） |
| `onEnter` / `onExit` / `onExited` | 同 `Popup` | 透传 |
| `onConfirm` | `(value: string) => boolean \| void \| Promise<...>` | 点右侧确认：返回 `false` 时不关闭、不提交 |
| `onCancel` | `() => boolean \| void \| Promise<...>` | 点左侧或关闭：返回 `false` 时不关闭 |
| `headerRight` | `React.ReactNode` | 默认 `CheckmarkOutline`；可为节点，渲染时 `run(headerRight)` |
| `headerLeft` | `React.ReactNode` | 默认 `CloseOutline` |

另含 IO 字段：`value`、`defaultValue`、`onChange`、`filterIOValue` 等。

### 返回值

| 属性                             | 说明                                                                         |
| -------------------------------- | ---------------------------------------------------------------------------- |
| `value` / `setValue`             | 来自 `useSelectionFieldProps`，已确认的外层值                                |
| `insideValue` / `setInsideValue` | 弹层内编辑中的值                                                             |
| `selecting` / `setSelecting`     | 在返回值中未直接暴露；内部用 `selecting` 作为 `Popup` 的 `visible`           |
| `renderTrigger`                  | `(content: React.ReactNode) => JSX.Element`，外层可点击 `div`                |
| `renderPopup`                    | `(content: React.ReactNode) => JSX.Element`，包裹 `Popup` 与头部按钮逻辑     |
| `headerRight`                    | 解析后的右侧头内容（与入参或 `popupProps.headerRight` 默认有关）             |
| 其余                             | `props` 中未用于内部实现的字段会合并进返回值（含 `restSelectionFieldProps`） |

### 交互要点

- 确认：先 `onConfirm(insideValue)`，默认可关闭；通过后 `setValue(insideValue)` 并关闭。
- `onExited`：关闭动画结束后，若存在 `value` 会把 `insideValue` 同步回 `value`；并调用 `onExited` 或 `popupProps.onExited`。

<!--
Source:
- packages/mobile/src/exports/usePickerProps/type.tsx
- packages/mobile/src/exports/usePickerProps/index.tsx
- packages/mobile/src/exports/usePickerProps/style.less
-->
