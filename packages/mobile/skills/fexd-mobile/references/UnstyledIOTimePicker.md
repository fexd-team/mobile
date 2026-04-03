---
name: UnstyledIOTimePicker
description: 无样式 IO 层：将 TimePicker 能力与 UnstyledIOLabel 式标签区组合，供 Line/Block/Cell 等主题封装使用。
---

# UnstyledIOTimePicker 无样式时间 IO

无样式 IO 层：将 `TimePicker` 能力与 `UnstyledIOLabel` 式标签区组合，供 Line/Block/Cell 等主题封装使用。

```tsx
import { UnstyledIOTimePicker } from '@fexd/mobile'
```

## 基础用法

```tsx
import { UnstyledIOTimePicker } from '@fexd/mobile'
;<UnstyledIOTimePicker label="时间" value={t} onChange={setT} />
```

交互与弹层行为与 `TimePicker` 一致，详见 `TimePicker` 文档。

## Props

`UnstyledIOTimePickerProps` 定义于 `packages/mobile/src/exports/UnstyledIOTimePicker/type.tsx`，由下列合并：

- `Omit<UnstyledIOLabelProps, 'children' | 'defaultValue' | 'onChange'>`
- `TimePickerProps`
- 下列本文件显式字段

### 本文件显式声明

| 属性              | 类型                                 | 说明                     |
| ----------------- | ------------------------------------ | ------------------------ |
| `classNamePrefix` | `string`                             | 类名前缀                 |
| `className`       | `string`                             | 根节点类名               |
| `label`           | `React.ReactNode`                    | 标签文案                 |
| `labelType`       | `UnstyledIOLabelProps['type']`       | 标签状态样式             |
| `ref`             | `React.Ref<UnstyledIOTimePickerRef>` | 引用，同 `TimePickerRef` |
| `theme`           | `UnstyledIOLabelProps['theme']`      | 标签主题                 |
| `arrowIcon`       | `React.ReactNode`                    | 右侧箭头图标             |

### 继承说明

- `TimePickerProps`：见 `skills/fexd-mobile/references/TimePicker.md` 与 `packages/mobile/src/exports/TimePicker/type.tsx`。
- `UnstyledIOLabelProps`（已排除 `children`、`defaultValue`、`onChange`）：见 `UnstyledIOLabel` 参考文档。

## 相关组件

- `TimePicker`、`LineTimePicker`、`BlockTimePicker`、`CellTimePicker`
- `UnstyledIOLabel`

<!--
Source:
- packages/mobile/src/exports/UnstyledIOTimePicker/type.tsx
- packages/mobile/src/exports/UnstyledIOTimePicker/index.tsx
- packages/mobile/src/exports/UnstyledIOTimePicker/style.less
-->
