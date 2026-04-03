---
name: Iconfont
description: 基于 iconfont 的图标组件，支持字体模式与 SVG（<use>）模式；图标资源可由包内静态资源或 Iconfont.loadIconfont 加载 CDN。
---

# Iconfont 字体图标

基于 iconfont 的图标组件，支持字体模式与 SVG（`<use>`）模式；图标资源可由包内静态资源或 `Iconfont.loadIconfont` 加载 CDN。

```tsx
import { Iconfont } from '@fexd/mobile'
import '@fexd/mobile/es/exports/Iconfont/assets/default'
import '@fexd/mobile/es/exports/Iconfont/assets/default.css'
;<Iconfont type="add" />
```

## 基础用法

字体模式与 SVG 模式：

```tsx
import { Iconfont } from '@fexd/mobile'

<Iconfont type="add" />
<Iconfont type="add" svg />
```

列表展示与复制示例见 `packages/mobile/src/exports/Iconfont/demos/demo1/index.tsx`（演示中调用了 `Iconfont.loadIconfont()`）。

## Props

`exports/Iconfont/type.tsx` 中 `IconfontProps` 为空接口；下列属性以组件实现 `packages/mobile/src/exports/Iconfont/index.tsx` 中的 `IconfontProps` 为准（与运行时 `defaultProps` 一致）。

| 属性      | 说明                                   | 类型                           | 默认值  |
| :-------- | :------------------------------------- | :----------------------------- | :------ |
| type      | 图标名称（与 iconfont 项目内命名一致） | `string`                       | —       |
| prefix    | 类名 / symbol 前缀                     | `string`                       | `'mc'`  |
| svg       | 是否使用 SVG 模式                      | `boolean`                      | `false` |
| className | 自定义类名                             | `string`                       | —       |
| style     | 内联样式                               | `React.CSSProperties`          | —       |
| onClick   | 点击回调                               | `React.MouseEventHandler<any>` | —       |

## 静态方法

| 方法                    | 说明                                                          |
| :---------------------- | :------------------------------------------------------------ |
| `Iconfont.loadIconfont` | 通过 `@fexd/tools` 的 `source` 注入 iconfont 的 CDN CSS 与 JS |

## 注意事项

- `type` 需与当前已加载的 iconfont 项目中的图标名一致；可参考 [Mobile 图标库](https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.12&manage_type=myprojects&projectId=2462721)（原文档链接）。

<!--
Source:
- packages/mobile/src/exports/Iconfont/type.tsx
- packages/mobile/src/exports/Iconfont/index.zh.md
- packages/mobile/src/exports/Iconfont/index.tsx
- packages/mobile/src/exports/Iconfont/demos/
- packages/mobile/src/exports/Iconfont/style.less
-->
