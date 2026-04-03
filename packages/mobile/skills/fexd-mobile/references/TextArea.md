---
name: TextArea
description: 基于 BasicTextArea / useTextFieldProps 的多行文本组件，支持固定高度或 height="auto" 自动增高。
---

# TextArea 多行输入

基于 `BasicTextArea` / `useTextFieldProps` 的多行文本组件，支持固定高度或 `height="auto"` 自动增高。

```tsx
import { TextArea } from '@fexd/mobile'
;<TextArea placeholder="请输入" />
```

## 基础用法

```tsx
import { useState } from 'react'
import { TextArea } from '@fexd/mobile'

const [value, setValue] = useState('')

;<TextArea value={value} onChange={setValue} placeholder="请输入" />
```

```tsx
import { TextArea } from '@fexd/mobile'
;<TextArea height="auto" defaultValue={'line1\nline2'} />
```

```tsx
import { TextArea } from '@fexd/mobile'
;<TextArea height={120} maxLength={500} />
```

`packages/mobile/src/exports/TextArea/` 下无 `index.zh.md`；行为与 `BasicTextArea` 一致，可参考 `references/BasicTextArea.md` 与测试 `exports/TextArea/tests/index.test.tsx`。

## Props

`TextAreaProps`（`packages/mobile/src/exports/TextArea/type.tsx`）= `PureTextAreaProps` & `BasicTextAreaProps`。

- `PureTextAreaProps`：`PureBasicTextAreaProps`（`exports/BasicTextArea/type.tsx`）+ `ref?`（`React.Ref<TextAreaRef>`，`TextAreaRef` = `any`）。
- `BasicTextAreaProps`：同文件，合并 `PureBasicTextAreaProps`、`Omit<JSXTextAreaProps, keyof JSXInputProps | 'height'>`、`Omit<TextFieldProps<any>, 'height'>`。

### `PureBasicTextAreaProps` 显式字段

| 属性   | 说明                                     | 类型                                      |
| :----- | :--------------------------------------- | :---------------------------------------- |
| height | 固定高度（px）或自动高度                 | `number \| 'auto'`                        |
| ref    | 引用（在 `TextArea` 上为 `TextAreaRef`） | 见 `useTextFieldProps` / `TextFieldProps` |

### TextField / IO（`PureTextFieldProps`，`useTextFieldProps/type.tsx`）

| 属性             | 说明                  | 类型                                            |
| :--------------- | :-------------------- | :---------------------------------------------- |
| defaultValue     | 非受控默认值          | `string`                                        |
| value            | 受控值                | `string`                                        |
| onChange         | 值变化                | `(value: string) => void`                       |
| filterIOValue    | 返回 `false` 时不更新 | `(value: any) => boolean`                       |
| normalize        | 序列化输入            | `(value: string, prevValue?: string) => string` |
| normalizeTrigger | 序列化触发时机        | `'onChange' \| 'onBlur'`                        |
| format           | 展示格式化            | `(value: string) => string`                     |

另含合并后允许的 `textarea` DOM 属性（如 `placeholder`、`disabled`、`readOnly`、`rows` 等），且不与组件占用的 `height` 冲突，具体以 `TextAreaProps` 类型为准。

## 相关组件

`BasicTextArea`、`Input`

<!--
Source:
- packages/mobile/src/exports/TextArea/type.tsx
- packages/mobile/src/exports/TextArea/index.tsx
- packages/mobile/src/exports/TextArea/style.less
-->
