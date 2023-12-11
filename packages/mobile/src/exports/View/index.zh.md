---
# group:
#   title: 布局
#   path: /layout
group:
  title: 实验性
  path: /experimental
---

# View 基础视图 <ImportCost name="View" />

平平无奇的容器组件，自带以下样式

```css
display: flex;
```

---

## 使用说明

<!-- prettier-ignore -->
```jsx | pure
import { View } from '@fexd/mobile'

<View />
```

## 样式变量

| 变量名       | 说明         | 默认值       |
| :----------- | :----------- | :----------- |
| @view-prefix | 组件样式前缀 | `'exd-view'` |

---

## 演示代码

<code src="./demos/demo1/index.tsx" />
