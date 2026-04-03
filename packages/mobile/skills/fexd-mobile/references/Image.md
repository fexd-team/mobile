---
name: Image
description: 支持固定比例、懒加载、加载中与失败占位的图片组件；类型上在原生 img 属性基础上扩展了 lazy、fallback、placeholder、proportion 等字段。
---

# Image 图片

支持固定比例、懒加载、加载中与失败占位的图片组件；类型上在原生 `img` 属性基础上扩展了 `lazy`、`fallback`、`placeholder`、`proportion` 等字段。

```tsx
import { Image } from '@fexd/mobile'
;<Image src="https://example.com/a.jpg" alt="demo" />
```

## 基础用法

基础展示与比例：

```tsx
import { Image } from '@fexd/mobile'

<Image src="https://example.com/a.jpg" />
<Image proportion="8:2" src="https://example.com/a.jpg" />
```

懒加载（需配合页面滚动场景；完整示例见 `packages/mobile/src/exports/Image/demos/demo1/index.tsx`）：

```tsx
import { Image } from '@fexd/mobile'
;<Image lazy proportion="16:9" src="https://example.com/b.jpg" />
```

## Props

类型定义：`packages/mobile/src/exports/Image/type.tsx` → `ImageProps`（在 `React.ImgHTMLAttributes<HTMLImageElement>` 上用 `Overwrite` 将 `placeholder` 重载为 `React.ReactNode`）。

| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| src | 图片地址（必填） | `string` | — |
| alt | 替代文本 | `string` | — |
| lazy | 是否懒加载 | `boolean` | — |
| width / height | 宽高 | `number \| string` | — |
| proportion | 宽高比字符串，如 `8:2`、`16:9` | `string` | — |
| fallback | 加载失败时展示 | `React.ReactNode` | — |
| placeholder | 加载中占位 | `React.ReactNode` | — |
| onClick | 点击 | `(event: React.MouseEvent<HTMLImageElement, Event>) => void` | — |
| onError | 加载失败 | `(event: React.SyntheticEvent<HTMLImageElement, Event>) => void` | — |
| onLoad | 加载成功 | `(event: React.SyntheticEvent<HTMLImageElement, Event>) => void` | — |
| style | 样式 | `React.CSSProperties` | — |
| className | 类名 | `string` | — |

其余未列出的属性与原生 `img` 一致（以 `ImageProps` 继承的 `ImgHTMLAttributes` 为准）。

## 样式定制

Less：`@image-prefix`，默认 `'exd-image'`。

## 相关组件

- `Iconfont`：图标展示

<!--
Source:
- packages/mobile/src/exports/Image/type.tsx
- packages/mobile/src/exports/Image/index.zh.md
- packages/mobile/src/exports/Image/index.tsx
- packages/mobile/src/exports/Image/demos/
- packages/mobile/src/exports/Image/style.less
-->
