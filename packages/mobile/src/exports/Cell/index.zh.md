---
group:
  title: 布局
  path: /layout
  order: 100
---

# Cell 单元格 <ImportCost name="Cell" />

<!-- prettier-ignore -->
```jsx | pure
import { Cell } from '@fexd/mobile'

<Cell.Group>
  <Cell title='标题' value='内容'/>
</Cell.Group>
```

## 使用说明

单元格为列表中的单个展示项。

```jsx | pure
<Cell.Group>
  <Cell title="标题" value="内容" />
  <Cell title="标题" value="内容" desc="描述" />
</Cell.Group>
```

### Cell

| 属性           | 说明                                | 类型      | 默认值  |
| :------------- | :---------------------------------- | :-------- | :------ |
| title          | 标题                                | `string`  | `-`     |
| value          | 右侧内容                            | `string`  | `-`     |
| desc           | 标题下方的描述信息                  | `string`  | `-`     |
| size           | 单元格大小，可选值为 large small    | `string`  | `-`     |
| clickable      | 是否展示右侧箭头并开启点击反馈      | `boolean` | `false` |
| disabled       | 是否显示不可操作样式                | `boolean` | `false` |
| loading        | 是否显示加载中 icon                 | `boolean` | `false` |
| center         | 否使内容垂直居中                    | `boolean` | `false` |
| leftSlots      | 左侧自定义内容                      | `JSX`     | `-`     |
| rightSlots     | 右侧自定义内容                      | `JSX`     | `-`     |
| arrowDirection | 右侧箭头方向，可选值为 left up down | `boolean` | `true`  |
| className      | 自定义类名                          | `string`  | -       |

### Cell.Group

| 属性      | 说明         | 类型      | 默认值  |
| :-------- | :----------- | :-------- | :------ |
| title     | 组标题       | `JSX`     | `-`     |
| inset     | 是否卡片模式 | `boolean` | `false` |
| border    | 是否显示边框 | `boolean` | `true`  |
| className | 自定义类名   | `string`  | -       |

## 演示代码

<!-- ### 预览 -->

<code src="./demos/demo1/index.tsx" />
