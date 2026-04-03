---
name: modalConflict
description: import { modalConflict } from '@fexd/mobile'
---

# modalConflict 弹窗互斥

```ts
import { modalConflict } from '@fexd/mobile'
```

用于根据 `modalStore` 中已存在的弹窗，计算当前弹窗在互斥场景下应应用的 `Modal` 相关展示属性（如内容蒙层、内容可见性、位移样式等）。与 `Modal` 的 `onConflict` 配合使用；`showModal` / `showDialog` / `showPopup` / `showActionSheet` / `notify` 等命令式 API 在源码中已预置不同的 `onConflict` 策略。

## 基础用法

内置处理器可直接传给 `onConflict` 或用于 `extend`：

```tsx
import { Modal, modalConflict } from '@fexd/mobile'

// 与 showModal 默认一致：互斥时隐藏内容
<Modal onConflict={modalConflict.handlers.hidden} {...otherProps} />

// 与 showPopup / showActionSheet 默认一致：互斥时给内容加蒙层
<Modal onConflict={modalConflict.handlers.mask} {...otherProps} />
```

自定义互斥策略：使用 `modalConflict.create({ ... })` 返回一个可作为 `onConflict` 的函数；可用 `modalConflict.extend(baseHandler, config)` 在已有处理器上合并配置；`modalConflict.merge(...handlers)` 将多个处理器的返回值合并为一组 props。

## API

### 默认导出对象 `modalConflict`

| 成员 | 说明 |
| --- | --- |
| `create(config?)` | 按配置创建互斥处理函数（见下方 `CreateConfig`）。返回值附带 `config` 属性，供 `extend` 读取。 |
| `extend(handler, config)` | 将 `handler.config` 与 `config` 浅合并后调用 `create`。 |
| `merge(...handlers)` | 依次执行多个处理器，将其返回的 `ModalConflictProps` 浅合并。合并结果的 `config` 为各处理器 `config` 组成的数组。 |
| `handlers.mask` | 预置：`conflict` 为真时设置 `contentMask: true`。 |
| `handlers.hidden` | 预置：`conflict` 为真时设置 `contentVisible: false`。 |
| `handlers.offsetByPlacement` | 预置：按 `placement` 过滤互斥对象；非 `center` 时 `conflictProps` 可为异步，用于根据冲突列表计算 `style` 偏移。 |

### `CreateConfig`（`packages/mobile/src/exports/modalConflict/type.tsx`）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `levels` | `ModalLevel[] \| ((currentLevel: ModalLevel) => ModalLevel[])` | 参与互斥判断的层级；不传则不限定层级。 |
| `types` | `(string \| RegExp)[]` | 参与互斥判断的 `modalData.type`；不传则不限定类型。字符串为全等，正则用 `test`。 |
| `conflictProps` | `ModalConflictProps \| ((params: ConflictParams) => ModalConflictProps \| Promise<ModalConflictProps>)` | 判定为互斥时合并到当前弹窗的 props；可为对象或函数（支持异步）。 |
| `filter` | `(current: ModalStoreData, modalData: ModalStoreData) => boolean` | 在层级、类型过滤之后，对候选弹窗进一步过滤；默认恒为 `true`。 |

### `ConflictParams`（互斥为真时传入 `conflictProps` 函数）

| 字段                  | 说明                                                             |
| --------------------- | ---------------------------------------------------------------- |
| `conflict`            | 是否判定为互斥（源码中为存在 `zIndex` 高于当前的冲突列表）。     |
| `current`             | 当前弹窗在 store 中的数据。                                      |
| `matchedVisibleModal` | 通过层级、类型、`filter` 后的可见弹窗列表。                      |
| `conflictModalList`   | `matchedVisibleModal` 中 `zIndex` 大于 `current.zIndex` 的子集。 |

### 互斥判定逻辑（源码摘要）

在 `create` 返回的处理器内部：从 `store.getAll()` 得到列表，先按 `levels` / `types` / `filter` 得到 `matchedVisibleModal`，再取其中 `zIndex > current.zIndex` 为 `conflictModalList`；若 `conflictModalList.length > 0` 则视为互斥，并计算 `conflictProps`（否则返回 `{}`）。

类型 `ModalConflictProps`、`ModalLevel`、`ModalStoreData` 等定义见 `BasicModal`、`Modal`、`modalStore` 的 `type` 文件。

<!--
Source:
- packages/mobile/src/exports/modalConflict/type.tsx
- packages/mobile/src/exports/modalConflict/index.ts
- packages/mobile/src/exports/modalConflict/style.less
-->
