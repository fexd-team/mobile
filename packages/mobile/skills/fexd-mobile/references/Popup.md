---
name: Popup
description: 底部/通用弹层封装，带标题栏与圆角等；属性在 Modal 能力之上扩展。命令式 showPopup 用 content 替代 children，且不手写 visible / onClose。
---

# Popup 弹出层

底部/通用弹层封装，带标题栏与圆角等；属性在 `Modal` 能力之上扩展。命令式 `showPopup` 用 `content` 替代 `children`，且不手写 `visible` / `onClose`。

```tsx
import { Popup, showPopup } from '@fexd/mobile'
```

## 基础用法

示例来源：`packages/mobile/src/exports/Popup/demos/demo1/index.tsx`。

```tsx
import { Button, showPopup } from '@fexd/mobile'

export default () => (
  <Button
    onClick={() => {
      showPopup({
        style: { minHeight: '35%' },
        title: 'Title',
        round: true,
        content: null,
      })
    }}
  >
    Open
  </Button>
)
```

## Props

`PopupProps` 定义于 `packages/mobile/src/exports/Popup/type.tsx`：

- `Omit<ModalProps, 'placement' | 'transition' | 'type'>`（`packages/mobile/src/exports/Modal/type.tsx`）
- 与 `PurePopupProps` 合并

### `PurePopupProps`（`Popup/type.tsx`）

| 属性                 | 类型                                            | 默认值             | 说明           |
| -------------------- | ----------------------------------------------- | ------------------ | -------------- |
| `title`              | `string \| React.ReactNode`                     | -                  | 标题           |
| `header`             | `React.ReactNode \| (() => React.ReactNode)`    | `<NavBar />`       | 标题栏整体     |
| `headerRight`        | `React.ReactNode \| (() => React.ReactNode)`    | `<CloseOutline />` | 标题栏右侧     |
| `headerLeft`         | `React.ReactNode \| (() => React.ReactNode)`    | -                  | 标题栏左侧     |
| `onHeaderLeftClick`  | `(e: React.MouseEvent<HTMLDivElement>) => void` | -                  | 标题栏左侧点击 |
| `onHeaderRightClick` | `(e: React.MouseEvent<HTMLDivElement>) => void` | -                  | 标题栏右侧点击 |
| `round`              | `boolean`                                       | `false`            | 是否圆角       |

### 继承自 `ModalProps`（不含 `placement`、`transition`、`type`）

与 `BasicModalProps`（`packages/mobile/src/exports/BasicModal/type.tsx`）及 `PureModalProps`（`packages/mobile/src/exports/Modal/type.tsx`）合并后，再排除上述三个字段。主要包括：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `visible` | `boolean` | 是否显示 |
| `children` | `React.ReactNode` | 内容 |
| `onClose` | `React.ReactEventHandler<HTMLElement>` | 关闭意图 |
| `modalId` | `ModalIdType` | 弹层 id（Modal 层为可选） |
| `level` | `ModalLevel` | z-index 档位 |
| `portalClassName` | `string` | Portal 容器类名 |
| `scrollable` | `boolean` | 内容是否可滚动 |
| `mask` / `maskClosable` / `maskTransparent` / `maskTransition` / `maskClassName` | — | 遮罩相关 |
| `transitionSpeed` | `TransitionSpeed` | 动画速度 |
| `onCreated` / `onDestroyed` | `() => void` | 生命周期 |
| `onEnter` / `onEntered` / `onExit` / `onExited` | 过渡回调 | 同 `TransitionProps` |
| `ref` | `React.Ref<HTMLDivElement>` | 内容根 |
| `destroyOnExit` | `boolean` | 退场后是否销毁 |
| `portalTo` | `any` | Portal 目标 |
| `shareMask` | `boolean` | 是否共享遮罩 |
| `contentClassName` / `contentVisible` / `contentTransition` / `contentTransitionSpeed` / `contentMask` / `contentMaskTransition` | — | 内容区与内容遮罩 |
| `onConflict` | `ModalConflictHandler \| null` | 多弹层冲突处理 |
| （根容器） | `Omit<JSXDivProps, 'prefix' \| 'children' \| 'title' \| 'content' \| 'ref'>` | `className`、`style` 等 |

完整字段以 `BasicModal/type.tsx`、`Modal/type.tsx`、`Popup/type.tsx` 为准。

## 样式定制

`PopupStyleVars` 见 `packages/mobile/src/exports/Popup/type.tsx`（`DOC_PopupStyleVars`）。

## 相关能力

命令式调用见包内「命令式调用」文档；`showPopup` 的 props 与 `Popup` 相近，`children` 对应为 `content`。

<!--
Source:
- packages/mobile/src/exports/Popup/type.tsx
- packages/mobile/src/exports/Popup/index.zh.md
- packages/mobile/src/exports/Popup/index.tsx
- packages/mobile/src/exports/Popup/demos/
- packages/mobile/src/exports/Popup/style.less
-->
