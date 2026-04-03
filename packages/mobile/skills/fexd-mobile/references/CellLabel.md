---
name: CellLabel
description: 列表/表单行常用的标签布局外壳，在 UnstyledLabel 上挂载 exd-cell-label 样式与状态类名（成功/警告/错误/信息等）。
---

# CellLabel 单元格标签

列表/表单行常用的标签布局外壳，在 `UnstyledLabel` 上挂载 `exd-cell-label` 样式与状态类名（成功/警告/错误/信息等）。

```tsx
import { CellLabel } from '@fexd/mobile'
```

## 基础用法

```tsx
<CellLabel label="Title" placeholder="Please select">
  <span>Content</span>
</CellLabel>
```

```tsx
<CellLabel label="Status" type="error" helper="Error message" active>
  {content}
</CellLabel>
```

## Props

`CellLabelProps` 定义于 `packages/mobile/src/exports/CellLabel/type.tsx`，与 `UnstyledLabelProps` 相同。

### `UnstyledLabelPureProps`

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| ref | 引用 | `React.Ref<any>` |
| label | 展示名称 | `React.ReactNode` |
| placeholder | 占位提示 | `React.ReactNode` |
| autoHeight | 是否根据内容自动撑开高度 | `boolean` |
| prefix | 前缀 | `React.ReactNode` |
| suffix | 后缀 | `React.ReactNode` |
| helper | 辅助文案 | `React.ReactNode` |
| active | 是否激活状态 | `boolean` |
| type | 提示状态 | `'warn' \| 'error' \| 'info' \| 'success'` |
| disabled | 是否禁用 | `boolean` |
| children | 控件内容 | `React.ReactNode` |
| className | 类名 | `string` |
| style | 样式 | `JSXDivProps['style']` |
| keepHelperPlaceholder | 是否保留辅助文案占位高度 | `boolean` |
| onClick | 点击 | `(e?: any) => any` |
| useLabelWrapper | 是否使用 `<label>` 包裹 | `boolean` |
| wrapperProps | 容器元素属性 | `JSXDivProps` |
| labelProps | label 容器属性 | `JSXDivProps \| ((config: { prefixWidth: number }) => JSXDivProps)` |
| barProps | bar 容器属性 | `JSXLabelProps \| JSXDivProps` |
| contentProps | 内容容器属性 | `JSXDivProps` |
| placeholderProps | 占位容器属性 | `JSXDivProps` |
| prefixProps | 前缀容器属性 | `JSXDivProps` |
| suffixProps | 后缀容器属性 | `JSXDivProps` |
| helperProps | 辅助容器属性 | `JSXDivProps` |

另继承 `Omit<JSXDivProps, 'placeholder' \| 'disabled' \| 'prefix' \| 'ref' \| 'onClick'>`。

## 样式定制

样式变量见 `CellLabelStyleVars`（`@cell-label-*`，定义于 `type.tsx`）。

## 相关组件

`UnstyledLabel`；常被用作 `CellInput`、`CellPicker`、`CellDatePicker` 等组件的 `theme`。

<!--
Source:
- packages/mobile/src/exports/CellLabel/type.tsx
- packages/mobile/src/exports/CellLabel/index.tsx
- packages/mobile/src/exports/CellLabel/style.less
-->
