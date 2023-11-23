---
hero:
  title: Fexd Mobile
  desc: React 移动端组件库
  actions:
    - text: 查看文档
      link: /exports

    - text: 移动端预览
      link: /~demos/documents-preview-demo
features:
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png
    title: 丰富
    desc: 参考业内多个成熟组件库，综合组件类型多样，适用于多种业务场景
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png
    title: 灵活
    desc: 颗粒细、功能全、体积小（gzipped 平均 5kb），按需加载，便于组合
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png
    title: 易用
    desc: 各组件的属性设计上，汇总了多种技术方案种的良好实践
footer: Open-source MIT Licensed | Copyright © 2020<br />Powered by [dumi](https://d.umijs.org)
---

<!-- <code src="@documents/documents/preview/demo/index.tsx" /> -->

# Fexd Mobile

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

```jsx
/**
 * style: { display: 'none' }
 */
import React, { useState, useEffect } from 'react'
import ParticlesBg from 'particles-bg'
import { Portal } from '@fexd/mobile'
import { sample, isAndroid, isIOS, debounce, throttle } from '@fexd/tools'

const getAnimationConfig = () => {
  const isMobile = isAndroid() || isIOS()
  const type = sample(
    [
      // 'color',
      isMobile ? undefined : 'cobweb',
      'polygon',
      'square',
      'fountain',
      'ball',
      'custom',
    ].filter(Boolean),
  )

  const config =
    type === 'custom'
      ? {
          num: [4, 7],
          rps: 0.1,
          radius: [5, 40],
          life: [1.5, 3],
          v: [2, 3],
          tha: [-40, 40],
          alpha: [0.6, 0],
          scale: [0.1, 0.4],
          position: 'all',
          color: ['random', '#ff0000'],
          cross: 'dead',
          // emitter: "follow",
          random: 15,
        }
      : undefined

  return {
    type,
    config,
  }
}

function useContainer(selector) {
  const [container, setContainer] = useState(null)

  useEffect(() => {
    const query = throttle(() => {
      const node = document.querySelector(selector)

      if (!node) {
        query()
        return
      }

      setContainer(node)
    }, 100)
    query()
  }, [selector])

  return container
}

// https://github.com/lindelof/particles-bg
function Background() {
  const [config, setConfig] = useState(getAnimationConfig)
  const [waiting, setWaiting] = useState(true)
  const [renderKey, setRenderKey] = useState(Math.random)
  const container = useContainer('.__dumi-default-layout-hero')
  const ready = !container || !waiting

  useEffect(() => {
    const resizeHandler = debounce(() => {
      setRenderKey(Math.random)
      setConfig(getAnimationConfig)
    }, 300)
    setTimeout(() => setWaiting(false), 300)
    window.addEventListener('resize', resizeHandler)

    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  return !ready ? null : (
    <Portal className="particles-background" to={container}>
      <ParticlesBg key={renderKey} bg {...config} />
    </Portal>
  )
}

export default Background
```
