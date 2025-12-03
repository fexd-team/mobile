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

---

## 样式变量

组件提供了以下 Less 变量，可用于自定义样式：

| 变量名                         | 说明                     | 默认值            |
| :----------------------------- | :----------------------- | :---------------- |
| `@grid-prefix`                 | Grid 组件样式前缀        | `'exd-grid'`      |
| `@grid-font-size`              | Grid 字体大小            | `10px`            |
| `@grid-item-prefix`            | Grid.Item 组件样式前缀   | `'exd-grid-item'` |
| `@grid-item-icon-size`         | 图标大小                 | `20px`            |
| `@grid-item-text-font-size`    | 文字字体大小             | `12px`            |
| `@grid-item-text-margin-top`   | 文字上外边距（垂直布局） | `8px`             |
| `@grid-item-text-margin-left`  | 文字左外边距（水平布局） | `8px`             |
| `@grid-item-padding-y`         | 内容区垂直内边距         | `16px`            |
| `@grid-item-padding-x`         | 内容区水平内边距         | `8px`             |
| `@grid-item-background`        | 背景色                   | `#fff`            |
| `@grid-item-active-background` | 点击态背景色             | `#f2f3f5`         |
| `@size-scale`                  | 全局尺寸缩放比例         | `1`               |
| `@color-gray-primary`          | 文字颜色                 | `#262626`         |
| `@color-gray-border`           | 边框颜色                 | `#d9d9d9`         |

## 演示代码

<!-- ### 预览 -->

<code src="./demos/demo1/index.tsx" />
