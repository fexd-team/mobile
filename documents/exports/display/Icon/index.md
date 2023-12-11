---
nav:
  title: 文档

group:
  title: 展示
  order: 102

mobileDemoFixed: false
---

# Icon 图标

Mobile Icons 组件库，基于 `@fexd/icons` 包

具体可参考 https://fexd-team.github.io/icons

<!-- prettier-ignore -->
```jsx | pure
import { Icon, ArrowBack } from '@fexd/icons'

<ArrowBack />
<Icon type={ArrowBack} />
<Icon type={require('@fexd/icons/lib/ArrowBack')} />
```

## 演示代码

<!-- ### 预览 -->

<code src="./demo/index.tsx" />

## 安装

```bash
yarn add @fexd/icons
# 或者
npm install @fexd/icons --save
```

## 按需加载

配合 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 实现按需加载

```js
// babel.config.js
module.exports = {
  plugins: [
    [
      'babel-plugin-import',
      {
        libraryName: '@fexd/icons',
        camel2DashComponentName: false,
      },
      '@fexd/icons',
    ],
  ],
}
```

## API

| 属性                                     | 说明       | 类型       | 默认值 |
| :--------------------------------------- | :--------- | :--------- | :----- |
| type <span style="color: red;">\*</span> | 待补充说明 | `IconType` | -      |

---

## 所有图标

### icons

```jsx
/**
 * inline: true
 */
import React from 'react'

export default () => (
  <iframe
    id="ionic"
    src="https://fexd-team.github.io/icons/#/~demos/ionic-demo"
    style={{
      width: '100%',
      height: 602,
      border: 'none',
      borderTop: 'solid 1px',
      borderBottom: 'solid 1px',
      borderColor: '#f2f2f2',
    }}
  />
)
```

---

### icons-antd

```jsx
/**
 * inline: true
 */
import React from 'react'

export default () => (
  <iframe
    src="https://fexd-team.github.io/icons/#/~demos/antd-demo"
    style={{
      width: '100%',
      height: 602,
      border: 'none',
      borderTop: 'solid 1px',
      borderBottom: 'solid 1px',
      borderColor: '#f2f2f2',
    }}
  />
)
```

---

### icons-bootstrap

```jsx
/**
 * inline: true
 */
import React from 'react'

export default () => (
  <iframe
    src="https://fexd-team.github.io/icons/#/~demos/bootstrap-demo"
    style={{
      width: '100%',
      height: 602,
      border: 'none',
      borderTop: 'solid 1px',
      borderBottom: 'solid 1px',
      borderColor: '#f2f2f2',
    }}
  />
)
```

---

### icons-bytesize

```jsx
/**
 * inline: true
 */
import React from 'react'

export default () => (
  <iframe
    src="https://fexd-team.github.io/icons/#/~demos/bytesize-demo"
    style={{
      width: '100%',
      height: 602,
      border: 'none',
      borderTop: 'solid 1px',
      borderBottom: 'solid 1px',
      borderColor: '#f2f2f2',
    }}
  />
)
```

---

### icons-mono

```jsx
/**
 * inline: true
 */
import React from 'react'

export default () => (
  <iframe
    src="https://fexd-team.github.io/icons/#/~demos/mono-demo"
    style={{
      width: '100%',
      height: 602,
      border: 'none',
      borderTop: 'solid 1px',
      borderBottom: 'solid 1px',
      borderColor: '#f2f2f2',
    }}
  />
)
```
