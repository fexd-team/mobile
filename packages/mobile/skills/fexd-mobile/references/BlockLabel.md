---
name: BlockLabel
description: UnstyledLabel 的块状皮肤实现，负责浮动标签、条形边框、前缀/后缀/辅助文案等布局，用作 **Block*** 系列 IO 控件的 theme 根组件。
---

# BlockLabel 块状标签容器

`UnstyledLabel` 的块状皮肤实现，负责浮动标签、条形边框、前缀/后缀/辅助文案等布局，用作 **Block\*** 系列 IO 控件的 `theme` 根组件。

```tsx
import { BlockLabel } from '@fexd/mobile'
```

## 基础用法

```tsx
import { BlockLabel } from '@fexd/mobile'
;<BlockLabel label="标题" placeholder="请输入内容" active={false}>
  <span>控件区域</span>
</BlockLabel>
```

```tsx
<BlockLabel label="金额" type="error" helper="不能为空" disabled prefix={<span>¥</span>} />
```

## Props

`BlockLabelProps` 等价于 `UnstyledLabelProps`（`packages/mobile/src/exports/BlockLabel/type.tsx`），即 `UnstyledLabelPureProps` 与 `Omit<JSXDivProps, 'placeholder' | 'disabled' | 'prefix' | 'ref' | 'onClick'>` 的合并。

### UnstyledLabelPureProps

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| ref | `React.Ref<any>` | - | 否 | 引用 |
| label | `React.ReactNode` | `''` | 否 | 展示名称（`BlockLabel` `defaultProps` 中 placeholder 默认 `''`） |
| placeholder | `React.ReactNode` | `''` | 否 | 占位 |
| autoHeight | `boolean` | `false` | 否 | 是否自动撑开高度（`BlockLabel` `defaultProps`） |
| prefix | `React.ReactNode` | - | 否 | 前缀 |
| suffix | `React.ReactNode` | `null` | 否 | 后缀 |
| helper | `React.ReactNode` | `null` | 否 | 辅助文案 |
| active | `boolean` | `false` | 否 | 激活态 |
| type | `'warn' \| 'error' \| 'info' \| 'success'` | - | 否 | 状态样式 |
| disabled | `boolean` | - | 否 | 禁用 |
| children | `React.ReactNode` | - | 否 | 内容 |
| className | `string` | `''` | 否 | 类名 |
| style | `JSXDivProps['style']` | - | 否 | 样式（实现中会合并到 `barProps`） |
| keepHelperPlaceholder | `boolean` | `false` | 否 | 辅助区占位 |
| onClick | `(e?: any) => any` | `() => null` | 否 | 点击（传到 `wrapperProps`） |
| useLabelWrapper | `boolean` | `false` | 否 | 是否 label 包裹 |
| wrapperProps | `JSXDivProps` | `{}` | 否 | 外层容器 |
| labelProps | `JSXDivProps \| ((config: { prefixWidth: number }) => JSXDivProps)` | `{}` | 否 | 浮动标签 |
| barProps | `JSXLabelProps \| JSXDivProps` | - | 否 | 条形主容器 |
| contentProps | `JSXDivProps` | - | 否 | 内容区 |
| placeholderProps | `JSXDivProps` | - | 否 | 占位区 |
| prefixProps | `JSXDivProps` | - | 否 | 前缀区 |
| suffixProps | `JSXDivProps` | - | 否 | 后缀区 |
| helperProps | `JSXDivProps` | - | 否 | 辅助区 |

### 其他

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| （继承） | `Omit<JSXDivProps, 'placeholder' \| 'disabled' \| 'prefix' \| 'ref' \| 'onClick'>` | - | 否 | 其余 div 属性 |

## 相关组件

- 无样式：`UnstyledLabel`
- 使用本组件作为 `theme`：`BlockInput`、`BlockDatePicker`、`BlockPicker`、`BlockTimePicker`、`BlockIOLabel` 等

## 样式定制

`BlockLabelStyleVars` 变量较多，以下为节选；完整见 `type.tsx` 中 `DOC_BlockLabelStyleVars`。

| 变量                                                                    | 说明                   |
| ----------------------------------------------------------------------- | ---------------------- |
| `@block-label-wrapper-padding-y`                                        | 包裹容器纵向内边距     |
| `@block-label-bar-height`                                               | 标签栏高度             |
| `@block-label-bar-border-radius`                                        | 标签栏圆角             |
| `@block-label-bar-border-color`                                         | 标签栏边框色           |
| `@block-label-content-padding-x` / `-y` / `-padding-top-active`         | 内容区内边距           |
| `@block-label-label-font-size` / `-active`                              | 标签字号               |
| `@block-label-placeholder-color`                                        | 占位色                 |
| `@block-label-info-border-color` / `@block-label-error-border-color` 等 | 各 `type` 边框与辅助色 |
| `@block-label-disabled-border-color` / `@block-label-disabled-color`    | 禁用态                 |

## 注意事项

- `BlockLabel/index.tsx` 将传入的 `style` 合并进 `barProps.style`，外层 `UnstyledLabel` 的 `style` 传空对象。
- 作为 **Block\*** 主题的基座，与 `Cell*`、`Line*` 等 IO 变体并列，选型时保持同一表单内视觉一致即可。

<!--
Source:
- packages/mobile/src/exports/BlockLabel/type.tsx
- packages/mobile/src/exports/BlockLabel/index.tsx
- packages/mobile/src/exports/BlockLabel/style.less
-->
