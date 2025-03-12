---
group:
  title: 输入
  path: /data

mobileDemoFixed: false
---

# Picker 选择器

- Picker <ImportCost name="Picker" />
- LinePicker <ImportCost name="LinePicker" />
- BlockPicker <ImportCost name="BlockPicker" />
- CellPicker <ImportCost name="CellPicker" />
- PickerView <ImportCost name="PickerView" />

<!-- prettier-ignore -->
```jsx | pure
import { Picker, LinePicker, BlockPicker, CellPicker, PickerView } from '@fexd/mobile'

<Picker />
<LinePicker />
<BlockPicker />
<CellPicker />
<PickerView />
```

---

## 演示 - LinePicker

<code src="./demos/LinePickerDemo.tsx" />

---

## LinePicker

<API identifier="LinePicker" hideTitle src="../LinePicker/type.tsx" exports='["default"]'></API>

---

## 演示 - BlockPicker

<code src="./demos/BlockPickerDemo.tsx" />

---

## BlockPicker

<API identifier="BlockPicker" hideTitle src="../BlockPicker/type.tsx" exports='["default"]'></API>

---

## 演示 - CellPicker

<code src="./demos/CellPickerDemo.tsx" />

---

## CellPicker

<API identifier="CellPicker" hideTitle src="../CellPicker/type.tsx" exports='["default"]'></API>

---

## 演示 - Picker / showPicker

<code src="./demos/basic.tsx" />

---

## Picker

可包裹任意内容，当被包裹的内容点击时，将会唤起弹出层进行选择

<API identifier="Picker" hideTitle src="./type.tsx" exports='["default"]'></API>

---

## showPicker

`showPicker` 是 `<PickerView />` 和 `showPopup` 的封装

其他部分与弹窗函数相关的部分可参考 [命令式调用（函数式）](/#/exports/feedback/api-method-call)

<API identifier="showPicker" hideTitle src="../showPicker/type.tsx" exports='["default"]'></API>

---

## 演示 - PickerView

<code src="./demos/pickerView.tsx" />

---

## PickerView

<API identifier="PickerView" hideTitle src="../PickerView/type.tsx" exports='["default"]'></API>

---

## PickerOption

<API identifier="PickerOption" hideTitle src="../PickerView/type.tsx" exports='["DOC_PickerOption"]'></API>

---

<!-- ## 演示

<code src="./demos/demo1/index.tsx" /> -->
