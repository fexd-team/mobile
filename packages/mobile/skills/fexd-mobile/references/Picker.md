---
name: Picker
description: 点击触发弹层，在 PickerView 中选择选项；确认后触发 onChange。与 showPicker 命令式 API 配合使用见包内文档与其他 reference。
---

# Picker 选择器

点击触发弹层，在 `PickerView` 中选择选项；确认后触发 `onChange`。与 `showPicker` 命令式 API 配合使用见包内文档与其他 reference。

分层与 `IOLabel` / `Label` 组合见 `packages/mobile/src/exports/Picker/index.zh.md` 顶部说明及包内「IO 组件的分层设计」文档。

```tsx
import { Picker } from '@fexd/mobile'
```

## 基础用法

示例来源：`packages/mobile/src/exports/Picker/demos/basic.tsx`。

```tsx
import React from 'react'
import { Picker, Button } from '@fexd/mobile'

export default () => (
  <Picker
    defaultValue="6"
    options={Array.from({ length: 12 }, (_, idx) => ({
      label: `Option ${idx}`,
      value: String(idx),
    }))}
    onChange={console.log}
  >
    {(label) => <Button type="primary">Pick: {label}</Button>}
  </Picker>
)
```

## Props

`PurePickerProps` 定义于 `packages/mobile/src/exports/Picker/type.tsx`，由以下部分合并：

- `Omit<PureBasicPickerProps, 'defaultValue' | 'value' | 'onChange'>`（`packages/mobile/src/exports/usePickerProps/type.tsx`）
- `Omit<PickerViewProps, 'onChange'>`（`packages/mobile/src/exports/PickerView/type.tsx`）
- 以及本文件内显式声明的 `clearable`、`onChange`、`children`

`PickerProps` 另与 `BasicPickerProps` 合并（同 `type.tsx`）。

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `clearable` | `boolean` | 是否可清除（展示 `"---"` 选项） |
| `onChange` | `(value: PickerOptionValue, item: PickerOption) => void` | 确认选择后的回调 |
| `children` | `React.ReactNode \| ((selectedLabel?, selectedValue?, selectedOption?) => React.ReactNode)` | 触发区域内容 |
| `options` | `PickerOption[]` | 选项列表（默认 `[]`） |
| `rows` | `number` | 滚轮可见行数（默认 `3`） |
| `defaultValue` | `PickerOptionValue` | 非受控默认值 |
| `value` | `PickerOptionValue` | 受控值 |
| `scaleSelected` | `boolean` | 选中项是否放大（默认 `true`） |
| `className` | `string` | 类名 |
| `filterIOValue` | `(value: any) => boolean` | 返回 `false` 时不触发 `onChange` |
| `popupProps` | `Omit<PopupProps, 'visible'>` | 弹出层 props |
| `onConfirm` | `(value: string) => (boolean \| void) \| Promise<boolean \| void>` | 确认钩子 |
| `onCancel` | `() => (boolean \| void) \| Promise<boolean \| void>` | 取消钩子 |
| `headerRight` | `React.ReactNode` | 弹层头部右侧 |
| `headerLeft` | `React.ReactNode` | 弹层头部左侧 |
| `disabled` | `boolean` | 是否禁用（默认 `false`） |
| `onEnter` / `onExit` / `onExited` | 见 `TransitionProps` | 过渡生命周期（自 `PurePopupProps` 选取） |
| `ref` | `React.Ref<BasicPickerRef>` | 引用 |

`PickerOption`、`PickerOptionValue` 定义于 `packages/mobile/src/exports/PickerView/type.tsx`。

## 样式定制

`PickerStyleVars` 仅包含 `@picker-prefix`、`@picker-clear-color`（`packages/mobile/src/exports/Picker/type.tsx` 中 `DOC_PickerStyleVars`）。`PickerView`、Line/Block/Cell 选择器变量见对应组件 `type.tsx`。

## 相关导出

同文档目录下还有 `LinePicker`、`BlockPicker`、`CellPicker`、`PickerView`、`showPicker`（各自 `type.tsx` 与 demos）。

## 不要在以下情况使用 Picker

- 在表单中需要 label + error → 用 `LinePicker` / `CellPicker` / `BlockPicker`（自带 IOLabel）
- 嵌入页面不需要弹层 → 用 `PickerView`
- 一次性选择（不需要组件）→ 用 `showPicker`
- 多级联动选择 → 用 `CascadePicker` / `LineCascadePicker`
- 日期选择 → 用 `DatePicker` / `LineDatePicker`
- 时间选择 → 用 `TimePicker` / `LineTimePicker`

<!--
Source:
- packages/mobile/src/exports/Picker/type.tsx
- packages/mobile/src/exports/Picker/index.zh.md
- packages/mobile/src/exports/Picker/index.tsx
- packages/mobile/src/exports/Picker/demos/
- packages/mobile/src/exports/Picker/style.less
-->
