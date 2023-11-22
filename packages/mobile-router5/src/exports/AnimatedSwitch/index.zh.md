---
group:
  title: 导航
  path: /navigation
---

# AnimatedSwitch 路由动画 <ImportCost name="AnimatedSwitch" />

给受路由控制的视图区域添加平滑过渡动画

```jsx | pure
import { AnimatedSwitch } from '@fexd/mobile-router5'
```

## 基础用法

使用 `AnimatedSwitch` 替代 `react-router-dom` 中的 `Switch` 即可

<code src="./demos/basic.jsx" />

## 动画类型

### slide-cover

<code src="./demos/slide-cover.jsx" />

### fade

<code src="./demos/fade.jsx" />

### slide（默认）

<code src="./demos/slide.jsx" />

## 动画速度

共分为 5 档，分别是

- fastest: 100ms
- fast: 200ms
- normal: 300ms（默认）
- slow: 500ms
- slowest: 700ms

示例

<code src="./demos/speed-slowest.jsx" />

## 过场方向

### history（默认）

按路由动作判断过场方向

- `PUSH / REPLACE` 类型视为前进动作
- `POP` 类型视为后退动作

### index

按匹配的 `<Route>` 下标判断过场动画

如果下一个页面的 Route 坐标：

- 较大，视为前进动作
- 较小，视为前进动作

> index 类型的初始目的是 tabs 布局场景

<code src="./demos/direction-index.jsx" />

## 布局过渡

AnimatedSwitch.renderLayout 会抽取类 Switch 的所有 Route 子组件的 path 配置，生成一个新的 Route 包裹

通常用来做布局切换

示例：

<code src="./demos/wrap-routes.jsx" />

## API

| 属性      | 属性说明               | 类型                                                   | 默认值    |
| :-------- | :--------------------- | :----------------------------------------------------- | :-------- |
| always    | 只要路由变化就进行动画 | boolean                                                | false     |
| animate   | 动画类型               | 'slide' \| 'slide-cover' \| 'fade'                     | 'slide'   |
| speed     | 动画速度               | 'fastest' \| 'fast' \| 'normal' \| 'slow' \| 'slowest' | 'normal'  |
| direction | 动画方向判定           | 'history' \| 'index'                                   | 'history' |
