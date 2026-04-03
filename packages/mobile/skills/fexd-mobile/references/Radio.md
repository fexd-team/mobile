---
name: Radio
description: 单独使用或与 Radio.Group 组合；支持 options 配置、自定义图标、块级布局与描述文案。
---

# Radio 单选框

单独使用或与 `Radio.Group` 组合；支持 `options` 配置、自定义图标、块级布局与描述文案。

```tsx
import { Radio } from '@fexd/mobile'
```

## 基础用法

```tsx
import { Radio } from '@fexd/mobile'
;<Radio.Group
  defaultValue="1"
  options={[
    { value: '1', label: '第一项' },
    { value: '2', label: '第二项' },
  ]}
/>
```

```tsx
<Radio.Group
  defaultValue="1"
  icon={(checked) => (checked ? <IconOn /> : <IconOff />)}
  options={[
    { value: '1', label: '第一项' },
    { value: '2', label: '第二项' },
  ]}
/>
```

```tsx
<Radio block value="1" defaultChecked>
  第一项
</Radio>
```

示例源码参考：`packages/mobile/src/exports/Radio/demos/demo1.tsx`。

## Props

### Radio（`PureRadioProps` + `Omit<JSXLabelProps, 'ref' | 'onChange'>`）

定义于 `packages/mobile/src/exports/Radio/type.tsx`。

| 属性           | 说明                         | 类型                                                         |
| -------------- | ---------------------------- | ------------------------------------------------------------ |
| checked        | 是否选中                     | `boolean`                                                    |
| value          | 选项标识（Group 模式下使用） | `any`                                                        |
| defaultChecked | 默认是否选中                 | `boolean`                                                    |
| onChange       | 选中状态变化                 | `(checked: boolean, value: any, e?: any) => void`            |
| disabled       | 是否禁用                     | `boolean`                                                    |
| icon           | 自定义图标                   | `React.ReactNode \| ((checked: boolean) => React.ReactNode)` |
| block          | 是否块级/垂直排列            | `boolean`                                                    |
| children       | 选项文案                     | `React.ReactNode`                                            |
| description    | 描述文案                     | `React.ReactNode`                                            |
| ref            | 引用                         | `React.Ref<RadioRef>`（`RadioRef` = `HTMLLabelElement`）     |

另继承标准 `<label>` 的 HTML 属性（`JSXLabelProps`，不含 `ref` 与 `onChange`）。

子组件：`Radio.Group`。

### Radio.Group（`PureRadioGroupProps`）

定义于 `packages/mobile/src/exports/Radio/Group/type.tsx`。

| 属性         | 说明         | 类型                                                  |
| ------------ | ------------ | ----------------------------------------------------- |
| value        | 当前选中值   | `any`                                                 |
| defaultValue | 默认值       | `any`                                                 |
| onChange     | 值变化       | `(value: any) => void`                                |
| children     | 自定义子节点 | `React.ReactNode`                                     |
| ref          | 引用         | `React.Ref<RadioGroupRef>`（`RadioGroupRef` = `any`） |
| options      | 选项列表     | `RadioGroupOption[]`                                  |
| icon         | 组内默认图标 | `PureRadioProps['icon']`                              |
| block        | 组内默认块级 | `boolean`                                             |
| disabled     | 组内默认禁用 | `boolean`                                             |

### RadioGroupOption（`PureRadioGroupOption` 与 `RadioProps` 字段合并）

| 属性  | 说明                                 | 类型                     |
| ----- | ------------------------------------ | ------------------------ |
| label | 选项文案（对应 Radio 的 `children`） | `RadioProps['children']` |
| value | 选项值                               | `RadioProps['value']`    |

选项还可携带 `PureRadioProps` 中除 `children`、`checked`、`defaultChecked`、`onChange` 外的字段，并与 `RadioProps` 中除 `value`、`children`、`checked`、`defaultChecked`、`onChange` 外的字段合并（以类型定义为准）。

## 样式变量

样式源码：`packages/mobile/src/exports/Radio/style.less`。定义于 `packages/mobile/src/exports/Radio/type.tsx`（`RadioStyleVars`，`DOC_RadioStyleVars`）。

| 变量                            | 说明           | 默认               |
| ------------------------------- | -------------- | ------------------ |
| `@radio-prefix`                 | className 前缀 | `exd-radio`        |
| `@radio-default-color`          | 图标默认色     | `color-gray`       |
| `@radio-active-color`           | 选中色         | `color-primary`    |
| `@radio-icon-area-width`        | 图标区域宽度   | `36px`             |
| `@radio-icon-size`              | 图标尺寸       | `24px`             |
| `@radio-disabled-color`         | 禁用色         | `ant-color-gray-5` |
| `@radio-description-color`      | 描述色         | `ant-color-gray-7` |
| `@radio-content-font-size`      | 正文字号       | `15px`             |
| `@radio-description-font-size`  | 描述字号       | `12px`             |
| `@radio-description-margin-top` | 描述上间距     | `8px`              |

<!--
Source:
- packages/mobile/src/exports/Radio/type.tsx
- packages/mobile/src/exports/Radio/index.zh.md
- packages/mobile/src/exports/Radio/index.tsx
- packages/mobile/src/exports/Radio/demos/
- packages/mobile/src/exports/Radio/style.less
-->
