---
group:
  title: 反馈
  path: /feedback
---

# toast 提示 <ImportCost name="toast" />

只有命令式的使用方式，非声明式

<!-- prettier-ignore -->
```jsx | pure
import { toast } from '@fexd/mobile'

toast.info('提示内容，string | JSX 均可', API)
```

## 使用说明

### 提示位置

通过 `placement` 属性控制模态框内容位置，支持 `center`、`top`、`bottom` 三种类型，默认为 `center`

<!-- prettier-ignore -->
```jsx | pure
toast.info('中间弹出')
toast.info('中间弹出', { placement: 'center' })
toast.info('顶部弹出', { placement: 'top' })
toast.info('底部弹出', { placement: 'bottom' })
```

### 弹窗类型

内置了几个的弹窗方法，仅在图标上有所不同，具体如下

<!-- prettier-ignore -->
```jsx | pure
toast.info('无图标') // 无图标
toast.success('成功') // 自带图标 "√"
toast.warn('警告') // 自带图标 "!"
toast.fail('失败') // 自带图标 "x"
```

### 自定义图标

内置了几个自带图标的弹窗方法，具体如下

<!-- prettier-ignore -->
```jsx | pure
import { MdFlame } from '@fexd/icons'

toast.info('自定义图标', {
  icon: <MdFlame />
})
```

### 动画类型

通过 `transition` 属性控制出入动画，默认根据 `placment` 决定，也可以自定义

- `placment` 为 `center` 时为 `TransitionFade`（淡入淡出）
- `placment` 为 `top` 时为 `TransitionSlideDown`（由上到下）
- `placment` 为 `bottom` 时为 `TransitionSlideUp`（由下到上）

<!-- prettier-ignore -->
```jsx | pure
import { TransitionFade } from '@fexd/mobile'

toast.info('自定义动画', { placment: 'top', transition: TransitionFade })
```

### 动画速度

通过 `transitionSpeed` 属性控制动画的速度，取值可参考[动画速度](/documents/exports/display/transition#动画速度)

<!-- prettier-ignore -->
```jsx | pure
import { TransitionFade } from '@fexd/mobile'

toast.info('慢速', { transitionSpeed: 'slow' })
toast.info('自定义', { transitionSpeed: 3000 })
```

### 停留时长

通过 `duration` 属性控制停留时长，单位为 `ms` 毫秒，默认停留时长 `1800ms`

注意：停留时长不包含出入动画的耗时（`beta.14+`）

<!-- prettier-ignore -->
```jsx | pure
toast.info('停留 3s', { duration: 3000 })
```

### 交互阻断

toast 默认设计为了不阻断交互，即不影响 toast 下的点击、输入、滚动等交互行为

但依然可以通过 `touchable` 参数来控制这一行为

<!-- prettier-ignore -->
```jsx | pure
toast.info('阻断交互', { touchable: true })
```

### 互斥控制

即多个 toast 重叠时的行为，参考[互斥定义](/documents/exports/feedback/modal-conflict-principle#互斥定义)，默认为 `hidden` 互斥，即 toast 重叠时，隐藏上一个 toast

- 通过 `{ onConflict: null }` 配置项关闭互斥行为，toast 将会叠加
- 内置了 `modalConflict.handlers.offsetByPlacement` 偏移互斥控制器，这对同时浏览多条提示时十分有效，仅对 `placment` 为 `top`、`bottom` 生效，且互斥池独立

<!-- prettier-ignore -->
```jsx | pure
import { modalConflict } from '@fexd/mobile'

toast.info('无互斥行为', { onConflict: null })
toast.info('偏移互斥', {
  onConflict: modalConflict.handlers.offsetByPlacement,
})
```

### 修改默认属性

通过修改 `toast.defaultConfig` 来调整各种默认值，**注意不要变更其引用**

<!-- prettier-ignore -->
```jsx | pure
import { TransitionFade } from '@fexd/mobile'

toast.defaultConfig.transition = TransitionFade
toast.defaultConfig.duration = 2000
// or
Object.assign(toast.defaultConfig, {
  transition: TransitionFade,
  transitionSpeed: 'fastest',
  touchable: true,
})
```

## API

属性继承自 [Modal](/documents/exports/feedback/modal#api)

| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| className | 容器的类名 | `string` | - |
| contentClassName | 内容容器的类名 | `string` | - |
| placement | 内容位置，可选值为 `center`、`top`、`bottom` | `string` | `center` |
| transition | 内容出入[动画类型](/documents/exports/display/transition) | `Transition` | 根据 `placement` 属性确定 |
| transitionSpeed | 动画速度，影响所有相关动画如蒙层动画 | `string` | `fast` |
| onCreated | 生命周期，模态框创建后 | `function` | - |
| onEnter | 生命周期，开始入场前 | `function` | - |
| onEntered | 生命周期，入场完成后 | `function` | - |
| onExit | 生命周期，开始退场前 | `function` | - |
| onExited | 生命周期，退场完成后 | `function` | - |
| onDestroyed | 生命周期，模态框销毁后 | `function` | - |
| onConflict | 互斥事件响应器，待详细文档做解释 | `ConflictHandler` | - |

## 演示代码

<!-- ### 预览 -->

<code src="./demos/demo1/index.tsx" />
