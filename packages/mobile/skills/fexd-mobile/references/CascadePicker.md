---
name: CascadePicker
description: 点击触发弹层，在 CascadePickerView 中按列级联选择；确认后触发 onChange，值为各级 value 组成的数组。
---

# CascadePicker 级联选择器

点击触发弹层，在 `CascadePickerView` 中按列级联选择树形 `options`；确认选择后触发 `onChange`，回调参数为 `CascadePickerViewValue`（各级 `value` 的数组）及路径上的 `CascadeOption[]`。与单列 `Picker` 的分层关系类似，见包内「IO 组件的分层设计」及 `Picker.md`。

```tsx
import {
  CascadePicker,
  CascadePickerView,
  LineCascadePicker,
  BlockCascadePicker,
  CellCascadePicker,
} from '@fexd/mobile'
```

## 选用建议

本族为 **IO 分层组件**：底层视图为 `CascadePickerView`；`CascadePicker` 负责弹层与自定义触发区；`UnstyledIOCascadePicker` 将级联能力与 `UnstyledIOLabel` 式标签区组合；`LineCascadePicker`、`BlockCascadePicker`、`CellCascadePicker` 分别对应行内、块级、单元格三种主题形态（均 **去掉** `theme`，由样式封装）。

| 场景                               | 建议                         |
| ---------------------------------- | ---------------------------- |
| 自定义按钮、任意触发区域           | `CascadePicker` + `children` |
| 表单行：标签 + 占位 + 箭头         | `LineCascadePicker`          |
| 块级展示                           | `BlockCascadePicker`         |
| 列表/Cell 列表中的项               | `CellCascadePicker`          |
| 仅需滚轮视图（嵌入自有弹层或页面） | `CascadePickerView`          |

## 基础用法

示例来源：`packages/mobile/src/exports/CascadePicker/demos/basic.tsx`。

```tsx
import React, { useState } from 'react'
import { CascadePicker, Button } from '@fexd/mobile'

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
        ],
      },
      {
        label: '温州',
        value: '温州',
        children: [{ label: '鹿城区', value: '鹿城区' }],
      },
    ],
  },
]

export default () => {
  const [value, setValue] = useState<(string | number)[]>()
  return (
    <CascadePicker options={options} value={value} onChange={(values, selectedOptions) => setValue(values)}>
      {(selectedValues, selectedOptions) => (
        <Button>{selectedOptions?.length ? selectedOptions.map((o) => o.label).join(' / ') : '请选择地区'}</Button>
      )}
    </CascadePicker>
  )
}
```

## CascadePickerView

仅级联滚轮区域，无弹层。`PureCascadePickerViewProps` 定义于 `packages/mobile/src/exports/CascadePickerView/type.tsx`；`CascadePickerViewProps` 另与 `Omit<JSXDivProps, 'onChange' | 'defaultValue'>` 合并。

示例来源：`packages/mobile/src/exports/CascadePicker/demos/cascadePickerView.tsx`（节选）。

```tsx
import React, { useState } from 'react'
import { CascadePickerView, DemoBlock } from '@fexd/mobile'

export default () => {
  const [info, setInfo] = useState('')
  return (
    <CascadePickerView
      options={options}
      onChange={(values, selectedOptions) => {
        setInfo(selectedOptions.map((o) => o.label).join(' / '))
      }}
    />
  )
}
```

### `CascadeOption`

| 属性       | 类型               | 说明                     |
| ---------- | ------------------ | ------------------------ |
| `label`    | `string`           | 选项展示文本             |
| `value`    | `string \| number` | 选项值                   |
| `disabled` | `boolean`          | 是否禁用（默认 `false`） |
| `children` | `CascadeOption[]`  | 子级选项                 |

### `CascadePickerView` 视图相关

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `options` | `CascadeOption[]` | 树形级联数据 |
| `value` | `CascadePickerViewValue` | 受控值，各级选中值的数组 |
| `defaultValue` | `CascadePickerViewValue` | 非受控默认值 |
| `onChange` | `(values: CascadePickerViewValue, selectedOptions: CascadeOption[]) => void` | 值变化回调 |
| `rows` | `number` | 滚轮可见行数（默认 `3`） |
| `className` | `string` | 自定义类名 |
| （其余） | — | 继承 `JSXDivProps` 且排除 `onChange`、`defaultValue` |

`CascadePickerViewValue` 为 `(string | number)[]`。

## CascadePicker

`CascadePickerProps` 定义于 `packages/mobile/src/exports/CascadePicker/type.tsx`，由下列类型交叉合并：

- `Omit<BasicPickerProps, 'value' | 'defaultValue' | 'onChange' | 'children'>`
- `Omit<CascadePickerViewProps, 'children' | 'onChange'>`
- `PureCascadePickerProps`

`CascadePickerRef` 同 `BasicPickerRef`（`packages/mobile/src/exports/usePickerProps/type.tsx` 中为 `HTMLDivElement`）。

### 级联视图相关（来自 `CascadePickerViewProps`，已排除 `children`、`onChange`）

| 属性           | 类型                     | 说明                                                                |
| -------------- | ------------------------ | ------------------------------------------------------------------- |
| `options`      | `CascadeOption[]`        | 树形选项                                                            |
| `value`        | `CascadePickerViewValue` | 受控值                                                              |
| `defaultValue` | `CascadePickerViewValue` | 非受控默认值                                                        |
| `rows`         | `number`                 | 滚轮可见行数（`CascadePickerView` 上默认 `3`）                      |
| `className`    | `string`                 | 类名                                                                |
| （其余）       | —                        | 继承 `JSXDivProps` 且排除 `onChange`、`defaultValue` 等与合并冲突项 |

说明：`CascadePicker` 在弹层内渲染 `CascadePickerView` 时，源码中固定传入 `rows={5}`（见 `packages/mobile/src/exports/CascadePicker/index.tsx`）。

### 弹层与选择器基座（来自 `BasicPickerProps`，已排除 IO 的 `value` / `defaultValue` / `onChange` / `children`）

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `popupProps` | `Omit<PopupProps, 'visible'>` | 弹出层配置（`PopupProps` 见 `Popup/type.tsx`） |
| `onConfirm` | `(value: string) => (boolean \| void) \| Promise<boolean \| void>` | 确认 |
| `onCancel` | `() => (boolean \| void) \| Promise<boolean \| void>` | 取消 |
| `headerRight` / `headerLeft` | `React.ReactNode` | 头部左右 |
| `disabled` | `boolean` | 是否禁用（默认 `false`） |
| `filterIOValue` | `(value: any) => boolean` | 来自 `SelectionFieldProps` / `IOProps`（`useSelectionFieldProps/type.tsx`），返回 `false` 时不触发 `onChange` |
| `onEnter` / `onExit` / `onExited` | 见 `PopupProps` / `TransitionProps` | 过渡生命周期 |
| `ref` | `React.Ref<CascadePickerRef>` | 引用 |

### 仅 `PureCascadePickerProps` 显式声明

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `onChange` | `(values: CascadePickerViewValue, selectedOptions: CascadeOption[]) => void` | 确认选中后的回调 |
| `children` | `React.ReactNode \| ((selectedValues?: CascadePickerViewValue, selectedOptions?: CascadeOption[]) => React.ReactNode)` | 触发区域，支持函数式子节点 |

## UnstyledIOCascadePicker

无样式 IO 层：在 `CascadePicker` 能力上组合 `UnstyledIOLabel` 式标签区（并排除 `CascadePickerProps` 的 `prefix`、`placeholder`），供 `Line` / `Block` / `Cell` 封装。

`PureUnstyledIOCascadePickerProps` 定义于 `packages/mobile/src/exports/UnstyledIOCascadePicker/type.tsx`，合并：

- `Omit<UnstyledIOLabelProps, 'children' | 'onClick' | 'defaultValue' | 'onChange'>`（其中 `onChange` 与 `PureCascadePickerProps` 合并）
- `Omit<PureCascadePickerProps, 'onChange'>`
- 下列字段

| 属性              | 类型                                    | 说明                                               |
| ----------------- | --------------------------------------- | -------------------------------------------------- |
| `classNamePrefix` | `string`                                | 类名前缀                                           |
| `className`       | `string`                                | 类名                                               |
| `label`           | `React.ReactNode`                       | 控件名称                                           |
| `labelType`       | `UnstyledIOLabelProps['type']`          | 标签提示状态                                       |
| `ref`             | `React.Ref<UnstyledIOCascadePickerRef>` | `UnstyledIOCascadePickerRef` 同 `CascadePickerRef` |
| `theme`           | `UnstyledIOLabelProps['theme']`         | 标签主题                                           |
| `arrowIcon`       | `React.ReactNode`                       | 右侧箭头图标（默认 `<ChevronForwardSharp />`）     |
| `separator`       | `string`                                | 展示文案分隔符（默认 `' / '`）                     |

`UnstyledIOCascadePickerProps` 另与 `Omit<CascadePickerProps, 'prefix' | 'placeholder'>` 合并（详见同文件）。

其余标签、辅助、错误态等见 `skills/fexd-mobile/references/UnstyledIOLabel.md`。

## LineCascadePicker、BlockCascadePicker、CellCascadePicker

三者均在 `UnstyledIOCascadePicker` 基础上去掉 `theme`，并各自定义 `StyleVars`（Less 变量，类型见各 `type.tsx` 中 `*StyleVars` / `DOC_*StyleVars`）。

### 示例（Line）

```tsx
<LineCascadePicker options={options} placeholder="请选择地区" value={value} onChange={(values) => setValue(values)} />
<LineCascadePicker options={options} placeholder="错误状态" error="请选择地区" helper="辅助文本" />
<LineCascadePicker disabled placeholder="禁用状态" />
```

### `BlockCascadePickerStyleVars`（`packages/mobile/src/exports/BlockCascadePicker/type.tsx`）

| 变量                                         | 默认（注释） |
| -------------------------------------------- | ------------ |
| `@block-cascade-picker-value-font-size`      | `14px`       |
| `@block-cascade-picker-disabled-color`       | `#999`       |
| `@block-cascade-picker-disabled-arrow-color` | `#ccc`       |
| `@block-cascade-picker-clear-color`          | `#ccc`       |
| `@block-cascade-picker-arrow-font-size`      | `18px`       |
| `@block-cascade-picker-arrow-color`          | `#a5a0a1`    |

### `CellCascadePickerStyleVars`（`packages/mobile/src/exports/CellCascadePicker/type.tsx`）

| 变量                                   | 默认（注释）       |
| -------------------------------------- | ------------------ |
| `@cell-cascade-picker-disabled-color`  | `ant-color-gray-7` |
| `@cell-cascade-picker-clear-color`     | `ant-color-gray-5` |
| `@cell-cascade-picker-arrow-font-size` | `18px`             |
| `@cell-cascade-picker-arrow-color`     | `ant-color-gray-6` |

### `LineCascadePickerStyleVars`（`packages/mobile/src/exports/LineCascadePicker/type.tsx`）

| 变量                                   | 默认（注释）       |
| -------------------------------------- | ------------------ |
| `@line-cascade-picker-disabled-color`  | `ant-color-gray-7` |
| `@line-cascade-picker-clear-color`     | `ant-color-gray-5` |
| `@line-cascade-picker-arrow-font-size` | `18px`             |
| `@line-cascade-picker-arrow-color`     | `ant-color-gray-6` |

`PureLineCascadePickerProps` / `PureBlockCascadePickerProps` / `PureCellCascadePickerProps` 均为 `Omit<PureUnstyledIOCascadePickerProps, 'theme'>` 与对应 `ref` 合并（见各 `type.tsx`）。

## 样式定制

- `CascadePicker` 自身样式见 `packages/mobile/src/exports/CascadePicker/style.less`。
- `CascadePickerView` 见 `packages/mobile/src/exports/CascadePickerView/style.less`。
- `Line` / `Block` / `Cell` 变体变量见上表与各组件 `type.tsx` 中 `DOC_*StyleVars`。

## 相关组件

- `CascadePickerView`
- `UnstyledIOCascadePicker`、`LineCascadePicker`、`BlockCascadePicker`、`CellCascadePicker`
- 单列对照：`Picker`、`LinePicker`、`CellPicker`（见对应 reference）

<!--
Source:
- packages/mobile/src/exports/CascadePicker/type.tsx
- packages/mobile/src/exports/CascadePicker/index.tsx
- packages/mobile/src/exports/CascadePicker/demos/
- packages/mobile/src/exports/CascadePicker/style.less
- packages/mobile/src/exports/CascadePickerView/type.tsx
- packages/mobile/src/exports/CascadePickerView/index.tsx
- packages/mobile/src/exports/UnstyledIOCascadePicker/type.tsx
- packages/mobile/src/exports/LineCascadePicker/type.tsx
- packages/mobile/src/exports/BlockCascadePicker/type.tsx
- packages/mobile/src/exports/CellCascadePicker/type.tsx
- packages/mobile/src/exports/usePickerProps/type.tsx
- packages/mobile/src/exports/useSelectionFieldProps/type.tsx
-->
