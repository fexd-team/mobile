---
name: BasicTextArea
description: 基于 useTextFieldProps 的多行文本，支持固定高度或 height="auto" 自动增高（通过镜像高度计算）。
---

# BasicTextArea 基础多行输入

基于 `useTextFieldProps` 的多行文本，支持固定高度或 `height="auto"` 自动增高（通过镜像高度计算）。

```tsx
import BasicTextArea from '@fexd/mobile/es/exports/BasicTextArea'
```

## 基础用法

```tsx
import { useState } from 'react'
import { BasicTextArea } from '@fexd/mobile'

const [value, setValue] = useState('')
;<BasicTextArea value={value} onChange={setValue} placeholder="请输入" />
```

```tsx
<BasicTextArea height="auto" defaultValue={'line1\nline2'} />
```

```tsx
<BasicTextArea height={120} maxLength={500} />
```

## Props

`BasicTextAreaProps` 由以下合并（`exports/BasicTextArea/type.tsx`）：

- `PureBasicTextAreaProps`：`PureTextFieldProps` + `ref?` + `height?`
- `Omit<JSXTextAreaProps, keyof JSXInputProps | 'height'>`：textarea 原生属性中不与 `JSXInputProps` 重叠的部分，且排除 `height`（由组件的 `height` 占用）
- `Omit<TextFieldProps<any>, 'height'>`

### 组件显式字段（PureBasicTextAreaProps）

| 属性   | 类型                    | 默认值          | 必填 | 说明                     |
| ------ | ----------------------- | --------------- | ---- | ------------------------ |
| height | `number \| 'auto'`      | 实现中默认 `66` | 否   | 固定高度（px）或自动高度 |
| ref    | `TextFieldProps['ref']` | -               | 否   | 引用                     |

### 与 BasicInput 一致的 TextField / IO（见 `useTextFieldProps/type.tsx`、`useIOControl`）

| 属性             | 类型                                            | 默认值       | 必填 | 说明         |
| ---------------- | ----------------------------------------------- | ------------ | ---- | ------------ |
| defaultValue     | `string`                                        | -            | 否   | 非受控默认值 |
| value            | `string`                                        | -            | 否   | 受控值       |
| onChange         | `(value: string) => void`                       | -            | 否   | 值变化       |
| filterIOValue    | `(value: any) => boolean`                       | -            | 否   | 过滤非法输入 |
| normalize        | `(value: string, prevValue?: string) => string` | `identity`   | 否   | 归一化       |
| normalizeTrigger | `'onChange' \| 'onBlur'`                        | `'onChange'` | 否   | 归一化时机   |
| format           | `(value: string) => string`                     | `identity`   | 否   | 展示格式化   |

另含 `className`（作用于内部 `textarea`）、以及合并后允许的 `textarea` DOM 属性（如 `placeholder`、`disabled`、`readOnly`、`rows` 等，以 `BasicTextAreaProps` 类型推断为准，且不与已 Omit 的 `height` 冲突）。

## 样式定制

组件使用 `exd-textarea` / `exd-textarea-wrapper` 等类名；Less 源码见 `exports/BasicTextArea/style.less`（若需深度覆盖可配合 `:global` 或包内变量文件，以项目主题方案为准）。

## 相关组件

`BasicInput`、`useTextFieldProps`

<!--
Source:
- packages/mobile/src/exports/BasicTextArea/type.tsx
- packages/mobile/src/exports/BasicTextArea/index.tsx
- packages/mobile/src/exports/BasicTextArea/style.less
-->
