---
group:
  title: 布局
  path: /layout
---

# Collapse 折叠 <ImportCost name="Collapse" />

# API

## Collapse

| 属性             | 说明                 | 类型                                              | 默认值     |
| :--------------- | :------------------- | :------------------------------------------------ | :--------- |
| defaultActiveKey | 默认展开面板的`key`  | `string \| string[]`                              | -          |
| activeKey        | 当前展开面板的 `key` | `string \| string[]`                              | -          |
| accordion        | 手风琴模式           | `boolean`                                         | false      |
| onChange         | 切换面板时触发       | `(activeKey: string \| string[] \| null) => void` | -          |
| expandIcon       | 右侧自定义按钮       | `Icon`                                            | ArrowRight |
| iconRotate       | 右侧按钮是否旋转     | `boolean`                                         | true       |

---

## Collapse.Panel

| 属性     | 说明           | 类型                                                     | 默认值 |
| :------- | :------------- | :------------------------------------------------------- | :----- |
| key      | 唯一标识符     | `string`                                                 | -      |
| title    | 标题           | `ReactNode`                                              | -      |
| disabled | 是否禁用       | `boolean`                                                | false  |
| onClick  | 标题的点击事件 | `(event: React.MouseEvent<Element, MouseEvent>) => void` | -      |

---

## 演示代码

<code src="./demos/demo1/index.tsx" />
