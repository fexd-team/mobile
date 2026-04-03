---
name: Avatar
description: 支持图片、文字、图标或自定义节点；可选尺寸与形状，并提供 Avatar.Group 组合展示。
---

# Avatar 头像

支持图片、文字、图标或自定义节点；可选尺寸与形状，并提供 `Avatar.Group` 组合展示。

```tsx
import { Avatar } from '@fexd/mobile'
```

## 基础用法

```tsx
import { Avatar, Iconfont } from '@fexd/mobile'
import { Icon, LocationOutline } from '@fexd/icons'

<Avatar src="https://img01.yzcdn.cn/vant/apple-2.jpg" />
<Avatar>AK</Avatar>
<Avatar>
  <Iconfont type="me" />
</Avatar>
<Avatar>
  <Icon type={LocationOutline} />
</Avatar>
<Avatar backgroundColor="#006BFF" color="#FFF">
  N
</Avatar>
```

```tsx
<Avatar size="small">A</Avatar>
<Avatar size="normal">B</Avatar>
<Avatar size="large">C</Avatar>
```

```tsx
<Avatar>D</Avatar>
<Avatar shape="square">E</Avatar>
```

## Props（Avatar）

`AvatarProps` 继承 `JSXDivProps`。

| 属性            | 类型                                        | 默认值   | 必填 | 说明                             |
| --------------- | ------------------------------------------- | -------- | ---- | -------------------------------- |
| size            | `'small' \| 'normal' \| 'large'`            | `normal` | 否   | 尺寸                             |
| shape           | `'circle' \| 'square'`                      | `circle` | 否   | 形状                             |
| color           | `string`                                    | -        | 否   | 文字/内容颜色                    |
| backgroundColor | `string`                                    | -        | 否   | 背景色                           |
| src             | `string`                                    | -        | 否   | 图片地址                         |
| alt             | `string`                                    | -        | 否   | 图片替代文本；加载失败时优先展示 |
| children        | `React.ReactNode`                           | -        | 否   | 文字或自定义内容                 |
| onLoad          | `React.ReactEventHandler<HTMLImageElement>` | -        | 否   | 图片加载成功                     |
| onError         | `React.ReactEventHandler<HTMLImageElement>` | -        | 否   | 图片加载失败                     |

## 子组件

### Avatar.Group

定义见 `exports/Avatar/Group/type.tsx`，继承 `JSXDivProps`。

| 属性  | 类型     | 默认值         | 必填 | 说明                         |
| ----- | -------- | -------------- | ---- | ---------------------------- |
| max   | `number` | 实现中默认 `5` | 否   | 最多展示的头像个数           |
| total | `number` | -              | 否   | 总个数（用于 “+N” 额外展示） |

```tsx
<Avatar.Group max={3}>
  <Avatar>I</Avatar>
  <Avatar>J</Avatar>
  <Avatar>K</Avatar>
  <Avatar>L</Avatar>
</Avatar.Group>
```

## 高级用法

与 `Badge` 组合展示角标或圆点：

```tsx
import { Avatar, Badge } from '@fexd/mobile'

<Badge content="5">
  <Avatar shape="square">F</Avatar>
</Badge>
<Badge dot>
  <Avatar shape="square">G</Avatar>
</Badge>
<Badge color="#108ee9" dot style={{ '--top': '100%' }}>
  <Avatar shape="square">H</Avatar>
</Badge>
```

图片失败时优先使用 `alt`，否则回退到 `children`：

```tsx
<Avatar src="/a.png" alt="M" />
<Avatar src="/b.png">O</Avatar>
```

## 样式定制

Less 变量见 `Avatar/type.tsx` 中 `AvatarStyleVars`（尺寸、背景、组合重叠与边框、额外项颜色等）。

## 相关组件

`Badge`

<!--
Source:
- packages/mobile/src/exports/Avatar/type.tsx
- packages/mobile/src/exports/Avatar/index.zh.md
- packages/mobile/src/exports/Avatar/index.tsx
- packages/mobile/src/exports/Avatar/demos/
- packages/mobile/src/exports/Avatar/style.less
-->
