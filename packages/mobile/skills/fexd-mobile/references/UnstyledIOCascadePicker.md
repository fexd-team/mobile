---
name: UnstyledIOCascadePicker
description: 无样式 IO 级联选择器，组合 CascadePicker 与 UnstyledIOLabel，作为 Line/Block/Cell 级联选择器的底层实现。
---

# UnstyledIOCascadePicker 无样式级联选择器 IO

无样式 IO 级联选择器：内部组合 `CascadePicker` 与 `UnstyledIOLabel`，将级联选择能力接入 IO 分层体系，供 `LineCascadePicker`、`BlockCascadePicker`、`CellCascadePicker` 等变体复用。

```tsx
import { UnstyledIOCascadePicker } from '@fexd/mobile'
```

## 基础用法

```tsx
import { UnstyledIOCascadePicker } from '@fexd/mobile'

const options = [
  {
    label: '浙江',
    value: 'zj',
    children: [{ label: '杭州', value: 'hz', children: [{ label: '西湖区', value: 'xh' }] }],
  },
]

;<UnstyledIOCascadePicker
  label="地区"
  placeholder="请选择"
  options={options}
  value={value}
  onChange={(values, selectedOptions) => {
    setValue(values)
  }}
/>
```

弹层与级联滚轮行为与 `CascadePicker` 一致。

## Props

`UnstyledIOCascadePickerProps` 定义于 `packages/mobile/src/exports/UnstyledIOCascadePicker/type.tsx`，由 `PureUnstyledIOCascadePickerProps` 与 `Omit<CascadePickerProps, 'prefix' | 'placeholder'>` 等合并。`AUTO_API` 标注在 `PureUnstyledIOCascadePickerProps` 上。

### 本文件显式声明（`PureUnstyledIOCascadePickerProps` 合并块）

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `classNamePrefix` | `string` | `'exd-unstyled-io-cascade-picker'` | CSS 类名前缀 |
| `className` | `string` | - | 自定义类名 |
| `label` | `React.ReactNode` | - | 控件名称 |
| `labelType` | `UnstyledIOLabelProps['type']` | - | 提示状态 |
| `ref` | `React.Ref<UnstyledIOCascadePickerRef>` | - | 实例引用 |
| `theme` | `UnstyledIOLabelProps['theme']` | `UnstyledLabel`（见 `index.tsx` `defaultProps`） | 主题组件 |
| `arrowIcon` | `React.ReactNode` | `<ChevronForwardSharp />`（`type.tsx` `@default`） | 右侧箭头图标 |
| `separator` | `string` | `' / '`（`type.tsx` `@default`） | 格式化展示文本分隔符 |
| `onChange` | `PureCascadePickerProps['onChange']`（即 `(values, selectedOptions) => void`，参数类型见 `CascadePicker/type.tsx`） | - | 值改变回调 |

另：**继承** `Omit<PureCascadePickerProps, 'onChange'>` 与 `Omit<UnstyledIOLabelProps, 'children' | 'onClick' | 'defaultValue' | 'onChange'>` 合并后的其余属性；完整合并见 `packages/mobile/src/exports/UnstyledIOCascadePicker/type.tsx`。级联与弹层字段见 `CascadePicker` / `CascadePickerView`，标签与表单态字段见 `UnstyledIOLabel`。

## 相关组件

- `CascadePicker`、`CascadePickerView`
- `UnstyledIOLabel`、`UnstyledLabel`
- `LineCascadePicker`、`BlockCascadePicker`、`CellCascadePicker`

<!--
Source:
- packages/mobile/src/exports/UnstyledIOCascadePicker/type.tsx
- packages/mobile/src/exports/UnstyledIOCascadePicker/index.tsx
- packages/mobile/src/exports/UnstyledIOCascadePicker/style.less
-->
