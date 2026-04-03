---
name: BlockPicker
description: 块状选择器
---

# BlockPicker 块状选择器

在 `UnstyledIOPicker` 上固定 `theme` 为 `BlockLabel` 的选择器，类名前缀默认为 `exd-block-picker`。属于 IO 分层体系中 **Block\*** 主题变体，行为对齐 `Picker` / `UnstyledIOPicker`。

```tsx
import { BlockPicker } from '@fexd/mobile'
```

## 基础用法

```tsx
import { BlockPicker } from '@fexd/mobile'

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
]

<BlockPicker label="城市" placeholder="请选择" options={options} onChange={(v) => console.log(v)} />
```

```tsx
<BlockPicker label="可清空" clearable options={options} value="1" arrowIcon={null} />
```

## Props

`BlockPickerProps` 为 `Omit<UnstyledIOPickerProps, 'theme' | 'ref'>` 与 `PureBlockPickerProps` 的合并（`type.tsx` 中双重 `extends`），等价于无 `theme` 的 `UnstyledIOPickerProps`（`ref` 在 `PureBlockPickerProps` 上可选声明）。

### UnstyledIOPicker 扩展

| 属性            | 类型                           | 默认值 | 必填 | 说明                                    |
| --------------- | ------------------------------ | ------ | ---- | --------------------------------------- |
| classNamePrefix | `string`                       | -      | 否   | 类名前缀（封装默认 `exd-block-picker`） |
| className       | `string`                       | -      | 否   | 类名                                    |
| label           | `React.ReactNode`              | -      | 否   | 标签                                    |
| labelType       | `UnstyledIOLabelProps['type']` | -      | 否   | 标签状态                                |
| arrowIcon       | `React.ReactNode`              | -      | 否   | 右侧箭头（封装默认 `CaretDown`）        |
| ref             | `React.Ref<PickerRef>`         | -      | 否   | 引用                                    |

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

与 `BlockDatePicker` 文档中「IO 标签与外观」表一致：`label`、`placeholder`、`prefix`、`suffix`、`helper`、`active`、`type`、`disabled`、`error`、`focused`、`hideErrorWhenFocusing`、`helperPrefix`、`keepHelperPlaceholder`、`useLabelWrapper`、`className`、`style`、`*Props` 等。注意此处 `onChange` 来自 Picker（上表），与 IO 层省略的 `onChange` 不冲突。

## 相关组件

- 无样式：`UnstyledIOPicker`
- 基础选择：`Picker`
- 同类块状：`BlockDatePicker`、`BlockTimePicker`

## 样式定制

`BlockPickerStyleVars` / `DOC_BlockPickerStyleVars`：

| 变量                                 | 说明       | 默认      |
| ------------------------------------ | ---------- | --------- |
| `@block-picker-value-font-size`      | 选中值字号 | `14px`    |
| `@block-picker-disabled-color`       | 禁用文字色 | `#999`    |
| `@block-picker-disabled-arrow-color` | 禁用箭头色 | `#ccc`    |
| `@block-picker-clear-color`          | 清除色     | `#ccc`    |
| `@block-picker-arrow-font-size`      | 箭头大小   | `18px`    |
| `@block-picker-arrow-color`          | 箭头颜色   | `#a5a0a1` |

## 注意事项

- 未提供 `index.zh.md` / `demos/`，细节参考 `Picker` 与 `UnstyledIOPicker` 源码。
- `theme` 固定为 `BlockLabel`，勿重复传入。

<!--
Source:
- packages/mobile/src/exports/BlockPicker/type.tsx
- packages/mobile/src/exports/BlockPicker/index.tsx
- packages/mobile/src/exports/BlockPicker/style.less
-->
