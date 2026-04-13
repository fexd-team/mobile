---
name: usePickerNumberColumn
description: 根据数值范围生成 PickerView 单列选项的 Hook，用于 DatePickerView、TimePickerView 等内部构建年/月/日/时/分/秒列。
---

# usePickerNumberColumn

根据 `min` / `max` 生成一列 `PickerOption`，并维护当前值与 `onChange`，供 `PickerView` 直接使用。常用于 `DatePickerView`、`TimePickerView` 内部的年/月/日/时/分/秒列构建。

```tsx
import { usePickerNumberColumn } from '@fexd/mobile'
```

## 基础用法

```tsx
import { usePickerNumberColumn } from '@fexd/mobile'

const yearCol = usePickerNumberColumn({
  min: 2000,
  max: 2030,
  toLabel: (v) => `${v}年`,
})
// yearCol.value, yearCol.options, yearCol.onChange
```

## API

### 签名

```ts
function usePickerNumberColumn(options: UsePickerNumberColumnOptions): UsePickerNumberColumnResult
```

类型定义见 `packages/mobile/src/exports/usePickerNumberColumn/type.ts`。

### `UsePickerNumberColumnOptions`

| 属性           | 类型                        | 默认值 | 说明                         |
| -------------- | --------------------------- | ------ | ---------------------------- |
| `defaultValue` | `number`                    | -      | 初始值（仅首次 render 生效） |
| `min`          | `number`                    | -      | 可选范围下限                 |
| `max`          | `number`                    | -      | 可选范围上限                 |
| `toLabel`      | `(value: number) => string` | -      | 数值 → 展示文本              |

### `UsePickerNumberColumnResult`

| 属性       | 类型                                | 说明                                      |
| ---------- | ----------------------------------- | ----------------------------------------- |
| `value`    | `number`                            | 当前值（始终在 `[min, max]` 范围内）      |
| `options`  | `PickerOption[]`                    | 由 `[min, max]` 生成的选项列表            |
| `onChange` | `(value: number \| string) => void` | 更新值，可交给 `PickerView` 的 `onChange` |

## 相关组件

- `PickerView`
- `DatePickerView`、`TimePickerView`

<!--
Source:
- packages/mobile/src/exports/usePickerNumberColumn/type.ts
- packages/mobile/src/exports/usePickerNumberColumn/index.ts
- packages/mobile/src/exports/usePickerNumberColumn/style.less
-->
