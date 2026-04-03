---
name: Input
description: 输入框
---

# Input 输入框

`Input` 为受控输入的基础封装，类型上合并了 `IO` 控制、`TextField` 格式化与原生 `input` 属性。库中还导出 `TextArea`、`LineInput`、`BlockInput`、`CellInput` 等组合形态（各自有独立 `type.tsx`，见源码 `exports/` 目录）。

```tsx
import { Input, TextArea, LineInput, BlockInput, CellInput } from '@fexd/mobile'
;<Input placeholder="请输入" />
```

## 基础用法

最简用法与 `normalize` / `format`：

```tsx
import { Input } from '@fexd/mobile'
import { useState } from 'react'
import BigNumber from 'bignumber.js'

const [value, setValue] = useState('124567')

<Input
  value={value}
  format={(v) => BigNumber(v).toFormat({ decimalSeparator: '.', groupSeparator: ',', groupSize: 3 })}
  normalize={(v) => v.replace(/\D/g, '')}
  onChange={setValue}
/>
```

`TextArea` 与 `LineInput` / `BlockInput` 切换等示例见 `packages/mobile/src/exports/Input/demos/demo1/index.tsx`。

## Props

`Input` 的类型为 `InputProps`（`packages/mobile/src/exports/Input/type.tsx`），等价于 `PureInputProps` 与 `BasicInputProps` 的交叉：

- `PureInputProps` 继承 `PureBasicInputProps`（`packages/mobile/src/exports/BasicInput/type.tsx`）
- `BasicInputProps` = `PureBasicInputProps` & `Omit<JSXInputProps, 'value' | 'defaultValue' | 'onChange' | 'ref'>` & `TextFieldProps<any>`

### 值与格式化（`IOProps` + `PureTextFieldProps`）

| 属性             | 说明                    | 类型                                            | 默认值       |
| :--------------- | :---------------------- | :---------------------------------------------- | :----------- |
| defaultValue     | 非受控默认值            | `string`                                        | —            |
| value            | 受控值                  | `string`                                        | —            |
| onChange         | 值变化                  | `(value: string) => void`                       | —            |
| filterIOValue    | 返回 `false` 时不更新值 | `(value: any) => boolean`                       | —            |
| normalize        | 序列化用户输入          | `(value: string, prevValue?: string) => string` | —            |
| normalizeTrigger | 序列化触发时机          | `'onChange' \| 'onBlur'`                        | `'onChange'` |
| format           | 展示层格式化            | `(value: string) => string`                     | —            |
| ref              | 实例 ref                | `React.Ref<InputRef>`                           | —            |

### 自 `BasicInputProps` 显式列举的 input 属性（`DOC_PureExtendFromJSXInput`）

下列字段来自 `packages/mobile/src/exports/BasicInput/type.tsx` 中对 `JSXInputProps` 的 Pick：

| 属性                                  | 类型                                                       |
| :------------------------------------ | :--------------------------------------------------------- |
| maxLength                             | `JSXInputProps['maxLength']`                               |
| minLength                             | `JSXInputProps['minLength']`                               |
| autoComplete                          | `JSXInputProps['autoComplete']`                            |
| autoFocus                             | `JSXInputProps['autoFocus']`                               |
| enterKeyHint                          | `JSXInputProps['enterKeyHint']`                            |
| pattern                               | `JSXInputProps['pattern']`                                 |
| inputMode                             | `JSXInputProps['inputMode']`                               |
| type                                  | `JSXInputProps['type']`                                    |
| onFocus / onBlur                      | `JSXInputProps['onFocus']` / `onBlur`                      |
| autoCapitalize / autoCorrect          | `JSXInputProps['autoCapitalize']` / `autoCorrect`          |
| onKeyDown / onKeyUp                   | `JSXInputProps['onKeyDown']` / `onKeyUp`                   |
| onCompositionStart / onCompositionEnd | `JSXInputProps['onCompositionStart']` / `onCompositionEnd` |
| onClick                               | `JSXInputProps['onClick']`                                 |
| step                                  | `JSXInputProps['step']`                                    |

### 其余原生属性

`BasicInputProps` 另包含 `React.InputHTMLAttributes<HTMLInputElement>` 中除 `value`、`defaultValue`、`onChange`、`ref` 外的属性（如 `placeholder`、`name`、`disabled` 等），具体以 `BasicInput/type.tsx` 为准。

## 样式定制

`Input/style.less` 仅 `@import` `BasicInput` 样式；无独立 `Input` 文档样式变量。Block / Line / Cell 输入与标签的 Less 变量见 `packages/mobile/src/exports/Input/index.zh.md`「样式变量」各 `DOC_*StyleVars`（`BlockLabel`、`BlockInput`、`LineLabel`、`LineInput`、`CellLabel`、`CellInput` 的 `type.tsx`）。

## 设计说明

与 `index.zh.md` 一致：`Input` 采用 IO 分层，通过 `IOLabel` 与 `Label` 组合；详见同包文档「IO 组件的分层设计」。

## 相关组件

- `LineInput` / `BlockInput` / `CellInput`：带标签样式的输入组合
- `BasicInput` / `BasicTextArea`：更底层的输入封装
- `Form`：表单域与校验

<!--
Source:
- packages/mobile/src/exports/Input/type.tsx
- packages/mobile/src/exports/Input/index.zh.md
- packages/mobile/src/exports/Input/index.tsx
- packages/mobile/src/exports/Input/demos/
- packages/mobile/src/exports/Input/style.less
-->
