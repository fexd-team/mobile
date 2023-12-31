---
hide: true

group:
  title: 开发中
  path: /developing
---

# List 列表 <ImportCost name="List" />

通用列表。

可用于循环渲染结构一样的内容。

## List

List 容器。

### 属性说明

| 属性         | 说明                                                         | 类型    | 默认值 | 提供的值 |
| :----------- | :----------------------------------------------------------- | :------ | :----- | :------- |
| headerBorder | 是否显示 List 列表头部的下边框（ header 属性有内容才会显示） | boolean | true   | -        |
| header       | 列表的头部内容                                               | JSX     | -      | -        |
| borderless   | 是否不显示列表底部边框                                       | boolean | false  | -        |

## List.Item

List 列表的其中一项。

### 属性说明

| 属性   | 说明               | 类型    | 默认值 | 提供的值 |
| :----- | :----------------- | :------ | :----- | :------- |
| border | 是否显示下边框线   | boolean | true   | -        |
| extra  | 嵌在右边的额外内容 | JSX     | -      | -        |

### 事件属性说明

| 事件名称 | 说明                                                                                       | 回调参数 |
| :------- | :----------------------------------------------------------------------------------------- | :------- |
| onClick  | 点击这行子项目触发的事件（设置了之后如果没设置 extra 属性的值，在该行的右边会显示一个 > ） | -        |

### 代码演示

<code src="./demos/demo1/index.tsx" />
