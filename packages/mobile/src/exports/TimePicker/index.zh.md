---
group:
  title: 输入
  path: /data
---

# TimePicker 时间选择器

- TimePicker <ImportCost name="TimePicker" />
- MaterialTimePicker <ImportCost name="MaterialTimePicker" />
- TimePickerView <ImportCost name="TimePickerView" />

时间选择器，选择时分秒。有三种风格，可通过底部的导航栏切换。

<!-- prettier-ignore -->
```jsx | pure
import { TimePicker, MaterialTimePicker, TimePickerView } from '@fexd/mobile'

<TimePicker />
<MaterialTimePicker />
<TimePickerView />
```

---

## 使用说明

### 受控模式

通过 `value`、`onChange` 管理受控状态。

<!-- prettier-ignore -->
```jsx | pure
import React, { useState } from 'react'
import { TimePicker } from '@fexd/mobile'

const [date, setDate] = useState(null)

<TimePicker value={date} onChange={setDate} />
```

### 格式化选中的值

通过 `format` 属性转换值，经过处理的值（`formatValue`）将作为 `onChange(value, formatValue)` 的第二个参数返回。

<!-- prettier-ignore -->
```jsx | pure
import React, { useState } from 'react'
import { TimePicker } from '@fexd/mobile'

const [date1, setDate1] = useState(null)
const [formatDate1, setFormatDate1] = useState(null)
const [date2, setDate2] = useState(null)
const [formatDate2, setFormatDate2] = useState(null)

<TimePicker 
  format="HH时mm分ss秒" 
  value={date1} 
  onChange={(value, formatValue) => {
    setDate1(value)
    setFormatDate1(formatValue)
  }}
/>
<TimePicker 
  format="HH:mm:ss" 
  value={date2} 
  onChange={(value, formatValue) => {
    setDate2(value)
    setFormatDate2(formatValue)
  }}
/>
```

### 修改 Label

通过 `hourLabel` 、`minuteLabel` 、`secondLabel` 来修改对应的的展示 label 。

<!-- prettier-ignore -->
```jsx | pure
import React, { useState } from 'react'
import { TimePicker } from '@fexd/mobile'

const [date, setDate] = useState(null)

<TimePicker
  value={date}
  onChange={setDate}
  hourLabel="HH时"
  minuteLabel="mm分"
  secondLabel="ss秒"
/>
```

### 展示行数

通过 `rows` 来修改展示的行数。

<!-- prettier-ignore -->
```jsx | pure
import { TimePicker } from '@fexd/mobile'

<TimePicker rows={5} />
```

---

## API

### TimePickerView 的 API

`<TimePickerView />` 作为基础组件，嵌套在 `<TimePicker />` 、`<MaterialTimePicker />` 中。

| 属性        | 说明                               | 类型                                         | 默认值 |
| :---------- | :--------------------------------- | :------------------------------------------- | :----- |
| value       | 选中的值                           | `Date`                                       | -      |
| onChange    | 当选中的值发生变化时触发的回调函数 | `(value: Date, formatValue: String) => void` | -      |
| format      | 格式化时间                         | `String`                                     | -      |
| hourLabel   | 修改时的展示名称                   | `String`                                     | `HH`   |
| minuteLabel | 修改分的展示名称                   | `String`                                     | `mm`   |
| secondLabel | 修改秒的展示名称                   | `String`                                     | `ss`   |
| rows        | 展示的行数                         | `Number`                                     | `3`    |

### TimePicker 的 API

多了 `children` 。

| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| value | 选中的值 | `Date` | - |
| onChange | 当选中的值发生变化时触发的回调函数 | `(value: Date, formatValue: String) => void` | - |
| format | 格式化时间 | `String` | - |
| hourLabel | 修改时的展示名称 | `String` | `HH` |
| minuteLabel | 修改分的展示名称 | `String` | `mm` |
| secondLabel | 修改秒的展示名称 | `String` | `ss` |
| rows | 展示的行数 | `Number` | `3` |
| children<span style="color: red;">\*</span> | 点击后能触发对话框展示的内容 | `ReactNode` | - |

### MaterialTimePicker 的 API

#### 新增的 API

| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| placeholder | 输入框无内容时显示的提示语句 | `String` | - |
| label | 输入框关联的 label 文字（如果没设置 label，但设置了 placeholder，会把 placeholder 的内容作为 label 的内容） | `String` | - |
| prefix | 前缀，固定在输入框的左边 | `ReactNode` | - |
| suffix | 后缀，固定在输入框的左边 | `ReactNode` | - |
| helper | 焦点在输入框时，在输入框下方会出现的提示语句 | `ReactNode` | - |
| error | 错误提示语句，可配合表单验证使用 | `ReactNode` | - |
| disabled | 是否禁用 | `Boolean` | - |
| labelType | label 当前的状态 | `'warn' \| 'error' \| 'info'` | - |
| hideErrorWhenFocusing | 当聚焦状态时不显示错误提示 | `Boolean` | `true` |

---

## 样式变量

| 变量名                       | 说明         | 默认值                      |
| :--------------------------- | :----------- | :-------------------------- |
| @material-time-picker-prefix | 组件样式前缀 | `'exd-material-time-picker'` |

---

## 演示代码

<code src="./demos/demo1/index.tsx" />
