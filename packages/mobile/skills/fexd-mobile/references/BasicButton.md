---
name: BasicButton
description: 轻量按钮组件，支持多种类型、尺寸、形状与填充样式，可渲染为 button 或自定义标签。
---

# BasicButton 基础按钮

轻量按钮组件，支持多种类型、尺寸、形状与填充样式，可渲染为 `button` 或自定义标签。

```tsx
import { BasicButton } from '@fexd/mobile'
```

## 基础用法

```tsx
<BasicButton type="primary" onClick={() => {}}>
  Primary
</BasicButton>
```

```tsx
<BasicButton type="plain" fill="outline" size="small">
  Outline
</BasicButton>
```

```tsx
<BasicButton block shape="round">
  Block round
</BasicButton>
```

## Props

`BasicButtonProps` = `Omit<JSXButtonProps, 'ref' | 'onClick'>` 与 `PureBasicButtonProps` 合并（`exports/BasicButton/type.tsx`）。除下表外，还支持标准 `button` 的 HTML 属性（如 `name`、`form`、`aria-*` 等，`onClick` 见下表）。

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| type | `'plain' \| 'primary' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `'plain'` | 否 | 视觉类型 |
| size | `'large' \| 'normal' \| 'small' \| 'mini'` | `'normal'` | 否 | 尺寸 |
| shape | `'square' \| 'round' \| 'unset'` | `'square'` | 否 | 形状 |
| fill | `'solid' \| 'outline' \| 'none'` | `'solid'` | 否 | 填充样式 |
| block | `boolean` | `false` | 否 | 块级宽度 |
| disabled | `boolean` | `false` | 否 | 禁用；禁用时点击不会触发 `onClick` |
| className | `string` | - | 否 | 类名 |
| children | `React.ReactNode` | - | 否 | 内容 |
| onClick | `JSXButtonProps['onClick']` | - | 否 | 点击事件 |
| as | `string \| React.ComponentFactory<any, any> \| React.FunctionComponentFactory<any>` | `'button'` | 否 | 底层标签或组件 |
| ref | `React.Ref<any>` | - | 否 | 引用 |

## 样式定制

Less 变量见 `BasicButton/type.tsx` 中 `BasicButtonStyleVars`（高度缩放、边框、圆角、禁用透明度、激活态遮罩等）。

## 相关组件

`Button`（在基础能力上扩展 `icon`、`loading` 等）

<!--
Source:
- packages/mobile/src/exports/BasicButton/type.tsx
- packages/mobile/src/exports/BasicButton/index.tsx
- packages/mobile/src/exports/BasicButton/style.less
-->
