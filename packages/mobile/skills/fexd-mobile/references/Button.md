---
name: Button
description: 用于触发操作（提交、跳转等）。在 BasicButton 能力之上扩展图标与加载态。
---

# Button 按钮

用于触发操作（提交、跳转等）。在 `BasicButton` 能力之上扩展图标与加载态。

```tsx
import { Button } from '@fexd/mobile'
```

## 基础用法

```tsx
import { Button } from '@fexd/mobile'

<Button type="primary">主要按钮</Button>
<Button type="success" fill="outline">
  描边
</Button>
<Button disabled>禁用</Button>
```

```tsx
import { Button, Iconfont } from '@fexd/mobile'
;<Button type="primary" icon={<Iconfont type="add" />} iconPosition="right">
  右置图标
</Button>
```

```tsx
<Button
  loading="auto"
  type="primary"
  onClick={async () => {
    await someAsyncWork()
  }}
>
  自动加载态
</Button>
```

## Props

`ButtonProps` 由 `BasicButtonProps` 与 `PureButtonProps` 合并（`packages/mobile/src/exports/Button/type.tsx`）。

### PureButtonProps 扩展

| 属性         | 类型                | 默认值   | 必填 | 说明                                                        |
| ------------ | ------------------- | -------- | ---- | ----------------------------------------------------------- |
| icon         | `React.ReactNode`   | -        | 否   | 图标节点                                                    |
| iconPosition | `'left' \| 'right'` | `'left'` | 否   | 图标相对文字位置                                            |
| loading      | `boolean \| 'auto'` | `'auto'` | 否   | 加载中；`'auto'` 时根据 `onClick` 是否返回 Promise 自动切换 |

### BasicButtonProps / PureBasicButtonProps

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| type | `BasicButtonTypes` | `'plain'` | 否 | `plain` \| `primary` \| `info` \| `success` \| `warning` \| `danger` |
| size | `BasicButtonSizeTypes` | `'normal'` | 否 | `large` \| `normal` \| `small` \| `mini` |
| shape | `BasicButtonShapes` | `'square'` | 否 | `square` \| `round` \| `unset` |
| fill | `BasicButtonFillTypes` | `'solid'` | 否 | `solid` \| `outline` \| `none` |
| block | `boolean` | `false` | 否 | 是否块级 |
| disabled | `boolean` | `false` | 否 | 是否禁用 |
| className | `string` | - | 否 | 类名 |
| children | `React.ReactNode` | - | 否 | 内容 |
| onClick | `JSXButtonProps['onClick']` | - | 否 | 点击 |
| as | `string \| React.ComponentFactory \| React.FunctionComponentFactory` | `'button'` | 否 | 根节点类型 |
| ref | `React.Ref<any>` | - | 否 | 引用 |

### 其他

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| （继承） | `Omit<JSXButtonProps, 'ref' \| 'onClick'>` | - | 否 | 原生 button 属性（如 `type`、`name`、`aria-*`） |

## 样式定制

`ButtonStyleVars` / `DOC_ButtonStyleVars` 节选：

| 变量                                             | 说明             | 默认                        |
| ------------------------------------------------ | ---------------- | --------------------------- |
| `@btn-prefix`                                    | 类名前缀         | `exd-btn`                   |
| `@btn-inline-size-base` / `@btn-block-size-base` | 行内/块级高度    | `38px` / `42px`             |
| `@btn-size-scale-*`                              | 各尺寸缩放       | `1.2` / `1` / `0.8` / `0.6` |
| `@btn-border-width`                              | 边框宽度         | `1px`                       |
| `@btn-border-color-plain`                        | plain 边框色     | `color-gray-border`         |
| `@btn-font-size-base`                            | 字号             | `14px`                      |
| `@btn-border-radius-square` / `-round`           | 圆角             | `2px` / `999px`             |
| `@btn-disabled-opacity`                          | 禁用透明度       | `0.5`                       |
| `@btn-icon-spacing`                              | 图标与文字间距   | `6px`                       |
| `@btn-spinner-*`                                 | 加载图标缩放相关 | 见 `type.tsx`               |

完整列表见源码 `Button/type.tsx`。

## 相关组件

- 基础按钮：`BasicButton`
- 图标：`Iconfont`、`@fexd/icons`

## 注意事项

- `loading` 默认值为 `'auto'`（以类型定义为准），异步 `onClick` 期间会自动进入加载态。
- Demo 源码：`packages/mobile/src/exports/Button/demos/demo1/index.tsx`。

<!--
Source:
- packages/mobile/src/exports/Button/type.tsx
- packages/mobile/src/exports/Button/index.zh.md
- packages/mobile/src/exports/Button/index.tsx
- packages/mobile/src/exports/Button/demos/
- packages/mobile/src/exports/Button/style.less
-->
