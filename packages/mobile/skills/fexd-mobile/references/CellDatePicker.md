---
name: CellDatePicker
description: 在 Cell 形态下展示并触发日期选择弹层；基于 UnstyledIODatePicker，默认 theme 为 CellLabel，属于 **IO 主题的 Cell 变体**（与无样式 IO 组件共用逻辑，仅换肤）。
---

# CellDatePicker 单元格日期选择

在 Cell 形态下展示并触发日期选择弹层；基于 `UnstyledIODatePicker`，默认 `theme` 为 `CellLabel`，属于 **IO 主题的 Cell 变体**（与无样式 IO 组件共用逻辑，仅换肤）。

```tsx
import { CellDatePicker } from '@fexd/mobile'
```

## 基础用法

```tsx
<CellDatePicker label="Birth date" defaultValue={new Date()} onChange={(value) => console.log(value)} />
```

```tsx
<CellDatePicker label="Booking" min={Date.now()} format="YYYY-MM-DD" filterInvalidDate />
```

## Props

`CellDatePickerProps` 定义于 `packages/mobile/src/exports/CellDatePicker/type.tsx`，等价于 `Omit<UnstyledIODatePickerProps, 'theme'>`。以下按类型继承链整理（不含 `theme`）。

### 标签 / 区域（来自 `UnstyledIOLabel` + `UnstyledLabel`，已按 `UnstyledIODatePicker` 省略项剔除）

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| label | 展示名称 | `React.ReactNode` |
| placeholder | 占位提示 | `React.ReactNode` |
| autoHeight | 是否根据内容自动撑开高度 | `boolean` |
| prefix | 前缀 | `React.ReactNode` |
| suffix | 后缀 | `React.ReactNode` |
| helper | 辅助文案 | `React.ReactNode` |
| active | 是否激活状态 | `boolean` |
| type | 提示状态 | `'warn' \| 'error' \| 'info' \| 'success'` |
| disabled | 是否禁用 | `boolean` |
| className | 类名 | `string` |
| style | 样式 | `JSXDivProps['style']` |
| keepHelperPlaceholder | 是否保留辅助文案占位高度 | `boolean` |
| useLabelWrapper | 是否用 `<label>` 包裹 | `boolean` |
| wrapperProps | 容器元素属性 | `JSXDivProps` |
| labelProps | label 容器属性 | `JSXDivProps \| ((config: { prefixWidth: number }) => JSXDivProps)` |
| barProps | bar 容器属性 | `JSXLabelProps \| JSXDivProps` |
| contentProps | 内容容器属性 | `JSXDivProps` |
| placeholderProps | 占位容器属性 | `JSXDivProps` |
| prefixProps | 前缀容器属性 | `JSXDivProps` |
| suffixProps | 后缀容器属性 | `JSXDivProps` |
| helperProps | 辅助文案容器属性 | `JSXDivProps` |
| error | 区域错误信息 | `React.ReactNode` |
| focused | 是否聚焦 | `boolean` |
| hideErrorWhenFocusing | 聚焦时是否隐藏错误 | `boolean` |
| helperPrefix | 辅助信息前缀 | `React.ReactNode \| ((hasError: boolean) => React.ReactNode)` |
| ref | 实例引用 | `React.Ref<UnstyledIODatePickerRef>` |

另继承 `Omit<JSXDivProps, 'placeholder' \| 'disabled' \| 'prefix' \| 'ref' \| 'onClick'>` 中未被上方覆盖的 div 属性（源码见 `UnstyledLabel/type.tsx`）。

### 日期与弹层（来自 `DatePickerProps`，已省略 `prefix`、`placeholder`）

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| defaultValue | 默认值 | `DatePickerViewValue` |
| value | 受控值 | `DatePickerViewValue` |
| onChange | 值变化回调 | `(value: DatePickerViewValue, formattedValue?: string) => void` |
| format | 格式 | `string` |
| min | 最小日期 | `number \| Date` |
| max | 最大日期 | `number \| Date` |
| yearLabel / monthLabel / dayLabel | 列标题 | `string` |
| rows | 滚轮行数 | `number` |
| pickerSort | 列顺序 | `('year' \| 'month' \| 'day')[]` |
| filterInvalidDate | 是否过滤无效日期 | `boolean` |
| children | 触发内容或渲染函数 | `React.ReactNode \| ((selectedValue?: DatePickerViewValue) => React.ReactNode)` |
| popupProps | 弹出层 props | `Omit<PopupProps, 'visible'>` |
| onConfirm | 确认 | `(value: string) => (boolean \| void) \| Promise<boolean \| void>` |
| onCancel | 取消 | `() => (boolean \| void) \| Promise<boolean \| void>` |
| headerRight / headerLeft | 头部左右侧内容 | `React.ReactNode` |
| onEnter / onExit / onExited | 过渡生命周期 | 同 `PopupProps` 对应字段 |

### 组件专有

| 属性            | 说明                                           | 类型                           |
| --------------- | ---------------------------------------------- | ------------------------------ |
| classNamePrefix | 类名前缀                                       | `string`                       |
| labelType       | 标签提示状态（同 `UnstyledIOLabel` 的 `type`） | `UnstyledIOLabelProps['type']` |
| arrowIcon       | 右侧箭头图标                                   | `React.ReactNode`              |

类型别名：`DatePickerViewValue` = `Date | number | string`；`UnstyledIODatePickerRef` = `DatePickerRef`。

## 样式定制

样式变量见 `CellDatePickerStyleVars`（`type.tsx` 中 `@cell-date-picker-*`）。

## 相关组件

`UnstyledIODatePicker`、`DatePicker`、`CellLabel`

<!--
Source:
- packages/mobile/src/exports/CellDatePicker/type.tsx
- packages/mobile/src/exports/CellDatePicker/index.tsx
- packages/mobile/src/exports/CellDatePicker/style.less
-->
