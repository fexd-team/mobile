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
- TimePickerView <ImportCost name="TimePickerView" />

时间选择器，选择时分秒

<!-- prettier-ignore -->
```jsx | pure
import { TimePicker, LineTimePicker, BlockTimePicker, TimePickerView } from '@fexd/mobile'

<TimePicker />
<LineTimePicker />
<BlockTimePicker />
<TimePickerView />
```

> **设计说明**：TimePicker 组件采用分层设计，继承 Picker 的分层架构，通过组合 IOLabel 和 Label 实现样式与逻辑分离。详细了解请参考 [IO 组件的分层设计](/documents/exports/data/io-layered-design)。

---

## 演示 - LineTimePicker / BlockTimePicker

<code src="./demos/LineTimePickerDemo.tsx" />

---

## LineTimePicker

<API identifier="LineTimePicker" hideTitle src="../LineTimePicker/type.tsx" exports='["default"]'></API>

---

## BlockTimePicker

<API identifier="BlockTimePicker" hideTitle src="../BlockTimePicker/type.tsx" exports='["default"]'></API>

---

## 演示 - TimePicker

<code src="./demos/basic.tsx" />

---

## TimePicker

可包裹任意内容，当被包裹的内容点击时，将会唤起弹出层进行时间选择

<API identifier="TimePicker" hideTitle src="./type.tsx" exports='["default"]'></API>

---

## 演示 - TimePickerView

<code src="./demos/TimePickerView.tsx" />

---

## TimePickerView

<API identifier="TimePickerView" hideTitle src="../TimePickerView/type.tsx" exports='["default"]'></API>

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

## 样式变量

组件提供了以下 Less 变量，可用于自定义样式。三种时间选择器类型（Block/Line/Cell）的变量前缀分别为 `@block-time-picker-`、`@line-time-picker-`、`@cell-time-picker-`。

### TimePickerView 样式变量

继承 PickerView 的所有样式变量，详见 [Picker 样式变量](/#/exports/data/picker#样式变量)。

| 变量名                                  | 说明             | 默认值                     |
| :-------------------------------------- | :--------------- | :------------------------- |
| `@picker-view-item-height`              | 选择器每行高度   | `50px`                     |
| `@picker-view-bg-color`                 | 背景颜色         | `#fff`                     |
| `@picker-view-mask-bg-color`            | 遮罩层背景颜色   | `rgba(255, 255, 255, 0.5)` |
| `@picker-view-indicator-border-color`   | 指示器边框颜色   | `#ddd`                     |
| `@picker-view-indicator-border-width`   | 指示器边框宽度   | `1px`                      |
| `@picker-view-item-font-size`           | 选择器项字体大小 | `14px`                     |
| `@picker-view-item-padding`             | 选择器项内边距   | `14px`                     |
| `@picker-view-item-active-font-size`    | 激活状态字体大小 | `16px`                     |
| `@picker-view-item-active-font-weight`  | 激活状态字体粗细 | `500`                      |
| `@picker-view-item-transition-duration` | 动画过渡时长     | `0.1s`                     |

### CellTimePicker 样式变量

<API identifier="CellTimePicker-StyleVars" hideTitle src="../CellTimePicker/type.tsx" exports='["DOC_CellTimePickerStyleVars"]'></API>

### BlockTimePicker 样式变量

<API identifier="BlockTimePicker-StyleVars" hideTitle src="../BlockTimePicker/type.tsx" exports='["DOC_BlockTimePickerStyleVars"]'></API>

### LineTimePicker 样式变量

<API identifier="LineTimePicker-StyleVars" hideTitle src="../LineTimePicker/type.tsx" exports='["DOC_LineTimePickerStyleVars"]'></API>

---

**全局变量说明**

| 变量名              | 说明                     | 默认值 |
| :------------------ | :----------------------- | :----- |
| `@size-scale`       | 全局尺寸缩放比例         | `1`    |
| `@ant-color-gray-5` | Ant Design 灰色色板 5 级 | -      |
| `@ant-color-gray-6` | Ant Design 灰色色板 6 级 | -      |
| `@ant-color-gray-7` | Ant Design 灰色色板 7 级 | -      |
