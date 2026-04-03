---
name: uniqueId
description: 生成带前缀的唯一字符串，用于组件 modalId 等场景。
---

# uniqueId

生成带前缀的唯一字符串，用于组件 `modalId` 等场景。

```tsx
import { uniqueId } from '@fexd/mobile'
```

## 基础用法

```tsx
const id = uniqueId('modal-station')
// 形如: modal-station_1_1712000000000_123456
```

## API

```ts
function uniqueId(prefix?: string): string
```

| 参数     | 说明                |
| -------- | ------------------- |
| `prefix` | 可选前缀，默认 `''` |

返回值格式：`${prefix}_${递增计数}_${Date.now()}_${随机整数}`。

<!--
Source:
- packages/mobile/src/exports/uniqueId/index.ts
- packages/mobile/src/exports/uniqueId/style.less
-->
