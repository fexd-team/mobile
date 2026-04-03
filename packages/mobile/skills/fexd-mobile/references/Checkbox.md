---
name: Checkbox
description: 支持单独使用或与 Checkbox.Group 组合；可选块级、自定义图标、描述文案等。
---

# Checkbox 多选框

支持单独使用或与 `Checkbox.Group` 组合；可选块级、自定义图标、描述文案等。

```tsx
import { Checkbox } from '@fexd/mobile'
```

## 基础用法

```tsx
import { Checkbox } from '@fexd/mobile'
;<Checkbox.Group
  defaultValue={['1']}
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]}
/>
```

```tsx
<Checkbox value="a" defaultChecked>
  Option A
</Checkbox>
```

```tsx
<Checkbox.Group
  defaultValue={['1']}
  icon={(checked) => (checked ? <IconA /> : <IconB />)}
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]}
/>
```

示例源码参考：`packages/mobile/src/exports/Checkbox/demos/demo1.tsx`。

## Props

### Checkbox（`PureCheckboxProps` + `Omit<JSXLabelProps, 'ref' | 'onChange'>`）

定义于 `packages/mobile/src/exports/Checkbox/type.tsx`。

| 属性           | 说明                       | 类型                                                           |
| -------------- | -------------------------- | -------------------------------------------------------------- |
| checked        | 是否选中                   | `boolean`                                                      |
| value          | 选项值（Group 模式下使用） | `string \| number`                                             |
| defaultChecked | 默认选中                   | `boolean`                                                      |
| onChange       | 选中状态变化               | `(checked: boolean) => void`                                   |
| disabled       | 是否禁用                   | `boolean`                                                      |
| icon           | 自定义图标                 | `React.ReactNode \| ((checked: boolean) => React.ReactNode)`   |
| block          | 是否垂直/块级排列          | `boolean`                                                      |
| children       | 标签文案                   | `React.ReactNode`                                              |
| description    | 描述                       | `React.ReactNode`                                              |
| ref            | 引用                       | `React.Ref<CheckboxRef>`（`CheckboxRef` = `HTMLLabelElement`） |

另继承标准 `<label>` 的 HTML 属性（`JSXLabelProps`，不含 `ref` 与 `onChange`）。

子组件：`Checkbox.Group`。

### Checkbox.Group（`PureCheckboxGroupProps`）

定义于 `packages/mobile/src/exports/Checkbox/Group/type.tsx`。

| 属性         | 说明           | 类型                                        |
| ------------ | -------------- | ------------------------------------------- |
| value        | 当前选中值列表 | `CheckboxProps['value'][]`                  |
| defaultValue | 默认值列表     | `CheckboxProps['value'][]`                  |
| onChange     | 值变化         | `(value: CheckboxProps['value'][]) => void` |
| children     | 自定义子节点   | `React.ReactNode`                           |
| options      | 选项列表       | `CheckboxGroupOption[]`                     |
| icon         | 组内默认图标   | 同 `PureCheckboxProps['icon']`              |
| block        | 组内默认块级   | `boolean`                                   |
| disabled     | 组内默认禁用   | `boolean`                                   |
| ref          | 引用           | `React.Ref<CheckboxGroupRef>`               |

### CheckboxGroupOption（`PureCheckboxGroupOption` 与 `CheckboxProps` 字段合并）

| 属性  | 说明                                  | 类型                        |
| ----- | ------------------------------------- | --------------------------- |
| label | 选项文案（对应 Checkbox 的 children） | `CheckboxProps['children']` |
| value | 选项值                                | `CheckboxProps['value']`    |

其余字段同 `CheckboxProps` 中除 `children`、`checked`、`defaultChecked`、`onChange` 外的可选项（如 `description`、`disabled`、`icon`、`block` 等，见 `Group/type.tsx` 交叉类型）。

## 样式定制

样式源码：`packages/mobile/src/exports/Checkbox/style.less`。变量定义见 `CheckboxStyleVars`（`type.tsx` 内 `DOC_CheckboxStyleVars`）。

| 变量                               | 说明           | 默认               |
| ---------------------------------- | -------------- | ------------------ |
| `@checkbox-prefix`                 | className 前缀 | `exd-checkbox`     |
| `@checkbox-default-color`          | 图标默认色     | `color-gray`       |
| `@checkbox-active-color`           | 选中色         | `color-primary`    |
| `@checkbox-icon-area-width`        | 图标区域宽度   | `36px`             |
| `@checkbox-icon-size`              | 图标尺寸       | `24px`             |
| `@checkbox-disabled-color`         | 禁用色         | `ant-color-gray-5` |
| `@checkbox-description-color`      | 描述色         | `ant-color-gray-7` |
| `@checkbox-content-font-size`      | 正文字号       | `15px`             |
| `@checkbox-description-font-size`  | 描述字号       | `12px`             |
| `@checkbox-description-margin-top` | 描述上间距     | `8px`              |

## 相关组件

`Radio`（若项目中有单选组合模式可对照使用）

<!--
Source:
- packages/mobile/src/exports/Checkbox/type.tsx
- packages/mobile/src/exports/Checkbox/index.zh.md
- packages/mobile/src/exports/Checkbox/index.tsx
- packages/mobile/src/exports/Checkbox/demos/
- packages/mobile/src/exports/Checkbox/style.less
-->
