---
group:
  title: 布局
  path: /layout

mobileDemoFixed: false
---

# Space 间隔布局 <ImportCost name="Space" />

---

## 效果演示

<code src="./demos/demo1/index.tsx" />

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

---

## 样式变量

组件主要使用全局 Less 变量，可通过以下变量自定义样式：

<API identifier="Space-StyleVars" hideTitle src="./type.tsx" exports='["DOC_SpaceStyleVars"]'></API>
