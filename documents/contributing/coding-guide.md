---
nav:
  title: 共建指南

title: 开始编写组件
order: 50
---

## 技能条件

需要具备以下技能

- [react](https://react.docschina.org/docs/getting-started.html)
- [typescript](https://www.tslang.cn/docs/handbook/basic-types.html)
- [less](https://less.bootcss.com/#概览)

> 为什么是 less ？看这个[回答](https://www.zhihu.com/question/313573696/answer/608076295)

具备了上述技能后，就可以开始编写组件了

以 `Button` 组件为例，共分为以下几个步骤

1. 创建组件目录
2. 创建类型文件
3. 创建样式文件
4. 创建组件定义
5. 导出组件

## 创建组件目录

在 `/packages/mobile/src/exports` 中创建 `Button` 目录

## 创建类型文件

在组件目录中创建 `type.ts` 文件来定义组件的各项类型

```ts | pure
/* type.ts */
export interface ButtonProps {}
export type ButtonRef = any
```

## 创建样式文件

在组件目录中创建 `style.less` 文件存放组件样式

```less
/* style.less */
@import '../../theme/vars'; // 引入全局样式变量集，内含 @size-scale、各类色值等变量

// 由于 less 变量的懒生效特性，变量命名空间存在冲突，此处 prefix 变量命名前需要加特定前缀
// https://less.bootcss.com/features/#variables-lazy-evaluation
@button-prefix: ~'exd-button';

.@{button-prefix} {
  /* 组件样式 */
}
```

## 创建组件定义

在组件目录中创建 `index.tsx` 文件，使用 `createFC` 函数创建组件定义

- `createFC<Props,Ref>` 辅助函数内集成了 `React.memo` 与 `React.forwardRef`
- 为了实现按需引用，此文件不需要引入组件样式 `style.less`

```tsx | pure
/* index.tsx */
import React from 'react'
import createFC from '../../helpers/createFC'
import { ButtonProps, ButtonRef } from './type'
// 注意：此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-button'
const Button = createFC<ButtonProps, ButtonRef>(function Button(props, ref) {
  /* 组件逻辑实现 */
  return <button {...props} ref={ref} />
})

Button.defaultProps = {
  /* defaultProps 部分，没有可不写 */
}

export default Button
```

## 导出组件

在主包入口处添加组件导出

```ts
/* mobile/src/index.ts */
export { default as Button } from './exports/Button'
```

```less
/* mobile/src/style.less */
@import './exports/Button/style';
```
