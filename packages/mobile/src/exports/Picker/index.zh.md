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

> **设计说明**：Picker 组件采用分层设计，通过组合 IOLabel 和 Label 实现样式与逻辑分离。详细了解请参考 [IO 组件的分层设计](/documents/exports/data/io-layered-design)。

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

## 样式变量

组件提供了以下 Less 变量，可用于自定义样式。三种选择器类型（Block/Line/Cell）的变量前缀分别为 `@block-picker-`、`@line-picker-`、`@cell-picker-`。

### PickerView 样式变量

| 变量名                                  | 说明             | 默认值                     |
| :-------------------------------------- | :--------------- | :------------------------- |
| `@picker-view-item-height`              | 选择器项高度     | `50px`                     |
| `@picker-view-bg-color`                 | 背景颜色         | `#fff`                     |
| `@picker-view-mask-bg-color`            | 遮罩层背景颜色   | `rgba(255, 255, 255, 0.5)` |
| `@picker-view-indicator-border-color`   | 指示器边框颜色   | `#ddd`                     |
| `@picker-view-indicator-border-width`   | 指示器边框宽度   | `1px`                      |
| `@picker-view-item-font-size`           | 选择器项字体大小 | `14px`                     |
| `@picker-view-item-padding`             | 选择器项内边距   | `14px`                     |
| `@picker-view-item-active-font-size`    | 激活状态字体大小 | `16px`                     |
| `@picker-view-item-active-font-weight`  | 激活状态字体粗细 | `500`                      |
| `@picker-view-item-transition-duration` | 动画过渡时长     | `0.1s`                     |

### Picker 样式变量

| 变量名                | 说明         | 默认值 |
| :-------------------- | :----------- | :----- |
| `@picker-clear-color` | 清除按钮颜色 | `#ccc` |

### CellPicker 样式变量

<API identifier="CellPicker-StyleVars" hideTitle src="../CellPicker/type.tsx" exports='["DOC_CellPickerStyleVars"]'></API>

### BlockPicker 样式变量

<API identifier="BlockPicker-StyleVars" hideTitle src="../BlockPicker/type.tsx" exports='["DOC_BlockPickerStyleVars"]'></API>

### LinePicker 样式变量

<API identifier="LinePicker-StyleVars" hideTitle src="../LinePicker/type.tsx" exports='["DOC_LinePickerStyleVars"]'></API>

---

<!-- ## 演示

<code src="./demos/demo1/index.tsx" /> -->
