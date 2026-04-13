---
name: TimePickerView
description: 时间选择视图
---

# TimePickerView 时间选择视图

内嵌的时/分/秒滚轮选择视图（三个 `PickerView` 组合），不自带弹层；可与 `showPopup` 或表单组合使用。组件目录下无 `index.zh.md`，说明与示例依据 `type.tsx`、`index.tsx` 与 `TimePicker` 包内 demo。

```tsx
import { TimePickerView } from '@fexd/mobile'
```

## 基础用法

受控与 `format` 回调（示例来源：`packages/mobile/src/exports/TimePicker/demos/TimePickerView.tsx`）：

```tsx
import React, { useState } from 'react'
import { TimePickerView } from '@fexd/mobile'

export default function Example() {
  const [value, setValue] = useState<Date | string | undefined>()
  const [formatted, setFormatted] = useState<string | undefined>()

  return (
    <TimePickerView
      value={value}
      format="HH:mm:ss"
      onChange={(v, formatValue) => {
        setValue(v)
        setFormatted(formatValue)
      }}
    />
  )
}
```

自定义列文案与可见行数：

```tsx
<TimePickerView hourLabel="HH时" minuteLabel="mm分" secondLabel="ss秒" rows={5} onChange={setValue} />
```

## Props

`TimePickerViewProps` 定义于 `packages/mobile/src/exports/TimePickerView/type.tsx`。

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `ref` | `React.RefObject<HTMLDivElement>` | 根节点引用 |
| `value` | `TimePickerViewValue` | 受控值；未传时内部按「当前日期 + 0 时 0 分 0 秒」初始化展示 |
| `onChange` | `(value: TimePickerViewValue, formattedValue?: string) => void` | 值变化回调；传入 `format` 时第二参为格式化字符串 |
| `format` | `string` | 若设置，`onChange` 第二参为 `dayjs` 格式化结果（见 demo） |
| `className` | `string` | 根节点类名 |
| `min` | `Date \| string` | 可选时间范围下限（仅取时分秒部分） |
| `max` | `Date \| string` | 可选时间范围上限（仅取时分秒部分） |
| `hourLabel` | `string` | 小时列 `dayjs` 展示格式，默认 `'HH'` |
| `minuteLabel` | `string` | 分钟列格式，默认 `'mm'` |
| `secondLabel` | `string` | 秒列格式，默认 `'ss'` |
| `rows` | `number` | 每列滚轮可见行数，默认 `3` |
| （其余） | — | 透传至根 `div`（`createFC`） |

其中 `TimePickerViewValue` 为 `Date | string`。

## 相关组件

- `TimePicker`：带触发器与弹层的封装
- `PickerView`：单列滚轮基础组件

<!--
Source:
- packages/mobile/src/exports/TimePickerView/type.tsx
- packages/mobile/src/exports/TimePickerView/index.tsx
- packages/mobile/src/exports/TimePickerView/style.less
-->
