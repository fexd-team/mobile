---
name: BlockInput
description: 块状输入框
---

# BlockInput 块状输入框

在 `UnstyledIOInput` 上固定 `theme` 为 `BlockLabel` 的输入控件，类名前缀默认为 `exd-block-input`。属于 IO 分层体系中 **Block\*** 主题变体，行为与 `UnstyledIOInput` / `BasicInput` 一致。

```tsx
import { BlockInput } from '@fexd/mobile'
```

## 基础用法

```tsx
import { BlockInput } from '@fexd/mobile'
;<BlockInput label="手机号" placeholder="请输入" value={value} onChange={setValue} />
```

```tsx
<BlockInput label="备注" multipleLines clearable labelType="error" helper="格式不正确" />
```

## Props

`BlockInputProps` 为 `Omit<UnstyledIOInputProps, 'theme'>`（`packages/mobile/src/exports/BlockInput/type.tsx`）。

类型由 `PureUnstyledIOInputProps` 与 `Omit<BasicInputProps, 'prefix' | 'onClick'>` 交叉合并而成。

### UnstyledIOInput 扩展字段

| 属性            | 类型                            | 默认值 | 必填 | 说明                                   |
| --------------- | ------------------------------- | ------ | ---- | -------------------------------------- |
| classNamePrefix | `string`                        | -      | 否   | 类名前缀（封装默认 `exd-block-input`） |
| scrollIntoView  | `boolean`                       | -      | 否   | 是否滚动进可视区域                     |
| multipleLines   | `boolean`                       | -      | 否   | 是否多行（内部 `TextArea`）            |
| clearable       | `boolean`                       | -      | 否   | 是否显示清除                           |
| clearIcon       | `any`                           | -      | 否   | 自定义清除图标                         |
| label           | `React.ReactNode`               | -      | 否   | 标签                                   |
| labelType       | `UnstyledIOLabelProps['type']`  | -      | 否   | 标签状态                               |
| inputProps      | `BasicInputProps`               | -      | 否   | 透传给底层 input 的 props              |
| ref             | `React.Ref<UnstyledIOInputRef>` | -      | 否   | 引用                                   |

### 自 UnstyledIOLabel 继承（排除 `type`、`placeholder`、`value`、`onChange`、`defaultValue`、`ref`）

与 `BlockIOLabel` 相同组的字段仍适用：`error`、`disabled`、`focused`、`hideErrorWhenFocusing`、`helperPrefix`、`label`（与上表合并）、`autoHeight`、`prefix`、`suffix`、`helper`、`active`、`children`、`className`、`style`、`keepHelperPlaceholder`、`onClick`、`useLabelWrapper`、`*Props` 系列等，详见 `UnstyledIOInput/type.tsx` 与 `UnstyledIOLabel/type.tsx`。

### BasicInput / TextField / JSXInput（排除 `prefix`、`onClick`）

包含 `PureTextFieldProps` / `IOProps<string>`：`value`、`defaultValue`、`onChange`、`filterIOValue`、`normalize`、`normalizeTrigger`、`format`；以及 `JSXInputProps` 中除与 `TextField` 冲突项外的标准 input 属性（如 `name`、`maxLength`、`autoFocus`、`onFocus`、`onBlur` 等），完整列表以 `BasicInput/type.tsx` 为准。

## 相关组件

- 无样式：`UnstyledIOInput`
- 块状标签：`BlockLabel`、`BlockIOLabel`
- 行内变体可参考 `LineInput` 等（IO 主题族）

## 样式定制

`BlockInputStyleVars` / `DOC_BlockInputStyleVars`：

| 变量                              | 说明               | 默认      |
| --------------------------------- | ------------------ | --------- |
| `@block-input-font-size`          | 输入文字字号       | `14px`    |
| `@block-input-color`              | 输入文字颜色       | `#333`    |
| `@block-input-placeholder-color`  | 占位符颜色         | `#999`    |
| `@block-input-disabled-color`     | 禁用文字色         | `#c2bcbe` |
| `@block-input-prefix-line-height` | 前缀行高           | `22px`    |
| `@block-input-clear-size`         | 清除按钮尺寸       | `17px`    |
| `@block-input-clear-color`        | 清除按钮颜色       | `#bbb`    |
| `@block-input-suffix-margin-left` | 后缀左边距         | `6px`     |
| `@block-input-no-label-padding-y` | 无标签时纵向内边距 | `8px`     |

## 注意事项

- `theme` 由库固定，不要传入。
- 具体校验与格式化逻辑与 `useTextFieldProps` / `BasicInput` 行为一致。

<!--
Source:
- packages/mobile/src/exports/BlockInput/type.tsx
- packages/mobile/src/exports/BlockInput/index.tsx
- packages/mobile/src/exports/BlockInput/style.less
-->
