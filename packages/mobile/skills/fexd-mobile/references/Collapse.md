---
name: Collapse
description: 可展开/收起的面板组，支持手风琴模式与子面板 Collapse.Panel。
---

# Collapse 折叠面板

可展开/收起的面板组，支持手风琴模式与子面板 `Collapse.Panel`。

```tsx
import { Collapse } from '@fexd/mobile'
```

## 基础用法

```tsx
<Collapse defaultActiveKey={['1']}>
  <Collapse.Panel title="Panel 1" key="1">
    <div>Content</div>
  </Collapse.Panel>
  <Collapse.Panel title="Panel 2" key="2">
    <div>Content</div>
  </Collapse.Panel>
</Collapse>
```

```tsx
<Collapse accordion>
  <Collapse.Panel title="Single open" key="1">
    ...
  </Collapse.Panel>
</Collapse>
```

```tsx
<Collapse iconRotate={false} expandIcon={<CustomIcon />}>
  <Collapse.Panel title="Disabled" key="x" disabled>
    ...
  </Collapse.Panel>
</Collapse>
```

示例源码参考：`packages/mobile/src/exports/Collapse/demos/demo1/index.tsx`。

## Props

### Collapse

定义于 `packages/mobile/src/exports/Collapse/type.tsx`，并继承 `Omit<JSXDivProps, 'onChange'>`。

| 属性             | 说明                           | 类型                                                         |
| ---------------- | ------------------------------ | ------------------------------------------------------------ |
| defaultActiveKey | 默认展开面板的 key             | `ActiveKeyType \| ActiveKeyType[]`                           |
| activeKey        | 当前展开面板的 key（受控）     | `ActiveKeyType \| ActiveKeyType[]`                           |
| accordion        | 手风琴模式（同时最多一项展开） | `boolean`                                                    |
| onChange         | 展开项变化                     | `(activeKey: ActiveKeyType[]) => void`                       |
| expandIcon       | 右侧自定义图标                 | `React.ReactNode`                                            |
| iconRotate       | 展开时图标是否旋转             | `boolean`                                                    |
| ref              | 引用                           | `React.Ref<CollapseRef>`（`CollapseRef` = `HTMLDivElement`） |

`ActiveKeyType` = `React.Key`。

默认属性：`iconRotate: true`（见 `index.tsx`）。

另继承除 `onChange` 外的 div HTML 属性（`JSXDivProps`）。

### Collapse.Panel

定义于 `packages/mobile/src/exports/Collapse/type.tsx` 的 `CollapsePanelProps`，继承 `Omit<JSXDivProps, 'title'>`。

| 属性        | 说明                               | 类型                                                     |
| ----------- | ---------------------------------- | -------------------------------------------------------- |
| title       | 标题                               | `React.ReactNode \| string`                              |
| disabled    | 是否禁用                           | `boolean`                                                |
| headerClass | 头部额外类名                       | `string`                                                 |
| expandIcon  | 覆盖父级展开图标                   | `React.ReactNode`                                        |
| iconRotate  | 是否启用旋转样式                   | `boolean`                                                |
| isActive    | 是否展开（内部注入，一般无需传入） | `boolean`                                                |
| panelKey    | 面板 key（内部使用）               | `string \| number`                                       |
| onItemClick | 点击标题时（内部）                 | `(panelKey: string \| number) => void`                   |
| onClick     | 标题点击                           | `(event: React.MouseEvent<Element, MouseEvent>) => void` |

React `key` 用于标识面板，在列表中应唯一。

## 子组件

- `Collapse.Panel`

## 样式定制

样式变量见 `CollapseStyleVars`（`@collapse-*`，`type.tsx` 中 `DOC_CollapseStyleVars`）。

## 注意事项

受控模式下使用 `activeKey` + `onChange` 与 `defaultActiveKey` 二选一组合，行为与 `useIOControl` 一致（见 `Collapse/index.tsx`）。

<!--
Source:
- packages/mobile/src/exports/Collapse/type.tsx
- packages/mobile/src/exports/Collapse/index.zh.md
- packages/mobile/src/exports/Collapse/index.tsx
- packages/mobile/src/exports/Collapse/demos/
- packages/mobile/src/exports/Collapse/style.less
-->
