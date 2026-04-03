---
name: BlockDatePicker
description: 块状日期选择
---

# BlockDatePicker 块状日期选择

块状布局的日期选择控件，在 `UnstyledIODatePicker` 上固定 `theme` 为 `BlockLabel`，用于表单/信息录入场景。属于 IO 分层体系中 **Block\*** 主题变体，语义与 `DatePicker` / `UnstyledIODatePicker` 一致，仅视觉与 `BlockLabel` 对齐。

```tsx
import { BlockDatePicker } from '@fexd/mobile'
```

## 基础用法

```tsx
import { BlockDatePicker } from '@fexd/mobile'
;<BlockDatePicker label="出生日期" placeholder="请选择" format="YYYY-MM-DD" onChange={(v) => console.log(v)} />
```

```tsx
<BlockDatePicker
  label="日期"
  value={new Date()}
  min={new Date(2020, 0, 1)}
  max={new Date(2030, 11, 31)}
  disabled={false}
/>
```

## Props

`BlockDatePickerProps` 定义于 `packages/mobile/src/exports/BlockDatePicker/type.tsx`，为 `Omit<UnstyledIODatePickerProps, 'theme'>`。下表按类型来源归纳（与源码交叉合并一致；未列出字段仍可能来自 `JSXDivProps`）。

### IO 标签与外观（`UnstyledIOLabelProps` 中保留字段，且不含 `children`、`onClick`、`defaultValue`、`onChange`）

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| label | `React.ReactNode` | - | 否 | 标签文案，实现中常与 `placeholder` 联动 |
| placeholder | `React.ReactNode` | - | 否 | 占位 |
| autoHeight | `boolean` | `true` | 否 | 是否按内容撑开高度（见 `UnstyledLabel`） |
| prefix | `React.ReactNode` | - | 否 | 前缀 |
| suffix | `React.ReactNode` | - | 否 | 后缀 |
| helper | `React.ReactNode` | - | 否 | 辅助说明 |
| active | `boolean` | - | 否 | 是否激活态 |
| type | `'warn' \| 'error' \| 'info' \| 'success'` | - | 否 | 状态样式 |
| disabled | `boolean` | - | 否 | 禁用 |
| error | `React.ReactNode` | - | 否 | 错误展示 |
| focused | `boolean` | - | 否 | 是否聚焦 |
| hideErrorWhenFocusing | `boolean` | `false` | 否 | 聚焦时是否隐藏错误 |
| helperPrefix | `React.ReactNode \| ((hasError: boolean) => React.ReactNode)` | - | 否 | 辅助信息前缀 |
| keepHelperPlaceholder | `boolean` | `false` | 否 | 是否保留辅助区占位高度 |
| useLabelWrapper | `boolean` | `false` | 否 | 是否用 `<label>` 包裹 |
| className | `string` | - | 否 | 类名 |
| style | `JSXDivProps['style']` | - | 否 | 样式 |
| wrapperProps | `JSXDivProps` | - | 否 | 外层容器属性 |
| labelProps | `JSXDivProps \| ((config: { prefixWidth: number }) => JSXDivProps)` | - | 否 | 标签区域属性 |
| barProps | `JSXLabelProps \| JSXDivProps` | - | 否 | 条形容器属性 |
| contentProps | `JSXDivProps` | - | 否 | 内容区属性 |
| placeholderProps | `JSXDivProps` | - | 否 | 占位区属性 |
| prefixProps | `JSXDivProps` | - | 否 | 前缀容器属性 |
| suffixProps | `JSXDivProps` | - | 否 | 后缀容器属性 |
| helperProps | `JSXDivProps` | - | 否 | 辅助区属性 |

### 日期与弹层（`DatePickerProps`，且不含 `prefix`、`placeholder`）

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| value | `DatePickerViewValue` | - | 否 | 受控值 |
| defaultValue | `DatePickerViewValue` | - | 否 | 非受控默认值 |
| onChange | `(value: DatePickerViewValue, formattedValue?: string) => void` | - | 否 | 值变化 |
| format | `string` | - | 否 | 展示/解析格式 |
| min | `number \| Date` | - | 否 | 最小日期 |
| max | `number \| Date` | - | 否 | 最大日期 |
| yearLabel | `string` | - | 否 | 年列标题 |
| monthLabel | `string` | - | 否 | 月列标题 |
| dayLabel | `string` | - | 否 | 日列标题 |
| rows | `number` | - | 否 | 滚轮行数 |
| pickerSort | `('year' \| 'month' \| 'day')[]` | - | 否 | 列顺序 |
| filterInvalidDate | `boolean` | - | 否 | 是否过滤非法日期 |
| children | `React.ReactNode \| ((selectedValue?: DatePickerViewValue) => React.ReactNode)` | - | 否 | 自定义触发/展示内容 |
| popupProps | `Omit<PopupProps, 'visible'>` | - | 否 | 弹层参数 |
| onConfirm | `(value: string) => (boolean \| void) \| Promise<boolean \| void>` | - | 否 | 确认 |
| onCancel | `() => (boolean \| void) \| Promise<boolean \| void>` | - | 否 | 取消 |
| headerRight | `React.ReactNode` | - | 否 | 头部右侧 |
| headerLeft | `React.ReactNode` | - | 否 | 头部左侧 |
| onEnter | `PopupProps['onEnter']` | - | 否 | 进入动画 |
| onExit | `PopupProps['onExit']` | - | 否 | 退出动画 |
| onExited | `PopupProps['onExited']` | - | 否 | 退出结束 |

### 组件扩展（`UnstyledIODatePickerProps` 声明块）

| 属性            | 类型                           | 默认值 | 必填 | 说明                                           |
| --------------- | ------------------------------ | ------ | ---- | ---------------------------------------------- |
| classNamePrefix | `string`                       | -      | 否   | 类名前缀（默认实现为 `exd-block-date-picker`） |
| labelType       | `UnstyledIOLabelProps['type']` | -      | 否   | 标签状态类型                                   |
| arrowIcon       | `React.ReactNode`              | -      | 否   | 右侧箭头图标                                   |
| ref             | `React.Ref<DatePickerRef>`     | -      | 否   | 实例引用                                       |

### 其他

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| （继承） | `JSXDivProps` 中除被 `UnstyledLabelProps` 排除的字段 | - | 否 | 详见 `UnstyledLabel/type.tsx` 与 `html.types` |

## 相关组件

- 无样式实现：`UnstyledIODatePicker`
- 基础日期弹层：`DatePicker`
- 块状标签皮肤：`BlockLabel`
- 同类块状变体：`BlockTimePicker`、`BlockPicker`

## 样式定制

可通过 Less 变量覆盖（定义见 `BlockDatePickerStyleVars` / `DOC_BlockDatePickerStyleVars`）：

| 变量                                      | 说明       | 默认      |
| ----------------------------------------- | ---------- | --------- |
| `@block-date-picker-value-font-size`      | 日期值字号 | `14px`    |
| `@block-date-picker-disabled-color`       | 禁用文字色 | `#999`    |
| `@block-date-picker-disabled-arrow-color` | 禁用箭头色 | `#ccc`    |
| `@block-date-picker-clear-color`          | 清除按钮色 | `#ccc`    |
| `@block-date-picker-arrow-font-size`      | 箭头大小   | `18px`    |
| `@block-date-picker-arrow-color`          | 箭头颜色   | `#a5a0a1` |

## 注意事项

- 组件目录未提供 `index.zh.md` 与 `demos/`，用法以 `UnstyledIODatePicker` 与 `DatePicker` 为准。
- `theme` 由封装固定，调用方勿再传入。

<!--
Source:
- packages/mobile/src/exports/BlockDatePicker/type.tsx
- packages/mobile/src/exports/BlockDatePicker/index.tsx
- packages/mobile/src/exports/BlockDatePicker/style.less
-->
