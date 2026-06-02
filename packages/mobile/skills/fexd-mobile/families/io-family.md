# IO 家族

@fexd/mobile 的表单输入组件采用 IO 四层分层架构。理解这个家族是正确使用输入/选择/标签组件的关键。

## 四层架构

```
Layer 1: Label（纯视觉壳）
  ↓ 注入
Layer 2: IOLabel（表单字段逻辑：placeholder/error/helper/focus/disabled 状态）
  ↓ 注入
Layer 3: UnstyledIO（输入能力：value/onChange/交互逻辑，无视觉风格）
  ↓ theme 注入（cloneFC + defaultProps.theme）
Layer 4: Line*/Block*/Cell*（完整业务组件）
```

## 前缀语义

| 前缀      | 视觉风格                  | 适用场景                     |
| --------- | ------------------------- | ---------------------------- |
| **Line**  | 底部线条分隔              | 紧凑表单，字段间用线条分隔   |
| **Block** | 块级填充，字段独立成块    | 宽松表单，每个字段有独立背景 |
| **Cell**  | 列表单元格，类似 iOS 设置 | 设置页/信息展示页风格        |

**选择原则**：跟随项目已有风格。新项目看设计稿或问用户。三种风格功能完全一致，只是视觉不同。

## 家族矩阵

### 输入能力 × 布局风格 = 12 个组件

|              | Line              | Block              | Cell              |
| ------------ | ----------------- | ------------------ | ----------------- |
| **文本输入** | LineInput         | BlockInput         | CellInput         |
| **通用选择** | LinePicker        | BlockPicker        | CellPicker        |
| **日期选择** | LineDatePicker    | BlockDatePicker    | CellDatePicker    |
| **时间选择** | LineTimePicker    | BlockTimePicker    | CellTimePicker    |
| **级联选择** | LineCascadePicker | BlockCascadePicker | CellCascadePicker |

### IO 底层组件

| 组件                    | 能力         | 何时使用                   |
| ----------------------- | ------------ | -------------------------- |
| UnstyledIOInput         | 文本输入能力 | 构建自定义 IO 输入变体     |
| UnstyledIOPicker        | 选择器能力   | 构建自定义 IO 选择器变体   |
| UnstyledIODatePicker    | 日期选择能力 | 构建自定义 IO 日期选择变体 |
| UnstyledIOTimePicker    | 时间选择能力 | 构建自定义 IO 时间选择变体 |
| UnstyledIOCascadePicker | 级联选择能力 | 构建自定义 IO 级联选择变体 |

### 标签组件

| 组件                                     | 层级       | 用途                       |
| ---------------------------------------- | ---------- | -------------------------- |
| UnstyledLabel                            | Label 层   | 构建自定义标签视觉变体     |
| LineLabel / BlockLabel / CellLabel       | Label 层   | 三种视觉风格的纯标签       |
| UnstyledIOLabel                          | IOLabel 层 | 构建自定义表单字段标签变体 |
| LineIOLabel / BlockIOLabel / CellIOLabel | IOLabel 层 | 三种视觉风格的表单字段标签 |

## 如何构建自定义 IO 变体

如果需要新的布局风格（如 `CardInput`），用 `cloneFC` + `defaultProps.theme`：

```tsx
import { cloneFC, UnstyledIOInput, CardIOLabel } from '@fexd/mobile'

const CardInput = cloneFC(UnstyledIOInput)
CardInput.defaultProps = { ...CardInput.defaultProps, theme: CardIOLabel }
```

## IO 组件通用 Props

所有 IO 变体共享以下能力（来自 IOLabel 层和 UnstyledIO 层）：

| 属性                            | 说明          | 来源层     |
| ------------------------------- | ------------- | ---------- |
| label                           | 字段标签文本  | IOLabel    |
| placeholder                     | 占位文本      | IOLabel    |
| error                           | 错误信息      | IOLabel    |
| helper                          | 辅助文本      | IOLabel    |
| disabled                        | 禁用状态      | IOLabel    |
| value / defaultValue / onChange | 受控/非受控值 | UnstyledIO |
| filterIOValue                   | 值过滤        | UnstyledIO |
| prefix / suffix                 | 前缀/后缀节点 | IOLabel    |

## 常见错误

| 错误                                                | 正确                                                         |
| --------------------------------------------------- | ------------------------------------------------------------ |
| 用 `Input` 再手写 label/error 布局                  | 用 `LineInput`/`BlockInput`/`CellInput`，自带 label 和 error |
| 在 Cell 风格表单中混用 LineInput                    | 同一表单内 IO 变体风格保持一致                               |
| 用 `BasicInput` 代替 `UnstyledIOInput` 构建 IO 变体 | `BasicInput` 无 IO 分层能力，用 `UnstyledIOInput`            |
| 认为 `Input` 和 `LineInput` 是不同组件              | `Input` 是 `LineInput` 的别名，功能完全一致                  |
