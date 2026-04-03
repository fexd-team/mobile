---
name: Slider
description: 在区间内选择数值；支持单滑块与双滑块（值为 number 或 [number, number]）、纵向、步长、轨道与滑块显隐。
---

# Slider 滑块

在区间内选择数值；支持单滑块与双滑块（值为 `number` 或 `[number, number]`）、纵向、步长、轨道与滑块显隐。

```tsx
import { Slider } from '@fexd/mobile'
```

## 基础用法

```tsx
import React from 'react'
import { Slider } from '@fexd/mobile'

const [single, setSingle] = React.useState(30)
<Slider value={single} onChange={setSingle} />

const [range, setRange] = React.useState<[number, number]>([20, 60])
<Slider value={range} onChange={setRange} />

<Slider vertical min={0} max={100} step={20} defaultValue={[0, 50]} />

<Slider track={false} thumb={false} defaultValue={25} />
```

`onChangeCommitted` 在拖动结束时触发。示例源码参考：`packages/mobile/src/exports/Slider/demos/demo1/index.tsx`。

## Props

### Slider（`SliderProps<T>`）

定义于 `packages/mobile/src/exports/Slider/type.tsx`；受控相关字段来自 `IOProps<T>`（`packages/mobile/src/exports/useIOControl/type.tsx`）。`T` 为 `SliderValueType`，即 `number | [number, number]`，默认双滑块为 `[number, number]`。

| 属性              | 说明                          | 类型                                  |
| ----------------- | ----------------------------- | ------------------------------------- |
| defaultValue      | 非受控默认值                  | `T`                                   |
| value             | 受控当前值                    | `T`                                   |
| onChange          | 值变化（拖动过程）            | `(value: ChangeValueType<T>) => void` |
| filterIOValue     | 值过滤，返回 `false` 时不生效 | `(value: any) => boolean`             |
| onChangeCommitted | 拖动结束提交                  | `(value: ChangeValueType<T>) => void` |
| disabled          | 是否禁用                      | `boolean`                             |
| min               | 最小值                        | `number`                              |
| max               | 最大值                        | `number`                              |
| step              | 步长                          | `number`                              |
| rate              | 触摸采样间隔（ms）            | `number`                              |
| vertical          | 是否纵向                      | `boolean`                             |
| track             | 是否显示轨道 / 是否反转       | `boolean \| 'inverted'`               |
| thumb             | 是否显示滑块                  | `boolean`                             |

`SliderProps` 还 `extends Omit<JSXDivProps, 'value' | 'defaultValue' | 'onChange'>`，即另继承 `div` 的 HTML 属性（不含 `value`、`defaultValue`、`onChange`）。

`SliderRef` = `HTMLDivElement`。

## 样式变量

定义于 `packages/mobile/src/exports/Slider/type.tsx`（`SliderStyleVars` / `DOC_SliderStyleVars`）。

| 变量                          | 说明           | 默认            |
| ----------------------------- | -------------- | --------------- |
| `@slider-prefix`              | className 前缀 | `exd-slider`    |
| `@slider-track-size`          | 轨道粗细       | `4px`           |
| `@slider-transition-duration` | 过渡时长       | `0.06s`         |
| `@slider-bar-background`      | 轨道背景色     | `#e6e6e6`       |
| `@slider-node-size`           | 滑块节点尺寸   | `14px`          |
| `@slider-node-color`          | 滑块颜色       | `color-primary` |
| `@slider-track-color`         | 激活轨道色     | `color-primary` |
| `@slider-horizontal-padding`  | 水平内边距     | `16px`          |
| `@slider-vertical-padding`    | 垂直内边距     | `16px`          |
| `@slider-vertical-height`     | 纵向默认高度   | `160px`         |
| `@slider-disabled-opacity`    | 禁用透明度     | `0.5`           |

<!--
Source:
- packages/mobile/src/exports/Slider/type.tsx
- packages/mobile/src/exports/Slider/index.zh.md
- packages/mobile/src/exports/Slider/index.tsx
- packages/mobile/src/exports/Slider/demos/
- packages/mobile/src/exports/Slider/style.less
-->
