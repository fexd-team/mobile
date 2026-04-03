---
name: CellInput
description: 在 Cell 形态下的输入控件；基于 UnstyledIOInput，默认 theme 为 CellLabel，属于 **IO 主题的 Cell 变体**。
---

# CellInput 单元格输入框

在 Cell 形态下的输入控件；基于 `UnstyledIOInput`，默认 `theme` 为 `CellLabel`，属于 **IO 主题的 Cell 变体**。

```tsx
import { CellInput } from '@fexd/mobile'
```

## 基础用法

```tsx
<CellInput label="Note" placeholder="Type here" defaultValue="" />
```

```tsx
<CellInput label="Amount" clearable type="number" inputProps={{ step: 0.01 }} />
```

## Props

`CellInputProps` 定义于 `packages/mobile/src/exports/CellInput/type.tsx`（`PureCellInputProps` 与 `Omit<UnstyledIOInputProps, 'theme'>` 合并），等价于去掉 `theme` 的 `UnstyledIOInputProps`。

### 自 `UnstyledIOLabel` 相关块（`PureUnstyledIOInputProps` 中从 `UnstyledIOLabel` 继承，已省略 `type`、`placeholder`、`value`、`onChange`、`defaultValue`）

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| label | 展示名称 | `React.ReactNode` |
| autoHeight | 是否根据内容自动撑开高度 | `boolean` |
| prefix | 前缀 | `React.ReactNode` |
| suffix | 后缀 | `React.ReactNode` |
| helper | 辅助文案 | `React.ReactNode` |
| active | 是否激活 | `boolean` |
| disabled | 是否禁用 | `boolean` |
| className | 类名 | `string` |
| style | 样式 | `JSXDivProps['style']` |
| keepHelperPlaceholder | 是否保留辅助占位高度 | `boolean` |
| useLabelWrapper | 是否用 `<label>` 包裹 | `boolean` |
| wrapperProps / labelProps / barProps / contentProps / placeholderProps / prefixProps / suffixProps / helperProps | 各区域元素属性 | 同 `UnstyledLabel` |
| error | 区域错误 | `React.ReactNode` |
| focused | 是否聚焦 | `boolean` |
| hideErrorWhenFocusing | 聚焦时是否隐藏错误 | `boolean` |
| helperPrefix | 辅助信息前缀 | `React.ReactNode \| ((hasError: boolean) => React.ReactNode)` |

### 输入与 IO（`PureUnstyledIOInputProps` + `BasicInput` 合并）

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| classNamePrefix | 类名前缀 | `string` |
| scrollIntoView | 是否滚动进视区 | `boolean` |
| multipleLines | 是否多行 | `boolean` |
| clearable | 是否可清除 | `boolean` |
| clearIcon | 清除图标 | `any` |
| labelType | 标签状态类型 | `UnstyledIOLabelProps['type']` |
| inputProps | 透传给内部 input 的属性 | `BasicInputProps` |
| ref | 实例引用 | `React.Ref<UnstyledIOInputRef>` |
| defaultValue / value / onChange | 受控与非受控 | 见 `IOProps<string>` 与 `TextFieldProps` |
| filterIOValue | 值过滤，返回 `false` 时不接受输入且不触发 `onChange` | `(value: any) => boolean` |
| normalize / normalizeTrigger | 值序列化 | `PureTextFieldProps` |
| format | 展示格式化 | `(value: string) => string` |

另继承 `Omit<JSXInputProps, 'value' \| 'defaultValue' \| 'onChange' \| 'ref'>` 及 `BasicInput` 从 `JSXInput` 选取的字段（`maxLength`、`minLength`、`autoComplete`、`autoFocus`、`enterKeyHint`、`pattern`、`inputMode`、`type`、`onFocus`、`onBlur`、`autoCapitalize`、`autoCorrect`、`onKeyDown`、`onKeyUp`、`onCompositionStart`、`onCompositionEnd`、`onClick`、`step` 等，详见 `BasicInput/type.tsx` 与 `useTextFieldProps/type.tsx`）。

## 样式定制

样式变量见 `CellInputStyleVars`（`@cell-input-*`）。

## 相关组件

`UnstyledIOInput`、`BasicInput`、`CellLabel`

<!--
Source:
- packages/mobile/src/exports/CellInput/type.tsx
- packages/mobile/src/exports/CellInput/index.tsx
- packages/mobile/src/exports/CellInput/style.less
-->
