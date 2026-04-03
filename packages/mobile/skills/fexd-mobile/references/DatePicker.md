---
name: DatePicker
description: 点击触发弹层、在滚轮中选择年/月/日的日期选择器；底层视图为 DatePickerView。
---

# DatePicker 日期选择器

点击触发弹层、在滚轮中选择年/月/日的日期选择器；底层视图为 `DatePickerView`。

```tsx
import { DatePicker } from '@fexd/mobile'
```

## 基础用法

受控用法与 `children` 渲染（示例来源：`packages/mobile/src/exports/DatePicker/demos/basic.tsx`）：

```tsx
import React, { useState } from 'react'
import dayjs from 'dayjs'
import { DatePicker, Button } from '@fexd/mobile'

export default function Example() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <DatePicker value={date} onChange={setDate}>
      {(value) => <Button>点击选择日期: {value ? dayjs(value).format('YYYY年MM月DD日') : '请选择'}</Button>}
    </DatePicker>
  )
}
```

命令式弹层内嵌 `DatePickerView` 的用法见同目录 `demos/basic.tsx` 中 `showPopup` 示例。

## Props

`DatePickerProps` 定义于 `packages/mobile/src/exports/DatePicker/type.tsx`，由以下类型交叉合并：

- `Omit<BasicPickerProps, 'value' | 'defaultValue' | 'onChange' | 'children'>`
- `Omit<DatePickerViewProps, 'children'>`
- `filterInvalidDate` 与下列 `children` / `ref`

### 日期与视图相关（来自 `DatePickerViewProps`，不含 `children`）

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `defaultValue` | `DatePickerViewValue` | 非受控默认值 |
| `value` | `DatePickerViewValue` | 受控值 |
| `onChange` | `(value: DatePickerViewValue, formattedValue?: string) => void` | 确认或滚动导致值变化时的回调（与视图一致） |
| `format` | `string` | 格式化字符串 |
| `min` | `number \| Date` | 最小日期 |
| `max` | `number \| Date` | 最大日期 |
| `className` | `string` | 根节点类名 |
| `yearLabel` | `string` | 年列格式 |
| `monthLabel` | `string` | 月列格式 |
| `dayLabel` | `string` | 日列格式 |
| `rows` | `number` | 滚轮行数 |
| `pickerSort` | `('year' \| 'month' \| 'day')[]` | 列顺序 |
| （其余） | — | 继承 `JSXDivProps` 且排除 `onChange`、`defaultValue`（见 `DatePickerView/type.tsx`） |

### 选择器与弹层相关（来自 `BasicPickerProps`，已排除 IO 的 `value` / `defaultValue` / `onChange` / `children`）

`BasicPickerProps` 定义于 `packages/mobile/src/exports/usePickerProps/type.tsx`，在日期场景下仍包含：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `popupProps` | `Omit<PopupProps, 'visible'>` | 弹出层配置（`PopupProps` 见 `Popup/type.tsx`） |
| `onConfirm` | `(value: string) => (boolean \| void) \| Promise<boolean \| void>` | 确认 |
| `onCancel` | `() => (boolean \| void) \| Promise<boolean \| void>` | 取消 |
| `headerRight` | `React.ReactNode` | 头部右侧 |
| `headerLeft` | `React.ReactNode` | 头部左侧 |
| `disabled` | `boolean` | 是否禁用 |
| `filterIOValue` | `(value: any) => boolean` | 来自 `SelectionFieldProps` / `IOProps`（`useSelectionFieldProps/type.tsx`） |
| `onEnter` | `TransitionProps['onEnter']` | 自 `PopupProps` 透传 |
| `onExit` | `TransitionProps['onExit']` | 自 `PopupProps` 透传 |
| `onExited` | `TransitionProps['onExited']` | 自 `PopupProps` 透传 |

### 仅 `DatePicker/type.tsx` 声明

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `filterInvalidDate` | `boolean` | 是否过滤无效日期 |
| `children` | `React.ReactNode \| ((selectedValue?: DatePickerViewValue) => React.ReactNode)` | 触发区域或自定义展示 |
| `ref` | `React.Ref<DatePickerRef>` | `DatePickerRef` 同 `BasicPickerRef`（`HTMLDivElement`） |

## 样式定制

`DatePicker` 系列（含 Line/Block/Cell 变体）的 Less 变量说明见源码 `packages/mobile/src/exports/DatePicker/index.zh.md`；`DatePickerView` 侧继承 `PickerView` 样式变量（见 `PickerView/type.tsx` 中 `DOC_PickerViewStyleVars`）。

## 相关组件

- `DatePickerView`
- `LineDatePicker`、`BlockDatePicker`（导出别名，文档见各目录 `index.zh.md`）

<!--
Source:
- packages/mobile/src/exports/DatePicker/type.tsx
- packages/mobile/src/exports/DatePicker/index.zh.md
- packages/mobile/src/exports/DatePicker/index.tsx
- packages/mobile/src/exports/DatePicker/demos/
- packages/mobile/src/exports/DatePicker/style.less
-->
