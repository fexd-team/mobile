---
group:
  title: 输入
  path: /data
---

# Slider 滑块 <ImportCost name="Slider" />

滑动输入条，用于在给定的范围内选择一个值。

<!-- prettier-ignore -->
```jsx | pure
import { Slider } from '@fexd/mobile'

<Slider />
```

## Props 属性

| 属性              | 说明                               | 类型                       | 默认值 | 提供的值 |
| :---------------- | :--------------------------------- | :------------------------- | :----- | :------- |
| defaultValue      | 默认值，若是数组则为双滑块模式     | number \| [number, number] | [0, 0] | -        |
| value             | 当前值，若是数组则为双滑块模式     | number \| [number, number] | -      | -        |
| min               | 最小值                             | number                     | 0      | -        |
| max               | 最大值                             | number                     | 100    | -        |
| step              | 步长                               | number                     | 1      | -        |
| disabled          | 是否禁用滑块                       | boolean                    | -      | -        |
| vertical          | 是否垂直展示                       | boolean                    | false  | -        |
| track             | 控制是否显示进度条、进度条是否翻转 | boolean \| 'inverted'      | true   | -        |
| thumb             | 控制是否显示滑块                   | boolean                    | true   | -        |
| onChange          | 进度变化时触发                     | (value) => void            | -      | -        |
| onChangeCommitted | 结束拖动时触发                     | (value) => void            | -      | -        |
| rate              | 触摸事件触发频率（采样率，ms）     | number                     | 16     | -        |

## 演示代码

<!-- ### 预览 -->
<code src="./demos/demo1/index.tsx" />
