---
name: LinePicker
description: 行内选择器
---

# LinePicker 行内选择器

在 `UnstyledIOPicker` 上固定 `theme` 为 `LineLabel` 的选择器，类名前缀默认为 `exd-line-picker`。属于 IO 分层体系中 **Line\*** 主题变体，行为对齐 `Picker` / `UnstyledIOPicker`。

```tsx
import { LinePicker } from '@fexd/mobile'
```

## 基础用法

```tsx
import { LinePicker } from '@fexd/mobile'

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
]

<LinePicker label="城市" placeholder="请选择" options={options} onChange={(v) => console.log(v)} />
```

```tsx
<LinePicker label="可清空" clearable options={options} value="1" arrowIcon={null} />
```

## Props

`LinePickerProps` 为 `Omit<UnstyledIOPickerProps, 'theme' | 'ref'>` 与 `PureLinePickerProps` 的合并（`type.tsx` 中双重 `extends`），等价于无 `theme` 的 `UnstyledIOPickerProps`（`ref` 在 `PureLinePickerProps` 上可选声明）。

### UnstyledIOPicker 扩展

| 属性            | 类型                           | 默认值 | 必填 | 说明                                   |
| --------------- | ------------------------------ | ------ | ---- | -------------------------------------- |
| classNamePrefix | `string`                       | -      | 否   | 类名前缀（封装默认 `exd-line-picker`） |
| className       | `string`                       | -      | 否   | 类名                                   |
| label           | `React.ReactNode`              | -      | 否   | 标签                                   |
| labelType       | `UnstyledIOLabelProps['type']` | -      | 否   | 标签状态                               |
| arrowIcon       | `React.ReactNode`              | -      | 否   | 右侧箭头                               |
| ref             | `React.Ref<LinePickerRef>`     | -      | 否   | 引用                                   |

### Picker 与 PickerView（`PurePickerProps`）

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| options | `PickerOption[]` | `[]` | 否 | 选项 |
| rows | `number` | `3` | 否 | 可见行数 |
| defaultValue | `PickerOptionValue` | - | 否 | 非受控默认值 |
| value | `PickerOptionValue` | - | 否 | 受控值 |
| scaleSelected | `boolean` | `true` | 否 | 选中项是否放大 |
| clearable | `boolean` | - | 否 | 是否可清除（含 "---"） |
| onChange | `(value: PickerOptionValue, item: PickerOption) => void` | - | 否 | 确认选择后回调 |
| children | `React.ReactNode \| ((label?, value?, option?) => React.ReactNode)` | - | 否 | 触发/展示内容 |

### BasicPicker / Popup / Selection

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| popupProps | `Omit<PopupProps, 'visible'>` | - | 否 | 弹层 |
| onConfirm | `(value: string) => (boolean \| void) \| Promise<boolean \| void>` | - | 否 | 确认 |
| onCancel | `() => (boolean \| void) \| Promise<boolean \| void>` | - | 否 | 取消 |
| headerRight | `React.ReactNode` | - | 否 | 头部右侧 |
| headerLeft | `React.ReactNode` | - | 否 | 头部左侧 |
| onEnter / onExit / onExited | 同 `PopupProps` | - | 否 | 动画回调 |
| disabled | `boolean` | `false` | 否 | 禁用 |

### IO 标签层（`UnstyledIOLabelProps` 中保留，且不含 `children`、`onChange`、`defaultValue`）

与 `LineDatePicker` 文档中「IO 标签与外观」表一致：`label`、`placeholder`、`prefix`、`suffix`、`helper`、`active`、`type`、`disabled`、`error`、`focused`、`hideErrorWhenFocusing`、`helperPrefix`、`keepHelperPlaceholder`、`useLabelWrapper`、`className`、`style`、`*Props` 等。注意此处 `onChange` 来自 Picker（上表），与 IO 层省略的 `onChange` 不冲突。

## 相关组件

- 无样式：`UnstyledIOPicker`
- 基础选择：`Picker`
- 同类行内：`LineDatePicker`、`LineTimePicker`

## 样式定制

`LinePickerStyleVars` / `DOC_LinePickerStyleVars`：

| 变量                           | 说明             | 默认               |
| ------------------------------ | ---------------- | ------------------ |
| `@line-picker-value-font-size` | 选择器值文字大小 | `14px`             |
| `@line-picker-disabled-color`  | 禁用态文字颜色   | `ant-color-gray-7` |
| `@line-picker-clear-color`     | 清除按钮颜色     | `ant-color-gray-5` |
| `@line-picker-arrow-font-size` | 箭头图标大小     | `18px`             |
| `@line-picker-arrow-color`     | 箭头图标颜色     | `ant-color-gray-6` |

## 注意事项

- 未提供 `index.zh.md` / `demos/`，细节参考 `Picker` 与 `UnstyledIOPicker` 源码。
- `theme` 固定为 `LineLabel`，勿重复传入。

<!--
Source:
- packages/mobile/src/exports/LinePicker/type.tsx
- packages/mobile/src/exports/LinePicker/index.tsx
- packages/mobile/src/exports/LinePicker/style.less
-->
