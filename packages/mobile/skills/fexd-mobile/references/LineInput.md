---
name: LineInput
description: 行内输入框
---

# LineInput 行内输入框

在 `UnstyledIOInput` 上固定 `theme` 为 `LineLabel` 的输入控件，类名前缀默认为 `exd-line-input`。属于 IO 分层体系中 **Line\*** 主题变体，行为与 `UnstyledIOInput` / `BasicInput` 一致。

```tsx
import { LineInput } from '@fexd/mobile'
```

## 基础用法

```tsx
import { LineInput } from '@fexd/mobile'
;<LineInput label="手机号" placeholder="请输入" value={value} onChange={setValue} />
```

```tsx
<LineInput label="备注" multipleLines clearable labelType="error" helper="格式不正确" />
```

## Props

`LineInputProps` 为 `Omit<UnstyledIOInputProps, 'theme'>`（`packages/mobile/src/exports/LineInput/type.tsx`）。

类型由 `PureUnstyledIOInputProps` 与 `Omit<BasicInputProps, 'prefix' | 'onClick'>` 交叉合并而成。

### UnstyledIOInput 扩展字段

| 属性            | 类型                            | 默认值 | 必填 | 说明                                  |
| --------------- | ------------------------------- | ------ | ---- | ------------------------------------- |
| classNamePrefix | `string`                        | -      | 否   | 类名前缀（封装默认 `exd-line-input`） |
| scrollIntoView  | `boolean`                       | -      | 否   | 是否滚动进可视区域                    |
| multipleLines   | `boolean`                       | -      | 否   | 是否多行（内部 `TextArea`）           |
| clearable       | `boolean`                       | -      | 否   | 是否显示清除                          |
| clearIcon       | `any`                           | -      | 否   | 自定义清除图标                        |
| label           | `React.ReactNode`               | -      | 否   | 标签                                  |
| labelType       | `UnstyledIOLabelProps['type']`  | -      | 否   | 标签状态                              |
| inputProps      | `BasicInputProps`               | -      | 否   | 透传给底层 input 的 props             |
| ref             | `React.Ref<UnstyledIOInputRef>` | -      | 否   | 引用                                  |

### 自 UnstyledIOLabel 继承（排除 `type`、`placeholder`、`value`、`onChange`、`defaultValue`、`ref`）

与 `LineIOLabel` 相同组的字段仍适用：`error`、`disabled`、`focused`、`hideErrorWhenFocusing`、`helperPrefix`、`label`（与上表合并）、`autoHeight`、`prefix`、`suffix`、`helper`、`active`、`children`、`className`、`style`、`keepHelperPlaceholder`、`onClick`、`useLabelWrapper`、`*Props` 系列等，详见 `UnstyledIOInput/type.tsx` 与 `UnstyledIOLabel/type.tsx`。

### BasicInput / TextField / JSXInput（排除 `prefix`、`onClick`）

包含 `PureTextFieldProps` / `IOProps<string>`：`value`、`defaultValue`、`onChange`、`filterIOValue`、`normalize`、`normalizeTrigger`、`format`；以及 `JSXInputProps` 中除与 `TextField` 冲突项外的标准 input 属性（如 `name`、`maxLength`、`autoFocus`、`onFocus`、`onBlur` 等），完整列表以 `BasicInput/type.tsx` 为准。

## 相关组件

- 无样式：`UnstyledIOInput`
- 行内标签：`LineLabel`、`LineIOLabel`
- 块状变体：`BlockInput`

## 样式定制

`LineInputStyleVars` / `DOC_LineInputStyleVars`：

| 变量                             | 说明           | 默认                |
| -------------------------------- | -------------- | ------------------- |
| `@line-input-font-size`          | 输入框文字大小 | `14px`              |
| `@line-input-color`              | 输入框文字颜色 | `ant-color-gray-10` |
| `@line-input-placeholder-color`  | 占位符文字颜色 | `ant-color-gray-6`  |
| `@line-input-disabled-color`     | 禁用态文字颜色 | `ant-color-gray-5`  |
| `@line-input-prefix-line-height` | 前缀图标行高   | `22px`              |
| `@line-input-clear-size`         | 清除按钮大小   | `17px`              |
| `@line-input-clear-color`        | 清除按钮颜色   | `ant-color-gray-6`  |
| `@line-input-suffix-margin-left` | 后缀元素左边距 | `6px`               |

## 注意事项

- `theme` 由库固定，不要传入。
- 具体校验与格式化逻辑与 `useTextFieldProps` / `BasicInput` 行为一致。

<!--
Source:
- packages/mobile/src/exports/LineInput/type.tsx
- packages/mobile/src/exports/LineInput/index.tsx
- packages/mobile/src/exports/LineInput/style.less
-->
