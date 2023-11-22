---
group:
  title: 布局
  path: /layout
---

# Grid 宫格 <ImportCost name="Grid" />

<!-- prettier-ignore -->
```jsx | pure
import { Grid } from '@fexd/mobile'

<Grid>
  <Grid.Item>自定义内容</Grid.Item>
</Grid>
```

## API

### Grid

| 属性      | 说明                                    | 类型               | 默认值   |
| :-------- | :-------------------------------------- | :----------------- | :------- |
| children  | 文本内容                                | `JSX`              | -        |
| className | 自定义类名                              | `string`           | -        |
| columns   | 列数                                    | `number`           | `4`      |
| border    | 是否显示边框                            | `boolean`          | `true`   |
| gutter    | 格子之间的水平和垂直间距，默认单位为 px | `[number, number]` | `[0, 0]` |
| vertical  | 格子内容排列是否垂直                    | `boolean`          | `true`   |
| center    | 格子内容是否居中                        | `boolean`          | `true`   |
| square    | 是否将格子设为正方形                    | `boolean`          | `false`  |

### Grid.Item

| 属性      | 说明       | 类型        | 默认值 |
| :-------- | :--------- | :---------- | :----- |
| children  | 文本内容   | `JSX`       | -      |
| className | 自定义类名 | `string`    | -      |
| icon      | 图标       | `ReactNode` | -      |
| text      | 文字       | `string`    | -      |
| onClick   | 点击事件   | `event`     | -      |

## 使用说明

在水平和垂直方向，将布局切分成若干等大的区块用于展示内容。

```jsx | pure
<Grid>
  <Grid.Item>自定义内容</Grid.Item>
  <Grid.Item>自定义内容</Grid.Item>
  <Grid.Item>自定义内容</Grid.Item>
  <Grid.Item>自定义内容</Grid.Item>
</Grid>
<Grid>
  <Grid.Item icon={<Photo/>} text="示例文字"/>
  <Grid.Item icon={<Photo/>} text="示例文字"/>
  <Grid.Item icon={<Photo/>} text="示例文字"/>
  <Grid.Item icon={<Photo/>} text="示例文字"/>
</Grid>
```

## 演示代码

<!-- ### 预览 -->

<code src="./demos/demo1/index.tsx" />
