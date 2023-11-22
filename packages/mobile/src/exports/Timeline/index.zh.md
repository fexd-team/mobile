---
group:
  title: 展示
  path: /display
---

# Timeline 时间线 <ImportCost name="Timeline" />

可视化垂直的时间流信息。

## 使用说明

支持两种声明方式：配置式声明、组件式声明。

### 配置式声明

#### 使用数组数据

通过 `data` 属性定义多个时间流信息。

<!-- prettier-ignore -->
```jsx | pure
import { Timeline } from '@fexd/mobile'

const data = [
  {
    title: 'Place the order and successful payment',
    content: '',
    time: 'Today',
    dot: <Icon type="amicon-round_like_fill" style={{ color: 'pink' }} />,
  },
  {
    title: 'Place the order and successful payment',
    content: '',
    time: '2021-01-01',
    dot: <Icon type="amicon-time" />,
  },
  {
    title: 'Calculate Interest, you can apply withdrawal with flexibility',
    content: () => (
      <>
        {'The funding amount '}
        <span style={{ color: '#FF7D0F' }}>Rp 1.000.000</span>, expected daily earnings{' '}
        <span style={{ color: '#FF7D0F' }}>Rp10.000</span>
      </>
    ),
    time: '2018-04-13',
  },
]

<Timeline data={data} />
```

### 组件式声明

#### 时间流信息

通过 `title` 、 `children` 、`time` 属性来修改相关信息。

<!-- prettier-ignore -->
```jsx | pure
import { Timeline } from '@fexd/mobile'

<Timeline>
  <Timeline.Item title="Place the order and successful payment" time="Today"></Timeline.Item>
  <Timeline.Item title="Place the order and successful payment" time="2021-01-01"></Timeline.Item>
  <Timeline.Item title="Calculate Interest, you can apply withdrawal with flexibility" time="2018-04-13">
    <>
      {'The funding amount '}
      <span style={{ color: '#FF7D0F' }}>Rp 1.000.000</span>, expected daily earnings{' '}
      <span style={{ color: '#FF7D0F' }}>Rp10.000</span>
    </>
  </Timeline.Item>
</Timeline>
```

#### 自定义节点

通过 `title` 、 `children` 、`time=` 属性来修改相关信息。

<!-- prettier-ignore -->
```jsx | pure
import { Timeline } from '@fexd/mobile'

<Timeline>
  <Timeline.Item title="1" time="Today" dot={<Icon type="amicon-round_like_fill" style={{ color: 'pink' }} />}></Timeline.Item>
  <Timeline.Item title="2" time="2021-01-01" dot={<Icon type="amicon-time" />}></Timeline.Item>
  <Timeline.Item title="3" time="2018-04-13"></Timeline.Item>
</Timeline>
```

## API 说明

### Timeline 的 API

| 属性 | 说明                   | 类型             | 默认值 |
| :--- | :--------------------- | :--------------- | :----- |
| data | 需要列表循环渲染的数据 | `TimeLineItem[]` | `[]`   |

<br/>

```ts | pure
interface TimeLineItem {
  title?: ReactNode | (() => ReactNode)
  content?: ReactNode | (() => ReactNode)
  time?: ReactNode | (() => ReactNode)
  dot?: ReactNode | (() => ReactNode)
}
```

### Timeline.Item 的 API

即 `Timeline` 的 `data` 数组的元素属性说明。

| 属性    | 说明         | 类型                             | 默认值 |
| :------ | :----------- | :------------------------------- | :----- |
| title   | 标题内容     | `ReactNode \| (() => ReactNode)` | -      |
| time    | 日期时间内容 | `ReactNode \| (() => ReactNode)` | -      |
| content | 中间的内容   | `ReactNode \| (() => ReactNode)` | -      |
| dot     | 自定义点内容 | `ReactNode \| (() => ReactNode)` | -      |

## 代码演示

<code src="./demos/demo1/index.tsx" />
