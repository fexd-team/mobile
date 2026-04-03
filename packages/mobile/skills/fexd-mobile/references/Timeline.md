---
name: Timeline
description: 垂直时间流展示，支持配置式（data）与组件式（Timeline + Timeline.Item）两种写法。
---

# Timeline 时间线

垂直时间流展示，支持配置式（`data`）与组件式（`Timeline` + `Timeline.Item`）两种写法。

```tsx
import { Timeline } from '@fexd/mobile'
```

## 基础用法

配置式（示例来源：`packages/mobile/src/exports/Timeline/demos/demo1/index.tsx`）：

```tsx
import { Timeline, Iconfont } from '@fexd/mobile'

const data = [
  {
    title: 'Place the order and successful payment',
    content: '',
    time: 'Today',
    dot: <Iconfont prefix="amicon" type="round_like_fill" style={{ color: 'pink' }} />,
  },
  {
    title: 'Next step',
    time: '2021-01-01',
  },
]

export default function Example() {
  return <Timeline data={data} />
}
```

组件式：

```tsx
<Timeline>
  <Timeline.Item title="Step 1" time="Today" />
  <Timeline.Item title="Step 2" time="2021-01-01">
    Detail content as children
  </Timeline.Item>
</Timeline>
```

自定义节点：

```tsx
<Timeline>
  <Timeline.Item title="1" time="Today" dot={<Iconfont prefix="amicon" type="round_like_fill" />} />
</Timeline>
```

## Props

### `Timeline`

`TimelineProps` 定义于 `packages/mobile/src/exports/Timeline/type.tsx`。`data` 元素类型为 `ActivityConfig`，即 `Omit<TimelineItemProps, 'children'> & { content?: TimelineItemProps['children'] }`（与 `Timeline.Item` 的 `children` 对应字段在配置式中为 `content`）。

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `children` | `ReactNode \| (() => ReactNode)` | 组件式子节点（一般为 `Timeline.Item`） |
| `data` | `ActivityConfig[]` | 配置式数据列表 |
| `ref` | `React.Ref<any>` | 引用 |
| （其余） | — | 继承 `JSXDivProps`，**不含** `children`、`content`（与 `type.tsx` 中 `Omit` 一致） |

### `Timeline.Item`

`TimelineItemProps` 定义于 `packages/mobile/src/exports/Timeline/Item/type.tsx`。

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `title` | `ReactNode` | 标题 |
| `time` | `ReactNode` | 时间文案 |
| `dot` | `ReactNode \| (() => ReactNode)` | 自定义节点圆点 |
| `children` | `ReactNode \| (() => ReactNode)` | 主内容区 |
| `ref` | `React.Ref<any>` | 引用 |
| （其余） | — | 继承 `JSXDivProps`，**不含** `title`、`children`（与 `type.tsx` 中 `Omit` 一致） |

样式变量类型 `TimelineItemStyleVars` 同目录 `Item/type.tsx` 中有文档注释，可按需覆盖 Less/CSS 变量。

<!--
Source:
- packages/mobile/src/exports/Timeline/type.tsx
- packages/mobile/src/exports/Timeline/index.zh.md
- packages/mobile/src/exports/Timeline/index.tsx
- packages/mobile/src/exports/Timeline/demos/
- packages/mobile/src/exports/Timeline/style.less
-->
