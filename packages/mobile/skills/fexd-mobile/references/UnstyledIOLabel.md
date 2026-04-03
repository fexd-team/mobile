---
name: UnstyledIOLabel
description: 无样式 IO 区域容器：在 UnstyledLabel 布局基础上增加错误态、禁用、聚焦与辅助前缀等 IO 语义，供各类「标签 + 控件」组合使用。
---

# UnstyledIOLabel 无样式 IO 标签

无样式 IO 区域容器：在 `UnstyledLabel` 布局基础上增加错误态、禁用、聚焦与辅助前缀等 IO 语义，供各类「标签 + 控件」组合使用。

```tsx
import { UnstyledIOLabel } from '@fexd/mobile'
```

## 基础用法

```tsx
import { UnstyledIOLabel } from '@fexd/mobile'
;<UnstyledIOLabel label="标题" placeholder="请选择" helper="说明文案">
  <span>控件槽位</span>
</UnstyledIOLabel>
```

## Props

`UnstyledIOLabelProps` 定义于 `packages/mobile/src/exports/UnstyledIOLabel/type.tsx`，继承 `Omit<UnstyledLabelPureProps, 'ref'>`，并增加下表字段；另与 `UnstyledLabelProps` / `JSXDivProps` 的合并规则见 `UnstyledLabel/type.tsx`。

### `UnstyledIOLabel` 相对 `UnstyledLabelPureProps` 的扩展

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `error` | `React.ReactNode` | - | 区域错误信息 |
| `disabled` | `boolean` | - | 是否禁用 |
| `focused` | `boolean` | - | 是否聚焦 |
| `hideErrorWhenFocusing` | `boolean` | `false` | 聚焦时是否隐藏错误信息 |
| `ref` | `React.Ref<UnstyledIOLabelRef>` | - | 引用 |
| `helperPrefix` | `React.ReactNode \| ((hasError: boolean) => React.ReactNode)` | - | 辅助信息前缀 |
| `theme` | `any` | - | 主题对象 |

### `UnstyledLabelPureProps`（布局与展示）

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `label` | `React.ReactNode` | - | 展示名称 |
| `placeholder` | `React.ReactNode` | - | 占位提示 |
| `autoHeight` | `boolean` | `true` | 是否根据内容自动撑开高度 |
| `prefix` | `React.ReactNode` | - | 前缀 |
| `suffix` | `React.ReactNode` | - | 后缀 |
| `helper` | `React.ReactNode` | - | 辅助文案 |
| `active` | `boolean` | - | 是否激活 |
| `type` | `'warn' \| 'error' \| 'info' \| 'success'` | - | 提示状态 |
| `children` | `React.ReactNode` | - | 控件内容 |
| `className` | `string` | - | 类名 |
| `style` | `JSXDivProps['style']` | - | 样式 |
| `keepHelperPlaceholder` | `boolean` | `false` | 是否保留辅助文案占位高度 |
| `onClick` | `(e?: any) => any` | - | 点击 |
| `useLabelWrapper` | `boolean` | `false` | 是否用 `label` 元素包裹 |
| `wrapperProps` | `JSXDivProps` | - | 容器元素属性 |
| `labelProps` | `JSXDivProps \| ((config: { prefixWidth: number }) => JSXDivProps)` | - | 标签区属性 |
| `barProps` | `JSXLabelProps \| JSXDivProps` | - | bar 区属性 |
| `contentProps` | `JSXDivProps` | - | 内容区属性 |
| `placeholderProps` | `JSXDivProps` | - | 占位区属性 |
| `prefixProps` | `JSXDivProps` | - | 前缀区属性 |
| `suffixProps` | `JSXDivProps` | - | 后缀区属性 |
| `helperProps` | `JSXDivProps` | - | 辅助区属性 |

### 其余

| 属性     | 类型                                                                               | 说明          |
| -------- | ---------------------------------------------------------------------------------- | ------------- |
| （继承） | `Omit<JSXDivProps, 'placeholder' \| 'disabled' \| 'prefix' \| 'ref' \| 'onClick'>` | 其余 div 属性 |

## 相关组件

- `UnstyledLabel`、`LineIOLabel`、`BlockIOLabel`、`CellIOLabel`

<!--
Source:
- packages/mobile/src/exports/UnstyledIOLabel/type.tsx
- packages/mobile/src/exports/UnstyledIOLabel/index.tsx
- packages/mobile/src/exports/UnstyledIOLabel/style.less
-->
