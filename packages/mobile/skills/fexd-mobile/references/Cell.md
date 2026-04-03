---
name: Cell
description: 列表行展示组件，支持标题、描述、值、前后缀与加载态；常与 Cell.Group 组合。
---

# Cell 单元格

列表行展示组件，支持标题、描述、值、前后缀与加载态；常与 `Cell.Group` 组合。

```tsx
import { Cell } from '@fexd/mobile'
;<Cell.Group>
  <Cell title="标题" value="内容" />
</Cell.Group>
```

## 基础用法

```tsx
import { Cell } from '@fexd/mobile'
;<Cell.Group>
  <Cell>内容</Cell>
  <Cell title="标题" value="内容" />
  <Cell title="标题" value="内容" description="描述" />
</Cell.Group>
```

```tsx
import { Cell } from '@fexd/mobile'
;<Cell.Group inset>
  <Cell title="标题" value="内容" />
</Cell.Group>
```

```tsx
import { Cell } from '@fexd/mobile'
;<Cell title="标题" value="内容" onClick={() => {}} />
```

## Props（Cell）

`CellProps` 由 `PureCellProps` 与 `Omit<JSXDivProps, 'prefix' | 'title' | 'ref'>` 合并（`Cell/type.tsx`）。

### PureCellProps

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| title | `React.ReactNode` | - | 否 | 标题 |
| value | `React.ReactNode` | - | 否 | 右侧值（与 `children` 二选一逻辑见实现） |
| children | `React.ReactNode` | - | 否 | 作为值展示（优先于 `value`） |
| description | `React.ReactNode` | - | 否 | 描述 |
| size | `'normal' \| 'small' \| 'large'` | - | 否 | 尺寸；未传时用分组上下文 |
| loading | `boolean \| 'auto'` | `'auto'` | 否 | 加载；`'auto'` 时在异步 `onClick` 期间显示 |
| border | `boolean \| 'always'` | - | 否 | 边框；未传时继承 `Cell.Group` |
| prefix | `React.ReactNode` | - | 否 | 前缀 |
| suffix | `React.ReactNode` | - | 否 | 后缀；默认可为箭头或 Spinner |
| ref | `React.Ref<CellRef>`（`CellRef` = `HTMLDivElement`） | - | 否 | 引用 |

### 其他

| 属性     | 类型                                              | 默认值 | 必填 | 说明                                  |
| -------- | ------------------------------------------------- | ------ | ---- | ------------------------------------- |
| （继承） | `Omit<JSXDivProps, 'prefix' \| 'title' \| 'ref'>` | -      | 否   | 如 `className`、`style`、`onClick` 等 |

## 子组件：Cell.Group

`Cell.Group` 类型为 `CellGroupType`（`Cell/Group/type.tsx`）。

### PureCellGroupProps

| 属性   | 类型                | 默认值 | 必填 | 说明                                     |
| ------ | ------------------- | ------ | ---- | ---------------------------------------- |
| title  | `string`            | -      | 否   | 分组标题                                 |
| inset  | `boolean`           | -      | 否   | 卡片式内缩                               |
| border | `boolean`           | -      | 否   | 是否显示分组边框（影响子 Cell 默认边框） |
| size   | `CellProps['size']` | -      | 否   | 子单元格默认尺寸                         |

### 其他

| 属性     | 类型          | 默认值 | 必填 | 说明              |
| -------- | ------------- | ------ | ---- | ----------------- |
| （继承） | `JSXDivProps` | -      | 否   | 分组容器 div 属性 |

静态挂载：`Cell.Group = Group`（`Cell/index.tsx`）。

## 样式定制

### Cell — `CellStyleVars` / `DOC_CellStyleVars`（节选）

| 变量                                            | 说明                | 默认                     |
| ----------------------------------------------- | ------------------- | ------------------------ |
| `@cell-prefix`                                  | 类前缀              | `exd-cell`               |
| `@cell-background`                              | 背景                | `#fff`                   |
| `@cell-border-color`                            | 边框色              | `#f2f2f2`                |
| `@cell-label-color` / `@cell-description-color` | 标题/描述色         | `#333` / `#969799`       |
| `@cell-padding-x` / `@cell-border-left`         | 水平内边距/边框缩进 | `16px`                   |
| `@cell-loading-size`                            | 加载图标尺寸        | `20px`                   |
| `@cell-padding-y-normal` / `-small` / `-large`  | 垂直内边距          | `10px` / `8px` / `12px`  |
| `@cell-font-size-normal` / `-small` / `-large`  | 字号                | `14px` / `12px` / `16px` |

### Cell.Group — `CellGroupStyleVars` / `DOC_CellGroupStyleVars`

| 变量                                            | 说明          | 默认             |
| ----------------------------------------------- | ------------- | ---------------- |
| `@cell-group-prefix`                            | 类前缀        | `exd-cell-group` |
| `@cell-group-title-padding-y` / `-x`            | 标题内边距    | `12px` / `16px`  |
| `@cell-group-title-color` / `-font-size`        | 标题色/字号   | `#999` / `12px`  |
| `@cell-group-inset-margin-x` / `-border-radius` | 卡片边距/圆角 | `16px` / `8px`   |

## 相关组件

- Demo：`packages/mobile/src/exports/Cell/demos/demo1/index.tsx`

## 注意事项

- 可点击时默认后缀为前进箭头；`loading` 为真时后缀为 Spinner。
- `loading` 与 `border` 可与分组上下文合并，见 `Cell/index.tsx` 中 `useContext(cellGroupContext)`。

<!--
Source:
- packages/mobile/src/exports/Cell/type.tsx
- packages/mobile/src/exports/Cell/index.zh.md
- packages/mobile/src/exports/Cell/index.tsx
- packages/mobile/src/exports/Cell/demos/
- packages/mobile/src/exports/Cell/style.less
-->
