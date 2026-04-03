---
name: createUseModalAPI
description: 基于已有的 createModalAPI 产物，生成 **React Hook**：固定 stationId，返回 [show, <ModalStation />]，便于在组件树内挂载对应站点。
---

# createUseModalAPI

基于已有的 `createModalAPI` 产物，生成 **React Hook**：固定 `stationId`，返回 `[show, <ModalStation />]`，便于在组件树内挂载对应站点。

```tsx
import { createModalAPI, createUseModalAPI, Modal } from '@fexd/mobile'
```

## 基础用法

```tsx
import { createModalAPI, createUseModalAPI, Modal } from '@fexd/mobile'

const showModal = createModalAPI(Modal)
const useShowModal = createUseModalAPI(showModal)

function Page() {
  const [show, station] = useShowModal()

  return (
    <>
      <button type="button" onClick={() => show({ content: 'Hi' })}>
        open
      </button>
      {station}
    </>
  )
}
```

## 函数签名

```ts
function createUseModalAPI<P>(
  showMethod: MethodType<P>,
): () => [(config: Omit<Parameters<MethodType<P>>[0], 'stationId'>) => ReturnType<MethodType<P>>, React.ReactElement]
```

| 参数         | 说明                                       |
| ------------ | ------------------------------------------ |
| `showMethod` | 由 `createModalAPI` 返回的 `MethodType<P>` |

**返回值**：无参 Hook 工厂；调用 `useShowModal()` 得到：

| 索引 | 类型                 | 说明                                                                             |
| ---- | -------------------- | -------------------------------------------------------------------------------- |
| `0`  | 函数                 | 与 `showMethod` 相同，但自动注入 `stationId`（每次 Hook 调用用 `uniqueId` 固定） |
| `1`  | `React.ReactElement` | `<ModalStation id={stationId} />`，需渲染到 JSX 中                               |

`MethodType`、`MethodConfig` 等定义见 `createModalAPI/type.tsx` 与 [createModalAPI.md](./createModalAPI.md)。

<!--
Source:
- packages/mobile/src/exports/createUseModalAPI/index.tsx
- packages/mobile/src/exports/createUseModalAPI/style.less
-->
