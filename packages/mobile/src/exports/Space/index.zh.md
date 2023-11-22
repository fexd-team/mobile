---
group:
  title: 布局
  path: /layout
---

# Space 间隔布局 <ImportCost name="Space" />

待补充

<!-- prettier-ignore -->
```jsx | pure
import { Space } from '@fexd/mobile'

<Space />
```

---

## 使用说明

### 基础

待补充

<!-- prettier-ignore -->
```jsx | pure
import { Space } from '@fexd/mobile'

<Space />
```

### 进阶

待补充

<!-- prettier-ignore -->
```jsx | pure
import { Space } from '@fexd/mobile'

<Space />
```

---

## API

| 属性      | 说明                                   | 类型                                     | 默认值     |
| :-------- | :------------------------------------- | :--------------------------------------- | :--------- |
| align     | 对齐方式                               | `['start', 'end', 'center', 'baseline']` | -          |
| gap       | 间距大小                               | `GapType \| GapType[]`                   | small      |
| direction | 间距方向                               | `['vertical','horizontal']`              | horizontal |
| split     | 设置拆分                               | `ReactNode`                              | -          |
| wrap      | 是否自动换行，仅在 `horizontal` 时有效 | `boolean`                                | false      |

---

#### GapType

'small' | 'middle' | 'large' | number

<!-- ## GapType

| 变量名        | 说明         | 默认值       |
| :------------ | :----------- | :----------- |
| @space-prefix | 组件样式前缀 | `'exd-space'` |

--- -->

## 演示代码

<code src="./demos/demo1/index.tsx" />
