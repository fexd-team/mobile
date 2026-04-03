---
name: useSelectionFieldProps
description: 在 useIOControl 之上维护「挑选中」状态及弹层内临时值 insideValue：未挑选时保持 insideValue 与外部 value 同步。
---

# useSelectionFieldProps

在 `useIOControl` 之上维护「挑选中」状态及弹层内临时值 `insideValue`：未挑选时保持 `insideValue` 与外部 `value` 同步。

```tsx
import { useSelectionFieldProps } from '@fexd/mobile'
```

## 基础用法

```tsx
function Field(props: SelectionFieldProps<string>) {
  const { value, insideValue, setInsideValue, selecting, setSelecting, setValue } = useSelectionFieldProps(props)

  // selecting === true 时修改 insideValue；确认后再 setValue(insideValue)
  return null
}
```

## API

### 签名

```ts
function useSelectionFieldProps<T = string>(props: SelectionFieldProps<T>)
```

### `SelectionFieldProps<T>`

与 `IOProps<T>` 相同（`packages/mobile/src/exports/useSelectionFieldProps/type.tsx`）：`defaultValue`、`value`、`onChange`、`filterIOValue`。

### 返回值

| 属性                             | 说明                                                 |
| -------------------------------- | ---------------------------------------------------- |
| `...props`                       | 原 props 全量展开回传                                |
| `value` / `setValue`             | 来自 `useIOControl`                                  |
| `insideValue` / `setInsideValue` | 弹层或挑选流程中的临时值                             |
| `selecting` / `setSelecting`     | 是否处于挑选流程                                     |
| `getFocused` 等                  | **不**包含；聚焦逻辑在 `useIOControl` 内，此处未返回 |

### 行为

- `useEffect` 监听 `value`：当 `selecting` 为 `false` 时，将 `insideValue` 设为当前 `value`。
- `selecting` 为 `true` 时，外部 `value` 变化不会把 `insideValue` 强行同步（依赖 `useLatest(selecting)` 读取最新挑选状态）。

<!--
Source:
- packages/mobile/src/exports/useSelectionFieldProps/type.tsx
- packages/mobile/src/exports/useSelectionFieldProps/index.ts
- packages/mobile/src/exports/useSelectionFieldProps/style.less
-->
