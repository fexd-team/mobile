---
name: useTextFieldProps
description: 在受控输入场景下，组合 `useIOControl` 与可选的 `normalize` / `format`，产出可直接绑定到输入控件的 props（`value`、`onChange`、`onFocus`、`onBlur`、`ref`、`focused` 等）。
---

# useTextFieldProps

在受控输入场景下，组合 `useIOControl` 与可选的 `normalize` / `format`，产出可直接绑定到输入控件的 props（`value`、`onChange`、`onFocus`、`onBlur`、`ref`、`focused` 等）。

```tsx
import { useTextFieldProps } from '@fexd/mobile'
```

## 基础用法

```tsx
import { useTextFieldProps } from '@fexd/mobile'

function Field() {
  const inputProps = useTextFieldProps({
    value,
    onChange: setValue,
    normalize: (v) => v.trim(),
    normalizeTrigger: 'onBlur',
    format: (v) => v.toUpperCase(),
  })

  return <input {...inputProps} />
}
```

## API / 参数

### `useTextFieldProps(props, options?)`

#### 第一参数 `props`：`TextFieldProps<T>`

在 `PureTextFieldProps` 基础上与 `JSXInputProps`（排除与 `IOProps<string>`、`ref` 冲突的键）合并（`type.tsx`）。

**来自 `IOProps<string>`（`useIOControl/type.tsx`）**

| 属性            | 类型                      | 说明                    |
| --------------- | ------------------------- | ----------------------- |
| `defaultValue`  | `string`                  | 非受控默认值            |
| `value`         | `string`                  | 受控值                  |
| `onChange`      | `(value: string) => void` | 值变化回调              |
| `filterIOValue` | `(value: any) => boolean` | 返回 `false` 时不更新值 |

**来自 `PureTextFieldProps`**

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `normalize` | `(value: string, prevValue?: string) => string` | 恒等函数 | 序列化/清洗逻辑 |
| `normalizeTrigger` | `'onChange' \| 'onBlur'` | `'onChange'` | `normalize` 触发时机 |
| `format` | `(value: string) => string` | 恒等函数 | 展示格式化（仅影响输出 `value`，不反向写回） |

另有 `ref` 可传入，将通过 `useImperativeHandle` 转发到内部 `inputRef`；其余 `...restProps` 原样合并到返回值（如 `onFocus`/`onBlur` 会先走内部逻辑再 `run(restProps, ...)`）。

#### 第二参数 `options`

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `noFormat` | `boolean` | `false` | 为 `true` 时内部将 `format`/`normalize` 视为恒等参与计算，但仍把原始 `props.format` / `props.normalize` 透传回对象（用于外层再处理） |

### 返回值

| 属性 | 说明 |
| --- | --- |
| `...restProps` | 除已解构外的输入 props |
| `ref` | 内部 ref（合并 `useImperativeHandle`） |
| `value` | 空值时为 `''`，否则为 `format(String(value ?? ''))` |
| `focused` | 是否聚焦（`useIOControl`） |
| `onChange` | 包装后的变更：可能按 `normalizeTrigger === 'onChange'` 调用 `normalize` 后 `setValue` |
| `onFocus` | `setFocused(true)` 并调用外部 `onFocus` |
| `onBlur` | `setFocused(false)`；若 `normalizeTrigger === 'onBlur'` 则对当前值做 `normalize`，再调用外部 `onBlur` |

### 模块其它导出

| 导出           | 说明                                                                      |
| -------------- | ------------------------------------------------------------------------- |
| `identity`     | `<T>(value: T) => T`                                                      |
| `defaultProps` | `{ normalize: identity, normalizeTrigger: 'onChange', format: identity }` |

## 实现说明

- `packages/mobile/src/exports/useTextFieldProps/index.ts`
- `packages/mobile/src/exports/useTextFieldProps/type.tsx`

## 相关

- `useIOControl`、`BasicInput`、`Input`

<!--
Source:
- packages/mobile/src/exports/useTextFieldProps/type.tsx
- packages/mobile/src/exports/useTextFieldProps/index.ts
- packages/mobile/src/exports/useTextFieldProps/style.less
-->
