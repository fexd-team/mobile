---
name: Provider
description: 在应用根部提供默认的 ModalStation 挂载点及全局共享遮罩相关能力，Modal 等组件依赖此上下文。
---

# Provider 全局容器

在应用根部提供默认的 `ModalStation` 挂载点及全局共享遮罩相关能力，Modal 等组件依赖此上下文。

```tsx
import { Provider } from '@fexd/mobile'
```

## 基础用法

将 `Provider` 置于应用根节点（或路由根），包裹业务内容：

```tsx
import { Provider } from '@fexd/mobile'

export function App() {
  return <Provider>{/* app content */}</Provider>
}
```

库内还提供 `renderGlobalProvider()`，可在非完整 React 树场景下挂载全局 Provider（见 `packages/mobile/src/exports/Provider/index.tsx`）。

示例源码参考：`packages/mobile/src/exports/Provider/demos/demo1.tsx`。

## Props

定义于 `packages/mobile/src/exports/Provider/type.tsx`。

| 属性       | 说明                                                          | 类型      |
| ---------- | ------------------------------------------------------------- | --------- |
| children   | 子内容                                                        | `any`     |
| \_\_global | 是否为全局 Provider（影响与全局 Provider 实例的互斥卸载逻辑） | `boolean` |

`ProviderRef` 类型为 `any`。

<!--
Source:
- packages/mobile/src/exports/Provider/type.tsx
- packages/mobile/src/exports/Provider/index.zh.md
- packages/mobile/src/exports/Provider/index.tsx
- packages/mobile/src/exports/Provider/demos/
- packages/mobile/src/exports/Provider/style.less
-->
