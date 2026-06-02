# IO 控制系统

@fexd/mobile 的受控/非受控值管理通过 `useIOControl` Hook 实现，是所有 IO 组件（Input/Picker/DatePicker 等）的底层机制。

**构建自定义输入组件或理解 IO 组件行为时，读本文件。**

## 系统架构

```
useIOControl（受控/非受控值管理，焦点感知）
  ↓
useTextFieldProps（文本输入属性组装，+ format/normalize）
  ↓
useSelectionFieldProps / usePickerProps（选择器属性组装，+ Popup/图标）
  ↓
UnstyledIO 组件（UnstyledIOInput / UnstyledIOPicker / ...）
  ↓ theme 注入
Line*/Block*/Cell* 业务组件
```

## useIOControl

核心 Hook，管理受控/非受控值，带焦点感知。

```tsx
import { useIOControl } from '@fexd/mobile'

const { value, setValue, focused, setFocused } = useIOControl({
  defaultValue: '',
  value: props.value,
  onChange: props.onChange,
  filterIOValue: (v) => v.length <= 100,
})
```

### 关键行为

| 行为          | 说明                                                |
| ------------- | --------------------------------------------------- |
| 受控模式      | 传了 `value` + `onChange` 时使用外部值              |
| 非受控模式    | 只传 `defaultValue` 时使用内部状态                  |
| 焦点切换      | 焦点期间自动切换为非受控，避免输入被外部 value 覆盖 |
| filterIOValue | 返回 `false` 时阻止值更新                           |

### Props

| Prop          | 类型               | 说明                      |
| ------------- | ------------------ | ------------------------- |
| value         | any                | 受控值                    |
| defaultValue  | any                | 非受控默认值              |
| onChange      | (value) => void    | 值变化回调                |
| filterIOValue | (value) => boolean | 值过滤，返回 false 不更新 |

### 返回值

| 属性       | 类型                       | 说明         |
| ---------- | -------------------------- | ------------ |
| value      | any                        | 当前值       |
| setValue   | (value) => void            | 设置值       |
| focused    | boolean                    | 是否聚焦     |
| setFocused | (focused: boolean) => void | 设置焦点状态 |

## useTextFieldProps

在 `useIOControl` 基础上增加文本输入相关能力：`format`（展示层格式化）、`normalize`（输入序列化）。

```tsx
const textProps = useTextFieldProps({
  value,
  onChange,
  format: (v) => formatCurrency(v),
  normalize: (v) => v.replace(/\D/g, ''),
  normalizeTrigger: 'onChange', // 或 'onBlur'
})
```

**行为**：

- `normalize` 在用户输入时对值做序列化（如去非数字）
- `format` 对展示值做格式化（如千分位），不影响实际存储的值
- `normalizeTrigger` 控制序列化时机：`onChange`（即时）或 `onBlur`（失焦时）

## useSelectionFieldProps / usePickerProps

选择器属性组装，绑定 Popup 交互和图标。

- `useSelectionFieldProps`：通用选择字段
- `usePickerProps`：Picker 专用，含 Popup + 右侧箭头图标

**这些是内部 Hook**，业务代码不应直接使用。理解它们有助于理解 Picker/DatePicker 等组件的行为。

## 在 IO 组件中的流转

### Input 类

```
用户输入 → normalize 序列化 → filterIOValue 过滤 → setValue 更新 → format 格式化 → 展示
```

### Picker 类

```
用户选择 → Popup 弹出 PickerView → 确认选择 → onChange 回调 → filterIOValue 过滤 → setValue 更新
```

## 自定义 IO 组件

如需构建自定义输入组件，推荐使用 `UnstyledIO*` + `cloneFC` + theme 注入：

```tsx
import { cloneFC, UnstyledIOInput } from '@fexd/mobile'

const MyCustomInput = cloneFC(UnstyledIOInput)
MyCustomInput.defaultProps = { ...MyCustomInput.defaultProps, theme: MyCustomIOLabel }
```

`UnstyledIO*` 已内置 `useIOControl` 和对应的能力 Hook，不需要自己调用。

## 相关 reference

- [references/useIOControl.md](references/useIOControl.md) — useIOControl Hook
- [references/useTextFieldProps.md](references/useTextFieldProps.md) — useTextFieldProps Hook
- [references/useSelectionFieldProps.md](references/useSelectionFieldProps.md) — useSelectionFieldProps Hook
- [references/usePickerProps.md](references/usePickerProps.md) — usePickerProps Hook
- [references/cloneFC.md](references/cloneFC.md) — cloneFC 工厂
- [references/createFC.md](references/createFC.md) — createFC 工厂
