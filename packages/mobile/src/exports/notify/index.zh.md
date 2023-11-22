---
group:
  title: 反馈
  path: /feedback
---

# notify 通知 <ImportCost name="notify" />

只有命令式的使用方式，非声明式

<!-- prettier-ignore -->
```jsx | pure
import { notify } from '@fexd/mobile'

notify.info('提示内容，string | JSX 均可', API)
```

## 使用说明

### 提示位置

### 通知类型

内置了几个的通知方法，在背景颜色下有所不同，具体如下

<!-- prettier-ignore -->
```jsx | pure
notify.info('通知') // 蓝色
notify.success('成功') // 绿色
notify.warn('警告') // 橙色
notify.fail('失败') // 红色
```

### 动画类型

通过 `transition` 属性控制出入动画，默认为 `TransitionSlideDown`（由上到下）

<!-- prettier-ignore -->
```jsx | pure
import { TransitionFade } from '@fexd/mobile'

notify.info('自定义动画', { transition: TransitionFade })
```

### 动画速度

通过 `transitionSpeed` 属性控制动画的速度，取值可参考[动画速度](/documents/exports/display/transition#动画速度)

<!-- prettier-ignore -->
```jsx | pure
import { TransitionFade } from '@fexd/mobile'

notify.info('慢速', { transitionSpeed: 'slow' })
notify.info('自定义', { transitionSpeed: 3000 })
```

### 停留时长

通过 `duration` 属性控制停留时长，单位为 `ms` 毫秒，默认停留时长 `2600ms`

注意：停留时长不包含出入动画的耗时（`beta.15+`）

<!-- prettier-ignore -->
```jsx | pure
notify.info('停留 3s', { duration: 3000 })
```

### 交互阻断

notify 默认设计为了不阻断交互，即不影响 notify 下的点击、输入、滚动等交互行为

但依然可以通过 `touchable` 参数来控制这一行为

<!-- prettier-ignore -->
```jsx | pure
notify.info('阻断交互', { touchable: true })
```

### 互斥控制

即多个 notify 重叠时的行为，参考[互斥定义](/documents/exports/feedback/modal-conflict-principle#互斥定义)，默认为 `hidden` 互斥，即 notify 重叠时，隐藏上一个 notify

通过 `{ onConflict: null }` 配置项关闭互斥行为，toast 将会叠加

<!-- prettier-ignore -->
```jsx | pure
notify.info('无互斥行为', { onConflict: null })
```

### 修改默认属性

通过修改 `notify.defaultConfig` 来调整各种默认值，**注意不要变更其引用**

<!-- prettier-ignore -->
```jsx | pure
import { TransitionFade } from '@fexd/mobile'

notify.defaultConfig.transition = TransitionFade
notify.defaultConfig.duration = 2000
// or
Object.assign(notify.defaultConfig, {
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
