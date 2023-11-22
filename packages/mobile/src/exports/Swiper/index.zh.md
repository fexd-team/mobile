---
group:
  title: 展示
  path: /display
---

# Swiper 轮播 <ImportCost name="Swiper" />

就那种滑来滑去的，通常用来放广告的玩意儿

<!-- prettier-ignore -->
```jsx | pure
import { Swiper } from '@fexd/mobile'

<Swiper>
  <div>1</div>
  <div>2</div>
  <div>3</div>
<Swiper>
```

---

## 使用说明

### 基础

通过 `defaultValue` 设置初始下标

<!-- prettier-ignore -->
```jsx | pure
import { Swiper } from '@fexd/mobile'

<Swiper defaultValue={1}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
<Swiper>
```

### 方向

通过 `vertical` 设置为纵向，默认为横向

<!-- prettier-ignore -->
```jsx | pure
import { Swiper } from '@fexd/mobile'

<Swiper vertical>
  <div>1</div>
  <div>2</div>
  <div>3</div>
<Swiper>
```

### 尺寸大小

直接通过样式设置尺寸大小

<!-- prettier-ignore -->
```jsx | pure
import { Swiper } from '@fexd/mobile'

<Swiper style={{ width: '100%', height: 160 }}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
<Swiper>
```

### 自动轮播

- 通过 `autoplay` 设置是否自动轮播，默认为 `true`
- 通过 `interval` 设置自动轮播的间隔时间，默认为 `3500ms`
- 通过 `speed` 设置切换的速度，默认为 `300ms`

<!-- prettier-ignore -->
```jsx | pure
import { Swiper } from '@fexd/mobile'

<Swiper autoplay interval={3500} speed={300}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
<Swiper>
```

### 循环

通过 `loop` 设置为循环滚动，默认为 `false`

> 内容个数大于 2 个才有效

<!-- prettier-ignore -->
```jsx | pure
import { Swiper } from '@fexd/mobile'

<Swiper loop>
  <div>1</div>
  <div>2</div>
  <div>3</div>
<Swiper>
```

### 受控状态

通过 `value`、`onChange` 管理受控状态

<!-- prettier-ignore -->
```jsx | pure
import React, { useState } from 'react'
import { Swiper } from '@fexd/mobile'

const [idx, setIdx] = useState(1)

<Swiper value={idx} onChange={setIdx}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
<Swiper>
```

### 自定义指示器

通过 `indicator` 自定义指示器

<!-- prettier-ignore -->
```jsx | pure
import { Swiper } from '@fexd/mobile'

<Swiper indicator={(total, current) => (<>{current} / {total}</>)}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
<Swiper>
```

---

## API

| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| children <span style="color: red;">\*</span> | 内容，必须传递 | - | - |
| defaultValue | 默认下标 | `number` | - |
| value | 受控下标 | `number` | - |
| onChange | 滑动变化回调 | `Function` | - |
| autoplay | 是否自动轮播 | `boolean` | true |
| interval | 自动轮播间隔（ms） | `number` | 3500 |
| loop | 是否循环 | `boolean` | false |
| swipeable | 是否可滑动 | `boolean` | true |
| vertical | 是否纵向 | `boolean` | false |
| speed | 动画速度 （ms） | `number` | 300 |
| easing | 缓动函数 | `(progress: number) => number` | - |
| indicator | 指示器渲染 | `(total: number, current: number) => JSX` | - |

---

## 样式变量

| 变量名         | 说明         | 默认值        |
| :------------- | :----------- | :------------ |
| @swiper-prefix | 组件样式前缀 | `'exd-swiper'` |

---

## 演示代码

<code src="./demos/demo1/index.tsx" />
