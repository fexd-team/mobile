---
group:
  title: 布局
  path: /layout
---

# Divider 分割线 <ImportCost name="Divider" />

用于分隔内容的线。

<!-- prettier-ignore -->
```jsx | pure
import { Divider } from '@fexd/mobile'

<Divider/>
```

## 使用说明

### 有文字

通过 `children` 属性来定义文字内容。

```jsx | pure
import { Divider } from '@fexd/mobile'

<Divider>No more</Divider>
<Divider>This is a very long, very long, very long, very long text</Divider>
```

### 垂直方向分割线

通过 `vertical` 属性切换分割线的方向，默认为 `false` ，即水平方向分割。

<!-- prettier-ignore -->
```jsx | pure
import { Divider } from '@fexd/mobile'

<Divider vertical={true} />
```

## API 说明

| 属性     | 说明                   | 类型                             | 默认值  |
| :------- | :--------------------- | :------------------------------- | :------ |
| children | 文本内容               | `ReactNode \| (() => ReactNode)` | `null`  |
| vertical | 将分割线渲染成垂直形状 | `boolean`                        | `false` |

## 演示代码

<!-- ### 预览 -->

<code src="./demos/demo1/index.tsx" />
