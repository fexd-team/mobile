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

## LineDatePicker / BlockDatePicker

提供了 `LineDatePicker` 和 `BlockDatePicker` 两种预设样式的日期选择器，适用于表单场景。

<code src="./demos/line-block.tsx" />

---

## API

### DatePickerView 的 API

`<DatePickerView />` 作为基础组件，嵌套在 `<DatePicker />`、`<LineDatePicker />` 中。

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

### LineDatePicker / BlockDatePicker 的 API

继承 `DatePickerView` 的所有属性，并新增以下属性：

| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| placeholder | 输入框无内容时显示的提示语句 | `String` | - |
| label | 输入框关联的 label 文字 | `String` | - |
| prefix | 前缀，固定在输入框的左边 | `ReactNode` | - |
| suffix | 后缀，固定在输入框的右边 | `ReactNode` | - |
| helper | 焦点在输入框时，在输入框下方会出现的提示语句 | `ReactNode` | - |
| error | 错误提示语句，可配合表单验证使用 | `ReactNode` | - |
| disabled | 是否禁用 | `Boolean` | - |
| labelType | label 当前的状态 | `'warn' \| 'error' \| 'info' \| 'success'` | - |
| hideErrorWhenFocusing | 当聚焦状态时不显示错误提示 | `Boolean` | `true` |

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
