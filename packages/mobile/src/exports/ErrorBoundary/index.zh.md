---
group:
  title: 其他
  path: /other
  order: 105
---

# ErrorBoundary 错误边界 <ImportCost name="ErrorBoundary" />

可用来捕获到在里面的错误，且显示指定的内容。

## 属性说明

| 属性 | 说明 | 类型 | 默认值 | 提供的值 |
| :-- | :-- | :-- | :-- | :-- |
| fallback | 当捕获到错误时会触发的函数， | fallback: (error, retry, boundaryProps) => JSX | 请参考代码演示中的 demo | - |
| console | 是否使用 CDN eruda 呈现错误 | boolean | `false` | - |

## 代码演示

<code src="./demos/demo1/index.tsx" />
