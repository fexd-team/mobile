---
group:
  title: 输入
  path: /data

mobileDemoFixed: false
---

# TimePicker 时间选择器

- TimePicker <ImportCost name="TimePicker" />
- LineTimePicker <ImportCost name="LineTimePicker" />
- BlockTimePicker <ImportCost name="BlockTimePicker" />
- CellTimePicker <ImportCost name="CellTimePicker" />
- TimePickerView <ImportCost name="TimePickerView" />

时间选择器，选择时分秒

<!-- prettier-ignore -->
```jsx | pure
import { TimePicker, LineTimePicker, BlockTimePicker, CellTimePicker, TimePickerView } from '@fexd/mobile'

<TimePicker />
<LineTimePicker />
<BlockTimePicker />
<CellTimePicker />
<TimePickerView />
```

> **设计说明**：TimePicker 组件采用分层设计，继承 Picker 的分层架构，通过组合 IOLabel 和 Label 实现样式与逻辑分离。详细了解请参考 [IO 组件的分层设计](/documents/exports/data/io-layered-design)。

---

## 基础用法

<code src="./demos/basic.tsx" />

---

## LineTimePicker / BlockTimePicker / CellTimePicker

提供了 `LineTimePicker`、`BlockTimePicker` 和 `CellTimePicker` 三种预设样式的时间选择器，适用于表单场景。

<code src="./demos/LineTimePickerDemo.tsx" />

---

## TimePickerView

<code src="./demos/TimePickerView.tsx" />

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

### TimePickerView

<API identifier="TimePickerView" hideTitle src="../TimePickerView/type.tsx" exports='["default"]'></API>

---

### TimePicker

可包裹任意内容，当被包裹的内容点击时，将会唤起弹出层进行时间选择

<API identifier="TimePicker" hideTitle src="./type.tsx" exports='["default"]'></API>

---

### LineTimePicker / BlockTimePicker / CellTimePicker 的 API

<API identifier="LineTimePicker" hideTitle src="../LineTimePicker/type.tsx" exports='["default"]'></API>

---

## 样式变量

组件提供了以下 Less 变量，可用于自定义样式。三种时间选择器类型（Block/Line/Cell）的变量前缀分别为 `@block-time-picker-`、`@line-time-picker-`、`@cell-time-picker-`。

### TimePickerView 样式变量

继承 PickerView 的所有样式变量，详见 [Picker 样式变量](/#/exports/data/picker#样式变量)。

<API identifier="TimePickerView-StyleVars" hideTitle src="../PickerView/type.tsx" exports='["DOC_PickerViewStyleVars"]'></API>

### CellTimePicker 样式变量

<API identifier="CellTimePicker-StyleVars" hideTitle src="../CellTimePicker/type.tsx" exports='["DOC_CellTimePickerStyleVars"]'></API>

### BlockTimePicker 样式变量

<API identifier="BlockTimePicker-StyleVars" hideTitle src="../BlockTimePicker/type.tsx" exports='["DOC_BlockTimePickerStyleVars"]'></API>

### LineTimePicker 样式变量

<API identifier="LineTimePicker-StyleVars" hideTitle src="../LineTimePicker/type.tsx" exports='["DOC_LineTimePickerStyleVars"]'></API>

---
