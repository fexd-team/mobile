---
group:
  title: 反馈
  path: /feedback
---

# Overlay 遮罩层 <ImportCost name="Overlay" />

<!-- prettier-ignore -->
```jsx | pure
import { Overlay } from '@fexd/mobile'

<Overlay visible />
```

## 使用说明

<!-- prettier-ignore -->
```jsx | pure
<Overlay visible /> // 显示遮罩
<Overlay absolute /> // 绝对定位（相对父容器）
<Overlay>遮罩内容</Overlay>
<Overlay transparent>遮罩内容 + 透明背景</Overlay>
<Overlay transition={TransitionSlideUp} /> // 自定义动画 Slide-Up
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| visible <span style="color: red;">\*</span> | 是否显示遮罩 | `boolean` | - |
| onClick | 遮罩点击事件，可用于隐藏遮罩 | `function` | - |
| transparent | 遮罩是否透明 | `boolean` | `false` |
| transition | 遮罩出入的[动画类型](/documents/exports/display/transition) | `Transition` | `TransitionFade` |
| transitionSpeed | 动画速度 | `string` | `normal` |
| className | 遮罩类名 | `string` | - |
| children | 遮罩内容 | `jsx` | - |

## 演示代码

<!-- ### 预览 -->

<code src="./demos/demo1/index.tsx" />
