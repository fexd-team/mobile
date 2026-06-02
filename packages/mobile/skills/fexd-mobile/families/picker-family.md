# Picker 家族

@fexd/mobile 的选择器家族包含 4 种选择能力 × 2 种形态（弹层/面板）× 3 种布局风格 = 大量变体。

## 家族成员一览

### 选择能力

| 能力     | 弹层组件      | 面板组件（无弹层） |
| -------- | ------------- | ------------------ |
| 通用选择 | Picker        | PickerView         |
| 日期选择 | DatePicker    | DatePickerView     |
| 时间选择 | TimePicker    | TimePickerView     |
| 级联选择 | CascadePicker | CascadePickerView  |

### IO 变体（带 Label 的表单组件）

| 能力     | Line              | Block              | Cell              |
| -------- | ----------------- | ------------------ | ----------------- |
| 通用选择 | LinePicker        | BlockPicker        | CellPicker        |
| 日期选择 | LineDatePicker    | BlockDatePicker    | CellDatePicker    |
| 时间选择 | LineTimePicker    | BlockTimePicker    | CellTimePicker    |
| 级联选择 | LineCascadePicker | BlockCascadePicker | CellCascadePicker |

### IO 底层

| 组件                    | 用途                         |
| ----------------------- | ---------------------------- |
| UnstyledIOPicker        | 构建自定义选择器 IO 变体     |
| UnstyledIODatePicker    | 构建自定义日期选择器 IO 变体 |
| UnstyledIOTimePicker    | 构建自定义时间选择器 IO 变体 |
| UnstyledIOCascadePicker | 构建自定义级联选择器 IO 变体 |

### 命令式 API

| API        | 说明                             |
| ---------- | -------------------------------- |
| showPicker | 命令式选择器，`await` 返回选中值 |

## 选型决策

### 弹层 vs 面板

```
用户点击触发选择 → 弹层组件（Picker/DatePicker/...）
选择器嵌入页面，常驻展示 → 面板组件（PickerView/DatePickerView/...）
```

### 裸组件 vs IO 变体

```
在表单中使用 → IO 变体（LinePicker/CellDatePicker/...），自带 label/error
在非表单场景/自定义触发区域 → 裸组件（Picker/DatePicker/...）+ children 渲染触发区域
一次性选择 → showPicker 命令式 API
```

### 选择能力

```
单列选项（性别/学历/类型）→ Picker / LinePicker
多级联动（省市区/分类）→ CascadePicker / LineCascadePicker
日期 → DatePicker / LineDatePicker
时间 → TimePicker / LineTimePicker
```

## 弹层组件 vs 面板组件

弹层组件（Picker/DatePicker/TimePicker/CascadePicker）内部封装了 Popup + PickerView，点击触发区域后弹出底部面板选择。

面板组件（PickerView/DatePickerView 等）只有滚轮选择区域，没有弹层，适合嵌入页面。

**不要**手动组合 Popup + PickerView 来模拟 Picker，直接用 Picker 即可。

## IO 变体 vs 裸组件

IO 变体（LinePicker 等）= IOLabel + UnstyledIOPicker + 对应布局风格。自带 label、placeholder、error、前缀图标等表单能力。

裸组件（Picker 等）没有 label/error，适合：

- 自定义触发区域（通过 children 渲染）
- 非表单场景
- 需要完全自定义外观

## showPicker 命令式用法

```tsx
const value = await showPicker({
  options: [
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' },
  ],
})
// value 为选中的值，取消则返回 undefined
```

适合一次性选择场景，无需在组件中维护选择器状态。

## 常见错误

| 错误                                   | 正确                                    |
| -------------------------------------- | --------------------------------------- |
| 在表单中用 `Picker` 再手写 label/error | 用 `LinePicker`/`CellPicker` 等 IO 变体 |
| 手动组合 `Popup` + `PickerView`        | 直接用 `Picker`（已封装）               |
| 用 `CascadePicker` 选单列              | 单列用 `Picker`                         |
| 用 `Cascader`（开发中）                | 用 `CascadePicker`                      |
| 用 `Calendar`（开发中）选日期          | 用 `DatePicker`/`LineDatePicker`        |
