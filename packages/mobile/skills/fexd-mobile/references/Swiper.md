---
name: Swiper
description: 横向或纵向滑动的轮播容器，常用于 Banner、多页内容切换。
---

# Swiper 轮播

横向或纵向滑动的轮播容器，常用于 Banner、多页内容切换。

```tsx
import { Swiper } from '@fexd/mobile'
;<Swiper>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Swiper>
```

## 基础用法

```tsx
import { useState } from 'react'
import { Swiper } from '@fexd/mobile'

const [idx, setIdx] = useState(0)

;<Swiper value={idx} onChange={setIdx} style={{ height: 130 }} autoplay={false}>
  <div>1</div>
  <div>2</div>
</Swiper>
```

```tsx
import { Swiper } from '@fexd/mobile'
;<Swiper vertical loop swipeable={false} interval={3500} speed={300} style={{ width: '100%', height: 160 }}>
  <div>a</div>
  <div>b</div>
  <div>c</div>
</Swiper>
```

```tsx
import { Swiper } from '@fexd/mobile'
;<Swiper
  indicator={(total, current) => (
    <span>
      {current} / {total}
    </span>
  )}
>
  <div>1</div>
  <div>2</div>
</Swiper>
```

更多示例见 `packages/mobile/src/exports/Swiper/demos/demo1/index.tsx`。循环 `loop` 在子项多于 2 个时才有意义。

## Props

`SwiperProps`（`packages/mobile/src/exports/Swiper/type.tsx`）由 `JSXDivProps`（排除 `defaultValue`、`value`、`onChange`）、`IOProps<number>`、`Pick<UseTouchOption, 'rate' | 'preventDefault' | 'stopPropagation'>` 与下列字段合并。

### 轮播与交互

| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| children | 子面板（必填） | `React.ReactNode` | — |
| interval | 自动轮播间隔（ms） | `number` | `3500` |
| autoplay | 是否自动轮播 | `boolean` | `true` |
| loop | 是否循环（子项 ≥ 3 时生效） | `boolean` | `false` |
| swipeable | 是否允许滑动切换 | `boolean` | `true` |
| vertical | 是否纵向 | `boolean` | `false` |
| speed | 动画时长（ms） | `number` | `300` |
| easing | 缓动函数 | `EasingFunction`（`@fexd/tools/es/easing`） | 内置 `outQuad`（见 `Swiper/index.tsx`） |
| indicator | 自定义指示器 | `(total: number, current: number) => React.ReactNode` | — |
| thresholdPercent | 切换阈值（占容器宽度/高度百分比） | `number` | `30` |
| thresholdPixel | 切换阈值（像素） | `number` | `200` |

### 受控与 IO（`IOProps<number>`）

| 属性          | 类型                      | 默认值 |
| :------------ | :------------------------ | :----- |
| defaultValue  | `number`                  | `0`    |
| value         | `number`                  | —      |
| onChange      | `(value: number) => void` | —      |
| filterIOValue | `(value: any) => boolean` | —      |

### 触摸（`useTouch` 选项子集）

| 属性            | 类型      | 默认值  |
| :-------------- | :-------- | :------ |
| rate            | `number`  | `0`     |
| preventDefault  | `boolean` | `true`  |
| stopPropagation | `boolean` | `false` |

另含除已 Omit 键以外的 `div` 原生属性。

## 样式变量

`SwiperStyleVars`（`DOC_SwiperStyleVars`）：`@swiper-prefix`、`@swiper-indicator-offset`、`@swiper-indicator-size`、`@swiper-indicator-color`、`@swiper-indicator-active-color`、`@size-scale`。

<!--
Source:
- packages/mobile/src/exports/Swiper/type.tsx
- packages/mobile/src/exports/Swiper/index.zh.md
- packages/mobile/src/exports/Swiper/index.tsx
- packages/mobile/src/exports/Swiper/demos/
- packages/mobile/src/exports/Swiper/style.less
-->
