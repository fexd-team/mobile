---
name: FullpageSpinner
description: 全屏居中展示 Spinner 的容器组件；props 在 Spinner 的基础上增加外层 div 的 ref。
---

# FullpageSpinner 全屏加载

全屏居中展示 `Spinner` 的容器组件；`props` 在 `Spinner` 的基础上增加外层 `div` 的 `ref`。

```tsx
import { FullpageSpinner } from '@fexd/mobile'
;<FullpageSpinner />
```

## 基础用法

```tsx
import { FullpageSpinner } from '@fexd/mobile'
;<FullpageSpinner delay={200} className="my-fullpage-spin" />
```

实现见 `packages/mobile/src/exports/FullpageSpinner/index.tsx`（向内部 `Spinner` 传入 `delay`）。

## Props

类型定义：`packages/mobile/src/exports/FullpageSpinner/type.tsx` → `FullpageSpinnerProps extends SpinnerProps`，并含 `ref?: React.Ref<HTMLDivElement>`。

### 自 `SpinnerProps`（`packages/mobile/src/exports/Spinner/type.tsx`）

| 属性  | 说明                                           | 类型     | 默认值 |
| :---- | :--------------------------------------------- | :------- | :----- |
| delay | 延迟显示加载动画的毫秒数（传给内部 `Spinner`） | `number` | —      |

`SpinnerProps` 继承 `JSXSpanProps`（即 `React.HTMLAttributes<HTMLSpanElement>` 中适用于 `span` 的属性，如 `className`、`style` 等）；全屏组件实现里将 `className` 等与 `exd-spin-fullpage` 合并在外层 `div` 上。

### 本组件额外属性

| 属性 | 说明     | 类型                        |
| :--- | :------- | :-------------------------- |
| ref  | 外层容器 | `React.Ref<HTMLDivElement>` |

## 相关组件

- `Spinner`：内联加载动画
- `toast` / `Modal`：其他加载与遮罩反馈

<!--
Source:
- packages/mobile/src/exports/FullpageSpinner/type.tsx
- packages/mobile/src/exports/FullpageSpinner/index.tsx
- packages/mobile/src/exports/FullpageSpinner/style.less
-->
