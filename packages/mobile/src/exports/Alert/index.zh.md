---
group:
  title: 展示
  path: /display
---

# Alert 警告 <ImportCost name="Alert" />

<!-- prettier-ignore -->
```jsx | pure
import { Alert } from '@fexd/mobile'

<Alert>This is an alert!</Alert>
```

---

## 使用说明

### 基础

警告提示。通过 `type` 属性控制 `warning`、`success`、`info`、`error` 四种样式

<!-- prettier-ignore -->
```jsx | pure
import { Alert } from '@fexd/mobile'

<Alert type="warning">This is a warning alert!</Alert>
<Alert type="success">This is a success alert!</Alert>
<Alert type="info">This is an info alert!</Alert>
<Alert type="error">This is an error alert!</Alert>
```

### 标题

通过 `title` 属性可设置个性化的标题

<!-- prettier-ignore -->
```jsx | pure
import { Alert } from '@fexd/mobile'

<Alert type="warning" title="Warning">
  This is a warning alert!
</Alert>
<Alert type="success" title="Success">
  This is a success alert!
</Alert>
<Alert type="info" title="Info">
  This is an info alert!
</Alert>
<Alert type="error" title="Error">
  This is an error alert!
</Alert>
```

### 删除按钮

设置 `closable` 显示关闭按钮，点击可关闭警告提示

<!-- prettier-ignore -->
```jsx | pure
import { Alert } from '@fexd/mobile'

<Alert type="warning" closable>
  This is a warning alert!
</Alert>
<Alert type="success" title="Success" closable>
  This is a success alert!
</Alert>
```

### 自定义图标

可通过 `icon` 属性自定义头部图标；`closeText` 属性自定义关闭按钮图标

<!-- prettier-ignore -->
```jsx | pure
import { Alert } from '@fexd/mobile'

<Alert icon={<Iconfont type="smail" />}>This is an custom icon alert!</Alert>
<Alert closable closeText={<Iconfont type="close_circle" />}>
  This is an custom close icon alert!
</Alert>
```

### 描边

描边属性 `variant` 设置为 `outlined` 可以让信息框更加骨感有型

<!-- prettier-ignore -->
```jsx | pure
import { Alert } from '@fexd/mobile'

<Alert type="warning" variant="outlined">
  This is an outlined alert!
</Alert>
<Alert type="success" variant="outlined">
  This is an outlined alert!
</Alert>
<Alert type="info" variant="outlined">
  This is an outlined alert!
</Alert>
<Alert type="error" variant="outlined">
  This is an outlined alert!
</Alert>
```

### 填充

填充属性 `variant` 设置为 `filled` 则让信息框更加亮眼

<!-- prettier-ignore -->
```jsx | pure
import { Alert } from '@fexd/mobile'

<Alert type="warning" variant="filled">
  This is an outlined alert!
</Alert>
<Alert type="success" variant="filled">
  This is an outlined alert!
</Alert>
<Alert type="info" variant="filled">
  This is an outlined alert!
</Alert>
<Alert type="error" variant="filled">
  This is an outlined alert!
</Alert>
```

## API

| 属性      | 说明           | 类型                                  | 默认值 |
| :-------- | :------------- | :------------------------------------ | :----- |
| type      | 警告提示的样式 | `info`、`success`、`warning`、`error` | `info` |
| title     | 标题           | `React.ReactNode`                     | -      |
| showIcon  | 图标           | `boolean`                             | `true` |
| icon      | 自定义图标     | `React.ReactNode`                     | -      |
| closable  | 关闭按钮图标   | `boolean`                             | `true` |
| closeText | 自定义关闭图标 | `React.ReactNode`                     | -      |
| variant   | 形状           | `outlined`、`filled`                  | -      |
| children  | 自定义内容     | `React.ReactNode`                     | -      |
| style     | 自定义样式     | `object`                              | -      |

---

## 样式变量

| 变量名        | 说明         | 默认值        |
| :------------ | :----------- | :------------ |
| @alert-prefix | 组件样式前缀 | `'exd-alert'` |

---

## Events 事件

| 事件名  | 说明           | 回调参数 |
| ------- | -------------- | -------- |
| onClose | 关闭信息框触发 | -        |

## 演示代码

<code src="./demos/demo1/index.tsx" />
