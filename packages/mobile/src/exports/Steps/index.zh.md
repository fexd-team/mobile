---
group:
  title: 展示
  path: /display
---

# Steps 步骤条 <ImportCost name="Steps" />

引导用户按照流程完成任务的步骤条。

## 使用说明

支持两种声明方式：配置式声明、组件式声明。

### 配置式声明

#### 使用数组数据

通过 `data` 属性定义多个步骤。

<!-- prettier-ignore -->
```jsx | pure
import { Steps } from '@fexd/mobile'

const data = [
  { title: '1', description: '步骤1' },
  { title: '2', description: '步骤2' },
  { title: '3', description: '步骤3' },
]

<Steps data={data} />
```

#### 当前步骤

通过 `value` 属性定义当前步骤。

<!-- prettier-ignore -->
```jsx | pure
import { Steps } from '@fexd/mobile'

const data = [
  { title: '1', description: '步骤1' },
  { title: '2', description: '步骤2' },
  { title: '3', description: '步骤3' },
]

<Steps value={2} data={data} />
```

#### 自适应宽度

通过设置 `type="flex"` 来撑满宽度。

<!-- prettier-ignore -->
```jsx | pure
import { Steps } from '@fexd/mobile'

const data = [
  { title: '1', description: '步骤1' },
  { title: '2', description: '步骤2' },
  { title: '3', description: '步骤3' },
]

<Steps value={2} data={data} type="flex" />
```

#### 已过的步骤打钩

通过 `checked` 来对所有已经过了的步骤打钩。

<!-- prettier-ignore -->
```jsx | pure
import { Steps } from '@fexd/mobile'

const data = [
  { title: '1', description: '步骤1' },
  { title: '2', description: '步骤2' },
  { title: '3', description: '步骤3' },
]

<Steps value={2} data={data} checked={true} />
```

---

### 组件式声明

#### 当前步骤

通过 `step` 属性来表明当前步骤。

<!-- prettier-ignore -->
```jsx | pure
import { Steps } from '@fexd/mobile'

<Steps>
  <Steps.Item step={1} />
  <Steps.Item step={2} />
  <Steps.Item step={5} />
</Steps>
```

#### 步骤描述

通过 `title` 和 `children` 属性来修改步骤的相关描述。

<!-- prettier-ignore -->
```jsx | pure
import { Steps } from '@fexd/mobile'

<Steps>
  <Steps.Item step={1} title="title" />
  <Steps.Item step={2}>children</Steps.Item>
  <Steps.Item step={3} title="title">children</Steps.Item>
</Steps>
```

#### 步骤状态

通过 `status` 来控制当前步骤的状态。

<!-- prettier-ignore -->
```jsx | pure
import { Steps } from '@fexd/mobile'

<Steps>
  <Steps.Item step={1} type="error" title="error" />
  <Steps.Item step={2} type="completed" title="completed"/>
  <Steps.Item step={3} type="process" title="process" />
  <Steps.Item step={4} type="default" title="default" />
</Steps>
```

#### 自定义图标

通过 `icon` 属性来自定义步骤的图标。

<!-- prettier-ignore -->
```jsx | pure
import { Steps, Iconfont } from '@fexd/mobile'

<Steps>
  <Steps.Item icon={<Iconfont type="anger" />} step={1} type="error" title="error" />
  <Steps.Item icon={<Iconfont type="anger" />} step={2} type="completed" title="completed" />
  <Steps.Item icon={<Iconfont type="anger" />} step={3} type="process" title="process" />
  <Steps.Item icon={<Iconfont type="anger" />} step={4} type="default" title="default" />
</Steps>
```

## API 说明

### `Steps` 的 API

| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| data | 数组元素将会被当作步骤渲染出来 | `Step[]` | `[]` |
| value | 当前进行到的步骤值 (从 `1` 开始) | `number` | `1` |
| checked | 已做过的步骤是否需要打勾样式 | `boolean` | `false` |
| type | 步骤的布局类型 | `string` | `data.length` 小于 `3` 为 `"flex"` （自适应宽度），否则为 `""` （固定宽度） |

<br/>

```ts | pure
interface Step {
  title?: ReactNode | (() => ReactNode)
  description?: ReactNode | (() => ReactNode)
  icon?: ReactNode | (() => ReactNode)
  error?: boolean
}
```

### `Steps.Item` 的 API

| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| step | 当前步骤数字 | `number` | `1` |
| title | 显示在步骤图标下面的标题文字 | `ReactNode \| (() => ReactNode)` | `null` |
| children | 显示在步骤图标下面的描述文字 | `ReactNode \| (() => ReactNode)` | `null` |
| status | 此步骤的状态，可为： `"default"` 、`"process"` 、 `"completed"` 、 `"error"` | `string` | `"default"` |
| icon | 自定义步骤 Icon | `<Iconfont />` | `null` |

## 演示代码

<code src="./demos/demo1/index.tsx" />
