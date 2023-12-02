---
hide: true

group:
  title: 实验性
  path: /experimental
---

# Flex 弹性布局 <ImportCost name="Flex" />

Flex 布局分为 12 个栅格，支持自定义目标节点监听的响应式布局。

## 使用说明

### 基础

待补充

<!-- prettier-ignore -->
```jsx | pure
import { Flex } from '@fexd/mobile'

<Flex />
```

### 进阶

待补充

<!-- prettier-ignore -->
```jsx | pure
import { Flex } from '@fexd/mobile'

<Flex />
```

---

## API

#### Flex

| 属性      | 说明               | 类型                                                          | 默认值 |
| :-------- | :----------------- | :------------------------------------------------------------ | :----- |
| align     | 垂直对齐方式       | `['top', 'middle', 'bottom']`                                 | top    |
| justify   | 水平排列方式       | `['start', 'end', 'center', 'space-around', 'space-between']` | start  |
| wrap      | 是否自动换行       | `boolean`                                                     | true   |
| targetRef | 响应式目标节点     | `HTMLDivElement`                                              | window |
| smValue   | 自定义 sm 响应距离 | `number`                                                      | 580px  |
| mdValue   | 自定义 md 响应距离 | `number`                                                      | 990px  |
| lgValue   | 自定义 lg 响应距离 | `number`                                                      | 1600px |

#### Flex.item

| 属性   | 说明                                      | 类型               | 默认值 |
| :----- | :---------------------------------------- | :----------------- | :----- | --- |
| offset | 栅格左侧的间隔格数，间隔内不可以有栅格    | `number`           | 0      |
| order  | 栅格顺序                                  | `number`           | 0      |
| pull   | 栅格向左移动格数                          | `number`           | 0      |
| push   | 栅格向右移动格数                          | `number`           | 0      |
| span   | 栅格占位格数，为 0 时相当于 display: none | `number`           | -      |
| xs     | 目标节点宽度 ＜ smValue（默认 580px）     | `number \| object` |        | -   |
| sm     | 目标节点宽度 ≥ smValue（默认 580px）      | `number \| object` | -      |
| md     | 目标节点宽度 ≥ mdValue（默认 990px）      | `number \| object` | -      |
| lg     | 目标节点宽度 ≥ lgValue（默认 1600px）     | `number \| object` | -      |

## 样式变量

| 变量名       | 说明         | 默认值      |
| :----------- | :----------- | :---------- |
| @flex-prefix | 组件样式前缀 | `'exd-flex'` |

---

## 演示代码

<code src="./demos/demo1/index.tsx" />
