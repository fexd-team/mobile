---
name: UnstyledIOInput
description: 无样式 IO 层：组合 UnstyledIOLabel 与 BasicInput 能力，供 Line/Block/Cell 等主题输入控件使用。
---

# UnstyledIOInput 无样式输入 IO

无样式 IO 层：组合 `UnstyledIOLabel` 与 `BasicInput` 能力，供 Line/Block/Cell 等主题输入控件使用。

```tsx
import { UnstyledIOInput } from '@fexd/mobile'
```

## 基础用法

```tsx
import { UnstyledIOInput } from '@fexd/mobile'
;<UnstyledIOInput label="姓名" placeholder="请输入" value={v} onChange={setV} />
```

## Props

`UnstyledIOInputProps` 定义于 `packages/mobile/src/exports/UnstyledIOInput/type.tsx`，等价于 `PureUnstyledIOInputProps` 与 `Omit<BasicInputProps, 'prefix' | 'onClick'>` 的合并。

### `PureUnstyledIOInputProps` 中本文件显式字段

（在 `Omit<PureBasicInputProps, 'prefix' | 'onClick'>` 与 `Omit<UnstyledIOLabelProps, 'type' | 'placeholder' | 'value' | 'onChange' | 'defaultValue' | 'ref'>` 之上增加）

| 属性              | 类型                            | 说明                   |
| ----------------- | ------------------------------- | ---------------------- |
| `classNamePrefix` | `string`                        | 类名前缀               |
| `scrollIntoView`  | `boolean`                       | 是否滚动进入视区       |
| `multipleLines`   | `boolean`                       | 是否多行               |
| `clearable`       | `boolean`                       | 是否可清除             |
| `clearIcon`       | `any`                           | 清除图标               |
| `label`           | `React.ReactNode`               | 标签文案               |
| `labelType`       | `UnstyledIOLabelProps['type']`  | 标签状态样式           |
| `ref`             | `React.Ref<UnstyledIOInputRef>` | 引用                   |
| `theme`           | `UnstyledIOLabelProps['theme']` | 标签主题               |
| `inputProps`      | `BasicInputProps`               | 透传给内部输入的 props |

### 继承说明

- `BasicInputProps`（并再排除 `prefix`、`onClick`）：见 `skills/fexd-mobile/references/BasicInput.md` 与 `packages/mobile/src/exports/BasicInput/type.tsx`。
- `UnstyledIOLabelProps` 中未被 omit 的字段：见 `UnstyledIOLabel` 参考文档。

## 相关组件

- `BasicInput`、`Input`、`LineInput`
- `UnstyledIOLabel`

<!--
Source:
- packages/mobile/src/exports/UnstyledIOInput/type.tsx
- packages/mobile/src/exports/UnstyledIOInput/index.tsx
- packages/mobile/src/exports/UnstyledIOInput/style.less
-->
