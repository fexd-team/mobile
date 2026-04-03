---
name: Modal-design
description: Modal 与 BasicModal、SharedOverlay、modalStore 的组合关系和 DOM 层级结构
---

# Modal 设计与实现结构

帮助理解 `Modal` 与 `BasicModal`、`SharedOverlay`、`modalStore` 的关系。更多细节见 `node_modules/@fexd/mobile/src/exports/Modal/` 源码。

## 组件组合关系

```
Modal
└── BasicModal          ← Portal、遮罩主逻辑、modalStore 登记
    └── Portal
        ├── （mask 为 true 时）Overlay  ← 主遮罩（shareMask 时由 Modal 将主遮罩设为透明）
        └── Transition（placement 内容过渡：transition + transitionSpeed）
            └── div.exd-modal（根内容容器：placement / scrollable 等 class）
                ├── ContentTransition（contentVisible + contentTransition + contentTransitionSpeed）
                │   └── div.exd-modal-content（+ contentClassName）
                │       ├── children
                │       └── Overlay（contentMask 为 true 时，absolute 内容区蒙层）
                └── （shareMask && mask）SharedOverlay  ← 与 ContentTransition 同级
```

- **`BasicModal`**：负责 `visible` 生命周期、`modalId` 对应的 store 数据、`destroyOnExit`、主遮罩 `Overlay`，以及外层 **`Transition`（`transition` / `transitionSpeed`）+ `div.exd-modal`** 包裹 `Modal` 传入的子树。
- **`Modal`**：在上述 `div.exd-modal` 内插入 **内容显隐** 的 `ContentTransition`（`contentVisible` / `contentTransition`），并在 `div.exd-modal-content` 内挂载可选的 **内容蒙层** `Overlay`（`contentMask`）；在 `shareMask && mask` 时再挂 **`SharedOverlay`**。
- **`shareMask`**：为 `true` 且 `mask` 为 `true` 时，将传给 `BasicModal` 的遮罩设为透明（`modalProps.maskTransparent = true`），由 **`SharedOverlay`** 绘制实际蒙层；多实例通过共享 overlay 注册表协调（见 `SharedOverlay/`）。

## onConflict 数据流

1. `Modal` `useEffect` 订阅 `modalStore.eventBus` 的 `open` / `close`。
2. 事件到达时，若 `event.modalId === currentModalId` 则忽略（排除自身）。
3. 否则以 `debounce` 调用用户 `onConflict`，传入 `ModalConflictParams`（`type`、`event`、`current`、`all`、`store`）。
4. 返回值（或 `Promise` 结果）作为 `ModalConflictProps` 与现有 props 合并，驱动 `contentVisible`、`contentMask`、`className`、`style` 等。

## modalStore 角色

- 每个弹层以 `modalId` 注册，`Modal` 未传 `modalId` 时用 `uniqueId('modal')`。
- `onConflict` 通过 `store.getAll()`、`store.getById` 读取其它实例的 `zIndex`、`level`、`type`、`props` 等，用于互斥决策。

## SharedOverlay 辅助 store

`SharedOverlay` 目录内的 `store.ts` 维护 `Map<id, overlayInfo>` 与 `EventBus`，用于多 Modal 共享蒙层时的合并可见性/样式（与 `modalStore` 不同层：前者管共享遮罩实例，后者管全库弹层元数据）。

## 设计权衡摘要

- **内容与遮罩分层**：主遮罩由 `BasicModal`/`SharedOverlay` 负责，互斥时可在内容区叠第二层 `Overlay`，避免多层全屏遮罩叠加过厚。
- **shareMask**：减少重复蒙层绘制，但要求各层协调 `maskTransparent` 与共享组件。
- **异步 onConflict**：允许根据布局计算（如 `offsetByPlacement`）异步返回样式。

## 相关文档

- [Modal.md](Modal.md)
- [Modal-advanced.md](Modal-advanced.md)
- [BasicModal.md](BasicModal.md)
