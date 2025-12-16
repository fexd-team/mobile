---
group:
  title: 输入
  path: /data

mobileDemoFixed: false
---

# Input 输入框

- Input <ImportCost name="Input" />
- TextArea <ImportCost name="TextArea" />
- LineInput <ImportCost name="LineInput" />
- BlockInput <ImportCost name="BlockInput" />
- CellInput <ImportCost name="CellInput" />

<!-- prettier-ignore -->
```jsx | pure
import { Input, TextArea, LineInput, BlockInput, CellInput } from '@fexd/mobile'

<Input />
<TextArea />
<LineInput />
<BlockInput />
<CellInput />
```

> **设计说明**：Input 组件采用分层设计，通过组合 IOLabel 和 Label 实现样式与逻辑分离。详细了解请参考 [IO 组件的分层设计](/documents/exports/data/io-layered-design)。

---

## 演示 - LineInput

<code src="./demos/LineInputDemo.tsx" />

---

## LineInput

<API identifier="LineInput" hideTitle src="../LineInput/type.tsx" exports='["default"]'></API>

---

## 演示 - BlockInput

<code src="./demos/BlockInputDemo.tsx" />

---

## BlockInput

<API identifier="BlockInput" hideTitle src="../BlockInput/type.tsx" exports='["default"]'></API>

---

## 演示 - CellInput

<code src="./demos/CellInputDemo.tsx" />

---

## CellInput

<API identifier="CellInput" hideTitle src="../CellInput/type.tsx" exports='["default"]'></API>

---

## 演示 - BasicInput / BasicTextArea

<code src="./demos/basic.tsx" />

---

## BasicInput

<API identifier="BasicInput" hideTitle src="../BasicInput/type.tsx" exports='["default"]'></API>

---

## BasicTextArea

<API identifier="BasicTextArea" hideTitle src="../BasicTextArea/type.tsx" exports='["default"]'></API>

---

## 继承自 input 的属性

<API identifier="DOC_PureExtendFromJSXInput" hideTitle src="../BasicInput/type.tsx" exports='["DOC_PureExtendFromJSXInput"]'></API>

---

## 样式变量

组件提供了以下 Less 变量，可用于自定义样式。三种输入框类型（Block/Line/Cell）的变量前缀分别为 `@block-`、`@line-`、`@cell-`。

### BlockLabel / BlockInput 样式变量

<API identifier="BlockLabel-StyleVars" hideTitle src="../BlockLabel/type.tsx" exports='["DOC_BlockLabelStyleVars"]'></API>

<API identifier="BlockInput-StyleVars" hideTitle src="../BlockInput/type.tsx" exports='["DOC_BlockInputStyleVars"]'></API>

### LineLabel / LineInput 样式变量

<API identifier="LineLabel-StyleVars" hideTitle src="../LineLabel/type.tsx" exports='["DOC_LineLabelStyleVars"]'></API>

<API identifier="LineInput-StyleVars" hideTitle src="../LineInput/type.tsx" exports='["DOC_LineInputStyleVars"]'></API>

### CellLabel / CellInput 样式变量

<API identifier="CellLabel-StyleVars" hideTitle src="../CellLabel/type.tsx" exports='["DOC_CellLabelStyleVars"]'></API>

<API identifier="CellInput-StyleVars" hideTitle src="../CellInput/type.tsx" exports='["DOC_CellInputStyleVars"]'></API>

---
