---
name: ProgressBar
description: 按百分比展示进度，支持过渡速度档位或自定义毫秒数。
---

# ProgressBar 进度条

按百分比展示进度，支持过渡速度档位或自定义毫秒数。

```tsx
import { ProgressBar } from '@fexd/mobile'
```

## 基础用法

示例来源：`packages/mobile/src/exports/ProgressBar/demos/demo1/index.tsx`。

```tsx
import React, { useState } from 'react'
import { ProgressBar, Button } from '@fexd/mobile'
import { Add, Remove } from '@fexd/icons'

export default () => {
  const [progress, setProgress] = useState(25)
  return (
    <>
      <ProgressBar value={progress} />
      <ProgressBar value={progress} speed="none" />
      <ProgressBar value={progress} speed="slowest" />
      <ProgressBar value={progress} speed={2000} />
      <Button icon={<Remove />} onClick={() => setProgress((p) => p - 10)} />
      <Button icon={<Add />} onClick={() => setProgress((p) => p + 10)} />
    </>
  )
}
```

## Props

`ProgressBarProps` 定义于 `packages/mobile/src/exports/ProgressBar/type.tsx`：继承 `JSXDivProps`。

| 属性       | 类型                        | 说明                       | 默认值   |
| ---------- | --------------------------- | -------------------------- | -------- |
| `value`    | `number`                    | 当前进度 0–100             | `0`      |
| `speed`    | `TransitionSpeed \| number` | 过渡速度：预设档位或毫秒数 | `normal` |
| `children` | `React.ReactNode`           | 子节点                     | —        |
| `ref`      | `React.Ref<ProgressBarRef>` | 根节点 ref                 | —        |
| （其余）   | —                           | 其余标准 div 属性          | —        |

`TransitionSpeed` 定义于 `packages/mobile/src/exports/createTransition/type.tsx`（含 `none`、`fastest`、`fast`、`normal`、`slow`、`slowest`、`debug` 及 `number`）。

## 样式定制

`ProgressBarStyleVars` / `DOC_ProgressBarStyleVars` 定义于 `packages/mobile/src/exports/ProgressBar/type.tsx`。

| 变量                          | 说明             | 默认               |
| ----------------------------- | ---------------- | ------------------ |
| `@progress-bar-prefix`        | 组件样式前缀     | `exd-progress-bar` |
| `@progress-bar-height`        | 进度条高度       | `4px`              |
| `@progress-bar-background`    | 轨道背景色       | `#e1e1e1`          |
| `@progress-bar-border-radius` | 圆角             | `4px`              |
| `@progress-bar-active-color`  | 进度条颜色       | `@color-primary`   |
| `@size-scale`                 | 全局尺寸缩放比例 | `1`                |

<!--
Source:
- packages/mobile/src/exports/ProgressBar/type.tsx
- packages/mobile/src/exports/ProgressBar/index.zh.md
- packages/mobile/src/exports/ProgressBar/index.tsx
- packages/mobile/src/exports/ProgressBar/demos/
- packages/mobile/src/exports/ProgressBar/style.less
-->
