---
name: BasicModal
description: 弹层基础实现：Portal 挂载、遮罩、过渡与 modalStore 登记。业务上多用 Modal / Popup 封装；理解本组件有助于定制层级与生命周期。
---

# BasicModal 基础模态

弹层基础实现：Portal 挂载、遮罩、过渡与 `modalStore` 登记。业务上多用 `Modal` / `Popup` 封装；理解本组件有助于定制层级与生命周期。

```tsx
import { BasicModal } from '@fexd/mobile'
```

## 基础用法

```tsx
<BasicModal modalId="my-modal" visible={open} onClose={() => setOpen(false)}>
  <div>Content</div>
</BasicModal>
```

```tsx
<BasicModal modalId="top-sheet" visible={open} placement="bottom" maskClosable onClose={() => setOpen(false)}>
  Bottom content
</BasicModal>
```

## Props

`BasicModalProps` = `Omit<JSXDivProps, 'prefix' | 'children' | 'title' | 'content' | 'ref'>` 与 `PureBasicModalProps` 合并（`exports/BasicModal/type.tsx`）。

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| modalId | `ModalIdType` | - | 是 | 弹层唯一 id，用于 store |
| visible | `boolean` | - | 是 | 是否显示 |
| children | `React.ReactNode` | - | 否 | 内容 |
| onClose | `React.ReactEventHandler<HTMLElement>` | - | 否 | 尝试关闭（如遮罩点击、内容区逻辑） |
| type | `string` | - | 否 | 类型标识（互斥等场景） |
| level | `'low' \| 'normal' \| 'high' \| 'highest'` | `'normal'` | 否 | z-index 档位 |
| portalClassName | `string` | - | 否 | Portal 容器类名 |
| scrollable | `boolean` | - | 否 | 有遮罩时内容区是否可滚动 |
| placement | `'center' \| 'top' \| 'bottom'` | `'center'` | 否 | 内容位置 |
| transition | `TransitionType` | `TransitionFade` | 否 | 内容过渡组件 |
| transitionSpeed | `TransitionSpeed` | `'fast'` | 否 | 动画速度 |
| mask | `boolean` | `true` | 否 | 是否显示遮罩 |
| maskClosable | `boolean` | `true` | 否 | 点击遮罩是否触发关闭 |
| maskTransparent | `boolean` | `false` | 否 | 遮罩透明 |
| maskTransition | `TransitionType` | - | 否 | 遮罩过渡 |
| maskClassName | `string` | - | 否 | 遮罩类名 |
| onCreated | `() => void` | - | 否 | 创建后 |
| onEnter / onEntered / onExit / onExited | `TransitionProps` 对应回调 | - | 否 | 过渡生命周期 |
| onDestroyed | `() => void` | - | 否 | 销毁后 |
| ref | `React.Ref<HTMLDivElement>` | - | 否 | 内容根节点 |
| storeProps | `any` | 当前 props | 否 | 存入 modalStore 的数据 |
| destroyOnExit | `boolean` | `true` | 否 | 退场后是否销毁内容 |
| portalTo | `any` | - | 否 | Portal 目标节点 |
| className / style / onClick / … | 见 `JSXDivProps` 省略项 | - | 否 | 根容器 DOM 属性 |

## 注意事项

- 无遮罩时，实现会将 `scrollable`、`maskClosable` 视为无效（见 `BasicModal/index.tsx`）。
- `onClose` 为“意图”回调，需由外部同步更新 `visible`。

## 样式定制

`BasicModal/type.tsx` 中 `BasicModalStyleVars` 提供各 `level` 对应 z-index 变量（`@modal-z-index-low` 等）。

## 相关组件

`Modal`、`Popup`、`Overlay`、`Portal`

<!--
Source:
- packages/mobile/src/exports/BasicModal/type.tsx
- packages/mobile/src/exports/BasicModal/index.tsx
- packages/mobile/src/exports/BasicModal/style.less
-->
