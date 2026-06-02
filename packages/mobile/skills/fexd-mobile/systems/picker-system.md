# Picker 系统

@fexd/mobile 的选择器体系包含 4 种选择能力、2 种形态（弹层/面板）、3 种布局风格，以及命令式 API。

**遇到选择器相关需求时，先读本文件，再读具体 reference。**

## 系统架构

```
PickerView（纯选择面板，滚轮交互）
  ↓ + Popup 弹层
Picker（点击触发弹层 + PickerView 选择）
  ↓ + IO 分层（IOLabel + theme 注入）
LinePicker / BlockPicker / CellPicker（带 Label 的表单选择器）

同理衍生：
DatePicker → Line/Block/CellDatePicker
TimePicker → Line/Block/CellTimePicker
CascadePicker → Line/Block/CellCascadePicker
```

## 4 种选择能力

| 能力     | 弹层组件      | 面板组件          | IO 底层                 | 命令式     |
| -------- | ------------- | ----------------- | ----------------------- | ---------- |
| 通用选择 | Picker        | PickerView        | UnstyledIOPicker        | showPicker |
| 日期选择 | DatePicker    | DatePickerView    | UnstyledIODatePicker    | —          |
| 时间选择 | TimePicker    | TimePickerView    | UnstyledIOTimePicker    | —          |
| 级联选择 | CascadePicker | CascadePickerView | UnstyledIOCascadePicker | —          |

## 3 种布局风格 × 5 种选择能力 = 15 个 IO 变体

|          | Line              | Block              | Cell              |
| -------- | ----------------- | ------------------ | ----------------- |
| 通用选择 | LinePicker        | BlockPicker        | CellPicker        |
| 日期选择 | LineDatePicker    | BlockDatePicker    | CellDatePicker    |
| 时间选择 | LineTimePicker    | BlockTimePicker    | CellTimePicker    |
| 级联选择 | LineCascadePicker | BlockCascadePicker | CellCascadePicker |

（注意：没有 Line/Block/Cell 变体的 TextArea，因为 TextArea 不是选择器。）

## 选型决策流程

### 第一步：确定选择能力

```
单列选项 → Picker 体系
多级联动（省市区）→ CascadePicker 体系
日期 → DatePicker 体系
时间 → TimePicker 体系
```

### 第二步：确定形态

| 形态                                          | 适用场景                       |
| --------------------------------------------- | ------------------------------ |
| **弹层组件**（Picker/DatePicker/...）         | 点击触发弹出选择，选择完关闭   |
| **面板组件**（PickerView/DatePickerView/...） | 嵌入页面，常驻展示             |
| **IO 变体**（LinePicker/CellDatePicker/...）  | 在表单中使用，自带 label/error |
| **命令式**（showPicker）                      | 一次性选择，不需要组件         |

### 第三步：确定布局风格

| 风格      | 适用场景               |
| --------- | ---------------------- |
| **Line**  | 底部线条分隔，紧凑表单 |
| **Block** | 块级填充，宽松表单     |
| **Cell**  | 列表单元格，设置页风格 |

**跟随项目已有风格**。新项目看设计稿或问用户。

## 典型用法

### 表单中的选择器（最常见）

```tsx
<Form.Field name="city">
  {(field) => <LinePicker label="城市" value={field.value} onChange={field.setValue} options={cityOptions} />}
</Form.Field>
```

### 非表单中的选择器

```tsx
<Picker options={options} value={value} onChange={setValue}>
  {(label) => <Button type="primary">选择: {label}</Button>}
</Picker>
```

### 命令式一次性选择

```tsx
const value = await showPicker({
  options: [
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' },
  ],
})
```

### 嵌入式面板

```tsx
<PickerView options={options} value={value} onChange={setValue} />
```

### 级联选择器（省市区）

```tsx
<Form.Field name="address">
  {(field) => <LineCascadePicker label="地区" value={field.value} onChange={field.setValue} options={regionOptions} />}
</Form.Field>
```

## Picker 与 PickerView 的关系

`Picker` = `Popup` + `PickerView` + 触发区域。内部已经封装好弹层逻辑，**不要**手动组合 Popup + PickerView。

`PickerView` 只有滚轮选择区域，没有弹层，适合嵌入页面或自定义弹层。

## 不可用的替代品

| 需求     | 禁用               | 正确替代                        |
| -------- | ------------------ | ------------------------------- |
| 日历选择 | Calendar（开发中） | DatePicker/LineDatePicker       |
| 级联选择 | Cascader（开发中） | CascadePicker/LineCascadePicker |
| 搜索选择 | Search（开发中）   | Picker + 自定义过滤             |
| 多选     | Checkbox 组        | —                               |

## 相关 reference

- [references/Picker.md](references/Picker.md) — Picker 组件
- [references/PickerView.md](references/PickerView.md) — PickerView 组件
- [references/DatePicker.md](references/DatePicker.md) — DatePicker 组件
- [references/DatePickerView.md](references/DatePickerView.md) — DatePickerView 组件
- [references/TimePicker.md](references/TimePicker.md) — TimePicker 组件
- [references/TimePickerView.md](references/TimePickerView.md) — TimePickerView 组件
- [references/CascadePicker.md](references/CascadePicker.md) — CascadePicker 组件
- [references/CascadePickerView.md](references/CascadePickerView.md) — CascadePickerView 组件
- [references/showPicker.md](references/showPicker.md) — showPicker 命令式 API
- IO 变体 references: LinePicker.md, BlockPicker.md, CellPicker.md, LineDatePicker.md, ...
