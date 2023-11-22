# Fexd Mobile Router5

基于 react-router v5 的移动端组件库，主要实现路由动画功能

## 安装

```bash
yarn add @fexd/mobile-router5
# 或者
npm install @fexd/mobile-router5 --save
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
        libraryName: '@fexd/mobile-router5',
        libraryDirectory: 'es/exports', // or 'es/exports'
        camel2DashComponentName: false,
        style: (name) => `${name}/style.less`, // or `${name}/style.css`
      },
      '@fexd/mobile-router5',
    ],
  ],
}
```
