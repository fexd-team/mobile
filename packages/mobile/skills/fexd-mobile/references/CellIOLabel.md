---
name: CellIOLabel
description: 带错误、聚焦、辅助前缀等能力的表单行标签容器；基于 UnstyledIOLabel，默认 theme 为 CellLabel，属于 **IO 主题的 Cell 变体**。
---

# CellIOLabel 单元格 IO 标签

带错误、聚焦、辅助前缀等能力的表单行标签容器；基于 `UnstyledIOLabel`，默认 `theme` 为 `CellLabel`，属于 **IO 主题的 Cell 变体**。

```tsx
import { CellIOLabel } from '@fexd/mobile'
```

## 基础用法

```tsx
<CellIOLabel label="Name" helper="Optional">
  <input />
</CellIOLabel>
```

```tsx
<CellIOLabel label="Phone" type="error" error="Invalid format" focused={false}>
  {children}
</CellIOLabel>
```

## Props

`CellIOLabelProps` 定义于 `packages/mobile/src/exports/CellIOLabel/type.tsx`，为 `Omit<UnstyledIOLabelProps, 'theme'>`。

### 自 `UnstyledIOLabelProps`（无 `theme`）

| 属性                  | 说明                   | 类型                                                          |
| --------------------- | ---------------------- | ------------------------------------------------------------- |
| error                 | 区域错误               | `React.ReactNode`                                             |
| disabled              | 是否禁用               | `boolean`                                                     |
| focused               | 是否聚焦               | `boolean`                                                     |
| hideErrorWhenFocusing | 聚焦时是否隐藏错误信息 | `boolean`                                                     |
| helperPrefix          | 辅助信息前缀           | `React.ReactNode \| ((hasError: boolean) => React.ReactNode)` |
| ref                   | 实例引用               | `React.Ref<UnstyledIOLabelRef>`                               |

### 自 `UnstyledLabelPureProps`（经 `UnstyledIOLabel` 合并）

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| label | 展示名称 | `React.ReactNode` |
| placeholder | 占位提示 | `React.ReactNode` |
| autoHeight | 是否根据内容自动撑开高度 | `boolean` |
| prefix | 前缀 | `React.ReactNode` |
| suffix | 后缀 | `React.ReactNode` |
| helper | 辅助文案 | `React.ReactNode` |
| active | 是否激活 | `boolean` |
| type | 提示状态 | `'warn' \| 'error' \| 'info' \| 'success'` |
| children | 控件内容 | `React.ReactNode` |
| className | 类名 | `string` |
| style | 样式 | `JSXDivProps['style']` |
| keepHelperPlaceholder | 是否保留辅助占位高度 | `boolean` |
| onClick | 点击 | `(e?: any) => any` |
| useLabelWrapper | 是否用 `<label>` 包裹 | `boolean` |
| wrapperProps | 容器属性 | `JSXDivProps` |
| labelProps | label 容器属性 | `JSXDivProps \| ((config: { prefixWidth: number }) => JSXDivProps)` |
| barProps | bar 容器属性 | `JSXLabelProps \| JSXDivProps` |
| contentProps | 内容容器属性 | `JSXDivProps` |
| placeholderProps | 占位容器属性 | `JSXDivProps` |
| prefixProps | 前缀容器属性 | `JSXDivProps` |
| suffixProps | 后缀容器属性 | `JSXDivProps` |
| helperProps | 辅助容器属性 | `JSXDivProps` |

另继承 `Omit<JSXDivProps, 'placeholder' \| 'disabled' \| 'prefix' \| 'ref' \| 'onClick'>`（见 `UnstyledLabel/type.tsx`）。

组件默认属性（实现层）：`disabled: false`，`type: 'info'`，`hideErrorWhenFocusing: true`（见 `index.tsx`）。

## 样式定制

样式变量见 `CellIOLabelStyleVars`（`@cell-io-label-*`，定义于 `type.tsx`）。

## 相关组件

`UnstyledIOLabel`、`CellLabel`

<!--
Source:
- packages/mobile/src/exports/CellIOLabel/type.tsx
- packages/mobile/src/exports/CellIOLabel/index.tsx
- packages/mobile/src/exports/CellIOLabel/style.less
-->
