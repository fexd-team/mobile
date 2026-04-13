---
name: CellCascadePicker
description: 单元格样式的级联选择器，在 UnstyledIOCascadePicker 上固定 CellLabel 主题，不含 theme prop。
---

# CellCascadePicker 单元格级联选择

单元格样式的级联选择器：继承 `UnstyledIOCascadePicker` 能力，在实现中固定 `theme` 为 `CellLabel`，类型上为 `Omit<UnstyledIOCascadePickerProps, 'theme'>`。

```tsx
import { CellCascadePicker } from '@fexd/mobile'
```

## 基础用法

```tsx
import { CellCascadePicker } from '@fexd/mobile'

const options = [
  {
    label: '浙江',
    value: 'zj',
    children: [{ label: '杭州', value: 'hz', children: [{ label: '西湖区', value: 'xh' }] }],
  },
]

;<CellCascadePicker label="地区" placeholder="请选择" options={options} value={value} onChange={setValue} />
```

语义与 `UnstyledIOCascadePicker` / `CascadePicker` 一致，仅视觉与 `CellLabel` 对齐；默认 `classNamePrefix` 为 `exd-cell-cascade-picker`（见 `index.tsx`）。

## Props

`CellCascadePickerProps` 定义于 `packages/mobile/src/exports/CellCascadePicker/type.tsx`，为 `Omit<UnstyledIOCascadePickerProps, 'theme' | 'ref'>` 与 `PureCellCascadePickerProps` 的合并；除不含 `theme` 外，其余与 `UnstyledIOCascadePicker` 相同，见 [UnstyledIOCascadePicker](./UnstyledIOCascadePicker.md)。

## 样式定制

Less 变量定义于 `packages/mobile/src/exports/CellCascadePicker/type.tsx`（`CellCascadePickerStyleVars`）。

| 变量                                   | 默认值             | 说明           |
| -------------------------------------- | ------------------ | -------------- |
| `@cell-cascade-picker-disabled-color`  | `ant-color-gray-7` | 禁用态文字颜色 |
| `@cell-cascade-picker-clear-color`     | `ant-color-gray-5` | 清除按钮颜色   |
| `@cell-cascade-picker-arrow-font-size` | `18px`             | 箭头图标大小   |
| `@cell-cascade-picker-arrow-color`     | `ant-color-gray-6` | 箭头图标颜色   |

## 相关组件

- `UnstyledIOCascadePicker`、`CascadePicker`
- `CellLabel`、`CellDatePicker`、`CellPicker`

<!--
Source:
- packages/mobile/src/exports/CellCascadePicker/type.tsx
- packages/mobile/src/exports/CellCascadePicker/index.tsx
- packages/mobile/src/exports/CellCascadePicker/style.less
-->
