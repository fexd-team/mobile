---
name: createModalAPI
description: 为任意 Modal 类组件生成 **命令式打开** 方法：在 ModalStation 上挂载实例，返回带 close / update / promise 的控制器。
---

# createModalAPI

为任意 Modal 类组件生成 **命令式打开** 方法：在 `ModalStation` 上挂载实例，返回带 `close` / `update` / `promise` 的控制器。

```tsx
import { createModalAPI, Modal } from '@fexd/mobile'
```

## 基础用法

```tsx
import { createModalAPI, Modal } from '@fexd/mobile'

const showModal = createModalAPI(Modal, { mask: true })

const ctrl = showModal({
  content: 'Hello',
  onClose: () => ctrl.close(),
})
void ctrl.promise
```

## 函数签名

```ts
function createModalAPI<P>(ModalComponent: ModalType<P>, initialProps?: Omit<P, OmitModalPropTypes>): MethodType<P>
```

| 参数 | 说明 |
| --- | --- |
| `ModalComponent` | `ModalType<P>`：Modal 组件或其变体 |
| `initialProps` | 可选；每次 `show` 都会与调用参数合并，且 **不包含** `visible` / `onClose` / `children` / `destroyOnExit` |

**返回值**：`MethodType<P>`，即 `show(config) => ModalMethodController<P>`。

### show(config)

`config` 类型（概念上）为 `Omit<P & MethodConfig<P> & BasicModalMethodProps, OmitModalPropTypes>`。

| 字段（节选） | 说明                                                                                  |
| ------------ | ------------------------------------------------------------------------------------- |
| `stationId`  | 可选；挂载站点，默认 `'DEFAULT_STATION'`                                              |
| `modalId`    | 可选；实例 id，默认内部生成                                                           |
| `content`    | 可选；`ReactNode` 或 `(controller) => ReactNode`                                      |
| 其余         | 与 `BasicModalMethodProps` 及泛型 `P` 允许字段一致（已排除上述 `OmitModalPropTypes`） |

**控制器 `ModalMethodController<P>`**

| 成员                  | 说明                                |
| --------------------- | ----------------------------------- |
| `close()`             | 关闭弹层                            |
| `update(updateProps)` | 合并更新 props / `content`          |
| `promise`             | `Promise<void>`，销毁完成后 resolve |

## 类型别名（摘自 type.tsx）

- `OmitModalPropTypes` = `'visible' \| 'onClose' \| 'children' \| 'destroyOnExit'`
- `BasicModalMethodProps` = `Omit<ModalProps, OmitModalPropTypes>`（`ModalProps` 见 `Modal/type.tsx`）
- `ModalType<P>` = `React.FC<P \| BasicModalMethodProps> \| typeof Modal`
- `MethodContentType<P>` = `React.ReactNode \| ((controller: ModalMethodController<P>) => React.ReactNode)`
- `ModalMethodProps<P>` = `(P \| BasicModalMethodProps) & { content?: MethodContentType<P> }`
- `MethodConfig<P>` = `(ModalMethodProps<P> & BasicModalMethodProps) & { stationId?: string }`

具体 Modal 级 props 以 `Modal` 文档与 `Modal/type.tsx` 为准。

<!--
Source:
- packages/mobile/src/exports/createModalAPI/type.tsx
- packages/mobile/src/exports/createModalAPI/index.tsx
- packages/mobile/src/exports/createModalAPI/style.less
-->
