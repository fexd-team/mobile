---
name: CascadePickerView
description: 级联选择器面板（无弹层），用于嵌入式场景；内部用 useCascadingPicker 联动多列 PickerView。
---

# CascadePickerView 级联选择器面板

级联选择器的面板组件（无弹层），用于嵌入式场景。内部使用 `useCascadingPicker` Hook 管理级联列之间的联动，每列使用 `PickerView` 渲染。

```tsx
import { CascadePickerView } from '@fexd/mobile'
```

## 基础用法

示例来源：`packages/mobile/src/exports/CascadePicker/demos/cascadePickerView.tsx`。

```tsx
import React, { useState } from 'react'
import { CascadePickerView } from '@fexd/mobile'

const options = [
  {
    label: '浙江',
    value: '浙江',
    children: [
      {
        label: '杭州',
        value: '杭州',
        children: [
          { label: '西湖区', value: '西湖区' },
          { label: '上城区', value: '上城区' },
          { label: '余杭区', value: '余杭区' },
        ],
      },
      {
        label: '温州',
        value: '温州',
        children: [
          { label: '鹿城区', value: '鹿城区' },
          { label: '瓯海区', value: '瓯海区' },
        ],
      },
    ],
  },
  // ...
]

export default () => {
  const [info, setInfo] = useState('')
  return (
    <>
      <CascadePickerView
        options={options}
        onChange={(values, selectedOptions) => {
          setInfo(selectedOptions.map((o) => o.label).join(' / '))
        }}
      />
      <div>当前选中：{info || '---'}</div>
    </>
  )
}
```

## Props

`CascadePickerViewProps` 定义于 `packages/mobile/src/exports/CascadePickerView/type.tsx`（由 `PureCascadePickerViewProps` 与 `JSXDivProps` 组合，其中 `JSXDivProps` 已排除 `onChange`、`defaultValue`，再由面板 Props 以正确类型补回）。

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `options` | `CascadeOption[]` | — | 树形级联数据 |
| `value` | `CascadePickerViewValue` | — | 受控值，各级选中值的数组 |
| `defaultValue` | `CascadePickerViewValue` | — | 非受控默认值 |
| `onChange` | `(values: CascadePickerViewValue, selectedOptions: CascadeOption[]) => void` | — | 值变化回调；`selectedOptions` 为从根到当前选中项的路径 |
| `rows` | `number` | `3` | 每列 `PickerView` 一次显示几行 |
| `className` | `string` | — | 根节点额外类名（根节点类名前缀见下文「样式定制」） |
| （其余） | — | — | 继承 `JSXDivProps`（与 `type.tsx` 中 `Omit` 一致） |

其中 `CascadePickerViewValue` 为 `(string | number)[]`。

## CascadeOption

| 属性       | 类型               | 默认值  | 说明         |
| ---------- | ------------------ | ------- | ------------ |
| `label`    | `string`           | —       | 选项展示文本 |
| `value`    | `string \| number` | —       | 选项值       |
| `disabled` | `boolean`          | `false` | 是否禁用     |
| `children` | `CascadeOption[]`  | —       | 子级选项     |

## 样式定制

- `CascadePickerView` 的样式文件 `@import` 了 `PickerView` 的样式，列内滚轮外观与 **PickerView 相同**，可通过 `PickerView` 的 Less 变量定制（`PickerViewStyleVars`，定义于 `packages/mobile/src/exports/PickerView/type.tsx`），例如：`@picker-view-item-height`、`@picker-view-bg-color`、`@picker-view-mask-bg-color`、`@picker-view-indicator-border-color` 等。
- 根容器 CSS 类名前缀为 **`exd-cascade-picker-view`**（源码变量 `@cascade-picker-view-prefix`），布局为横向 `flex`，子列为等分 `flex: 1`。需要覆盖容器或列间距时，可结合 `className` 与上述前缀编写选择器。

## 相关组件

- [PickerView](PickerView.md)：单列滚轮面板，`CascadePickerView` 每列基于其实现
- [DatePickerView](DatePickerView.md) / [TimePickerView](TimePickerView.md)：同类「无弹层面板」用法参考
- `CascadePicker`：带弹层与触发器的级联选择器封装（源码 `packages/mobile/src/exports/CascadePicker/`）

<!--
Source:
- packages/mobile/src/exports/CascadePickerView/type.tsx
- packages/mobile/src/exports/CascadePickerView/index.tsx
- packages/mobile/src/exports/CascadePickerView/useCascadingPicker.ts
- packages/mobile/src/exports/CascadePickerView/style.less
- packages/mobile/src/exports/PickerView/style.less
-->
