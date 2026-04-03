---
name: UnstyledLabel
description: 无样式 IO 底层布局组件：提供 label / placeholder / prefix / suffix / helper 等结构槽位与容器 props，不包含业务皮肤。
---

# UnstyledLabel 无样式标签布局

无样式 IO 底层布局组件：提供 label / placeholder / prefix / suffix / helper 等结构槽位与容器 props，不包含业务皮肤。

```tsx
import { UnstyledLabel } from '@fexd/mobile'
```

## 基础用法

```tsx
import { UnstyledLabel } from '@fexd/mobile'
;<UnstyledLabel label="标题" placeholder="请输入">
  <input />
</UnstyledLabel>
```

## Props

`UnstyledLabelProps` 定义于 `packages/mobile/src/exports/UnstyledLabel/type.tsx`，由 `UnstyledLabelPureProps` 与 `Omit<JSXDivProps, 'placeholder' | 'disabled' | 'prefix' | 'ref' | 'onClick'>` 合并。

### `UnstyledLabelPureProps`

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `ref` | `React.Ref<any>` | - | 引用 |
| `label` | `React.ReactNode` | - | 展示名称 |
| `placeholder` | `React.ReactNode` | - | 占位提示 |
| `autoHeight` | `boolean` | `true` | 是否根据内容自动撑开高度 |
| `prefix` | `React.ReactNode` | - | 前缀 |
| `suffix` | `React.ReactNode` | - | 后缀 |
| `helper` | `React.ReactNode` | - | 辅助文案 |
| `active` | `boolean` | - | 是否激活 |
| `type` | `'warn' \| 'error' \| 'info' \| 'success'` | - | 提示状态 |
| `disabled` | `boolean` | - | 是否禁用 |
| `children` | `React.ReactNode` | - | 控件内容 |
| `className` | `string` | - | 类名 |
| `style` | `JSXDivProps['style']` | - | 样式 |
| `keepHelperPlaceholder` | `boolean` | `false` | 是否保留辅助文案占位高度 |
| `onClick` | `(e?: any) => any` | - | 点击 |
| `useLabelWrapper` | `boolean` | `false` | 是否使用 `label` 标签包裹 |
| `wrapperProps` | `JSXDivProps` | - | 容器元素属性 |
| `labelProps` | `JSXDivProps \| ((config: { prefixWidth: number }) => JSXDivProps)` | - | label 容器属性 |
| `barProps` | `JSXLabelProps \| JSXDivProps` | - | bar 容器属性 |
| `contentProps` | `JSXDivProps` | - | content 容器属性 |
| `placeholderProps` | `JSXDivProps` | - | placeholder 容器属性 |
| `prefixProps` | `JSXDivProps` | - | prefix 容器属性 |
| `suffixProps` | `JSXDivProps` | - | suffix 容器属性 |
| `helperProps` | `JSXDivProps` | - | helper 容器属性 |

### 其余

| 属性     | 类型                                                                               | 说明          |
| -------- | ---------------------------------------------------------------------------------- | ------------- |
| （继承） | `Omit<JSXDivProps, 'placeholder' \| 'disabled' \| 'prefix' \| 'ref' \| 'onClick'>` | 其余 div 属性 |

## 相关组件

- `UnstyledIOLabel`、`LineLabel`、`BlockLabel`

<!--
Source:
- packages/mobile/src/exports/UnstyledLabel/type.tsx
- packages/mobile/src/exports/UnstyledLabel/index.tsx
- packages/mobile/src/exports/UnstyledLabel/style.less
-->
