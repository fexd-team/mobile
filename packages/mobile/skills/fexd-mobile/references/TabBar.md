---
name: TabBar
description: 底部标签栏容器，与 TabBar.Item 组合展示图标与名称。
---

# TabBar 标签栏

底部标签栏容器，与 `TabBar.Item` 组合展示图标与名称。

```tsx
import { TabBar } from '@fexd/mobile'

export default () => (
  <TabBar>
    <TabBar.Item name="Home" icon="home" active onClick={() => {}} />
  </TabBar>
)
```

## 基础用法

```tsx
import { useState } from 'react'
import { TabBar } from '@fexd/mobile'

export default () => {
  const [activeKey, setActiveKey] = useState(0)
  return (
    <TabBar>
      <TabBar.Item name="Home" icon="home" active={activeKey === 0} onClick={() => setActiveKey(0)} />
      <TabBar.Item name="Star" icon="collection" active={activeKey === 1} onClick={() => setActiveKey(1)} />
    </TabBar>
  )
}
```

示例见 `packages/mobile/src/exports/TabBar/demos/demo1/index.tsx`。

## Props

### `TabBar`（`packages/mobile/src/exports/TabBar/type.tsx`）

| 属性     | 说明     | 类型              |
| :------- | :------- | :---------------- |
| children | 子项集合 | `React.ReactNode` |

另含 `JSXDivProps`（根节点 `div` 属性）。`AUTO_API` 文档针对 `PureTabBarProps`（仅 `children`）；完整类型为 `TabBarProps`。

### `TabBar.Item`（`packages/mobile/src/exports/TabBar/Item/type.tsx`）

`TabItemProps` = `JSXDivProps` & `PureTabItemProps`。

| 属性      | 说明                            | 类型                     | 默认值  |
| :-------- | :------------------------------ | :----------------------- | :------ |
| name      | 展示名称                        | `string`                 | —       |
| icon      | 图标；`string` 时同 Icon `type` | `ReactNode \| string`    | —       |
| active    | 是否激活                        | `boolean`                | `false` |
| className | 类名                            | `string`                 | —       |
| onClick   | 点击                            | `JSXDivProps['onClick']` | —       |

另含 `div` 原生属性（`Item` 根节点）。

## 样式变量

`TabBarStyleVars`（`DOC_TabBarStyleVars`）：`@tab-bar-prefix`、`@tab-bar-height`、`@tab-bar-border-color`、`@tab-bar-background`、`@tab-bar-item-prefix`、`@tab-bar-item-active-color`、`@tab-bar-item-icon-size`、`@tab-bar-item-name-font-size`、`@tab-bar-item-name-margin-top`。

<!--
Source:
- packages/mobile/src/exports/TabBar/type.tsx
- packages/mobile/src/exports/TabBar/index.zh.md
- packages/mobile/src/exports/TabBar/index.tsx
- packages/mobile/src/exports/TabBar/demos/
- packages/mobile/src/exports/TabBar/style.less
-->
