---
name: UnstyledIODatePicker
description: 无样式 IO 层：将 DatePicker 能力与 UnstyledIOLabel 式标签区组合，供 Line/Block/Cell 等主题封装使用。
---

# UnstyledIODatePicker 无样式日期 IO

无样式 IO 层：将 `DatePicker` 能力与 `UnstyledIOLabel` 式标签区组合，供 Line/Block/Cell 等主题封装使用。

```tsx
import { UnstyledIODatePicker } from '@fexd/mobile'
```

## 基础用法

```tsx
import { UnstyledIODatePicker } from '@fexd/mobile'
;<UnstyledIODatePicker label="日期" value={date} onChange={setDate} />
```

具体交互与弹层行为与 `DatePicker` 一致，详见 `DatePicker` 文档；此处仅描述 `type.tsx` 中的类型合并与本层新增字段。

## Props

`UnstyledIODatePickerProps` 定义于 `packages/mobile/src/exports/UnstyledIODatePicker/type.tsx`，由下列类型合并：

- `Omit<UnstyledIOLabelProps, 'children' | 'onClick' | 'defaultValue' | 'onChange'>`
- `Omit<DatePickerProps, 'prefix' | 'placeholder'>`
- 下列本文件显式字段

### 本文件显式声明

| 属性              | 类型                                 | 说明                                               |
| ----------------- | ------------------------------------ | -------------------------------------------------- |
| `classNamePrefix` | `string`                             | 类名前缀                                           |
| `className`       | `string`                             | 根节点类名                                         |
| `label`           | `React.ReactNode`                    | 标签文案                                           |
| `labelType`       | `UnstyledIOLabelProps['type']`       | 标签状态样式                                       |
| `ref`             | `React.Ref<UnstyledIODatePickerRef>` | 引用，`UnstyledIODatePickerRef` 同 `DatePickerRef` |
| `theme`           | `UnstyledIOLabelProps['theme']`      | 标签主题                                           |
| `arrowIcon`       | `React.ReactNode`                    | 右侧箭头图标                                       |

### 继承说明

- `DatePickerProps`（已排除 `prefix`、`placeholder`）：见 `skills/fexd-mobile/references/DatePicker.md` 与 `packages/mobile/src/exports/DatePicker/type.tsx`。
- `UnstyledIOLabelProps`（已排除 `children`、`onClick`、`defaultValue`、`onChange`）：见 `skills/fexd-mobile/references/UnstyledIOLabel.md`。

## 相关组件

- `DatePicker`、`LineDatePicker`、`BlockDatePicker`、`CellDatePicker`
- `UnstyledIOLabel`

<!--
Source:
- packages/mobile/src/exports/UnstyledIODatePicker/type.tsx
- packages/mobile/src/exports/UnstyledIODatePicker/index.tsx
- packages/mobile/src/exports/UnstyledIODatePicker/style.less
-->
