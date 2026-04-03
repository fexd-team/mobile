---
name: showPicker
description: import { showPicker } from '@fexd/mobile'
---

# showPicker

```ts
import { showPicker } from '@fexd/mobile'
```

基于 `showPopup` 与 `PickerView` 的异步选择器：用户点右侧确认时将当前滚动选中值写回并关闭，点左侧关闭则放弃修改；函数 `await` 在弹层关闭后结束并返回最终值。

## 基础用法

```ts
import { showPicker } from '@fexd/mobile'

const value = await showPicker({
  options: [
    { label: '一', value: 1 },
    { label: '二', value: 2 },
  ],
  defaultValue: 1,
})
```

## API

### 函数签名（`packages/mobile/src/exports/showPicker/index.tsx`）

```ts
function showPicker(config: ShowPickerConfig): Promise<PickerOptionValue | undefined>
```

### `ShowPickerConfig`（`packages/mobile/src/exports/showPicker/type.tsx`）

在 `PickerViewProps` 基础上扩展：

| 字段 | 类型 | 默认值（源码） | 说明 |
| --- | --- | --- | --- |
| `defaultValue` | `PickerOptionValue` | - | 初始选中值；确认前临时值在内部维护。 |
| `clearable` | `boolean` | `true` | 为真时在 `options` 前插入 `{ label: '---', value: undefined }`。 |
| `popupProps` | `Omit<PopupProps, 'visible' \| 'children'>` | `{}` | 传给 `showPopup` 的其余 props（源码展开 `title: ' '` 可被覆盖）。 |
| `headerRight` | `React.ReactNode` | `popupProps.headerRight` 或 `<CheckmarkOutline />` | 渲染为可点击区域，点击时将 `tempValue` 赋给返回值并 `close()`。 |
| `headerLeft` | `React.ReactNode` | `popupProps.headerLeft` 或 `<CloseOutline />` | 点击则 `close()`，不提交 `tempValue`。 |

另继承 `PickerView` 的 `options`、`rows`、`onChange` 等（`showPicker` 内部用 `PickerView` 的 `onChange` 更新临时值）。

### 返回值

- 用户点击右侧确认：返回当前选中值（类型为 `PickerOptionValue`，即 `string | number`，清除选项为 `undefined`）。
- 用户点击左侧关闭：`await` 结束后返回的仍是进入弹层时的 `value` 变量；若仅关闭而未点确认，源码中 `value` 保持 `config.defaultValue` 初始值，即未把 `tempValue` 同步到 `value`。

### 异步用法

必须使用 `await`（或 `.then`）等待内部 `showPopup(...).promise`：`showPicker` 为 `async` 函数。

## 样式变量

见 `packages/mobile/src/exports/showPicker/type.tsx` 中的 `ShowPickerStyleVars`。

<!--
Source:
- packages/mobile/src/exports/showPicker/type.tsx
- packages/mobile/src/exports/showPicker/index.tsx
- packages/mobile/src/exports/showPicker/style.less
-->
