---
name: TimePicker
description: 时间选择器
---

# TimePicker 时间选择器

包裹任意子节点，点击后弹出时间选择；与 `TimePickerView`、行/块样式变体（`LineTimePicker`、`BlockTimePicker`）同属时间选择体系。分层说明见 `packages/mobile/src/exports/TimePicker/index.zh.md` 与包内「IO 组件的分层设计」文档。

```tsx
import { TimePicker } from '@fexd/mobile'

export default () => (
  <TimePicker>{(value) => <button type="button">{value ? String(value) : '选择时间'}</button>}</TimePicker>
)
```

## 基础用法

```tsx
import { useState } from 'react'
import { TimePicker } from '@fexd/mobile'

export default function Example() {
  const [date, setDate] = useState<Date | string | null>(null)
  return <TimePicker value={date ?? undefined} onChange={setDate} />
}
```

```tsx
import { TimePicker } from '@fexd/mobile'

export default () => <TimePicker format="HH:mm:ss" hourLabel="时" minuteLabel="分" secondLabel="秒" rows={5} />
```

示例见 `packages/mobile/src/exports/TimePicker/demos/basic.tsx`。`LineTimePicker` / `BlockTimePicker` / `TimePickerView` 的独立类型见各自 `exports/*/type.tsx`。

## Props

`TimePickerProps`（`packages/mobile/src/exports/TimePicker/type.tsx`）：

- `Omit<BasicPickerProps, 'value' | 'defaultValue' | 'onChange'>`（`usePickerProps/type.tsx`）
- `TimePickerViewProps`（`TimePickerView/type.tsx`）
- `children?`

### 弹层与选择器行为（`BasicPickerProps` 在省略三键后仍保留）

| 属性 | 说明 | 类型 |
| :-- | :-- | :-- |
| popupProps | 弹出层 props | `Omit<PopupProps, 'visible'>` |
| onConfirm | 确认 | `(value: string) => (boolean \| void) \| Promise<boolean \| void>` |
| onCancel | 取消 | `() => (boolean \| void) \| Promise<boolean \| void>` |
| headerRight | 头部右侧 | `React.ReactNode` |
| headerLeft | 头部左侧 | `React.ReactNode` |
| className | 类名 | `string` |
| disabled | 是否禁用 | `boolean` |
| ref | 引用 | `React.Ref<BasicPickerRef>`（`BasicPickerRef` = `HTMLDivElement`） |
| onEnter / onExit / onExited | 弹层生命周期 | `PopupProps` 对应字段 |
| filterIOValue | IO 过滤（`SelectionFieldProps` / `IOProps`） | `(value: any) => boolean` |

### 时间与展示（`TimePickerViewProps`，`TimePickerView/type.tsx`）

| 属性 | 说明 | 类型 |
| :-- | :-- | :-- |
| value | 当前值 | `Date \| string` |
| onChange | 值变化 | `(value: TimePickerViewValue, index?: number) => void`（类型如此声明；`TimePickerView` 实现中若传入 `format`，第二参实为 `dayjs(value).format(format)`，未传 `format` 时仅调用 `value`） |
| format | 展示/解析格式字符串 | `string` |
| className | 类名 | `string` |
| hourLabel | 时列标题 | `string` |
| minuteLabel | 分列标题 | `string` |
| secondLabel | 秒列标题 | `string` |
| rows | 可见行数 | `number` |

`TimePickerViewValue` = `Date \| string`。

### 子节点

| 属性     | 说明                 | 类型                                                                            |
| :------- | :------------------- | :------------------------------------------------------------------------------ |
| children | 触发区域或自定义展示 | `React.ReactNode \| ((selectedValue?: TimePickerViewValue) => React.ReactNode)` |

## 样式变量

`index.zh.md` 指向 `TimePickerView`、`CellTimePicker`、`BlockTimePicker`、`LineTimePicker` 等样式变量；以各组件 `type.tsx` 中 `DOC_*StyleVars` 为准。

<!--
Source:
- packages/mobile/src/exports/TimePicker/type.tsx
- packages/mobile/src/exports/TimePicker/index.zh.md
- packages/mobile/src/exports/TimePicker/index.tsx
- packages/mobile/src/exports/TimePicker/demos/
- packages/mobile/src/exports/TimePicker/style.less
-->
