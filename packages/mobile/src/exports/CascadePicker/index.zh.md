---
group:
  title: 输入
  path: /data

mobileDemoFixed: false
---

# CascadePicker 级联选择器

- CascadePicker <ImportCost name="CascadePicker" />
- LineCascadePicker <ImportCost name="LineCascadePicker" />
- BlockCascadePicker <ImportCost name="BlockCascadePicker" />
- CellCascadePicker <ImportCost name="CellCascadePicker" />
- CascadePickerView <ImportCost name="CascadePickerView" />

级联选择器，支持多级联动数据选择（如省市区）

<!-- prettier-ignore -->
```jsx | pure
import { CascadePicker, LineCascadePicker, BlockCascadePicker, CellCascadePicker, CascadePickerView } from '@fexd/mobile'

<CascadePicker />
<LineCascadePicker />
<BlockCascadePicker />
<CellCascadePicker />
<CascadePickerView />
```

> **设计说明**：CascadePicker 组件采用与 Picker / DatePicker 一致的分层设计，通过组合 IOLabel 和 Label 实现样式与逻辑分离。详细了解请参考 [IO 组件的分层设计](/documents/exports/data/io-layered-design)。

---

## 基础用法

<code src="./demos/basic.tsx" />

---

## LineCascadePicker / BlockCascadePicker / CellCascadePicker

提供了 `LineCascadePicker`、`BlockCascadePicker` 和 `CellCascadePicker` 三种预设样式的级联选择器，适用于表单场景。

<code src="./demos/LineCascadePickerDemo.tsx" />

<code src="./demos/BlockCascadePickerDemo.tsx" />

<code src="./demos/CellCascadePickerDemo.tsx" />

---

## CascadePickerView

<code src="./demos/cascadePickerView.tsx" />

---

## API

### CascadePickerView

<API identifier="CascadePickerView" hideTitle src="../CascadePickerView/type.tsx" exports='["default"]'></API>

---

### CascadePicker

可包裹任意内容，当被包裹的内容点击时，将会唤起弹出层进行级联选择

<API identifier="CascadePicker" hideTitle src="./type.tsx" exports='["default"]'></API>

---

### LineCascadePicker / BlockCascadePicker / CellCascadePicker 的 API

<API identifier="LineCascadePicker" hideTitle src="../LineCascadePicker/type.tsx" exports='["default"]'></API>

---

### CascadeOption

<API identifier="CascadeOption" hideTitle src="../CascadePickerView/type.tsx" exports='["DOC_CascadeOption"]'></API>

---

## 样式变量

组件提供了以下 Less 变量，可用于自定义样式。三种级联选择器类型（Block/Line/Cell）的变量前缀分别为 `@block-cascade-picker-`、`@line-cascade-picker-`、`@cell-cascade-picker-`。

### CascadePickerView 样式变量

继承 PickerView 的所有样式变量，详见 [Picker 样式变量](/#/exports/data/picker#样式变量)。

<API identifier="CascadePickerView-StyleVars" hideTitle src="../PickerView/type.tsx" exports='["DOC_PickerViewStyleVars"]'></API>

### CellCascadePicker 样式变量

<API identifier="CellCascadePicker-StyleVars" hideTitle src="../CellCascadePicker/type.tsx" exports='["DOC_CellCascadePickerStyleVars"]'></API>

### BlockCascadePicker 样式变量

<API identifier="BlockCascadePicker-StyleVars" hideTitle src="../BlockCascadePicker/type.tsx" exports='["DOC_BlockCascadePickerStyleVars"]'></API>

### LineCascadePicker 样式变量

<API identifier="LineCascadePicker-StyleVars" hideTitle src="../LineCascadePicker/type.tsx" exports='["DOC_LineCascadePickerStyleVars"]'></API>

---
