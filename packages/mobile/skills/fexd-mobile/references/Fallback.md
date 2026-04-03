---
name: Fallback
description: 展示错误信息的通用布局组件，支持自定义图标、正文、页脚，并可选择显示 console（eruda）入口。
---

# Fallback 错误兜底页

展示错误信息的通用布局组件，支持自定义图标、正文、页脚，并可选择显示 console（eruda）入口。

```tsx
import { Fallback } from '@fexd/mobile'
```

## 基础用法

```tsx
import React from 'react'
import { Fallback } from '@fexd/mobile'

const err = new Error('Something went wrong')

export default () => (
  <>
    <Fallback error={new Error('Something went wrong')} />
    <Fallback
      error={err}
      icon={(info) => <span>{info.isOfflineError ? 'Offline' : 'Error'}</span>}
      children={(info) => <p>{String(info.error)}</p>}
      footer={() => <button type="button">Back</button>}
    />
  </>
)
```

## Props

`FallbackProps` 定义于 `packages/mobile/src/exports/Fallback/type.tsx`：继承 `Omit<JSXDivProps, 'children'>`。

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `error` | `Error \| unknown` | 当前错误对象 |
| `icon` | `((errorInfo: ErrorInfoType) => React.ReactNode) \| React.ReactNode` | 顶部图标区 |
| `children` | `((errorInfo: ErrorInfoType) => React.ReactNode) \| React.ReactNode` | 正文内容 |
| `footer` | `((errorInfo: ErrorInfoType) => React.ReactNode) \| React.ReactNode` | 底部区域 |
| `console` | `boolean` | 是否显示加载 eruda 的 `console` 链接 |
| （其余） | — | 其余 div 属性（`children` 已由上方定义） |

`ErrorInfoType` 定义于同文件：

| 字段             | 类型               | 说明                 |
| ---------------- | ------------------ | -------------------- |
| `error`          | `Error \| unknown` | 错误                 |
| `isOfflineError` | `boolean`          | 是否判定为离线类错误 |
| `isSystemError`  | `boolean`          | 是否判定为系统类错误 |

组件默认 `icon` 为 `<WarningOutline />`，`console` 默认为 `false`（见 `packages/mobile/src/exports/Fallback/index.tsx`）。

## 样式定制

`FallbackStyleVars` 见 `packages/mobile/src/exports/Fallback/type.tsx`（`DOC_FallbackStyleVars`）。

## 相关组件

- `ErrorBoundary`

<!--
Source:
- packages/mobile/src/exports/Fallback/type.tsx
- packages/mobile/src/exports/Fallback/index.tsx
- packages/mobile/src/exports/Fallback/style.less
-->
