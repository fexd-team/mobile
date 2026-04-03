---
name: NavBar
description: 页面顶部导航：左/中/右区域、标题居中控制、点击回调。
---

# NavBar 导航栏

页面顶部导航：左/中/右区域、标题居中控制、点击回调。

```tsx
import { NavBar } from '@fexd/mobile'
```

## 基础用法

示例来源：`packages/mobile/src/exports/NavBar/demos/demo1/index.tsx`。

```tsx
import React from 'react'
import { NavBar, toast } from '@fexd/mobile'
import { ChevronBack, EllipsisHorizontal } from '@fexd/icons'

export default () => (
  <>
    <NavBar>Title centered (default)</NavBar>
    <NavBar left={<ChevronBack />}>With left icon</NavBar>
    <NavBar right={<EllipsisHorizontal />}>With right icon</NavBar>
    <NavBar
      left={<ChevronBack />}
      right={<EllipsisHorizontal />}
      onLeftClick={() => toast.info('left')}
      onRightClick={() => toast.info('right')}
    >
      With click handlers
    </NavBar>
    <NavBar alignCenter={false}>Title not centered</NavBar>
  </>
)
```

## Props

`NavBarProps` 定义于 `packages/mobile/src/exports/NavBar/type.tsx`：`Omit<JSXDivProps, 'ref' | 'children'>` 与 `PureNavBarProps` 合并。

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `alignCenter` | `boolean` | `true` | 标题是否居中 |
| `children` | `React.ReactNode` | - | 标题内容 |
| `left` | `React.ReactNode \| (() => React.ReactNode)` | - | 左侧区域 |
| `right` | `React.ReactNode \| (() => React.ReactNode)` | - | 右侧区域 |
| `onLeftClick` | `(e: React.MouseEvent<HTMLDivElement>) => void` | - | 左侧点击 |
| `onRightClick` | `(e: React.MouseEvent<HTMLDivElement>) => void` | - | 右侧点击 |
| `contentClassName` | `string` | - | 中间内容区 className |
| `ref` | `React.Ref<HTMLDivElement>` | - | 根节点 ref |
| （其余） | — | — | 其余标准 div 属性（`JSXDivProps` 中除 `ref`、`children` 外） |

## 样式定制

`NavBarStyleVars` / `DOC_NavBarStyleVars` 定义于 `packages/mobile/src/exports/NavBar/type.tsx`。主要变量：`@nav-bar-prefix`、`@nav-bar-height`、`@nav-bar-padding-x`、`@nav-bar-background`、`@nav-bar-font-size`、`@nav-bar-icon-size`、`@nav-bar-side-color`、`@nav-bar-icon-color`、`@nav-bar-side-gap`、`@nav-bar-border-width`、`@nav-bar-border-color`。

<!--
Source:
- packages/mobile/src/exports/NavBar/type.tsx
- packages/mobile/src/exports/NavBar/index.zh.md
- packages/mobile/src/exports/NavBar/index.tsx
- packages/mobile/src/exports/NavBar/demos/
- packages/mobile/src/exports/NavBar/style.less
-->
