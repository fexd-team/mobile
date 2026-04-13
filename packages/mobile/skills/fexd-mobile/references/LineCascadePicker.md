---
name: LineCascadePicker
description: 底部线条样式的级联选择器，在 UnstyledIOCascadePicker 上固定 LineLabel 主题，不含 theme prop。
---

# LineCascadePicker 线条级联选择

底部线条样式的级联选择器：继承 `UnstyledIOCascadePicker` 能力，在实现中固定 `theme` 为 `LineLabel`，类型上为 `Omit<UnstyledIOCascadePickerProps, 'theme'>`。

```tsx
import { LineCascadePicker } from '@fexd/mobile'
```

## 基础用法

```tsx
<LineCascadePicker options={options} placeholder="请选择地区" value={value} onChange={(values) => setValue(values)} />
<LineCascadePicker options={options} placeholder="错误状态" error="请选择地区" helper="辅助文本" />
<LineCascadePicker disabled placeholder="禁用状态" />
```

## Props

`LineCascadePickerProps` 定义于 `packages/mobile/src/exports/LineCascadePicker/type.tsx`，为 `Omit<UnstyledIOCascadePickerProps, 'theme' | 'ref'>` 与 `PureLineCascadePickerProps` 的合并；除不含 `theme` 外，其余与 `UnstyledIOCascadePicker` 相同（含 `error`、`helper`、`disabled` 等），见 [UnstyledIOCascadePicker](./UnstyledIOCascadePicker.md)。

## 样式定制

Less 变量定义于 `packages/mobile/src/exports/LineCascadePicker/type.tsx`（`LineCascadePickerStyleVars`）。

| 变量                                   | 默认值             | 说明           |
| -------------------------------------- | ------------------ | -------------- |
| `@line-cascade-picker-disabled-color`  | `ant-color-gray-7` | 禁用态文字颜色 |
| `@line-cascade-picker-clear-color`     | `ant-color-gray-5` | 清除按钮颜色   |
| `@line-cascade-picker-arrow-font-size` | `18px`             | 箭头图标大小   |
| `@line-cascade-picker-arrow-color`     | `ant-color-gray-6` | 箭头图标颜色   |

## 相关组件

- `UnstyledIOCascadePicker`、`CascadePicker`
- `LineLabel`、`LineDatePicker`、`LineTimePicker`

<!--
Source:
- packages/mobile/src/exports/LineCascadePicker/type.tsx
- packages/mobile/src/exports/LineCascadePicker/index.tsx
- packages/mobile/src/exports/LineCascadePicker/style.less
-->
