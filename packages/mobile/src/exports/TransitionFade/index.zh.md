---
group:
  title: 展示
  path: /display
---

# Transition 动画组件

- TransitionNone <ImportCost name="TransitionNone" />
- TransitionFade <ImportCost name="TransitionFade" />
- TransitionSlideUp <ImportCost name="TransitionSlideUp" />
- TransitionSlideDown <ImportCost name="TransitionSlideDown" />
- TransitionFadeSlideUp <ImportCost name="TransitionFadeSlideUp" />
- TransitionFadeSlideDown <ImportCost name="TransitionFadeSlideDown" />

<!-- prettier-ignore -->
```jsx | pure
import {
  TransitionNone,
  TransitionFade,
  TransitionSlideUp,
  TransitionSlideDown,
  TransitionFadeSlideUp,
  TransitionFadeSlideDown
,DemoBlock} from '@fexd/mobile'

<TransitionNone in={show}>None</TransitionNone>
<TransitionFade in={fadeIn}>Fade</TransitionFade>
<TransitionSlideUp in={slideUp}>Slide Up</TransitionSlideUp>
<TransitionSlideDown in={slideDown}>Slide Down</TransitionSlideDown>
<TransitionFadeSlideUp in={fadeSlideUp}>Fade Slide Up</TransitionFadeSlideUp>
<TransitionFadeSlideDown in={fadeSlideDown}>Fade Slide Down</TransitionFadeSlideDown>
```

### 动画速度

通过 `speed` 属性设置滚动条的动画时间，共分为 6 档，分别是

- `none`: 0ms
- `fastest`: 100ms
- `fast`: 200ms
- `normal`: 300ms（默认）
- `slow`: 500ms
- `slowest`: 700ms

如果上述档位不满足要求，可传递 `number` 类型自定义数值，单位为 `ms`

```jsx | pure
<TransitionFade speed="fast" />
<TransitionFade speed={2000} />
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| in <span style="color: red;">\*</span> | 是否显示 | `boolean` | - |
| speed | 动画速度，可选值为`none`、`fastest`、`fast`、`normal`、`slow`、`slowest`，`number` 类型下时间单位为 `ms` | `string` \| `number` | `normal` |

各属性继承自 [react-transition-group](https://reactcommunity.org/react-transition-group/transition) 文档，`timeout` 属性除外

## 演示代码

<!-- ### 预览 -->

<code src="./demos/demo1/index.tsx" />
