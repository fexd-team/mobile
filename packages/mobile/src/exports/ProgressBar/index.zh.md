---
group:
  title: 展示
  path: /display
---

# ProgressBar 进度条 <ImportCost name="ProgressBar" />

当前进度展示。

<!-- prettier-ignore -->
```jsx | pure
import { ProgressBar } from '@fexd/mobile'

<ProgressBar value={50}/>
```

## 使用说明

### 当前进度

通过 `value` 属性设置当前进度（单位：%），默认为 `0` 。

```jsx | pure
<ProgressBar value={20} />
<ProgressBar value={50} />
```

### 动画速度

通过 `speed` 属性设置滚动条的动画时间，共分为 6 档，分别是

- `none`: 0ms
- `fastest`: 100ms
- `fast`: 200ms
- `normal`: 300ms（默认）
- `slow`: 500ms
- `slowest`: 700ms

如果上述档位不满足要求，可传递 `number` 类型自定义数值，单位为 `ms`

```jsx | pure
<ProgressBar speed="fast" />
<ProgressBar speed={2000} />
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| value | 当前进度所占百分比（0 ~ 100） | `number` | `0` |
| speed | 动画速度，可选值为`none`、`fastest`、`fast`、`normal`、`slow`、`slowest`，`number` 类型下时间单位为 `ms` | `string` \| `number` | `normal` |

## 演示代码

<code src="./demos/demo1/index.tsx" />
