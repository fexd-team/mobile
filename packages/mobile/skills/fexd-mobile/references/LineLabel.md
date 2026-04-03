---
name: LineLabel
description: UnstyledLabel 的行内（下划线）皮肤实现，负责浮动标签、条形底边、前缀/后缀/辅助文案等布局，用作 **Line*** 系列 IO 控件的 theme 根组件。
---

# LineLabel 行内标签容器

`UnstyledLabel` 的行内（下划线）皮肤实现，负责浮动标签、条形底边、前缀/后缀/辅助文案等布局，用作 **Line\*** 系列 IO 控件的 `theme` 根组件。

```tsx
import { LineLabel } from '@fexd/mobile'
```

## 基础用法

```tsx
import { LineLabel } from '@fexd/mobile'
;<LineLabel label="标题" placeholder="请输入内容" active={false}>
  <span>控件区域</span>
</LineLabel>
```

```tsx
<LineLabel label="金额" type="error" helper="不能为空" disabled prefix={<span>¥</span>} />
```

## Props

`LineLabelProps` 等价于 `UnstyledLabelProps`（`packages/mobile/src/exports/LineLabel/type.tsx`），即 `UnstyledLabelPureProps` 与 `Omit<JSXDivProps, 'placeholder' | 'disabled' | 'prefix' | 'ref' | 'onClick'>` 的合并。

### UnstyledLabelPureProps

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| ref | `React.Ref<any>` | - | 否 | 引用 |
| label | `React.ReactNode` | - | 否 | 展示名称（未填时 `LineLabel` 会将 `placeholder` 默认用于 `label`，见实现） |
| placeholder | `React.ReactNode` | `''` | 否 | 占位（`LineLabel` `defaultProps`） |
| autoHeight | `boolean` | `false` | 否 | 是否自动撑开高度（`LineLabel` `defaultProps`） |
| prefix | `React.ReactNode` | - | 否 | 前缀 |
| suffix | `React.ReactNode` | `null` | 否 | 后缀（`LineLabel` `defaultProps`） |
| helper | `React.ReactNode` | `null` | 否 | 辅助文案（`LineLabel` `defaultProps`） |
| active | `boolean` | `false` | 否 | 激活态（`LineLabel` `defaultProps`） |
| type | `'warn' \| 'error' \| 'info' \| 'success'` | - | 否 | 状态样式 |
| disabled | `boolean` | - | 否 | 禁用 |
| children | `React.ReactNode` | - | 否 | 内容 |
| className | `string` | `''` | 否 | 类名（`LineLabel` `defaultProps`） |
| style | `JSXDivProps['style']` | - | 否 | 样式（实现中会合并到 `barProps`） |
| keepHelperPlaceholder | `boolean` | `false` | 否 | 辅助区占位（`LineLabel` `defaultProps`） |
| onClick | `(e?: any) => any` | `() => null` | 否 | 点击（传到 `wrapperProps`，`LineLabel` `defaultProps`） |
| useLabelWrapper | `boolean` | `false` | 否 | 是否 label 包裹 |
| wrapperProps | `JSXDivProps` | `{}` | 否 | 外层容器（`LineLabel` 会合并 `onClick` 等） |
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
- 使用本组件作为 `theme`：`LineInput`、`LineDatePicker`、`LinePicker`、`LineTimePicker`、`LineIOLabel` 等

## 样式定制

`LineLabelStyleVars` 变量较多，以下为节选；完整见 `type.tsx` 中 `DOC_LineLabelStyleVars`。

| 变量 | 说明 |
| --- | --- |
| `@line-label-wrapper-padding-y` | 包裹容器上下内边距 |
| `@line-label-bar-padding-top` / `-bottom` / `-margin-bottom` | 标签栏内边距与下边距 |
| `@line-label-bar-border-color` | 标签栏边框颜色 |
| `@line-label-content-height` / `-font-size` / `-color` | 内容区尺寸与文字 |
| `@line-label-label-height` / `-font-size` / `-font-size-active` / `-color` / `-bottom` | 浮动标签 |
| `@line-label-placeholder-color` | 占位色 |
| `@line-label-helper-font-size` / `-min-height` | 辅助文案 |
| `@line-label-prefix-padding-right` / `@line-label-suffix-height` | 前后缀区域 |
| `@line-label-caret-color` | 光标颜色 |
| `@line-label-info-border-color` / `@line-label-success-border-color` / `@line-label-warn-border-color` / `@line-label-error-border-color` 及对应 `*-helper-color` | 各 `type` 边框与辅助色 |
| `@line-label-disabled-color` | 禁用态文字颜色 |

## 注意事项

- `LineLabel/index.tsx` 将传入的 `style` 合并进 `barProps.style`，外层 `UnstyledLabel` 的 `style` 传空对象。
- 作为 **Line\*** 主题的基座，与 `Cell*`、`Block*` 等 IO 变体并列，选型时保持同一表单内视觉一致即可。

<!--
Source:
- packages/mobile/src/exports/LineLabel/type.tsx
- packages/mobile/src/exports/LineLabel/index.tsx
- packages/mobile/src/exports/LineLabel/style.less
-->
