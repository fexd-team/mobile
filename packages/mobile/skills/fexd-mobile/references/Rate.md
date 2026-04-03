---
name: Rate
description: 星级评分；支持半星、自定义图标与数量、只读与禁用。
---

# Rate 评分

星级评分；支持半星、自定义图标与数量、只读与禁用。

```tsx
import { Rate } from '@fexd/mobile'
```

## 基础用法

```tsx
import { Rate } from '@fexd/mobile'

<Rate onChange={(v) => console.log(v)} />

<Rate allowHalf defaultValue={2.5} />

<Rate count={10} defaultValue={5} />

<Rate defaultValue={3} size="small" />
<Rate defaultValue={3} size="large" />

<Rate disabled value={3} />

<Rate readOnly value={4} />

<Rate allowHalf defaultValue={2} character={<CustomIcon />} />
```

示例源码参考：`packages/mobile/src/exports/Rate/demos/demo1/index.tsx`。

## Props

### Rate（`PureRateProps` + `Omit<JSXDivProps, 'value' | 'defaultValue' | 'onChange'>`）

定义于 `packages/mobile/src/exports/Rate/type.tsx`。

| 属性         | 说明          | 类型                              |
| ------------ | ------------- | --------------------------------- |
| value        | 当前选中值    | `number`                          |
| defaultValue | 默认值        | `number`（文档注释默认 `0`）      |
| onChange     | 值变化回调    | `(value: number) => void`         |
| disabled     | 是否禁用      | `boolean`                         |
| allowHalf    | 是否允许半星  | `boolean`                         |
| character    | 展示字符/节点 | `React.ReactNode`                 |
| count        | 星标总数      | `number`                          |
| readOnly     | 是否只读      | `boolean`                         |
| size         | 尺寸          | `'small' \| 'default' \| 'large'` |

另继承标准 `div` 的 HTML 属性（`JSXDivProps`，不含 `value`、`defaultValue`、`onChange`）。

`RateRef` 类型为 `any`。

## 样式变量

样式源码：`packages/mobile/src/exports/Rate/style.less`。定义于 `packages/mobile/src/exports/Rate/type.tsx`（`RateStyleVars` / `DOC_RateStyleVars`）。

| 变量                      | 说明           | 默认               |
| ------------------------- | -------------- | ------------------ |
| `@rate-prefix`            | className 前缀 | `exd-rate`         |
| `@rate-active-color`      | 激活色         | `color-yellow`     |
| `@rate-default-color`     | 默认色         | `ant-color-gray-4` |
| `@rate-disabled-color`    | 禁用色         | `ant-color-gray-7` |
| `@rate-small-size`        | 小尺寸图标     | `18px`             |
| `@rate-default-size`      | 默认尺寸图标   | `24px`             |
| `@rate-large-size`        | 大尺寸图标     | `30px`             |
| `@rate-character-padding` | 字符内边距     | `3px`              |

<!--
Source:
- packages/mobile/src/exports/Rate/type.tsx
- packages/mobile/src/exports/Rate/index.zh.md
- packages/mobile/src/exports/Rate/index.tsx
- packages/mobile/src/exports/Rate/demos/
- packages/mobile/src/exports/Rate/style.less
-->
