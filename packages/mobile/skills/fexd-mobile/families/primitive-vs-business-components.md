# 原始组件 vs 业务组件

@fexd/mobile 的组件分为三层抽象，理解这三层是正确选型的基础。

## 三层抽象

| 层级 | 前缀 | 特征 | 示例 | 何时使用 |
| --- | --- | --- | --- | --- |
| 原始层 | `Basic*` | 最少样式，只提供结构+交互 | BasicButton, BasicInput, BasicTextArea, BasicModal | 构建自定义组件变体时 |
| IO 原语层 | `UnstyledIO*` | 有输入能力但无视觉风格，通过 `theme` 注入 | UnstyledIOInput, UnstyledIOPicker, UnstyledIODatePicker, UnstyledIOTimePicker, UnstyledIOCascadePicker | 构建自定义 IO 组件时 |
| 业务层 | 无前缀 / `Line*` / `Block*` / `Cell*` | 完整功能+样式，可直接使用 | Button, Input, LineInput, BlockInput, CellInput | 日常业务开发 |

## 选择规则

```
业务代码 → 无前缀 或 Line*/Block*/Cell* 前缀
构建组件变体 → Basic* 前缀
构建 IO 输入变体 → UnstyledIO* 前缀
```

## 具体对照

### 按钮家族

| 组件        | 层级   | 用途                                           |
| ----------- | ------ | ---------------------------------------------- |
| BasicButton | 原始层 | 无样式按钮，只有结构和点击交互                 |
| Button      | 业务层 | 完整按钮，含 type/size/shape/fill/icon/loading |

### 输入家族

| 组件                | 层级      | 用途                                             |
| ------------------- | --------- | ------------------------------------------------ |
| BasicInput          | 原始层    | 无样式输入，只有 value/onChange                  |
| UnstyledIOInput     | IO 原语层 | 有 IO 能力（label/error/focus 状态），无视觉风格 |
| Input (= LineInput) | 业务层    | 默认文本输入                                     |
| LineInput           | 业务层    | 底部线条风格输入                                 |
| BlockInput          | 业务层    | 块级填充风格输入                                 |
| CellInput           | 业务层    | 列表单元格风格输入                               |

### 文本域家族

| 组件          | 层级   | 用途           |
| ------------- | ------ | -------------- |
| BasicTextArea | 原始层 | 无样式多行输入 |
| TextArea      | 业务层 | 完整多行输入   |

### 弹层家族

| 组件       | 层级   | 用途                                      |
| ---------- | ------ | ----------------------------------------- |
| BasicModal | 原始层 | 基础弹层，无互斥控制                      |
| Modal      | 业务层 | 完整弹层，含互斥/shareMask/contentVisible |

### 标签家族

| 组件                                     | 层级      | 用途                     |
| ---------------------------------------- | --------- | ------------------------ |
| UnstyledLabel                            | 原始层    | 无样式标签               |
| LineLabel / BlockLabel / CellLabel       | 业务层    | 三种视觉风格标签         |
| UnstyledIOLabel                          | IO 原语层 | 无样式表单字段标签       |
| LineIOLabel / BlockIOLabel / CellIOLabel | 业务层    | 三种视觉风格表单字段标签 |

## 常见错误

| 错误                                            | 正确                                          |
| ----------------------------------------------- | --------------------------------------------- |
| 业务页面用 `BasicButton`                        | 用 `Button`                                   |
| 业务页面用 `BasicInput` 再手写 label/error 样式 | 用 `LineInput`/`BlockInput`/`CellInput`       |
| 用 `UnstyledIOInput` + 手写 theme 注入          | 用已有的 `LineInput`/`BlockInput`/`CellInput` |
| 用 `BasicModal` 需要互斥控制                    | 用 `Modal`（内含互斥逻辑）                    |
