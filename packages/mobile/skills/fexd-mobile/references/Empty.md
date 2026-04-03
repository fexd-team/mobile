---
name: Empty
description: 无数据或空状态时的占位展示，可自定义图标、文案与底部操作区。
---

# Empty 缺省页

无数据或空状态时的占位展示，可自定义图标、文案与底部操作区。

```tsx
import { Empty } from '@fexd/mobile'
```

## 基础用法

示例来源：`packages/mobile/src/exports/Empty/demos/demo1/index.tsx`。

```tsx
import React from 'react'
import { Empty, Button, toast } from '@fexd/mobile'
import { AlbumsOutline } from '@fexd/icons'

export default () => (
  <>
    <Empty />
    <Empty icon={<AlbumsOutline />} text="暂无数据" />
    {/* 本地图片示例见 packages/mobile/src/exports/Empty/demos/demo1/index.tsx */}
    <Empty icon={<img src="/path/to/empty.png" alt="" />}>
      <Button type="primary" fill="outline" shape="round" onClick={() => toast.info('Refresh')}>
        Refresh
      </Button>
    </Empty>
  </>
)
```

## Props

`EmptyProps` 定义于 `packages/mobile/src/exports/Empty/type.tsx`，继承 `JSXDivProps`。

| 属性         | 类型                  | 说明                                        |
| ------------ | --------------------- | ------------------------------------------- |
| `className`  | `string`              | 自定义类名                                  |
| `icon`       | `React.ReactNode`     | 自定义图标                                  |
| `iconStyle`  | `React.CSSProperties` | 图标容器样式                                |
| `text`       | `React.ReactNode`     | 主文案                                      |
| （children） | —                     | `JSXDivProps` 的 `children`，常用于底部操作 |
| （其余）     | —                     | 其余标准 div 属性                           |

## 样式定制

`EmptyStyleVars` 见 `packages/mobile/src/exports/Empty/type.tsx`（`DOC_EmptyStyleVars`）。

<!--
Source:
- packages/mobile/src/exports/Empty/type.tsx
- packages/mobile/src/exports/Empty/index.zh.md
- packages/mobile/src/exports/Empty/index.tsx
- packages/mobile/src/exports/Empty/demos/
- packages/mobile/src/exports/Empty/style.less
-->
