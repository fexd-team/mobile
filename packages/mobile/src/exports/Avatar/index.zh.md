---
group:
  title: 展示
  path: /display
---

# Avatar 头像 <ImportCost name="Avatar" />

<!-- prettier-ignore -->
```jsx | pure
import { Avatar } from '@fexd/mobile'

<Avatar  />
```

---

## 使用说明

### 基础

支持图片、字符、Iconfont 字体图标和 Icon 图标 多种类型，也可自定义内容

<!-- prettier-ignore -->
```jsx | pure
import { Avatar, Iconfont } from '@fexd/mobile'
import { Icon, Add } from '@fexd/icons'

<Avatar src="https://img01.yzcdn.cn/vant/apple-2.jpg" />
<Avatar>AK</Avatar>
<Avatar>
  <Iconfont type="me" />
</Avatar>
<Avatar>
  <Icon type={Add} />
</Avatar>
<Avatar backgroundColor="#006BFF" color="#FFF">
  N
</Avatar>
```

### 尺寸

默认提供 小`small`、中`normal`、大`large` 三种尺寸

<!-- prettier-ignore -->
```jsx | pure
import { Avatar, Iconfont } from '@fexd/mobile'

<Avatar size="small">A</Avatar>
<Avatar size="normal">B</Avatar>
<Avatar size="large">C</Avatar>
```

### 形状

可通过设置 `shape` 属性改变头像形状

<!-- prettier-ignore -->
```jsx | pure
import { Avatar } from '@fexd/mobile'

<Avatar>D</Avatar>
<Avatar shape="square">E</Avatar>
```

### 徽章

可结合 `Badge` 组件给头像带徽章

<!-- prettier-ignore -->
```jsx | pure
import { Avatar, Badge } from '@fexd/mobile'

<Badge content="5">
  <Avatar shape="square">F</Avatar>
</Badge>
<Badge content={Badge.dot}>
  <Avatar shape="square">G</Avatar>
</Badge>
<Badge color="#108ee9" content={Badge.dot} style={{ '--top': '100%' }}>
  <Avatar shape="square">H</Avatar>
</Badge>
```

### 分组

属性 `max` 为显示的最大头像个数； 属性 `total` 可设置显示头像的总个数

<!-- prettier-ignore -->
```jsx | pure
import { Avatar } from '@fexd/mobile'

<Avatar.Group max={3}>
  <Avatar>I</Avatar>
  <Avatar>J</Avatar>
  <Avatar>K</Avatar>
  <Avatar>L</Avatar>
  <Avatar>M</Avatar>
</Avatar.Group>
<Avatar.Group total={10}>
  <Avatar>I</Avatar>
  <Avatar>J</Avatar>
  <Avatar>K</Avatar>
  <Avatar>L</Avatar>
  <Avatar>M</Avatar>
</Avatar.Group>
```

### 回调

头像加载失败。组件会优先取 `alt` 属性值，其次是 `children` 的内容来替代渲染

<!-- prettier-ignore -->
```jsx | pure
import { Avatar } from '@fexd/mobile'

<Avatar src="/a.png" alt="M" />
<Avatar src="/b.png">O</Avatar>
<Avatar src="https://img01.yzcdn.cn/vant/apple-2.jpg">P</Avatar>
```

---

## API

| 属性            | 说明                     | 类型                       | 默认值   |
| :-------------- | :----------------------- | :------------------------- | :------- |
| src             | 头像图片的资源地址       | `string`                   | -        |
| size            | 头像大小                 | `large`、`normal`、`small` | `normal` |
| alt             | 图像无法显示时的替代文本 | `string`                   | -        |
| color           | 颜色                     | `string`                   | -        |
| backgroundColor | 背景颜色                 | `string`                   | -        |
| children        | 字符头像                 | `React.ReactNode`          | -        |
| style           | 自定义样式               | `object`                   | -        |

---

### Group API

| 属性 | 说明               | 类型     | 默认值 |
| :--- | :----------------- | :------- | :----- |
| max  | 显示的最大头像个数 | `number` | `5`    |

## 样式变量

| 变量名         | 说明         | 默认值        |
| :------------- | :----------- | :------------ |
| @avatar-prefix | 组件样式前缀 | `'exd-avatar'` |

---

## Events 事件

| 事件名  | 说明             | 回调参数 |
| ------- | ---------------- | -------- |
| onLoad  | 图片加载成功触发 | -        |
| onError | 图片加载失败触发 | -        |

## 演示代码

<code src="./demos/demo1/index.tsx" />
