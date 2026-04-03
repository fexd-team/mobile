---
name: Watermark
description: 基于 [@pansy/react-watermark](https://www.npmjs.com/package/@pansy/react-watermark) 封装。
---

# Watermark 水印

基于 [@pansy/react-watermark](https://www.npmjs.com/package/@pansy/react-watermark) 封装。

```tsx
import { Watermark } from '@fexd/mobile'
```

## 基础用法

```tsx
import { Watermark } from '@fexd/mobile'
;<Watermark />
```

## Props

`WatermarkProps` 继承自 `WatermarkComponentProps`（来自 `@pansy/react-watermark`），并 **排除** `isBody`；在此基础上增加：

| 属性       | 类型      | 说明 |
| ---------- | --------- | ---- |
| `fullpage` | `boolean` | 可选 |

`WatermarkRef` 类型为 `any`。

## 样式变量

组件主要使用全局 Less 变量，可通过以下变量自定义样式：

| 变量名        | 说明             | 默认值 |
| ------------- | ---------------- | ------ |
| `@size-scale` | 全局尺寸缩放比例 | `1`    |

<!--
Source:
- packages/mobile/src/exports/Watermark/type.tsx
- packages/mobile/src/exports/Watermark/index.zh.md
- packages/mobile/src/exports/Watermark/index.tsx
- packages/mobile/src/exports/Watermark/demos/
- packages/mobile/src/exports/Watermark/style.less
-->
