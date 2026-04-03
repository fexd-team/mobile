---
name: BasicInput
description: 受控/非受控字符串输入，内置与 useTextFieldProps 一致的格式化、归一化与 IO 行为，底层为原生 <input>。
---

# BasicInput 基础输入框

受控/非受控字符串输入，内置与 `useTextFieldProps` 一致的格式化、归一化与 IO 行为，底层为原生 `<input>`。

```tsx
import { BasicInput } from '@fexd/mobile'
```

## 基础用法

```tsx
import { useState } from 'react'
import { BasicInput } from '@fexd/mobile'

const [value, setValue] = useState('')
;<BasicInput value={value} onChange={setValue} placeholder="请输入" />
```

```tsx
<BasicInput defaultValue="hello" maxLength={20} />
```

## Props

`BasicInputProps` 由以下合并（`exports/BasicInput/type.tsx`）：

- `Omit<JSXInputProps, 'value' | 'defaultValue' | 'onChange' | 'ref'>`：原生 input 属性（如 `placeholder`、`disabled`、`readOnly`、`name`、`maxLength`、`type` 等），但值的读写由下方 IO/TextField 字段接管。
- `PureBasicInputProps`：`PureTextFieldProps` + `ref`。
- `TextFieldProps`：与上式合并后的完整文本字段类型。

### PureBasicInputProps / TextField 相关（`useTextFieldProps/type.tsx` + `useIOControl`）

| 属性             | 类型                                            | 默认值       | 必填 | 说明                      |
| ---------------- | ----------------------------------------------- | ------------ | ---- | ------------------------- |
| ref              | `React.Ref<BasicInputRef>`                      | -            | 否   | 引用                      |
| defaultValue     | `string`                                        | -            | 否   | 非受控默认值              |
| value            | `string`                                        | -            | 否   | 受控值                    |
| onChange         | `(value: string) => void`                       | -            | 否   | 值变化                    |
| filterIOValue    | `(value: any) => boolean`                       | -            | 否   | 返回 `false` 时不接受输入 |
| normalize        | `(value: string, prevValue?: string) => string` | `identity`   | 否   | 归一化                    |
| normalizeTrigger | `'onChange' \| 'onBlur'`                        | `'onChange'` | 否   | 归一化触发时机            |
| format           | `(value: string) => string`                     | `identity`   | 否   | 展示格式化                |

### 自 JSXInputProps 显式 Pick（`PureExtendFromJSXInput`，同文件导出）

与 `BasicInput` 文档相关的原生能力还包括：`maxLength`、`minLength`、`autoComplete`、`autoFocus`、`enterKeyHint`、`pattern`、`inputMode`、`type`、`onFocus`、`onBlur`、`autoCapitalize`、`autoCorrect`、`onKeyDown`、`onKeyUp`、`onCompositionStart`、`onCompositionEnd`、`onClick`、`step` 等（完整列表以 `type.tsx` 中 `PureExtendFromJSXInput` 为准）。

其余 `JSXInputProps` 字段在合并接口中仍可能可用；若与 `IOProps` 冲突则以 `TextFieldProps` 定义为准。

## 注意事项

- 受控时请同时提供 `value` 与 `onChange`。
- `onChange` 的参数为字符串，而非原生事件的 `event`。

## 相关组件

`BasicTextArea`、`useTextFieldProps` 系列封装组件

<!--
Source:
- packages/mobile/src/exports/BasicInput/type.tsx
- packages/mobile/src/exports/BasicInput/index.tsx
- packages/mobile/src/exports/BasicInput/style.less
-->
