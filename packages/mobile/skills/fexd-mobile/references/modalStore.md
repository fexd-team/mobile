---
name: modalStore
description: import { modalStore } from '@fexd/mobile'
---

# modalStore 弹窗状态管理

```ts
import { modalStore } from '@fexd/mobile'
```

在全局 `Map` 中登记弹窗元数据，分配同层级内的 `zIndex`，并在添加/移除时通过 `eventBus` 发出事件。`addModal` / `removeModal` 由弹窗体系内部调用；业务侧常用 `getById`、`getAll`、`closeAll`、`destroyAll` 与事件监听。

## 基础用法

```ts
import { modalStore } from '@fexd/mobile'

modalStore.eventBus.on('open', (data) => {
  console.log('opened', data.modalId, data.level, data.zIndex)
})

modalStore.eventBus.on('close', (data) => {
  console.log('closed', data.modalId)
})

modalStore.closeAll()
modalStore.destroyAll()
```

## API

### 导出成员（`packages/mobile/src/exports/modalStore/store.ts`）

| 成员 | 说明 |
| --- | --- |
| `eventBus` | `@fexd/tools` 的 `EventBus` 实例。`addModal` 末尾 `emit('open', modalData)`，`removeModal` 中 `emit('close', modalData)`。 |
| `map` | `Map<ModalIdType, ModalStoreData>`。 |
| `getById(modalId)` | `ModalStoreData \| undefined`。 |
| `getAll()` | `ModalStoreData[]`。 |
| `closeAll()` | 对每一项 `setVisible(false)`。 |
| `destroyAll()` | 对每一项 `setCreated(false)`。 |
| `addModal(modalId, modalInfo)` | 计算 `zIndex` 后写入并 `emit('open', ...)`。 |
| `removeModal(modalId)` | 删除并 `emit('close', ...)`。 |

### `zIndex` 基准（`LEVEL_WEIGHT`）

| `level`   | 权重   |
| --------- | ------ |
| `low`     | 999    |
| `normal`  | 9999   |
| `high`    | 99999  |
| `highest` | 999999 |

### 类型（`packages/mobile/src/exports/modalStore/type.tsx`）

`ModalStoreData`：`modalId`、`zIndex`、`level`、`type?`、`props?`、`setVisible`、`setCreated`、`contentRef`。

`ModalControlInfo` = `Omit<ModalStoreData, 'zIndex'>`。`ModalControlEvent` = `ModalStoreData`。

`ModalIdType`、`ModalLevel` 见 `BasicModal/type.tsx`。

<!--
Source:
- packages/mobile/src/exports/modalStore/type.tsx
- packages/mobile/src/exports/modalStore/index.zh.md
- packages/mobile/src/exports/modalStore/index.ts
- packages/mobile/src/exports/modalStore/demos/
- packages/mobile/src/exports/modalStore/style.less
-->
