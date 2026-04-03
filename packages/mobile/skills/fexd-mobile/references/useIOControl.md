---
name: useIOControl
description: 在受控/非受控之间管理单个值，并在聚焦时暂时忽略外部 `value`；提供 `setValue` / `getValue` 及聚焦状态。内部基于 ahooks 的 `useControllableValue`（经本地包装支持 `filterIOValue`）。
---

# useIOControl

在受控/非受控之间管理单个值，并在聚焦时暂时忽略外部 `value`；提供 `setValue` / `getValue` 及聚焦状态。内部基于 ahooks 的 `useControllableValue`（经本地包装支持 `filterIOValue`）。

```tsx
import { useIOControl } from '@fexd/mobile'
```

## 基础用法

```tsx
function Field(props: { value?: string; defaultValue?: string; onChange?: (v: string) => void }) {
  const { value, setValue, focused, setFocused } = useIOControl<string>(props)

  return (
    <input
      value={value ?? ''}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
```

## API

### 签名

```ts
function useIOControl<T>(
  props: IOProps<T>,
  options?: Options<T>,
): {
  value: T
  setValue: (next: T | ((prev: T) => T)) => void
  getValue: () => T
  focused: boolean
  setFocused: (v: boolean) => void
  getFocused: () => boolean
}
```

`Options<T>` 与 ahooks `useControllableValue` 的第二个参数一致（如 `valuePropName`、`defaultValuePropName`、`trigger`）。

### `IOProps<T>`（`useIOControl/type.tsx`）

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `defaultValue` | `T` | 非受控默认值 |
| `value` | `T` | 受控值 |
| `onChange` | `(value: T) => void` | 值变化回调 |
| `filterIOValue` | `(value: any) => boolean` | 返回 `false` 时视为无效，不调用 `onChange`（经内部 `useControllableValue` 包装） |

### 返回值

| 属性         | 类型                                    | 说明                             |
| ------------ | --------------------------------------- | -------------------------------- |
| `value`      | `T`                                     | 当前值                           |
| `setValue`   | `(next: T \| ((prev: T) => T)) => void` | 与上一值相同时不更新             |
| `getValue`   | `() => T`                               | 读取最新值 ref                   |
| `focused`    | `boolean`                               | 是否处于聚焦                     |
| `setFocused` | `(v: boolean) => void`                  | 设置聚焦                         |
| `getFocused` | `() => boolean`                         | 读取聚焦（ahooks `useGetState`） |

### 行为说明

- 当 `focused === true` 或 props 中不存在 `value` 对应键（由 `options.valuePropName` 决定，默认 `value`）时，内部会删除传入受控的 `value`，使行为类似非受控输入。
- `filterIOValue` 在未通过时，`setValue` 不会向上提交；`value` 可能对无效输入表现为 `undefined`（见 `useControllableValue.tsx`）。

<!--
Source:
- packages/mobile/src/exports/useIOControl/type.tsx
- packages/mobile/src/exports/useIOControl/index.ts
- packages/mobile/src/exports/useIOControl/style.less
-->
