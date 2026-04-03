---
name: CellTimePicker
description: 在 Cell 形态下展示并触发时间选择弹层；基于 UnstyledIOTimePicker，默认 theme 为 CellLabel，属于 **IO 主题的 Cell 变体**。
---

# CellTimePicker 单元格时间选择

在 Cell 形态下展示并触发时间选择弹层；基于 `UnstyledIOTimePicker`，默认 `theme` 为 `CellLabel`，属于 **IO 主题的 Cell 变体**。

```tsx
import { CellTimePicker } from '@fexd/mobile'
```

## 基础用法

```tsx
<CellTimePicker label="Time" value={new Date()} onChange={(value) => console.log(value)} />
```

```tsx
<CellTimePicker label="Hours" format="HH:mm" hourLabel="H" minuteLabel="M" />
```

## Props

`CellTimePickerProps` 定义于 `packages/mobile/src/exports/CellTimePicker/type.tsx`，为 `Omit<UnstyledIOTimePickerProps, 'theme'>`。

### 标签区（来自 `UnstyledIOLabel`，`UnstyledIOTimePicker` 已省略 `children`、`defaultValue`、`onChange`）

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| label | 展示名称 | `React.ReactNode` |
| placeholder | 占位 | `React.ReactNode` |
| autoHeight | 自动高度 | `boolean` |
| prefix / suffix / helper | 前缀、后缀、辅助 | `React.ReactNode` |
| active | 激活 | `boolean` |
| type | 提示状态 | `'warn' \| 'error' \| 'info' \| 'success'` |
| disabled | 禁用 | `boolean` |
| className | 类名 | `string` |
| style | 样式 | `JSXDivProps['style']` |
| keepHelperPlaceholder | 保留辅助占位 | `boolean` |
| onClick | 点击 | `(e?: any) => any` |
| useLabelWrapper | 使用 label 包裹 | `boolean` |
| wrapperProps / labelProps / barProps / contentProps / placeholderProps / prefixProps / suffixProps / helperProps | 各区域属性 | 同 `UnstyledLabel` |
| error / focused / hideErrorWhenFocusing / helperPrefix | IO 标签能力 | 同 `UnstyledIOLabel` |
| ref | 引用 | `React.Ref<UnstyledIOTimePickerRef>`（即 `TimePickerRef`） |

另继承 `Omit<JSXDivProps, 'placeholder' \| 'disabled' \| 'prefix' \| 'ref' \| 'onClick'>`。

### 时间与弹层（`TimePickerProps`：`Omit<BasicPickerProps, 'value' \| 'defaultValue' \| 'onChange'>` + `TimePickerViewProps`）

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| value | 当前时间值 | `TimePickerViewValue` |
| onChange | 时间变化回调 | `(value: TimePickerViewValue, index?: number) => void` |
| format | 格式 | `string` |
| hourLabel / minuteLabel / secondLabel | 列标题 | `string` |
| rows | 滚轮行数 | `number` |
| className | 类名 | `string` |
| children | 触发内容或渲染函数 | `React.ReactNode \| ((selectedValue?: TimePickerViewValue) => React.ReactNode)` |
| popupProps | 弹出层 props | `Omit<PopupProps, 'visible'>` |
| onConfirm / onCancel | 确认 / 取消 | 同 `BasicPickerProps` |
| headerRight / headerLeft | 头部左右 | `React.ReactNode` |
| onEnter / onExit / onExited | 过渡生命周期 | 同 `PopupProps` |
| disabled | 禁用 | `boolean` |

`TimePickerViewValue` = `Date | string`（见 `TimePickerView/type.tsx`）。

### 组件专有

| 属性            | 说明         | 类型                           |
| --------------- | ------------ | ------------------------------ |
| classNamePrefix | 类名前缀     | `string`                       |
| labelType       | 标签状态类型 | `UnstyledIOLabelProps['type']` |
| arrowIcon       | 右侧箭头     | `React.ReactNode`              |

## 样式定制

样式变量见 `CellTimePickerStyleVars`（`@cell-time-picker-*`）。

## 相关组件

`UnstyledIOTimePicker`、`TimePicker`、`CellLabel`

<!--
Source:
- packages/mobile/src/exports/CellTimePicker/type.tsx
- packages/mobile/src/exports/CellTimePicker/index.tsx
- packages/mobile/src/exports/CellTimePicker/style.less
-->
