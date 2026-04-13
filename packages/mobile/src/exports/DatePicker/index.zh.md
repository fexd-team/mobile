---
group:
  title: 输入
  path: /data

mobileDemoFixed: false
---

# DatePicker 日期选择器

- DatePicker <ImportCost name="DatePicker" />
- LineDatePicker <ImportCost name="LineDatePicker" />
- BlockDatePicker <ImportCost name="BlockDatePicker" />
- CellDatePicker <ImportCost name="CellDatePicker" />
- DatePickerView <ImportCost name="DatePickerView" />

日期选择器，选择年月日

<!-- prettier-ignore -->
```jsx | pure
import { DatePicker, LineDatePicker, BlockDatePicker, CellDatePicker, DatePickerView } from '@fexd/mobile'

<DatePicker />
<LineDatePicker />
<BlockDatePicker />
<CellDatePicker />
<DatePickerView />
```

---

## 基础用法

<code src="./demos/basic.tsx" />

---

## 格式化选中的值

通过 `format` 属性转换值，经过处理的值（`formatValue`）将作为 `onChange(value, formatValue)` 的第二个参数返回。

<code src="./demos/format.tsx" />

---

## 限制日期范围

通过 `min` 和 `max` 属性限制可选日期的范围。

<code src="./demos/min-max.tsx" />

---

## 自定义 Label

通过 `yearLabel`、`monthLabel`、`dayLabel` 来修改对应的展示 label。

<code src="./demos/label.tsx" />

---

## 展示行数

通过 `rows` 来修改展示的行数，默认为 3。

<code src="./demos/rows.tsx" />

---

## 更换顺序

默认顺序是年-月-日，可通过样式更改为日-月-年。

<code src="./demos/order.tsx" />

---

## LineDatePicker / BlockDatePicker / CellDatePicker

提供了 `LineDatePicker`、`BlockDatePicker` 和 `CellDatePicker` 三种预设样式的日期选择器，适用于表单场景。

<code src="./demos/line-block.tsx" />

---

## API

### DatePickerView

<API identifier="DatePickerView" hideTitle src="../DatePickerView/type.tsx" exports='["default"]'></API>

---

### DatePicker

可包裹任意内容，当被包裹的内容点击时，将会唤起弹出层进行日期选择

<API identifier="DatePicker" hideTitle src="./type.tsx" exports='["default"]'></API>

---

### LineDatePicker / BlockDatePicker / CellDatePicker 的 API

<API identifier="LineDatePicker" hideTitle src="../LineDatePicker/type.tsx" exports='["default"]'></API>

---

## 样式变量

组件提供了以下 Less 变量，可用于自定义样式。三种日期选择器类型（Block/Line/Cell）的变量前缀分别为 `@block-date-picker-`、`@line-date-picker-`、`@cell-date-picker-`。

### DatePickerView 样式变量

继承 PickerView 的所有样式变量，详见 [Picker 样式变量](/#/exports/data/picker#样式变量)。

<API identifier="DatePickerView-StyleVars" hideTitle src="../PickerView/type.tsx" exports='["DOC_PickerViewStyleVars"]'></API>

### CellDatePicker 样式变量

<API identifier="CellDatePicker-StyleVars" hideTitle src="../CellDatePicker/type.tsx" exports='["DOC_CellDatePickerStyleVars"]'></API>

### BlockDatePicker 样式变量

<API identifier="BlockDatePicker-StyleVars" hideTitle src="../BlockDatePicker/type.tsx" exports='["DOC_BlockDatePickerStyleVars"]'></API>

### LineDatePicker 样式变量

<API identifier="LineDatePicker-StyleVars" hideTitle src="../LineDatePicker/type.tsx" exports='["DOC_LineDatePickerStyleVars"]'></API>

---
