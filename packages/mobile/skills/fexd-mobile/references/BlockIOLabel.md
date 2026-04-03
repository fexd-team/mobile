---
name: BlockIOLabel
description: 块状 IO 标签
---

# BlockIOLabel 块状 IO 标签

在 `UnstyledIOLabel` 上固定 `theme` 为 `BlockLabel` 的 IO 区域标签容器，用于与 `BlockInput`、`BlockPicker` 等块状控件配套。属于 IO 分层体系中 **Block\*** 主题变体。

```tsx
import { BlockIOLabel } from '@fexd/mobile'
```

## 基础用法

```tsx
import { BlockIOLabel } from '@fexd/mobile'
;<BlockIOLabel label="姓名" placeholder="请输入" type="info" helper="辅助说明">
  <input />
</BlockIOLabel>
```

```tsx
<BlockIOLabel label="标题" error="出错提示" disabled hideErrorWhenFocusing />
```

## Props

`BlockIOLabelProps` 为 `Omit<UnstyledIOLabelProps, 'theme'>`（`packages/mobile/src/exports/BlockIOLabel/type.tsx`）。

`UnstyledIOLabelProps` 继承 `Omit<UnstyledLabelPureProps, 'ref'>`，并增加下列字段；同时仍受 `UnstyledLabelProps` 与 `JSXDivProps` 合并规则约束（见 `UnstyledLabel/type.tsx`）。

### UnstyledIOLabel 扩展

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| error | `React.ReactNode` | - | 否 | 错误信息 |
| disabled | `boolean` | `false` | 否 | 禁用（组件 `defaultProps`） |
| focused | `boolean` | - | 否 | 是否聚焦 |
| hideErrorWhenFocusing | `boolean` | `true` | 否 | 聚焦时隐藏错误（组件 `defaultProps`） |
| helperPrefix | `React.ReactNode \| ((hasError: boolean) => React.ReactNode)` | - | 否 | 辅助前缀 |
| ref | `React.Ref<UnstyledIOLabelRef>` | - | 否 | 引用 |

### UnstyledLabelPureProps（标签布局）

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| label | `React.ReactNode` | - | 否 | 展示名称 |
| placeholder | `React.ReactNode` | - | 否 | 占位 |
| autoHeight | `boolean` | `true` | 否 | 内容区是否自动增高 |
| prefix | `React.ReactNode` | - | 否 | 前缀 |
| suffix | `React.ReactNode` | - | 否 | 后缀 |
| helper | `React.ReactNode` | - | 否 | 辅助文案 |
| active | `boolean` | - | 否 | 激活态 |
| type | `'warn' \| 'error' \| 'info' \| 'success'` | `info` | 否 | 状态样式（`BlockIOLabel` `defaultProps`） |
| children | `React.ReactNode` | - | 否 | 控件内容 |
| className | `string` | - | 否 | 类名 |
| style | `JSXDivProps['style']` | - | 否 | 样式 |
| keepHelperPlaceholder | `boolean` | `false` | 否 | 辅助区占位 |
| onClick | `(e?: any) => any` | - | 否 | 点击 |
| useLabelWrapper | `boolean` | `false` | 否 | 是否用 label 包裹 |
| wrapperProps | `JSXDivProps` | - | 否 | 外层 |
| labelProps | `JSXDivProps \| ((config: { prefixWidth: number }) => JSXDivProps)` | - | 否 | 标签区 |
| barProps | `JSXLabelProps \| JSXDivProps` | - | 否 | 条形区 |
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

- 无样式：`UnstyledIOLabel`
- 皮肤：`BlockLabel`
- 常与 `BlockInput` 等组合使用

## 样式定制

`BlockIOLabelStyleVars` / `DOC_BlockIOLabelStyleVars`：

| 变量                                 | 说明         | 默认      |
| ------------------------------------ | ------------ | --------- |
| `@block-io-label-disabled-color`     | 禁用文字色   | `#c2bcbe` |
| `@block-io-label-prefix-line-height` | 前缀图标行高 | `22px`    |
| `@block-io-label-prefix-font-size`   | 前缀图标字号 | `14px`    |
| `@block-io-label-prefix-color`       | 前缀图标颜色 | `#c2bcbe` |

## 注意事项

- `type` 与 `hideErrorWhenFocusing` 的默认值在 `BlockIOLabel/index.tsx` 的 `defaultProps` 中设定，与 `UnstyledIOLabel` 类型默认值注释可能不一致，以封装为准。

<!--
Source:
- packages/mobile/src/exports/BlockIOLabel/type.tsx
- packages/mobile/src/exports/BlockIOLabel/index.tsx
- packages/mobile/src/exports/BlockIOLabel/style.less
-->
