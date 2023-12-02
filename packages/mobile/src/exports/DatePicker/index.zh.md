---
group:
  title: 输入
  path: /data
---

# DatePicker 日期选择器

- DatePicker <ImportCost name="DatePicker" />
- LineDatePicker <ImportCost name="LineDatePicker" />
- BlockDatePicker <ImportCost name="BlockDatePicker" />
- DatePickerView <ImportCost name="DatePickerView" />

日期选择器，选择年月日

<!-- prettier-ignore -->
```jsx | pure
import { DatePicker, LineDatePicker, BlockDatePicker, DatePickerView } from '@fexd/mobile'

<DatePicker />
<LineDatePicker />
<BlockDatePicker />
<DatePickerView />
```

---

## 使用说明

### 受控模式

通过 `value`、`onChange` 管理受控状态。

<!-- prettier-ignore -->
```jsx | pure
import React, { useState } from 'react'
import { DatePicker } from '@fexd/mobile'

const [date, setDate] = useState(null)

<DatePicker value={date} onChange={setDate} />
```

### 格式化选中的值

通过 `format` 属性转换值，经过处理的值（`formatValue`）将作为 `onChange(value, formatValue)` 的第二个参数返回。

<!-- prettier-ignore -->
```jsx | pure
import React, { useState } from 'react'
import { DatePicker } from '@fexd/mobile'

const [date1, setDate1] = useState(null)
const [formatDate1, setFormatDate1] = useState(null)
const [date2, setDate2] = useState(null)
const [formatDate2, setFormatDate2] = useState(null)

<DatePicker 
  value={date2}
  format="YYYY年MM月DD日"
  onChange={(value, formatValue) => {
    setDate1(value)
    setFormatDate1(formatValue)
  }}
/>
<DatePicker 
  value={date2}
  format="YYYY/MM/DD"
  onChange={(value, formatValue) => {
    setDate2(value)
    setFormatDate2(formatValue)
  }}
/>
```

### 最小日期

通过 `min` 规定可选日期的最小范围。

<!-- prettier-ignore -->
```jsx | pure
import React, { useState } from 'react'
import { DatePicker } from '@fexd/mobile'

const [date, setDate] = useState(null)

<DatePicker value={date} min={new Date()} onChange={setDate} />
```

### 最大日期

通过 `max` 规定可选日期的最小范围。

<!-- prettier-ignore -->
```jsx | pure
import React, { useState } from 'react'
import { DatePicker } from '@fexd/mobile'

const [date, setDate] = useState(null)

<DatePicker value={date} max={new Date()} onChange={setDate} />
```

### 修改 Label

通过 `yearLabel` 、`monthLabel` 、`dayLabel` 来修改对应的的展示 label 。

<!-- prettier-ignore -->
```jsx | pure
import React, { useState } from 'react'
import { DatePicker } from '@fexd/mobile'

const [date, setDate] = useState(null)

<DatePicker
  value={date}
  onChange={setDate}
  yearLabel="YYYY年"
  monthLabel="MM月"
  dayLabel="DD日"
/>
```

### 展示行数

通过 `rows` 来修改展示的行数。

<!-- prettier-ignore -->
```jsx | pure
import { DatePicker } from '@fexd/mobile'

<DatePicker rows={5} />
```

### 通过样式更换顺序

默认顺序是年-月-日，可通过样式更改为日-月-年。

<!-- prettier-ignore -->
```jsx | pure
import React, { useState } from 'react'
import { DatePicker } from '@fexd/mobile'

const [date, setDate] = useState(null)

<DatePicker 
  value={date}
  onChange={setDate}
  style={{ flexDirection: 'row-reverse' }}
/>
```

---

## API

### DatePickerView 的 API

`<DatePickerView />` 作为基础组件，嵌套在 `<DatePicker />` 、`<LineDatePicker />` 中。

| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| value | 选中的值 | `Date` | - |
| onChange | 当选中的值发生变化时触发的回调函数 | `(value: Date, formatValue: String) => void` | - |
| format | 格式化日期 | `String` | - |
| min | 选项最小日期 | `Date` | `new Date('2000/03/01')` |
| max | 选项最大日期 | `Date` | `new Date('2050/07/31')` |
| yearLabel | 修改年的展示名称 | `String` | `'YYYY'` |
| monthLabel | 修改月的展示名称 | `String` | `'MM'` |
| dayLabel | 修改日的展示名称 | `String` | `'DD'` |
| rows | 展示的行数 | `Number` | `3` |

### DatePicker 的 API

多了 `children` 。

| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| value | 选中的值 | `Date` | - |
| onChange | 当选中的值发生变化时触发的回调函数 | `(value: Date, formatValue: String) => void` | - |
| format | 格式化日期 | `String` | - |
| min | 选项最小日期 | `Date` | `new Date('2000/03/01')` |
| max | 选项最大日期 | `Date` | `new Date('2050/07/31')` |
| yearLabel | 修改年的展示名称 | `String` | `'YYYY'` |
| monthLabel | 修改月的展示名称 | `String` | `'MM'` |
| dayLabel | 修改日的展示名称 | `String` | `'DD'` |
| rows | 展示的行数 | `Number` | `3` |
| children<span style="color: red;">\*</span> | 点击后能触发对话框展示的内容 | `ReactNode` | - |

### LineDatePicker 的 API

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

| 变量名                   | 说明         | 默认值                   |
| :----------------------- | :----------- | :----------------------- |
| @line-data-picker-prefix | 组件样式前缀 | `'exd-line-data-picker'` |

---

## 演示代码

<code src="./demos/demo1/index.tsx" />
