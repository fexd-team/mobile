---
name: Alert
description: 用于展示警告、成功、信息、错误等提示，支持标题、关闭、描边/填充变体与自定义图标。
---

# Alert 警告

用于展示警告、成功、信息、错误等提示，支持标题、关闭、描边/填充变体与自定义图标。

```tsx
import { Alert } from '@fexd/mobile'
```

## 基础用法

```tsx
import { Alert } from '@fexd/mobile'

<Alert type="warning">This is a warning alert!</Alert>
<Alert type="success">This is a success alert!</Alert>
<Alert type="info">This is an info alert!</Alert>
<Alert type="error">This is an error alert!</Alert>
```

```tsx
<Alert type="warning" title="Warning">
  This is a warning alert!
</Alert>
```

```tsx
<Alert type="warning" closable>
  This is a warning alert!
</Alert>
```

## Props

`AlertProps` 继承 `Omit<JSXDivProps, 'title'>`（其余标准 div 属性可用，除 `title` 由组件占用）。

| 属性      | 类型                                          | 默认值             | 必填 | 说明               |
| --------- | --------------------------------------------- | ------------------ | ---- | ------------------ |
| type      | `'success' \| 'warning' \| 'info' \| 'error'` | 实现中默认 `info`  | 否   | 视觉类型           |
| showIcon  | `boolean`                                     | 实现中默认 `true`  | 否   | 是否显示类型图标   |
| closable  | `boolean`                                     | 实现中默认 `false` | 否   | 是否显示关闭控件   |
| closeText | `React.ReactNode`                             | -                  | 否   | 自定义关闭区域内容 |
| variant   | `'outlined' \| 'filled'`                      | -                  | 否   | 描边或填充样式     |
| icon      | `React.ReactNode`                             | -                  | 否   | 自定义左侧图标     |
| title     | `React.ReactNode`                             | -                  | 否   | 标题               |
| children  | `React.ReactNode`                             | -                  | 是   | 正文内容           |
| onClose   | `React.MouseEventHandler`                     | -                  | 否   | 点击关闭时触发     |

## 高级用法

```tsx
import { Alert, Iconfont } from '@fexd/mobile'

<Alert icon={<Iconfont type="smail" />}>This is a custom icon alert!</Alert>
<Alert closable closeText={<Iconfont type="close_circle" />}>
  This is a custom close icon alert!
</Alert>
```

```tsx
<Alert type="warning" variant="outlined">Outlined</Alert>
<Alert type="warning" variant="filled">Filled</Alert>
```

## 样式定制

主题变量定义于 `Alert/type.tsx` 的 `AlertStyleVars`，包括前缀、内边距、圆角、各 `type` 下背景/文字/图标/描边/填充色等（如 `@alert-info-background`、`@alert-warning-color` 等）。按需在你的 Less 入口覆盖对应变量即可。

## 相关组件

`Iconfont`、`toast`、`Modal`（若需顶部滑入类展示可自行组合，见组件库 demo）

<!--
Source:
- packages/mobile/src/exports/Alert/type.tsx
- packages/mobile/src/exports/Alert/index.zh.md
- packages/mobile/src/exports/Alert/index.tsx
- packages/mobile/src/exports/Alert/demos/
- packages/mobile/src/exports/Alert/style.less
-->
