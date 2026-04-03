---
name: Modal
description: 模态框
---

# Modal 模态框

核心弹层组件：Portal 挂载、遮罩、内容过渡，并在 `modalStore` 中登记。支持声明式 `<Modal />` 与命令式 `showModal`（`showModal` 由 `createModalAPI(Modal, { shareMask: true, onConflict: modalConflict.handlers.hidden })` 预配置，参数与 `Modal` 一致，内容通过 `content` 传入）。

```tsx
import { Modal, showModal, modalConflict, TransitionSlideUp, TransitionSlideDown } from '@fexd/mobile'
```

## 基础用法

```tsx
import { Modal } from '@fexd/mobile'

const [open, setOpen] = useState(false)

<Modal visible={open} onClose={() => setOpen(false)}>
  <div>Content</div>
</Modal>
```

```tsx
showModal({
  content: '命令式内容',
  onClose: () => {},
})
```

### 内容位置与动画

`placement` 支持 `center`（默认）、`top`、`bottom`。内容区默认无背景，需自行包一层带背景的节点。`transition` / `transitionSpeed` 控制内容（及关联）动画；默认内容为 `TransitionFade`，速度 `fast`。

```tsx
import { TransitionSlideDown, TransitionSlideUp } from '@fexd/mobile'

<Modal placement="top" transition={TransitionSlideDown}>
  <div>顶部</div>
</Modal>
<Modal placement="bottom" transition={TransitionSlideUp}>
  <div>底部</div>
</Modal>
```

### 遮罩与滚动

| 能力                           | 属性              | 默认    |
| ------------------------------ | ----------------- | ------- |
| 是否显示遮罩                   | `mask`            | `true`  |
| 遮罩透明                       | `maskTransparent` | `false` |
| 点击遮罩关闭（触发 `onClose`） | `maskClosable`    | `true`  |
| 长内容滚动                     | `scrollable`      | `false` |

无遮罩时，`BasicModal` 实现会将 `scrollable`、`maskClosable` 视为无效。

### 多层与互斥控制

多个弹层同时打开时，可能出现蒙层叠加、动画冲突等问题。

- **`shareMask`**：为 `true` 时多个 Modal 共享蒙层逻辑（内部将主遮罩设为透明并由 `SharedOverlay` 统一绘制），默认 `false`。
- **`onConflict`**：`ModalConflictHandler | null`，在其它 Modal 打开/关闭时通过 `modalStore` 事件触发（实现内 `debounce`），返回的 `ModalConflictProps` 会与当前 props 合并，用于调整 `contentVisible`、`contentMask`、样式等。默认无处理（不传或 `null`）。
- **内置处理器**：`modalConflict.handlers.mask`（互斥时给内容加蒙层）、`modalConflict.handlers.hidden`（互斥时隐藏内容）。`showModal` 默认使用 `hidden`。

```tsx
const { mask, hidden } = modalConflict.handlers

<Modal shareMask onConflict={mask} placement="bottom" transition={TransitionSlideUp}>
  第一层
</Modal>
<Modal shareMask onConflict={hidden} placement="bottom" transition={TransitionSlideUp}>
  第二层
</Modal>
```

更完整的类型说明、`modalConflict.create` / `merge` / `extend` 与全量 Props 见 [Modal-advanced.md](Modal-advanced.md)。结构、Store 与 `SharedOverlay` 见 [Modal-design.md](Modal-design.md)。

## Props（常用）

`ModalProps` = `Omit<BasicModalProps, 'modalId' | 'storeProps'>` 与 `PureModalProps` 合并（`Modal/type.tsx`）。未列字段见 [Modal-advanced.md](Modal-advanced.md)。

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| visible | `boolean` | - | 是 | 是否显示 |
| children | `React.ReactNode` | - | 否 | 内容（声明式） |
| onClose | `React.ReactEventHandler<HTMLElement>` | - | 否 | 关闭意图，由外部同步 `visible` |
| modalId | `ModalIdType` | 内部 `uniqueId` | 否 | 弹层 id，参与 store |
| placement | `'center' \| 'top' \| 'bottom'` | `center` | 否 | 内容位置 |
| transition | `TransitionType` | `TransitionFade` | 否 | 内容过渡 |
| transitionSpeed | `TransitionSpeed` | `fast` | 否 | 动画速度 |
| mask | `boolean` | `true` | 否 | 是否显示遮罩 |
| maskClosable | `boolean` | `true` | 否 | 点击遮罩是否触发 `onClose` |
| maskTransparent | `boolean` | `false` | 否 | 遮罩透明 |
| maskTransition | `TransitionType` | `TransitionFade` | 否 | 遮罩过渡 |
| maskClassName | `string` | - | 否 | 遮罩类名 |
| scrollable | `boolean` | `false` | 否 | 内容是否可滚动 |
| level | `'low' \| 'normal' \| 'high' \| 'highest'` | `normal` | 否 | z-index 档位 |
| type | `string` | - | 否 | 互斥等场景的标识 |
| className | `string` | - | 否 | 内容容器类名（见 `BasicModal`） |
| style | `CSSProperties` | - | 否 | 内容容器样式 |
| contentClassName | `string` | - | 否 | 内层内容包裹 `div` 类名 |
| portalClassName | `string` | - | 否 | Portal 容器类名 |
| destroyOnExit | `boolean` | `true` | 否 | 退场后是否销毁 |
| shareMask | `boolean` | `false` | 否 | 是否共享蒙层 |
| contentVisible | `boolean` | `true` | 否 | 互斥：内容是否可见 |
| contentTransition | `TransitionType` | `TransitionFade` | 否 | 互斥：内容显隐过渡 |
| contentTransitionSpeed | `TransitionSpeed` | `fast` | 否 | 互斥：内容过渡速度 |
| contentMask | `boolean` | `false` | 否 | 互斥：内容区附加蒙层 |
| contentMaskTransition | `TransitionType` | `TransitionFade` | 否 | 内容蒙层过渡 |
| onConflict | `ModalConflictHandler \| null` | - | 否 | 互斥处理 |

## 样式定制

`ModalStyleVars` / `DOC_ModalStyleVars`（`Modal/type.tsx`）：

| 变量                     | 说明           | 默认        |
| ------------------------ | -------------- | ----------- |
| `@modal-prefix`          | 类名前缀       | `exd-modal` |
| `@modal-z-index-low`     | 低层级 z-index | `999`       |
| `@modal-z-index-normal`  | 普通层级       | `9999`      |
| `@modal-z-index-high`    | 高层级         | `99999`     |
| `@modal-z-index-highest` | 最高层级       | `999999`    |

## 注意事项

- `onClose` 仅表达关闭意图，不会自动改 `visible`。
- 互斥逻辑依赖 `modalStore` 中其它实例的可见性与 `zIndex`；自定义 `onConflict` 可返回 `Promise`，实现为异步合并到 state。

## 相关组件

- [Modal-advanced.md](Modal-advanced.md) — 完整 Props、冲突类型、`modalConflict`
- [Modal-design.md](Modal-design.md) — DOM、`SharedOverlay`、`modalStore`
- `BasicModal`、`Overlay`、`Portal`、`Popup`、`Dialog`

<!--
Source:
- packages/mobile/src/exports/Modal/type.tsx
- packages/mobile/src/exports/Modal/index.zh.md
- packages/mobile/src/exports/Modal/index.tsx
- packages/mobile/src/exports/Modal/demos/
- packages/mobile/src/exports/Modal/style.less
-->
