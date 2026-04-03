---
name: Steps
description: 引导用户按流程完成任务的步骤条，支持配置式（data）与组件式（Steps.Item）两种用法。
---

# Steps 步骤条

引导用户按流程完成任务的步骤条，支持配置式（`data`）与组件式（`Steps.Item`）两种用法。

```tsx
import { Steps } from '@fexd/mobile'

const data = [
  { title: '1', description: '步骤1' },
  { title: '2', description: '步骤2' },
  { title: '3', description: '步骤3' },
]

;<Steps value={2} data={data} />
```

## 基础用法

配置式：

```tsx
import { Steps } from '@fexd/mobile'

const data = [
  { title: '1', description: '步骤1' },
  { title: '2', description: '步骤2' },
]

;<Steps data={data} value={2} type="flex" checked />
```

组件式：

```tsx
import { Steps, Iconfont } from '@fexd/mobile'
;<Steps>
  <Steps.Item step={1} type="error" title="error" />
  <Steps.Item step={2} type="completed" title="completed" />
  <Steps.Item step={3} type="process" title="process" />
  <Steps.Item icon={<Iconfont type="anger" />} step={4} type="default" title="default" />
</Steps>
```

更多示例见 `packages/mobile/src/exports/Steps/demos/demo1/index.tsx`。

## Props

### `Steps`（`packages/mobile/src/exports/Steps/type.tsx`）

| 属性     | 说明                       | 类型                             | 默认值 |
| :------- | :------------------------- | :------------------------------- | :----- |
| value    | 当前步骤（从 1 开始）      | `number`                         | —      |
| data     | 步骤配置数组               | `StepItemConfig[]`               | —      |
| type     | 布局；`flex` 为自适应宽度  | `'flex'`                         | —      |
| checked  | 已完成步骤是否显示勾选样式 | `boolean`                        | —      |
| children | 子节点（组件式）           | `ReactNode \| (() => ReactNode)` | —      |
| ref      | 引用                       | `React.Ref<any>`                 | —      |

另含 `Omit<JSXDivProps, 'children'>` 中除 `children` 外允许的 div 属性。

`StepItemConfig`（同文件）：

| 字段        | 类型                             |
| :---------- | :------------------------------- |
| title       | `ReactNode \| (() => ReactNode)` |
| description | `ReactNode \| (() => ReactNode)` |
| icon        | `ReactNode \| (() => ReactNode)` |
| error       | `boolean`                        |

### `Steps.Item`（`packages/mobile/src/exports/Steps/Item/type.tsx`）

| 属性     | 说明       | 类型                                               | 默认值 |
| :------- | :--------- | :------------------------------------------------- | :----- |
| step     | 步骤序号   | `number`                                           | —      |
| title    | 标题       | `ReactNode \| (() => ReactNode)`                   | —      |
| children | 描述       | `ReactNode \| (() => ReactNode)`                   | —      |
| type     | 步骤状态   | `'default' \| 'process' \| 'completed' \| 'error'` | —      |
| icon     | 自定义图标 | `ReactNode \| (() => ReactNode)`                   | —      |
| ref      | 引用       | `React.Ref<any>`                                   | —      |

另含 `Omit<JSXLiProps, 'title' | 'children'>` 中的 `li` 属性。

## 样式变量

- `StepsStyleVars`：`@steps-prefix`、`@steps-background`、`@steps-flex-max-width`、`@steps-flex-edge-offset`、`@steps-flex-content-offset` 等（见 `Steps/type.tsx`）。
- `StepItemStyleVars`：见 `Steps/Item/type.tsx`（`DOC_StepItemStyleVars`）。

<!--
Source:
- packages/mobile/src/exports/Steps/type.tsx
- packages/mobile/src/exports/Steps/index.zh.md
- packages/mobile/src/exports/Steps/index.tsx
- packages/mobile/src/exports/Steps/demos/
- packages/mobile/src/exports/Steps/style.less
-->
