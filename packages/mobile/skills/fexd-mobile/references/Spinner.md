---
name: Spinner
description: 用于区块或行内加载中状态；可通过 delay 避免短时闪烁。
---

# Spinner 加载指示器

用于区块或行内加载中状态；可通过 `delay` 避免短时闪烁。

```tsx
import { Spinner } from '@fexd/mobile'
```

## 基础用法

```tsx
import { Spinner } from '@fexd/mobile'

<Spinner />

<Spinner delay={300} />

<Spinner style={{ color: 'var(--color-primary)' }} />
```

全屏加载可使用 `FullpageSpinner`（另见对应文档）。示例源码参考：`packages/mobile/src/exports/Spinner/demos/demo1/index.tsx`。

## Props

### Spinner（`SpinnerProps`）

定义于 `packages/mobile/src/exports/Spinner/type.tsx`。

| 属性  | 说明                             | 类型                         |
| ----- | -------------------------------- | ---------------------------- |
| delay | 延迟显示时间（ms），用于防止闪烁 | `number`                     |
| ref   | 引用                             | `React.Ref<HTMLSpanElement>` |

另继承标准 `span` 的 HTML 属性（`JSXSpanProps`）。

`SpinnerRef` 类型为 `any`。

## 样式变量

定义于 `packages/mobile/src/exports/Spinner/type.tsx`（`SpinnerStyleVars` / `DOC_SpinnerStyleVars`）。

| 变量                          | 说明           | 默认       |
| ----------------------------- | -------------- | ---------- |
| `@spinner-prefix`             | className 前缀 | `exd-spin` |
| `@spinner-size`               | 动画区域大小   | `32px`     |
| `@spinner-stroke-width`       | 圆环描边宽度   | `3`        |
| `@spinner-animation-duration` | 动画时长       | `1.6s`     |

<!--
Source:
- packages/mobile/src/exports/Spinner/type.tsx
- packages/mobile/src/exports/Spinner/index.zh.md
- packages/mobile/src/exports/Spinner/index.tsx
- packages/mobile/src/exports/Spinner/demos/
- packages/mobile/src/exports/Spinner/style.less
-->
