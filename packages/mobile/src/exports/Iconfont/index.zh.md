---
group:
  title: 展示
  path: /display
---

# Iconfont 字体图标 <ImportCost name="Iconfont" />

使用了 `iconfont` 的图标组件，支持字体图标和 SVG 图标两种模式。

图标资源已内置到组件库中，无需额外配置或手动加载。

<!-- prettier-ignore -->
```jsx | pure
import { Iconfont } from '@fexd/mobile'
import '@fexd/mobile/es/exports/Iconfont/assets/default'
import '@fexd/mobile/es/exports/Iconfont/assets/default.css'

// 字体图标模式（默认）
<Iconfont type="add" />

// SVG 图标模式
<Iconfont type="add" svg />
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| type <span style="color: red;">\*</span> | 图标类型，请查阅 [Mobile 图标库](https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.12&manage_type=myprojects&projectId=2462721) | `string` | - |
| prefix | 图标前缀 | `string` | `'mc'` |
| svg | 是否使用 SVG 模式 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |
| onClick | 点击事件 | `(e: React.MouseEvent) => void` | - |

## 静态方法

| 方法                  | 说明          | 类型         |
| :-------------------- | :------------ | :----------- |
| Iconfont.loadIconfont | 加载 CDN 资源 | `() => void` |

## 演示代码

<!-- ### 预览 -->

<code src="./demos/demo1/index.tsx" />
