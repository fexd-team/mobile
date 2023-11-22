---
nav:
  title: 文档

group:
  title: 展示
  order: 102
---

# Icon 图标

Mobile Icons 组件库，基于 `@fexd/icons` 包

<!-- prettier-ignore -->
```jsx | pure
import { Icon, ArrowBack } from '@fexd/icons'

<ArrowBack />
<Icon type={ArrowBack} />
<Icon type={require('@fexd/icons/lib/ArrowBack')} />
```

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

## 演示代码

<!-- ### 预览 -->

<code src="./demo/index.tsx" />
