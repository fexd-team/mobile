---
name: ErrorBoundary
description: 捕获子组件树中的渲染错误并展示兜底 UI，可选开启控制台（eruda）入口。
---

# ErrorBoundary 错误边界

捕获子组件树中的渲染错误并展示兜底 UI，可选开启控制台（eruda）入口。

```tsx
import { ErrorBoundary } from '@fexd/mobile'
```

## 基础用法

示例来源：`packages/mobile/src/exports/ErrorBoundary/demos/demo1/index.tsx`。

```tsx
import React from 'react'
import { ErrorBoundary } from '@fexd/mobile'

export default () => (
  <ErrorBoundary console>
    <YourComponent />
  </ErrorBoundary>
)
```

自定义 `fallback`（函数形式）：

```tsx
<ErrorBoundary
  fallback={(error, retry) => (
    <div>
      <p>{error.toString()}</p>
      <button type="button" onClick={retry}>
        Retry
      </button>
    </div>
  )}
>
  <YourComponent />
</ErrorBoundary>
```

## Props

`ErrorBoundaryProps` 定义于 `packages/mobile/src/exports/ErrorBoundary/type.tsx`。

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `console` | `boolean` | 为 true 时展示可打开 eruda 的入口（实现见组件源码） |
| `onError` | `(error: Error) => void` | 捕获错误时的回调 |
| `children` | `React.ReactNode` | 子节点 |
| `fallback` | `((error: Error, retry: () => void) => React.ReactNode) \| React.ReactNode` | 错误时渲染内容；函数形式接收 `error` 与 `retry` |

## 注意事项

请以 `type.tsx` 为准：`fallback` 的函数签名为 `(error, retry)`，不包含其他第三个参数。

## 样式定制

`ErrorBoundaryStyleVars` 见 `type.tsx`（当前 `DOC_ErrorBoundaryStyleVars` 为空对象导出，重试按钮宽度变量名见接口注释）。

## 相关组件

- `Fallback`

<!--
Source:
- packages/mobile/src/exports/ErrorBoundary/type.tsx
- packages/mobile/src/exports/ErrorBoundary/index.zh.md
- packages/mobile/src/exports/ErrorBoundary/index.tsx
- packages/mobile/src/exports/ErrorBoundary/demos/
- packages/mobile/src/exports/ErrorBoundary/style.less
-->
