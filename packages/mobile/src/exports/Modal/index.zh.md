---
group:
  title: 反馈
  path: /feedback
---

# Modal 模态框 <ImportCost name="Modal" />

<!-- prettier-ignore -->
```jsx | pure
import { Modal, showModal } from '@fexd/mobile'

<Modal visible>声明式</Modal>

showModal({
  content: '命令式' // 通过 content 属性来设置内容，其余参数与 Modal API 一致
})
```

## 使用说明

### 内容位置

通过 `placement` 属性控制模态框内容位置，支持 `center`、`top`、`bottom` 三种类型，默认为 `center`

<!-- prettier-ignore -->
```jsx | pure
<Modal>中间（默认）</Modal>
<Modal placement="top">顶部</Modal>
<Modal placement="bottom">底部</Modal>
```

### 自定义内容与动画

模态框内容默认无背景，需要通过自定义节点来控制背景

- 通过 `transition` 控制出入场的[动画类型](/documents/exports/display/transition)，默认是 `TransitionFade`
- 通过 `transitionSpeed` 控制动画速度，默认是 `fast`

<!-- prettier-ignore -->
```jsx | pure
import { TransitionSlideDown, TransitionSlideUp } from '@fexd/mobile'

<Modal><div>中间 Fade</div/>
<Modal placement="top" transition={TransitionSlideDown}><div>顶部 Slide-Down</div/>
<Modal placement="bottom" transition={TransitionSlideUp}><div>底部 Slide-up</div/>
```

### 遮罩属性

- 通过 `mask` 控制是否需要遮罩层，默认为 `true`
- 通过 `maskTransparent` 控制遮罩层是否透明，默认为 `false`
- 通过 `maskClosable` 控制点击遮罩层是否关闭（将触发 `onClose` 关闭意图），默认为 `true`

<!-- prettier-ignore -->
```jsx | pure
<Modal mask={false}>无遮罩</Modal>
<Modal maskTransparent>遮罩透明</Modal>
<Modal maskClosable={false}>遮罩不可关闭</Modal>
```

### 长内容滚动

通过 `scrollable` 属性控制模态框内容是否可以滚动，默认为 `false`

<!-- prettier-ignore -->
```jsx | pure
<Modal scrollable>
  <div>
    {Array(50).fill('').map((item, idx) => (
      <div key={idx}>内容条目 {idx + 1}</div>
    ))}
  </div>
</Modal>
```

### 互斥控制

- 通过 `shareMask` 使多个模态框共享蒙层，默认为 `false`
- 通过 `onConflict` 进行互斥控制，默认无互斥控制，待补充文档做详细解释，目前可使用内置的互斥控制器
- 内置的互斥控制器为 `modalConflict.handlers`，`mask` 为互斥时增加内容蒙层，`hidden` 为互斥时隐藏内容

具体参考[此处](/documents/exports/feedback/modal-conflict-principle#互斥定义)

<!-- prettier-ignore -->
```jsx | pure
// 多层 Slide-up
import { modalConflict, TransitionSlideUp } from '@fexd/mobile'

const { mask, hidden } = modalConflict.handlers

<Modal shareMask onConflict={mask} placement="bottom" transition={TransitionSlideUp}>
  第一层 <Button>打开第二层</Button>
</Modal>
<Modal shareMask onConflict={hidden} placement="bottom" transition={TransitionSlideUp}>
  第二层 <Button>打开第三层</Button>
</Modal>
<Modal shareMask>第三层</Modal>
```

<!-- prettier-ignore -->
```jsx | pure
// Slide-up 和 Slide-down
import { modalConflict, TransitionSlideUp, TransitionSlideDown } from '@fexd/mobile'

const { mask } = modalConflict.handlers

// 可直接修改默认属性
Modal.defaultProps.shareMask = true

<Modal onConflict={mask} placement="bottom" transition={TransitionSlideUp}>
  第一层 Slide-up <Button>打开第二层 Slide-down</Button>
</Modal>
<Modal onConflict={mask} placement="top" transition={TransitionSlideDown}>
  第二层 Slide-down <Button>打开第三层 Slide-up</Button>
</Modal>
<Modal>第三层 Slide-up</Modal>
```

## API

### 基础 Props

| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| visible <span style="color: red;">\*</span> | 是否显示模态框 | `boolean` | - |
| children <span style="color: red;">\*</span> | 模态框内容 | `jsx` | - |
| modalId | 模态框 id | `string` | `normal` |
| onClose | 行为意图钩子，尝试关闭时，用于控制外部 visible 变量 | `function` | - |
| level | 模态框级别，影响模态框 z-index，可选值为 `low`、`normal`、`high`、`highest` | `string` | `normal` |
| type | 模态框类型，仅用作互斥标识使用，无其他用途 | `string` | - |
| className | 内容容器的类名 | `string` | - |
| style | 内容容器的样式 | `style-object` | - |
| scrollable | 模态框内容是否可滚动 | `boolean` | `false` |
| placement | 内容位置，可选值为 `center`、`top`、`bottom` | `string` | `center` |
| transition | 内容出入[动画类型](/documents/exports/display/transition) | `Transition` | `TransitionFade` |
| transitionSpeed | 动画速度，影响所有相关动画如蒙层动画 | `string` | `fast` |
| portalClassName | 模态框 Portal 容器的类名 | `string` | - |
| mask | 是否显示遮罩，基于 Overlay 组件 | `boolean` | `true` |
| maskClosable | 点击遮罩是否允许关闭（触发 onClose 意图钩子） | `boolean` | `true` |
| maskTransparent | 遮罩是否透明 | `boolean` | `false` |
| maskTransition | 遮罩出入[动画类型](/documents/exports/display/transition) | `Transition` | `TransitionFade` |
| maskClassName | 遮罩样式名 | `string` | - |
| onCreated | 生命周期，模态框创建后 | `function` | - |
| onEnter | 生命周期，开始入场前 | `function` | - |
| onEntered | 生命周期，入场完成后 | `function` | - |
| onExit | 生命周期，开始退场前 | `function` | - |
| onExited | 生命周期，退场完成后 | `function` | - |
| onDestroyed | 生命周期，模态框销毁后 | `function` | - |
| destroyOnExit | 动画完成后是否销毁模态框 | `boolean` | `true` |
| shareMask | 是否共享蒙层，用于互斥控制 | `boolean` | `false` |
| contentVisible | 内容是否可见，用于互斥控制 | `boolean` | `true` |
| contentTransition | 内容可见性的[动画类型](/documents/exports/display/transition)，用于互斥控制 | `Transition` | `TransitionFade` |
| contentTransitionSpeed | 互斥动画速度，用于互斥控制 | `string` | `fast` |
| contentMask | 内容是否进行蒙层覆盖，用于互斥控制 | `boolean` | `false` |
| contentMaskTransition | 内容蒙层的[动画类型](/documents/exports/display/transition)，用于互斥控制 | `Transition` | `TransitionFade` |
| onConflict | 互斥事件响应器，待详细文档做解释 | `ConflictHandler` | - |

## 演示代码

<!-- ### 预览 -->

<code src="./demos/demo1/index.tsx" />
