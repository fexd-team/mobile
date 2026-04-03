---
name: UnstyledIOPicker
description: 无样式 IO 层：组合 Picker 与 UnstyledIOLabel 式标签区，供 Line/Block/Cell 等主题选择器使用。
---

# UnstyledIOPicker 无样式选择器 IO

无样式 IO 层：组合 `Picker` 与 `UnstyledIOLabel` 式标签区，供 Line/Block/Cell 等主题选择器使用。

```tsx
import { UnstyledIOPicker } from '@fexd/mobile'
```

## 基础用法

```tsx
import { UnstyledIOPicker } from '@fexd/mobile'
;<UnstyledIOPicker label="选项" columns={columns} value={v} onChange={onChange} />
```

弹层与滚轮行为与 `Picker` 一致，详见 `Picker` 文档。

## Props

`UnstyledIOPickerProps` 定义于 `packages/mobile/src/exports/UnstyledIOPicker/type.tsx`，由 `PickerProps` 与 `PureUnstyledIOPickerProps` 合并。`AUTO_API` 标注在 `PureUnstyledIOPickerProps` 上。

### `PureUnstyledIOPickerProps` 合并结构

- `Omit<UnstyledIOLabelProps, 'children' | 'onChange' | 'defaultValue'>`
- `PurePickerProps`
- 下列本文件显式字段

### 本文件显式声明

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `onChange` | `(value: PickerOptionValue, item: PickerOption) => void` | - | 值变化回调（相对 `UnstyledIOLabel` 侧 omit 后在此重新定义） |
| `classNamePrefix` | `string` | - | 类名前缀 |
| `className` | `string` | - | 根节点类名 |
| `label` | `React.ReactNode` | - | 控件名称 |
| `labelType` | `UnstyledIOLabelProps['type']` | - | 标签提示状态 |
| `ref` | `React.Ref<UnstyledIOPickerRef>` | - | 引用，同 `PickerRef` / `BasicPickerRef` |
| `theme` | `UnstyledIOLabelProps['theme']` | - | 标签主题 |
| `arrowIcon` | `React.ReactNode` | `<ChevronForwardSharp />`（`type.tsx` 注释） | 右侧箭头图标 |

### 继承说明

- `PurePickerProps` / `PickerProps`：见 `skills/fexd-mobile/references/Picker.md` 与 `packages/mobile/src/exports/Picker/type.tsx`。
- `UnstyledIOLabelProps`（已排除 `children`、`onChange`、`defaultValue`）：见 `UnstyledIOLabel` 参考文档。

## 相关组件

- `Picker`、`LinePicker`、`BlockPicker`、`CellPicker`
- `UnstyledIOLabel`

<!--
Source:
- packages/mobile/src/exports/UnstyledIOPicker/type.tsx
- packages/mobile/src/exports/UnstyledIOPicker/index.tsx
- packages/mobile/src/exports/UnstyledIOPicker/style.less
-->
