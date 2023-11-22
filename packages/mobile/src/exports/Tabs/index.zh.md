---
group:
  title: 导航
  path: /navigation
---

# Tabs 选项卡 <ImportCost name="Tabs" />

简洁的，横向的，有样式区分是否为选中项的选项卡组件。

## 使用说明

### data

通过 `data` 属性，可以定义选项集合。

- 如果选项数量为 3 个或者 3 个以下：每个选项均分宽度（内容超出宽度会换行，建议最多两行），不可横向滚动。
- 如果选项数量为 3 个以上：每个选项的宽度会根据自己的内容决定（所以只会一行），可横向滚动。

`data` 子元素的属性描述：

| 属性     | 说明                | 类型                           | 默认值  |
| :------- | :------------------ | :----------------------------- | :------ |
| label    | 选项显示的 label    | `ReactNode \| () => ReactNode` | `null`  |
| value    | 选项的值            | `string \| number`             | -       |
| disabled | 是否禁用            | `boolean`                      | `false` |
| icon     | label 前显示的 icon | `ReactNode \| () => ReactNode` | `null`  |

<br/>

<!-- prettier-ignore -->
```jsx | pure
import { Tabs } from '@fexd/mobile'

const tabsData = [
  {
    label: 'First option',
    value: 'first',
  },
  {
    label: 'Second option',
    value: 'second',
  },
]
const tabsData1 = Array.from(new Array(30)).map((item, index) => ({
  label: `option${index + 1}`,
  value: index + 1,
}))

<Tabs data={tabsData} defaultValue="first" />
<Tabs data={tabsData1} defaultValue={1} />
```

### display

通过 `display` 属性，可以设置选项的布局方式。值为 `"flex"` 或 `"scroll"` 。

#### display="flex"

每个选项均分宽度（内容超出宽度会换行，建议最多两行），不可横向滚动。

<!-- prettier-ignore -->
```jsx | pure
import { Tabs } from '@fexd/mobile'

const tabsData = [
  {
    label: 'First option',
    value: 'first',
  },
  {
    label: 'Second option',
    value: 'second',
  },
]

<Tabs data={tabsData} defaultValue="first" display="scroll" />
```

#### display="scroll"

每个选项的宽度会根据自己的内容决定（所以只会一行），可横向滚动。

<!-- prettier-ignore -->
```jsx | pure
import { Tabs } from '@fexd/mobile'

const tabsData = [
  {
    label: 'option 1',
    value: 1,
  },
  {
    label: 'option 2222222',
    value: 2,
  },
  {
    label: 'option 33',
    value: 3,
  },
  {
    label: 'option 44444',
    value: 4,
  },
]

<Tabs data={tabsData} defaultValue={1} display="flex" />
```

### 受控模式

通过 `value` (当前值) 和 `onChange` (当前值发生变化时触发的回调函数) 控制。

<!-- prettier-ignore -->
```jsx | pure
import { Tabs } from '@fexd/mobile'

const tabsData = [
  {
    label: 'First option',
    value: 'first',
  },
  {
    label: 'Second option',
    value: 'second',
  },
]
const [currentTab, setCurrentTab] = useState('first')

<Tabs data={tabsData} value={currentTab} onChange={setCurrentTab} />
```

### 禁用选项

通过 `disabled` 属性，禁用选项。

<!-- prettier-ignore -->
```jsx | pure
import { Tabs } from '@fexd/mobile'

const tabsData = [
  {
    label: 'First option',
    value: 'first',
    disabled: true,
  },
  {
    label: 'Second option',
    value: 'second',
    disabled: true,
  },
]

<Tabs data={tabsData} defaultValue="first" />
```

### 带有图标

通过 `icon` 属性，让 `label` 的前面带有图标。

<!-- prettier-ignore -->
```jsx | pure
import { Tabs } from '@fexd/mobile'

const tabsData = [
  {
    icon: <Iconfont type="good" />,
    label: 'option 1',
    value: 1,
  },
  {
    icon: <Iconfont type="good" />,
    label: 'option 2222222',
    value: 2,
  },
  {
    icon: <Iconfont type="good" />,
    label: 'option 33',
    value: 3,
  },
  {
    icon: <Iconfont type="good" />,
    label: 'option 44444',
    value: 4,
  },
]

<Tabs data={tabsData} defaultValue={1} />
```

### ellipsis

通过 `ellipsis` 属性，让过长的 `label` 内容省略号显示。

<!-- prettier-ignore -->
```jsx | pure
import { Tabs } from '@fexd/mobile'

const tabsData = [
  {
    label: 'very very very very very very very long',
    value: 1,
  },
  {
    label: 'short',
    value: 2,
  },
]

<Tabs data={tabsData} defaultValue={1} />
```

## API 说明

| 属性         | 说明                     | 类型                                | 默认值                |
| :----------- | :----------------------- | :---------------------------------- | :-------------------- |
| data         | 选项集合                 | `Array`                             | `[]`                  |
| defaultValue | 默认值                   | `string \| number`                  | -                     |
| value        | 当前选中的值             | `string \| number`                  | -                     |
| onChange     | 当前选中的值改变时触发   | `(value: string \| number) => void` | -                     |
| display      | 布局方式                 | `'flex' \| 'scroll'`                | 由 `data.length` 决定 |
| ellipsis     | 内容超出时是否显示省略号 | `boolean`                           | `false`               |

## 演示代码

<code src="./demos/demo1/index.tsx" />
