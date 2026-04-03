---
name: Tabs
description: 横向选项卡，支持 data 驱动或内部 Tabs.Item（库内部使用），可均分或横向滚动。
---

# Tabs 选项卡

横向选项卡，支持 `data` 驱动或内部 `Tabs.Item`（库内部使用），可均分或横向滚动。

```tsx
import { Tabs } from '@fexd/mobile'

const tabsData = [
  { label: 'First option', value: 'first' },
  { label: 'Second option', value: 'second' },
]

;<Tabs data={tabsData} defaultValue="first" />
```

## 基础用法

```tsx
import { useState } from 'react'
import { Tabs, Iconfont } from '@fexd/mobile'

const data = [
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b', disabled: true },
]
const [current, setCurrent] = useState('a')

;<Tabs data={data} value={current} onChange={setCurrent} display="flex" />
```

```tsx
import { Tabs, Iconfont } from '@fexd/mobile'

const data = [
  { icon: <Iconfont type="good" />, label: 'one', value: 1 },
  { label: 'two', value: 2 },
]

;<Tabs data={data} defaultValue={1} display="scroll" ellipsis />
```

`data` / `options` 单项类型（`TabItemConfig`，`Tabs/type.tsx`）：

| 字段     | 类型                                                   |
| :------- | :----------------------------------------------------- |
| label    | `ReactNode`                                            |
| value    | `T`（与 `TabsProps<T>` 一致，默认 `string \| number`） |
| disabled | `boolean`                                              |
| icon     | `ReactNode \| (() => ReactNode)`                       |

更多示例见 `packages/mobile/src/exports/Tabs/demos/demo1/index.tsx`。

## Props

### `Tabs`（`packages/mobile/src/exports/Tabs/type.tsx`）

| 属性         | 说明                                           | 类型                 |
| :----------- | :--------------------------------------------- | :------------------- |
| display      | 布局：`flex` 均分；`scroll` 内容宽度可横向滚动 | `'flex' \| 'scroll'` |
| ellipsis     | 过长 `label` 是否省略                          | `boolean`            |
| defaultValue | 非受控默认值                                   | `T`                  |
| value        | 受控当前值                                     | `T`                  |
| onChange     | 值变化                                         | `(value: T) => void` |
| data         | 选项数据                                       | `TabItemConfig<T>[]` |
| options      | 与 `data` 同结构的别名                         | `TabItemConfig<T>[]` |
| ref          | 引用                                           | `React.Ref<any>`     |

另含 `Omit<JSXDivProps, 'defaultValue' | 'onChange'>` 中允许的 `div` 属性。

### `Tabs.Item`（`packages/mobile/src/exports/Tabs/Item/type.tsx`）

| 属性           | 说明                 | 类型                                                |
| :------------- | :------------------- | :-------------------------------------------------- |
| display        | 项级布局             | `'scroll' \| 'flex'`                                |
| value          | 对应选项值           | `T`                                                 |
| disabled       | 是否禁用             | `boolean`                                           |
| tabIndex       | 序号                 | `number`                                            |
| isActive       | 是否选中态           | `boolean`                                           |
| onClick        | 点击                 | `(value: T, index: number) => void`                 |
| onOffsetChange | 位置变化（指示器等） | `(offsetLeft: number, offsetWidth: number) => void` |
| ellipsis       | 是否省略文案         | `boolean`                                           |

另含 `Omit<JSXDivProps, 'onClick'>` 中的 `div` 属性。

## 样式变量

- `TabsStyleVars`：见 `Tabs/type.tsx`（`DOC_TabsStyleVars`）。
- `TabItemStyleVars`：见 `Tabs/Item/type.tsx`（`DOC_TabItemStyleVars`）。

<!--
Source:
- packages/mobile/src/exports/Tabs/type.tsx
- packages/mobile/src/exports/Tabs/index.zh.md
- packages/mobile/src/exports/Tabs/index.tsx
- packages/mobile/src/exports/Tabs/demos/
- packages/mobile/src/exports/Tabs/style.less
-->
