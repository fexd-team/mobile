---
group:
  title: 输入
  path: /data
  order: 103
---

# Button 按钮 <ImportCost name="Button" />

按钮用于触发一个操作，如提交表单

<!-- prettier-ignore -->
```jsx | pure
import { Button } from '@fexd/mobile'

<Button>按钮</Button>
```

---

## 使用说明

### 按钮类型

通过 `type` 属性切换按钮类型，支持 `plain`、`primary`、`success`、`warning`、`danger` 五种类型，默认为 `plain`

<!-- prettier-ignore -->
```jsx | pure
<Button>朴素按钮</Button>
<Button type="primary">主要按钮</Button>
<Button type="success">成功按钮</Button>
<Button type="warning">警告按钮</Button>
<Button type="danger">危险按钮</Button>
```

### 填充类型

通过 `fill` 属性设置按钮的填充类型，共有三种类型

- `solid`：实心按钮，文字为白色，背景为类型色
- `outline`：描边按钮，文字为类型色，背景为白色，边框为类型色
- `none`：无填充，文字为类型色，背景为白色，无边框

<!-- prettier-ignore -->
```jsx | pure
<Button>默认实心按钮</Button>
<Button fill="solid">实心按钮</Button>
<Button fill="outline">描边按钮</Button>
<Button fill="none">无填充按钮</Button>
```

### 禁用状态

通过 `disabled` 属性将按钮设置为描边按钮，描边按钮的文字为按钮颜色，背景为白色。

<!-- prettier-ignore -->
```jsx | pure
<Button disabled>默认按钮</Button>
```

### 按钮形状

通过 `shape` 设置按钮的形状，`square` 为方形按钮，`round` 为圆角按钮，`unset` 为无圆角按钮，默认值为 `square`

<!-- prettier-ignore -->
```jsx | pure
<Button>默认</Button>
<Button shape="square">方形</Button>
<Button shape="unset">无 border-radius</Button>
<Button shape="round">圆角</Button>
```

### 图标按钮

通过 `icon` 属性设置按钮图标，通过 `iconPosition` 属性设置按钮图标的位置

<!-- prettier-ignore -->
```jsx | pure
import { Iconfont } from '@fexd/mobile'
import { Add, Icon } from '@fexd/icons'

<Button icon={<Add />} />
<Button icon={<Icon type={Add} />} />
<Button icon={<Add />}>带文字</Button>
<Button icon={<Iconfont type="add" />} iconPosition="right">右置图标</Button>
```

### 加载中状态

- 通过 `loading={true}` 属性设置为按钮加载中状态，按钮会被禁用
- 通过 `loading="auto"` 属性使按钮根据 `onClick` 的异步情况自动进入加载中状态

<!-- prettier-ignore -->
```jsx | pure
<Button icon={<Iconfont type="add" />} loading />
<Button loading>按钮</Button>
<Button loading="auto" onClick={async () => {...}}>自动加载中</Button>
```

### 按钮尺寸

支持 `large`、`normal`、`small`、`mini` 四种尺寸，默认为 `normal`

<!-- prettier-ignore -->
```jsx | pure
<Button size="large">大按钮</Button>
<Button size="normal">普通</Button>
<Button size="small">小按钮</Button>
<Button size="mini">迷你</Button>
```

### 块级元素

按钮在默认情况下为行内块级元素，通过 `block` 属性可以将按钮的元素类型设置为块级元素

<!-- prettier-ignore -->
```jsx | pure
<Button block>块级元素</Button>
```

### 元素类型

通过 `as` 属性设置按钮根节点的标签类型，默认为 `button` 类型

<!-- prettier-ignore -->
```jsx | pure
<Button>默认 button</Button>
<Button as="a">a 标签</Button>
<Button as="div">div 标签</Button>
<Button as={CustomizeButton}>自定义元素</Button>
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| type | 类型，可选值为 `plain`、`primary`、`success`、`warning`、`danger` | `string` | `plain` |
| size | 尺寸，可选值为 `large`、`normal`、`small`、`mini` | `string` | `normal` |
| shape | 形状，可选值为 `square`、`round` | `string` | `square` |
| fill | 填充类型，可选值为 `solid`、`outline`、`none` | `string` | `solid` |
| block | 是否为块级元素 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| as | 元素类型，用于定义按钮根节点的标签类型 | `string` \| `React.ComponentFactory` | `button` |
| icon | 左侧图标名称或 React 节点 | `string` \| `React.ReactNode` | - |
| iconPosition | 图标展示位置，可选值为 `left`、`right` | `string` | `left` |
| loading | 是否加载中状态 | `boolean` | `'auto'` |

---

## 演示代码

<!-- ### 预览 -->

<code src="./demos/demo1/index.tsx" />
