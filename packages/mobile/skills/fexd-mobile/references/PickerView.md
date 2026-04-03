---
name: PickerView
description: 竖向滚轮列表，支持受控/非受控与行数配置。通常被 Picker 或 showPicker 使用。
---

# PickerView 滚轮选择

竖向滚轮列表，支持受控/非受控与行数配置。通常被 `Picker` 或 `showPicker` 使用。

```tsx
import { PickerView } from '@fexd/mobile'
```

## 基础用法

示例来源：`packages/mobile/src/exports/Picker/demos/pickerView.tsx`（包内与 `Picker` 共用演示）。

```tsx
import React, { useState } from 'react'
import { PickerView } from '@fexd/mobile'

const options = Array.from({ length: 12 }, (_, index) => ({
  label: `${index + 1}月`,
  value: index + 1,
}))

export default () => {
  const [value, setValue] = useState(3)
  return (
    <>
      <PickerView options={options} value={value} onChange={(v) => setValue(v as number)} rows={3} />
      <PickerView options={options} rows={5} />
    </>
  )
}
```

## Props

`PickerViewProps` 定义于 `packages/mobile/src/exports/PickerView/type.tsx`。

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `options` | `PickerOption[]` | `[]` | 选项列表 |
| `rows` | `number` | `3` | 可见行数（须为奇数且 ≥3，否则实现会告警） |
| `defaultValue` | `PickerOptionValue` | - | 非受控默认值 |
| `value` | `PickerOptionValue` | - | 受控值 |
| `onChange` | `(value: PickerOptionValue, index?: number) => void` | - | 选中变化立即触发 |
| `scaleSelected` | `boolean` | `true` | 选中项是否放大 |
| `className` | `string` | - | 根节点类名 |

`PickerOption`：`{ value: string \| number; label: string; [key: string]: any }`。

## 样式定制

`PickerViewStyleVars` 见 `packages/mobile/src/exports/PickerView/type.tsx`（`DOC_PickerViewStyleVars`）。

<!--
Source:
- packages/mobile/src/exports/PickerView/type.tsx
- packages/mobile/src/exports/PickerView/index.tsx
- packages/mobile/src/exports/PickerView/style.less
-->
