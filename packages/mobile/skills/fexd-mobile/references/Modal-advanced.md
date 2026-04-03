---
name: Modal-advanced
description: Modal 全量 Props、互斥类型定义与 modalConflict 工具详解
---

# Modal 高级说明与完整 API

本页补充 [Modal.md](Modal.md)：`ModalProps` 全量字段、互斥相关类型与 `modalConflict` 工具。

## ModalProps 全表

`ModalProps` 由 `Omit<BasicModalProps, 'modalId' | 'storeProps'>` 与 `PureModalProps` 合并（`exports/Modal/type.tsx`）。`modalId` 可选（未传时内部 `uniqueId('modal')`）；`storeProps` 为 `BasicModal` 内部使用，不在 `Modal` 上对外暴露。

### 来自 BasicModal / PureBasicModal（经 Omit 与 Modal 合并后）

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| visible | `boolean` | - | 是 | 是否显示 |
| children | `React.ReactNode` | - | 否 | 内容 |
| onClose | `React.ReactEventHandler<HTMLElement>` | - | 否 | 尝试关闭 |
| type | `string` | - | 否 | 类型标识（互斥等） |
| level | `ModalLevel` | `normal` | 否 | `low` / `normal` / `high` / `highest` |
| portalClassName | `string` | - | 否 | Portal 容器类名 |
| scrollable | `boolean` | - | 否 | 有遮罩时内容是否可滚动 |
| placement | `ModalPlacement` | `center` | 否 | `center` / `top` / `bottom` |
| transition | `TransitionType` | `TransitionFade` | 否 | 内容过渡组件 |
| transitionSpeed | `TransitionSpeed` | `fast` | 否 | 动画速度 |
| mask | `boolean` | `true` | 否 | 是否显示遮罩 |
| maskClosable | `boolean` | `true` | 否 | 点击遮罩是否触发关闭 |
| maskTransparent | `boolean` | `false` | 否 | 遮罩透明 |
| maskTransition | `TransitionType` | - | 否 | 遮罩过渡 |
| maskClassName | `string` | - | 否 | 遮罩类名 |
| onCreated | `() => void` | - | 否 | 创建后 |
| onEnter | `TransitionProps['onEnter']` | - | 否 | 入场前 |
| onEntered | `TransitionProps['onEntered']` | - | 否 | 入场后 |
| onExit | `TransitionProps['onExit']` | - | 否 | 退场前 |
| onExited | `TransitionProps['onExited']` | - | 否 | 退场后 |
| onDestroyed | `() => void` | - | 否 | 销毁后 |
| ref | `React.Ref<HTMLDivElement>` | - | 否 | 内容根 |
| destroyOnExit | `boolean` | `true` | 否 | 退场后是否销毁 |
| portalTo | `any` | - | 否 | Portal 目标 |
| className | `string` | - | 否 | 内容容器类名（div） |
| style | `JSXDivProps['style']` | - | 否 | 内容容器样式 |
| （其余） | `Omit<JSXDivProps, 'prefix' \| 'children' \| 'title' \| 'content' \| 'ref'>` 中除已列字段 | - | 否 | 如 `onClick` 等 |

### PureModalProps 扩展

| 属性                   | 类型                           | 默认值           | 必填 | 说明                           |
| ---------------------- | ------------------------------ | ---------------- | ---- | ------------------------------ |
| modalId                | `ModalIdType`                  | 随机生成         | 否   | 弹层 id                        |
| shareMask              | `boolean`                      | `false`          | 否   | 共享蒙层                       |
| contentClassName       | `string`                       | -                | 否   | `Transition` 内层包裹 div 类名 |
| contentVisible         | `boolean`                      | `true`           | 否   | 互斥：内容可见性               |
| contentTransition      | `TransitionType`               | `TransitionFade` | 否   | 内容显隐过渡                   |
| contentTransitionSpeed | `TransitionSpeed`              | `fast`           | 否   | 上述过渡速度                   |
| contentMask            | `boolean`                      | `false`          | 否   | 内容区绝对定位蒙层             |
| contentMaskTransition  | `TransitionType`               | `TransitionFade` | 否   | 内容蒙层过渡                   |
| onConflict             | `ModalConflictHandler \| null` | -                | 否   | 互斥回调                       |

`Modal` 组件 `defaultProps` 在 `shareMask`、`contentVisible`、`contentTransition`、`contentTransitionSpeed`、`contentMask`、`contentMaskTransition` 上与 `BasicModal.defaultProps` 合并（见 `Modal/index.tsx`）。

## 互斥类型（Modal/type.tsx）

### ModalConflictParams

| 字段    | 类型                | 说明                          |
| ------- | ------------------- | ----------------------------- |
| type    | `'open' \| 'close'` | 事件类型                      |
| event   | `ModalControlEvent` | 控制事件（来自 `modalStore`） |
| current | `ModalStoreData`    | 当前实例在 store 中的数据     |
| all     | `ModalStoreData[]`  | 全部实例                      |
| store   | `typeof modalStore` | store 引用                    |

### ModalConflictHandler

```ts
type ModalConflictHandler = (conflictParams: ModalConflictParams) => ModalConflictProps
```

（实现中支持返回 `Promise`，见 `Modal/index.tsx` 内 `Promise.resolve(...).then(setConflictProps)`。）

### ModalConflictProps

从 `ModalProps` 中 Pick：

`className`、`portalClassName`、`maskClassName`、`contentVisible`、`contentTransition`、`contentMask`、`contentMaskTransition`、`style`。

用于 `onConflict` 返回值，合并进当前 Modal 的 props。

## modalConflict（exports/modalConflict）

默认导出对象（`index.ts`）：

| 成员                         | 说明                                                              |
| ---------------------------- | ----------------------------------------------------------------- |
| `create(config?)`            | 按 `CreateConfig` 生成 `ModalConflictHandler`                     |
| `merge(...handlers)`         | 合并多个 handler 的返回 props                                     |
| `extend(handler, config)`    | 在已有 handler 上合并 `CreateConfig`                              |
| `handlers.mask`              | 互斥时 `contentMask: true`                                        |
| `handlers.hidden`            | 互斥时 `contentVisible: false`                                    |
| `handlers.offsetByPlacement` | 同 `placement` 时根据其它弹层高度偏移 `style`（异步 `delay(16)`） |

### CreateConfig（modalConflict/type.tsx）

| 字段          | 类型                                                                             | 说明              |
| ------------- | -------------------------------------------------------------------------------- | ----------------- |
| levels        | `ModalLevel[] \| ((currentLevel) => ModalLevel[])`                               | 参与匹配的层级    |
| types         | `(string \| RegExp)[]`                                                           | 参与匹配的 `type` |
| conflictProps | `ModalConflictProps \| ((ConflictParams) => ModalConflictProps \| Promise<...>)` | 互斥时的 props    |
| filter        | `(current, modalData) => boolean`                                                | 额外过滤          |

互斥判定（`create` 内）：在可见实例中，按 `levels` / `types` / `filter` 筛选后，若存在 `zIndex` 高于当前的实例，则视为互斥并应用 `conflictProps`。

## showModal

`exports/showModal/index.ts`：`createModalAPI(Modal, { shareMask: true, onConflict: modalConflict.handlers.hidden })`。除上述默认外，其余参数与 `Modal` 一致；命令式内容使用 `content` 字段（由 `createModalAPI` 封装，详见 `createModalAPI` 实现）。

## 相关文档

- [Modal.md](Modal.md) — 基础用法与互斥入门
- [Modal-design.md](Modal-design.md) — 结构与数据流
