---
name: createFC
description: 用 forwardRef + memo 包装渲染函数，并在 creatorCache 中注册工厂函数，供 cloneFC 使用。
---

# createFC

用 `forwardRef` + `memo` 包装渲染函数，并在 `creatorCache` 中注册工厂函数，供 `cloneFC` 使用。

```tsx
import { createFC } from '@fexd/mobile'
```

## 基础用法

```tsx
import { createFC } from '@fexd/mobile'

const MyView = createFC<{ title?: string }, HTMLDivElement>((props, ref) => <div ref={ref}>{props.title}</div>)
```

## 函数签名

```ts
import type { ForwardRefRenderFunction } from 'react'

function createFC<P = Record<string, unknown>, T = unknown>(
  render: ForwardRefRenderFunction<T, P>,
  propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean,
): FC<P>
```

| 参数            | 说明                                           |
| --------------- | ---------------------------------------------- |
| `render`        | `ForwardRefRenderFunction<T, P>`，作为组件主体 |
| `propsAreEqual` | 可选，传给 `memo` 的自定义比较函数             |

**返回值**：`FC<P>`（`FC<P>` 等价于 `React.FC<P>`，见 `type.tsx`）。

## Props

`createFC` 本身不是组件，无 JSX Props。生成的组件接受泛型 `P` 所定义的 props。

<!--
Source:
- packages/mobile/src/exports/createFC/type.tsx
- packages/mobile/src/exports/createFC/index.tsx
- packages/mobile/src/exports/createFC/style.less
-->
