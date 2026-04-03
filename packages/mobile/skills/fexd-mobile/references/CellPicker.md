---
name: CellPicker
description: 在 Cell 形态下展示并触发列选择弹层；基于 UnstyledIOPicker，默认 theme 为 CellLabel，属于 **IO 主题的 Cell 变体**。
---

# CellPicker 单元格选择器

在 Cell 形态下展示并触发列选择弹层；基于 `UnstyledIOPicker`，默认 `theme` 为 `CellLabel`，属于 **IO 主题的 Cell 变体**。

```tsx
import { CellPicker } from '@fexd/mobile'
```

## 基础用法

```tsx
<CellPicker
  label="City"
  options={[
    { label: 'Beijing', value: 'bj' },
    { label: 'Shanghai', value: 'sh' },
  ]}
  defaultValue="bj"
  onChange={(value, item) => console.log(value, item)}
/>
```

```tsx
<CellPicker label="Clearable" clearable options={options} />
```

## Props

`CellPickerProps` 定义于 `packages/mobile/src/exports/CellPicker/type.tsx`，为 `Omit<UnstyledIOPickerProps, 'theme'>`（并与 `PureCellPickerProps` 合并，含 `ref`）。

### 标签区（来自 `UnstyledIOLabel`，`PureUnstyledIOPickerProps` 已省略 `children`、`onChange`、`defaultValue`）

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| label | 控件名称 | `React.ReactNode` |
| labelType | 标签提示状态 | `UnstyledIOLabelProps['type']` |
| placeholder | 占位 | `React.ReactNode` |
| autoHeight | 自动高度 | `boolean` |
| prefix / suffix / helper | 前缀、后缀、辅助 | `React.ReactNode` |
| active | 激活 | `boolean` |
| disabled | 禁用 | `boolean` |
| className | 类名 | `string` |
| style | 样式 | `JSXDivProps['style']` |
| keepHelperPlaceholder | 保留辅助占位 | `boolean` |
| useLabelWrapper | 使用 label 包裹 | `boolean` |
| wrapperProps / labelProps / barProps / contentProps / placeholderProps / prefixProps / suffixProps / helperProps | 各区域属性 | 同 `UnstyledLabel` |
| error / focused / hideErrorWhenFocusing / helperPrefix | IO 标签能力 | 同 `UnstyledIOLabel` |
| value | 受控值（选择器值） | `PickerOptionValue` |
| onChange | 确认选中后回调 | `(value: PickerOptionValue, item: PickerOption) => void` |

另继承 `Omit<JSXDivProps, 'placeholder' \| 'disabled' \| 'prefix' \| 'ref' \| 'onClick'>`（与 `UnstyledLabel` 一致）。

### 选择列表（`PickerView` 相关，来自 `PurePickerProps`）

| 属性          | 说明                        | 类型                |
| ------------- | --------------------------- | ------------------- |
| options       | 选项列表                    | `PickerOption[]`    |
| rows          | 一次显示行数                | `number`            |
| defaultValue  | 默认值                      | `PickerOptionValue` |
| scaleSelected | 选中项是否放大              | `boolean`           |
| clearable     | 是否可清除（含 "---" 选项） | `boolean`           |

`PickerOption`：`{ value: string \| number; label: string; [key: string]: any }`。

### 弹层（来自 `BasicPickerProps`，`PurePickerProps` 已省略其 `defaultValue`、`value`、`onChange`）

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| popupProps | 弹出层 props | `Omit<PopupProps, 'visible'>` |
| onConfirm | 确认 | `(value: string) => (boolean \| void) \| Promise<boolean \| void>` |
| onCancel | 取消 | `() => (boolean \| void) \| Promise<boolean \| void>` |
| headerRight / headerLeft | 头部左右 | `React.ReactNode` |
| onEnter / onExit / onExited | 过渡生命周期 | 同 `PopupProps` |
| className | 类名 | `string` |
| ref | 引用 | `React.Ref<CellPickerRef>`（`CellPickerRef` = `UnstyledIOPickerRef` = `PickerRef`） |

### 组件专有

| 属性            | 说明         | 类型              |
| --------------- | ------------ | ----------------- |
| classNamePrefix | 类名前缀     | `string`          |
| arrowIcon       | 右侧箭头图标 | `React.ReactNode` |

实现层默认：`theme: CellLabel`，`classNamePrefix: 'exd-cell-picker'`，`contentProps.className: '!text-right'`（见 `index.tsx`）。

## 样式定制

样式变量见 `CellPickerStyleVars`（`@cell-picker-*`）。

## 相关组件

`UnstyledIOPicker`、`Picker`、`CellLabel`

<!--
Source:
- packages/mobile/src/exports/CellPicker/type.tsx
- packages/mobile/src/exports/CellPicker/index.tsx
- packages/mobile/src/exports/CellPicker/style.less
-->
