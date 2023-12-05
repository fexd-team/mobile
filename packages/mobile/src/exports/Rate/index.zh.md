---
group:
  title: 输入
  path: /data
---

# Rate 评分 <ImportCost name="Rate" />

## API

| 属性         | 说明                               | 类型                      | 默认值                        |
| :----------- | :--------------------------------- | :------------------------ | :---------------------------- |
| allowClear   | 是否允许再次点击后清除             | `boolean`                 | `false`                       |
| allowHalf    | 是否允许半颗星                     | `boolean`                 | `false`                       |
| character    | 展示字符                           | `boolean`                 | `<Icon type={CollectFill} />` |
| count        | 展示字符总数                       | `number`                  | `5`                           |
| defaultValue | 默认值                             | `number`                  | `0`                           |
| readOnly     | 只读                               | `boolean`                 | `false`                       |
| value        | 当前选中的值                       | `number`                  | `-`                           |
| style        | 字符样式                           | `React.CSSProperties`     | `-`                           |
| onChange     | 当选中的值发生变化时触发的回调函数 | `(value: number) => void` | `-`                           |

---

## 样式变量

| 变量名       | 说明         | 默认值       |
| :----------- | :----------- | :----------- |
| @rate-prefix | 组件样式前缀 | `'exd-rate'` |

---

## 演示代码

<code src="./demos/demo1/index.tsx" />
