---
name: BlockTimePicker
description: 块状时间选择
---

# BlockTimePicker 块状时间选择

在 `UnstyledIOTimePicker` 上固定 `theme` 为 `BlockLabel` 的时间选择控件，类名前缀默认为 `exd-block-time-picker`。属于 IO 分层体系中 **Block\*** 主题变体。

```tsx
import { BlockTimePicker } from '@fexd/mobile'
```

## 基础用法

```tsx
import { BlockTimePicker } from '@fexd/mobile'
;<BlockTimePicker label="时间" placeholder="请选择" format="HH:mm" onChange={(v) => console.log(v)} />
```

```tsx
<BlockTimePicker label="预约时间" value={new Date()} disabled />
```

## Props

`BlockTimePickerProps` 为 `Omit<UnstyledIOTimePickerProps, 'theme'>`（`BlockTimePicker/type.tsx`）。

### IO 标签层（`UnstyledIOLabelProps` 保留字段，不含 `children`、`defaultValue`、`onChange`）

与 `BlockDatePicker` 文档中「IO 标签与外观」表相同：`label`、`placeholder`、`prefix`、`suffix`、`helper`、`active`、`type`、`disabled`、`error`、`focused`、`hideErrorWhenFocusing`、`helperPrefix`、`keepHelperPlaceholder`、`useLabelWrapper`、`className`、`style`、`*Props` 等。

### 时间与弹层（`TimePickerProps`）

`TimePickerProps` 由 `Omit<BasicPickerProps, 'value' | 'defaultValue' | 'onChange'>` 与 `TimePickerViewProps` 及下列字段合并（`TimePicker/type.tsx`）。

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| value | `TimePickerViewValue` | - | 否 | 受控值 |
| onChange | `TimePickerViewProps['onChange']` | - | 否 | 值变化 |
| format | `string` | - | 否 | 时间格式 |
| className | `string` | - | 否 | 类名 |
| hourLabel | `string` | - | 否 | 小时列标题 |
| minuteLabel | `string` | - | 否 | 分钟列标题 |
| secondLabel | `string` | - | 否 | 秒列标题 |
| rows | `number` | - | 否 | 滚轮行数 |
| children | `React.ReactNode \| ((selectedValue?: TimePickerViewValue) => React.ReactNode)` | - | 否 | 自定义展示 |
| popupProps | `Omit<PopupProps, 'visible'>` | - | 否 | 弹层 |
| onConfirm | `(value: string) => (boolean \| void) \| Promise<boolean \| void>` | - | 否 | 确认 |
| onCancel | `() => (boolean \| void) \| Promise<boolean \| void>` | - | 否 | 取消 |
| headerRight | `React.ReactNode` | - | 否 | 头部右侧 |
| headerLeft | `React.ReactNode` | - | 否 | 头部左侧 |
| disabled | `boolean` | `false` | 否 | 禁用 |
| onEnter / onExit / onExited | 同 `PopupProps` | - | 否 | 动画回调 |

### UnstyledIOTimePicker 扩展

| 属性            | 类型                           | 默认值 | 必填 | 说明                                     |
| --------------- | ------------------------------ | ------ | ---- | ---------------------------------------- |
| classNamePrefix | `string`                       | -      | 否   | 类名前缀（默认 `exd-block-time-picker`） |
| labelType       | `UnstyledIOLabelProps['type']` | -      | 否   | 标签状态                                 |
| arrowIcon       | `React.ReactNode`              | -      | 否   | 箭头                                     |
| ref             | `React.Ref<TimePickerRef>`     | -      | 否   | 引用                                     |

### 其他

| 属性     | 类型                                                 | 默认值 | 必填 | 说明                        |
| -------- | ---------------------------------------------------- | ------ | ---- | --------------------------- |
| （继承） | `JSXDivProps` 中未被 `UnstyledLabelProps` 排除的字段 | -      | 否   | 见 `UnstyledLabel/type.tsx` |

## 相关组件

- 无样式：`UnstyledIOTimePicker`
- 基础实现：`TimePicker`
- 同类：`BlockDatePicker`、`BlockPicker`

## 样式定制

`BlockTimePickerStyleVars` / `DOC_BlockTimePickerStyleVars`：

| 变量                                      | 说明       | 默认      |
| ----------------------------------------- | ---------- | --------- |
| `@block-time-picker-value-font-size`      | 时间值字号 | `14px`    |
| `@block-time-picker-disabled-color`       | 禁用文字色 | `#999`    |
| `@block-time-picker-disabled-arrow-color` | 禁用箭头色 | `#ccc`    |
| `@block-time-picker-clear-color`          | 清除色     | `#ccc`    |
| `@block-time-picker-arrow-font-size`      | 箭头大小   | `18px`    |
| `@block-time-picker-arrow-color`          | 箭头颜色   | `#a5a0a1` |

## 注意事项

- `TimePickerViewProps` 在部分版本注释掉 `defaultValue`，受控与非受控行为以当前 `TimePicker` 实现为准。
- 无仓库内中文文档与 demo，以 `UnstyledIOTimePicker` 为准。

<!--
Source:
- packages/mobile/src/exports/BlockTimePicker/type.tsx
- packages/mobile/src/exports/BlockTimePicker/index.tsx
- packages/mobile/src/exports/BlockTimePicker/style.less
-->
