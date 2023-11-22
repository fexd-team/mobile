---
nav:
  title: 文档
  order: 1

group:
  title: 预览
  order: 1

title: 预览
---

# Mobile

移动端组件库

<code src="@documents/preview-demo/index.tsx" />

## 安装

```bash
yarn add @fexd/mobile
# 或者
npm install @fexd/mobile --save
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
        libraryName: '@fexd/mobile',
        libraryDirectory: 'lib/exports', // or 'es/exports'
        camel2DashComponentName: false,
        style: (name) => `${name}/style.less`, // or `${name}/style.css`
      },
      '@fexd/mobile',
    ],
  ],
}
```

## 所有导出内容的体积

```jsx
/**
 * inline: true
 */
import React from 'react'
import ImportCost, { getSizeInfo } from '@dumiTheme/builtins/ImportCost'
import * as MobileExports from '@fexd/mobile/src'

// window.sizeInfo = Object.keys(MobileExports).map(name => getSizeInfo(name))
// console.log(window.sizeInfo)

const sortedList = Object.keys(MobileExports)
  .filter(
    (name) =>
      !!getSizeInfo(name) && (Number(getSizeInfo(name)?.rawGzip) < 660 || Number(getSizeInfo(name)?.rawGzip) > 700),
  )
  .sort((prevName, nextName) => Number(getSizeInfo(nextName)?.rawGzip) - Number(getSizeInfo(prevName)?.rawGzip))

const averageSize = sortedList.reduce((count, name) => count + getSizeInfo(name)?.rawGzip, 0) / sortedList.length

export default () => (
  <>
    <h4>平均: {(averageSize / 1000).toFixed(2)}k</h4>
    <div>
      {sortedList.map((name) => (
        <div key={name} style={{ padding: '4px 10px' }}>
          <ImportCost name={name} /> <span class="ml-1">{name}</span>
        </div>
      ))}
    </div>
  </>
)
```
