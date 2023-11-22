---
group:
  title: 导航
  path: /navigation
  order: 101
---

# NavBar 导航栏 <ImportCost name="NavBar" />

<!-- prettier-ignore -->
```jsx | pure
import { NavBar } from '@fexd/mobile'

<NavBar>标题内容</NavBar>
```

## API

| 属性             | 说明             | 类型      | 默认值 |
| :--------------- | :--------------- | :-------- | :----- |
| children         | 标题内容         | `JSX`     | -      |
| className        | 标题类名         | `string`  | -      |
| contentClassName | 内容类名         | `string`  | -      |
| left             | 左侧内容         | `JSX`     | -      |
| right            | 右侧内容         | `JSX`     | -      |
| alignCenter      | 标题内容是否居中 | `boolean` | `true` |

## 演示代码

<!-- ### 预览 -->

<code src="./demos/demo1/index.tsx" />
