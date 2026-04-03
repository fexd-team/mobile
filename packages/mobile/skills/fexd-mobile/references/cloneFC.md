---
name: cloneFC
description: 克隆由 createFC 创建的函数组件：从 creatorCache 取出工厂并生成新实例，合并 defaultProps，并用 hoist-non-react-statics 挂回静态属性。
---

# cloneFC

克隆由 `createFC` 创建的函数组件：从 `creatorCache` 取出工厂并生成新实例，合并 `defaultProps`，并用 `hoist-non-react-statics` 挂回静态属性。

```tsx
import { cloneFC, createFC } from '@fexd/mobile'
```

## 基础用法

```tsx
import { cloneFC, createFC } from '@fexd/mobile'

const Base = createFC((props, ref) => <div ref={ref} {...props} />)
const Cloned = cloneFC(Base)
```

## 函数签名

```ts
function cloneFC<T>(Component: T): T
```

| 参数        | 说明                                                     |
| ----------- | -------------------------------------------------------- |
| `Component` | 由 `createFC` 创建、已在内部 `creatorCache` 中注册的组件 |

**返回值**：与入参同类型的克隆组件（继承 `defaultProps` 与静态成员）。

<!--
Source:
- packages/mobile/src/exports/cloneFC/index.ts
- packages/mobile/src/exports/cloneFC/style.less
-->
