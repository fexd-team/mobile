---
name: Dialog
description: 模态对话框组件；通常通过 showDialog 命令式调用（无需自行维护 visible / onClose），content 对应组件版的子内容。
---

# Dialog 对话框

模态对话框组件；通常通过 `showDialog` 命令式调用（无需自行维护 `visible` / `onClose`），`content` 对应组件版的子内容。

```tsx
import { Dialog, showDialog } from '@fexd/mobile'
```

## 基础用法

示例来源：`packages/mobile/src/exports/Dialog/demos/demo1/index.tsx`。

```tsx
import React from 'react'
import { Button, showDialog } from '@fexd/mobile'

export default () => (
  <Button
    onClick={() => {
      showDialog({ content: '对话框' })
    }}
  >
    默认
  </Button>
)
```

带标题与操作按钮：

```tsx
showDialog({
  title: '标题',
  content: '带标题的对话框',
  actions: [{ content: '主操作' }, { content: '辅助操作' }],
})
```

`theme` 为 `'normal' | 'iOS' | 'Android'`：

```tsx
showDialog({
  title: '标题',
  content: 'iOS 类型',
  theme: 'iOS',
})
```

## Props

### `DialogProps`

定义于 `packages/mobile/src/exports/Dialog/type.tsx`：`DialogProps` 在 `ModalProps` 基础上**排除** `placement`、`transition`、`type`，并与 `PureDialogProps` 合并。模态层通用字段（`visible`、`onClose`、`mask`、`level`、`onConflict` 等）见 `packages/mobile/src/exports/Modal/type.tsx` 与 `packages/mobile/src/exports/BasicModal/type.tsx`。

#### `PureDialogProps`（`Dialog/type.tsx`）

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `title` | `string` | 标题 |
| `theme` | `DialogTheme` | `'normal' \| 'iOS' \| 'Android'`，默认 `'normal'` |
| `actions` | `DialogAction[]` | 底部操作按钮配置 |
| `prefix` | `React.ReactNode` | 内容区下方前缀区域 |
| `suffix` | `React.ReactNode` | 内容区下方后缀区域 |
| `buttonFactory` | `React.FC<BasicButtonProps>` | 按钮组件构造，默认 `BasicButton` |
| `buttonType` | `BasicButtonProps['type'] \| ((theme: DialogTheme, idx: number) => BasicButtonProps['type'])` | 按钮类型 |
| `buttonSize` | `BasicButtonProps['size'] \| ((theme: DialogTheme, idx: number) => BasicButtonProps['size'])` | 按钮尺寸 |
| `buttonFill` | `BasicButtonProps['fill'] \| ((theme: DialogTheme, idx: number) => BasicButtonProps['fill'])` | 按钮填充 |
| `buttonShape` | `BasicButtonProps['shape'] \| ((theme: DialogTheme, idx: number) => BasicButtonProps['shape'])` | 按钮形状 |

### `DialogAction`

`DialogAction` 为 `PureDialogAction` 与 `BasicButtonProps`（排除 `onClick`）的交叉类型。

`PureDialogAction` 字段：

| 属性      | 类型                                         | 说明     |
| --------- | -------------------------------------------- | -------- |
| `content` | `React.ReactNode \| (() => React.ReactNode)` | 按钮文案 |
| `onClick` | `() => void`                                 | 点击回调 |

其余按钮属性以 `BasicButtonProps` 为准（见 `packages/mobile/src/exports/BasicButton/type.tsx`）。

## 高级用法

命令式 `showDialog` 与 `<Dialog />` 属性基本一致，区别是不再传入 `visible` / `onClose`，且用 `content` 代替 `children`。详见包内「命令式调用」文档与 `demos/demo1/index.tsx` 中 `prefix` / `suffix`、`modalConflict` 等示例。

## 样式定制

`DialogStyleVars` 见 `packages/mobile/src/exports/Dialog/type.tsx`（`DOC_DialogStyleVars`）。

## 相关组件

- `Modal`、`showPopup`
- `BasicButton`

## 不要在以下情况使用 Dialog

- 底部弹出内容面板 → 用 `Popup` / `showPopup`（Dialog 是居中弹层）
- 多选项操作菜单 → 用 `ActionSheet` / `showActionSheet`
- 完全自定义弹层内容 → 用 `Modal` / `showModal`（Dialog 只有标题+内容+按钮）
- 轻提示反馈 → 用 `toast`
- 不想手动管理 visible → 用 `showDialog` 命令式 API

<!--
Source:
- packages/mobile/src/exports/Dialog/type.tsx
- packages/mobile/src/exports/Dialog/index.zh.md
- packages/mobile/src/exports/Dialog/index.tsx
- packages/mobile/src/exports/Dialog/demos/
- packages/mobile/src/exports/Dialog/style.less
-->
