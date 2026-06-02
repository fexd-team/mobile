# Transition 家族

@fexd/mobile 的动画过渡体系基于 `createTransition` 工厂函数，提供 7 个内置过渡组件。

## 家族成员

### 内置过渡组件

| 组件                        | 效果         | 典型场景                 |
| --------------------------- | ------------ | ------------------------ |
| **TransitionFade**          | 淡入淡出     | Modal 默认遮罩、通用显隐 |
| **TransitionSlideUp**       | 从下往上滑入 | Popup、底部面板          |
| **TransitionSlideDown**     | 从上往下滑入 | 顶部通知                 |
| **TransitionFadeSlideUp**   | 淡入 + 上滑  | 组合效果                 |
| **TransitionFadeSlideDown** | 淡入 + 下滑  | 组合效果                 |
| **TransitionNone**          | 无动画       | 性能优先、不需要动画     |
| **TransitionSwitch**        | 内容切换     | Tab 内容切换             |

### 工厂函数

| 函数                 | 用途                   |
| -------------------- | ---------------------- |
| **createTransition** | 创建自定义过渡动画组件 |

## 选型决策

### Modal/Popup 默认动画

```
Modal → 默认 TransitionFade（content）+ TransitionFade（mask）
Popup → 固定 TransitionSlideUp（content）
Dialog → 固定 TransitionFade（content）
ActionSheet → 固定 TransitionSlideUp（content）
```

一般不需要自定义 Modal/Popup 的 transition，除非有特殊设计需求。

### 自定义弹层动画

```
内容从底部弹出 → TransitionSlideUp
内容从顶部滑入 → TransitionSlideDown
内容淡入 → TransitionFade
不需要动画 → TransitionNone
```

### Tab 内容切换

```
Tab 内容切换 → TransitionSwitch
```

## 动画速度预设

| 预设    | 时长  |
| ------- | ----- |
| none    | 0ms   |
| fastest | 100ms |
| fast    | 200ms |
| normal  | 300ms |
| slow    | 500ms |
| slowest | 700ms |

```tsx
<TransitionFade speed="fast">...</TransitionFade>
<TransitionFade speed={400}>...</TransitionFade>
```

## createTransition 自定义动画

```tsx
import { createTransition } from '@fexd/mobile'

const MyTransition = createTransition('my-animation', { speed: 'normal' })
// 生成 CSS 类名: my-animation-enter / my-animation-enter-active / my-animation-exit / ...
```

需要在 CSS/Less 中定义对应的动画样式。

## 常见错误

| 错误                                             | 正确                                                     |
| ------------------------------------------------ | -------------------------------------------------------- |
| 给 Modal 手动设 `transition={TransitionSlideUp}` | 大多数场景用默认即可；底部弹层用 Popup                   |
| 忘记定义 createTransition 的 CSS 动画类          | createTransition 只生成类名切换，需要配合 CSS            |
| 用 CSS animation 代替 Transition 组件            | Transition 组件与 Modal 体系集成，有 enter/exit 生命周期 |
