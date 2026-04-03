---
name: Stepper
description: 用于在最小值与最大值之间以步长增减数值的步进输入组件。
---

# Stepper 步进器

用于在最小值与最大值之间以步长增减数值的步进输入组件。

```tsx
import { Stepper } from '@fexd/mobile'
;<Stepper />
```

## 基础用法

```tsx
import { Stepper } from '@fexd/mobile'
;<Stepper defaultValue={10} step={10} min={5} max={10} />
```

```tsx
import { Stepper } from '@fexd/mobile'
import BigNumber from 'bignumber.js'
;<Stepper
  block
  step={999}
  format={(value) => `$ ${BigNumber(value).toFormat({ decimalSeparator: '.', groupSeparator: ',', groupSize: 3 })}`}
  normalize={(value) => value.replace(/\D/g, '')}
/>
```

更多示例见 `packages/mobile/src/exports/Stepper/demos/demo1/index.tsx`。

## Props

类型定义见 `packages/mobile/src/exports/Stepper/type.tsx`。`AUTO_API` 针对 `PureStepperProps`；`StepperProps` 另与 `BasicInputProps` 合并（原生 `input` 相关属性以该类型为准）。

### 步进与展示（`PureStepperProps` 声明段）

| 属性       | 说明                           | 类型                             | 默认值 |
| :--------- | :----------------------------- | :------------------------------- | :----- |
| step       | 步长；为数组时依次为减、加步长 | `number \| [number, number]`     | `1`    |
| min        | 最小值                         | `number`                         | —      |
| max        | 最大值                         | `number`                         | —      |
| size       | 尺寸                           | `'normal' \| 'small' \| 'large'` | —      |
| block      | 是否块级                       | `boolean`                        | —      |
| allowEmpty | 是否允许为空                   | `boolean`                        | —      |
| disabled   | 是否禁用                       | `boolean`                        | —      |
| readOnly   | 输入框是否只读                 | `boolean`                        | —      |
| ref        | 实例 ref                       | `React.Ref<StepperRef>`          | —      |
| onPlus     | 增加时的回调，可返回新值       | `(value: number) => number`      | —      |
| onMinus    | 减少时的回调，可返回新值       | `(value: number) => number`      | —      |

### 值与 IO（`IOProps`，同文件 `extends`）

| 属性          | 说明                  | 类型                      |
| :------------ | :-------------------- | :------------------------ |
| defaultValue  | 非受控默认值          | `any`                     |
| value         | 受控值                | `any`                     |
| onChange      | 值变化                | `(value: any) => void`    |
| filterIOValue | 返回 `false` 时不更新 | `(value: any) => boolean` |

### 文本字段（`PureBasicInputProps` 在省略 `IOProps` 与 `size` 后保留）

| 属性             | 说明           | 类型                                            |
| :--------------- | :------------- | :---------------------------------------------- |
| normalize        | 序列化输入     | `(value: string, prevValue?: string) => string` |
| normalizeTrigger | 序列化触发时机 | `'onChange' \| 'onBlur'`                        |
| format           | 展示格式化     | `(value: string) => string`                     |

### `StepperRef`（`type.tsx`）

| 字段       | 类型                                |
| :--------- | :---------------------------------- |
| inputRef   | `React.RefObject<HTMLInputElement>` |
| wrapperRef | `React.RefObject<HTMLDivElement>`   |
| minus      | `(value: number) => number`         |
| plus       | `(value: number) => number`         |

## 样式变量

样式源码：`packages/mobile/src/exports/Stepper/style.less`。`StepperStyleVars`（`type.tsx` 内 `DOC_StepperStyleVars`）：`@stepper-prefix`、`@stepper-border-color`、`@stepper-border-width`、`@stepper-border-radius`、`@stepper-input-border-color`、`@stepper-width`、`@stepper-block-height-extra`。

<!--
Source:
- packages/mobile/src/exports/Stepper/type.tsx
- packages/mobile/src/exports/Stepper/index.zh.md
- packages/mobile/src/exports/Stepper/index.tsx
- packages/mobile/src/exports/Stepper/demos/
- packages/mobile/src/exports/Stepper/style.less
-->
