---
name: Badge
description: 在子元素角上展示数字、文案或圆点；也可独立展示。子组件 Badge.Stamp 提供戳记样式。
---

# Badge 徽章

在子元素角上展示数字、文案或圆点；也可独立展示。子组件 `Badge.Stamp` 提供戳记样式。

```tsx
import { Badge } from '@fexd/mobile'
```

## 基础用法

```tsx
import { Badge } from '@fexd/mobile'

<Badge content="5">
  <div className="box" />
</Badge>
<Badge content="新">
  <div className="box" />
</Badge>
```

```tsx
<Badge dot type="primary">
  <div className="box" />
</Badge>
<Badge dot type="danger">
  <div className="box" />
</Badge>
```

```tsx
<Badge content="999" overflowCount="99">
  <div className="box" />
</Badge>
<Badge content="999+" />
```

## Props（Badge）

`BadgeProps` 继承 `Omit<JSXDivProps, 'content'>`（`content` 为徽标文案，不是 HTML content 属性）。

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| className | `string` | - | 否 | 类名 |
| content | `React.ReactNode` | - | 否 | 徽标内容；与 `dot` 均为空时可能不展示 |
| visible | `boolean` | `true` | 否 | 是否显示 |
| dot | `boolean` | `false` | 否 | 仅显示小圆点 |
| showZero | `boolean` | `false` | 否 | 内容为 `0` 时是否展示 |
| color | `string` | - | 否 | 徽标文字颜色 |
| bgColor | `string` | - | 否 | 徽标背景色 |
| offset | `[number \| string, number \| string]` | - | 否 | 偏移 `[right%, top%]` |
| overflowCount | `number \| string` | - | 否 | 数字封顶显示 |
| style | `React.CSSProperties & Partial<Record<string, string>>` | - | 否 | 样式（可含 CSS 变量） |
| type | `'primary' \| 'success' \| 'warning' \| 'danger'` | - | 否 | 主题色（与内置状态样式配合） |
| children | `React.ReactNode` | - | 否 | 被包裹元素；无 children 时为独立徽标 |

## 子组件

### Badge.Stamp

`BadgeStampProps` 继承 `JSXDivProps`（`exports/Badge/Stamp/type.tsx`）。

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| className | `string` | - | 否 | 类名 |
| text | `React.ReactNode` | - | 否 | 戳记文案 |
| color | `string` | - | 否 | 颜色 |
| bgColor | `string` | - | 否 | 背景色 |
| style | `React.CSSProperties & Partial<Record<string, string>>` | - | 否 | 样式 |
| children | `React.ReactNode` | - | 否 | 被包裹元素；无 children 时为独立戳记 |

```tsx
<Badge.Stamp text="戳">
  <div className="box" />
</Badge.Stamp>
```

## 样式定制

- `Badge`：`Badge/type.tsx` 中 `BadgeStyleVars`（如 `@badge-background`、`@badge-dot-size`）。
- `Badge.Stamp`：`Badge/Stamp/type.tsx` 中 `BadgeStampStyleVars`。

## 相关组件

`Avatar`

<!--
Source:
- packages/mobile/src/exports/Badge/type.tsx
- packages/mobile/src/exports/Badge/index.zh.md
- packages/mobile/src/exports/Badge/index.tsx
- packages/mobile/src/exports/Badge/demos/
- packages/mobile/src/exports/Badge/style.less
-->
