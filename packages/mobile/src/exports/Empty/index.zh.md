---
group:
  title: 展示
  path: /display
---

# Empty 缺省页 <ImportCost name="Empty" />

## 使用说明

<!-- prettier-ignore -->
```jsx | pure
import { Empty } from '@fexd/mobile'

<Empty />
```

---

## API

| 属性      | 说明           | 类型      | 默认值 |
| :-------- | :------------- | :-------- | :----- |
| className | 自定义类名     | String    | -      |
| icon      | 自定义图标     | ReactNode | -      |
| text      | 自定义文字描述 | ReactNode | -      |
| children  | 自定义内容     | ReactNode | -      |

---

## 样式变量

| 变量名        | 说明         | 默认值        |
| :------------ | :----------- | :------------ |
| @empty-prefix | 组件样式前缀 | `'exd-empty'` |

---

## 演示代码

<code src="./demos/demo1/index.tsx" />
