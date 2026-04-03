---
name: Hook
description: 匿名组件
---

# Hook 匿名组件

用于在业务代码中快速创建一个无命名的函数组件作用域，便于在 JSX 内局部使用 Hooks；子内容需遵守 [React Hooks 规则](https://react.dev/reference/rules/rules-of-hooks)。

```tsx
import { Hook } from '@fexd/mobile'
;<Hook>{() => <div />}</Hook>
```

## 基础用法

使用 `children` 渲染函数：

```tsx
import { Hook, Stepper } from '@fexd/mobile'
import { useState } from 'react'
;<Hook>
  {() => {
    const [count, setCount] = useState(0)
    return <Stepper value={count} onChange={setCount} />
  }}
</Hook>
```

使用 `hook` 属性（优先级高于 `children`）：

```tsx
import { Hook, Stepper } from '@fexd/mobile'
import { useState } from 'react'
;<Hook
  hook={() => {
    const [count, setCount] = useState(0)
    return <Stepper value={count} onChange={setCount} />
  }}
/>
```

完整示例见 `packages/mobile/src/exports/Hook/demos/demo1.tsx`。

## Props

类型定义：`packages/mobile/src/exports/Hook/type.tsx` → `HookProps`。

| 属性     | 说明                           | 类型                                                     | 默认值 |
| :------- | :----------------------------- | :------------------------------------------------------- | :----- |
| children | 子内容；可为渲染函数           | `React.ReactNode \| ((...args: any) => React.ReactNode)` | —      |
| hook     | 与 `children` 类似，优先级更高 | `(...args: any) => React.ReactNode`                      | —      |

另允许任意额外属性：`[key: string]: any`。

## 注意事项

- 内部逻辑必须符合 Hooks 调用规则（不在条件分支中新增 Hook 等）。

<!--
Source:
- packages/mobile/src/exports/Hook/type.tsx
- packages/mobile/src/exports/Hook/index.zh.md
- packages/mobile/src/exports/Hook/index.tsx
- packages/mobile/src/exports/Hook/demos/
- packages/mobile/src/exports/Hook/style.less
-->
