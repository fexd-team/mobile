---
name: BlockCascadePicker
description: 块级填充样式的级联选择器，在 UnstyledIOCascadePicker 上固定 BlockLabel 主题，不含 theme prop。
---

# BlockCascadePicker 块状级联选择

块级填充样式的级联选择器：继承 `UnstyledIOCascadePicker` 能力，在实现中固定 `theme` 为 `BlockLabel`，类型上为 `Omit<UnstyledIOCascadePickerProps, 'theme'>`。

```tsx
import { BlockCascadePicker } from '@fexd/mobile'
```

## 基础用法

```tsx
import { BlockCascadePicker } from '@fexd/mobile'

const options = [
  {
    label: '浙江',
    value: 'zj',
    children: [{ label: '杭州', value: 'hz', children: [{ label: '西湖区', value: 'xh' }] }],
  },
]

;<BlockCascadePicker label="地区" placeholder="请选择" options={options} value={value} onChange={setValue} />
```

语义与 `UnstyledIOCascadePicker` / `CascadePicker` 一致，仅视觉与 `BlockLabel` 对齐；默认 `classNamePrefix` 为 `exd-block-cascade-picker`，`arrowIcon` 默认为 `CaretDown`（见 `index.tsx`）。

## Props

`BlockCascadePickerProps` 定义于 `packages/mobile/src/exports/BlockCascadePicker/type.tsx`，为 `Omit<UnstyledIOCascadePickerProps, 'theme' | 'ref'>` 与 `PureBlockCascadePickerProps` 的合并；除不含 `theme` 外，其余与 `UnstyledIOCascadePicker` 相同，见 [UnstyledIOCascadePicker](./UnstyledIOCascadePicker.md)。

## 样式定制

Less 变量定义于 `packages/mobile/src/exports/BlockCascadePicker/type.tsx`（`BlockCascadePickerStyleVars`）。

| 变量                                         | 默认值    | 说明           |
| -------------------------------------------- | --------- | -------------- |
| `@block-cascade-picker-value-font-size`      | `14px`    | 值文字大小     |
| `@block-cascade-picker-disabled-color`       | `#999`    | 禁用态文字颜色 |
| `@block-cascade-picker-disabled-arrow-color` | `#ccc`    | 禁用态箭头颜色 |
| `@block-cascade-picker-clear-color`          | `#ccc`    | 清除按钮颜色   |
| `@block-cascade-picker-arrow-font-size`      | `18px`    | 箭头图标大小   |
| `@block-cascade-picker-arrow-color`          | `#a5a0a1` | 箭头图标颜色   |

## 相关组件

- `UnstyledIOCascadePicker`、`CascadePicker`
- `BlockLabel`、`BlockDatePicker`、`BlockPicker`

<!--
Source:
- packages/mobile/src/exports/BlockCascadePicker/type.tsx
- packages/mobile/src/exports/BlockCascadePicker/index.tsx
- packages/mobile/src/exports/BlockCascadePicker/style.less
-->
