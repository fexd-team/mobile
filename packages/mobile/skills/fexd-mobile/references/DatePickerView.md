---
name: DatePickerView
description: 内嵌的滚轮式年/月/日选择视图，不自带弹层；常与 showPopup 或表单组合使用。
---

# DatePickerView 日期选择视图

内嵌的滚轮式年/月/日选择视图，不自带弹层；常与 `showPopup` 或表单组合使用。

```tsx
import { DatePickerView } from '@fexd/mobile'
```

## 基础用法

受控选择与格式化（示例来源：`packages/mobile/src/exports/DatePicker/demos/format.tsx`）：

```tsx
import React, { useState } from 'react'
import { DatePickerView } from '@fexd/mobile'

export default function Example() {
  const [date, setDate] = useState<Date | undefined>()
  const [formatted, setFormatted] = useState('')

  return (
    <DatePickerView
      value={date}
      format="YYYY年MM月DD日"
      onChange={(value, formatValue) => {
        setDate(value as Date)
        setFormatted(formatValue ?? '')
      }}
    />
  )
}
```

在弹层中与 `showPopup` 组合（示例来源：`packages/mobile/src/exports/DatePicker/demos/basic.tsx`）：

```tsx
import { DatePickerView, showPopup } from '@fexd/mobile'

showPopup({
  title: ' ',
  content: (
    <DatePickerView
      onChange={(selectedValue) => {
        /* 暂存选中值 */
      }}
    />
  ),
})
```

## Props

`DatePickerViewProps` 定义于 `packages/mobile/src/exports/DatePickerView/type.tsx`。

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `defaultValue` | `DatePickerViewValue` | 非受控默认值 |
| `value` | `DatePickerViewValue` | 受控值 |
| `onChange` | `(value: DatePickerViewValue, formattedValue?: string) => void` | 值变化回调 |
| `format` | `string` | 日期格式（如 dayjs format） |
| `min` | `number \| Date` | 可选最小日期 |
| `max` | `number \| Date` | 可选最大日期 |
| `className` | `string` | 根节点类名 |
| `yearLabel` | `string` | 年列展示格式 |
| `monthLabel` | `string` | 月列展示格式 |
| `dayLabel` | `string` | 日列展示格式 |
| `rows` | `number` | 滚轮可见行数 |
| `pickerSort` | `('year' \| 'month' \| 'day')[]` | 列顺序；支持 `['day','month','year']` 等 |
| （其余） | — | 继承 `JSXDivProps`，**不含** `onChange`、`defaultValue`（与 `type.tsx` 中 `Omit` 一致） |

其中 `DatePickerViewValue` 为 `Date | number | string`。

## 注意事项

组件默认项见 `packages/mobile/src/exports/DatePickerView/index.tsx` 的 `defaultProps`（如 `min`/`max`、`yearLabel`/`monthLabel`/`dayLabel`、`rows`、`pickerSort`）。

## 相关组件

- `DatePicker`：带弹层触发与 `BasicPicker` 能力的日期选择器
- `LineDatePicker` / `BlockDatePicker`：预设样式的表单场景封装（文档见源码 `index.zh.md`）

<!--
Source:
- packages/mobile/src/exports/DatePickerView/type.tsx
- packages/mobile/src/exports/DatePickerView/index.tsx
- packages/mobile/src/exports/DatePickerView/style.less
-->
