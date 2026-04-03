---
name: ActionSheet
description: 自底部弹出的动作列表，常用于确认或选择操作。命令式调用时使用 showActionSheet，API 与组件 props 基本一致（无需自行管理 visible / onClose）。
---

# ActionSheet 动作面板

自底部弹出的动作列表，常用于确认或选择操作。命令式调用时使用 `showActionSheet`，API 与组件 props 基本一致（无需自行管理 `visible` / `onClose`）。

```tsx
import { ActionSheet, showActionSheet, Button } from '@fexd/mobile'
```

## 基础用法

```tsx
import React from 'react'
import { Button, showActionSheet, toast } from '@fexd/mobile'

export default () => (
  <Button
    onClick={() => {
      const { close } = showActionSheet({
        actions: [
          { content: '动作一' },
          {
            content: '动作二',
            onClick: () => {
              toast.info('动作二')
              close()
            },
          },
        ],
      })
    }}
  >
    基础
  </Button>
)
```

```tsx
import { showActionSheet } from '@fexd/mobile'

showActionSheet({
  title: '标题描述说明',
  actions: [{ content: '带了标题' }, { content: '危险操作', type: 'danger' }],
})
```

```tsx
import { showActionSheet } from '@fexd/mobile'

showActionSheet({
  actions: [
    { content: 'primary 按钮', type: 'primary' },
    { content: '禁用', disabled: true },
    { content: '填充', fill: 'solid', type: 'success' },
  ],
})
```

## Props

`ActionSheetProps` 由 `Omit<PopupProps, 'placement' | 'transition' | 'type'>` 与 `PureActionSheetProps` 合并而成（定义见 `exports/ActionSheet/type.tsx`）。除下表外，还包含 Popup → Modal → BasicModal 链路上的属性（如遮罩、层级、动画生命周期等），详见同目录下 `Popup/type.tsx`、`Modal/type.tsx`、`BasicModal/type.tsx`。

### ActionSheet 与 Popup 链（常用）

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| actions | `(ActionSheetAction \| React.ReactNode)[]` | `[{ content: 'OK' }]` | 否 | 动作项：按钮配置对象或自定义 React 节点 |
| buttonFactory | `React.FC<ButtonProps>` | `Button` | 否 | 渲染动作项时使用的按钮组件 |
| title | `string \| React.ReactNode` | - | 否 | 标题（Popup） |
| header | `React.ReactNode \| (() => React.ReactNode)` | 默认 NavBar | 否 | 标题栏 |
| headerRight | `React.ReactNode \| (() => React.ReactNode)` | 默认关闭图标 | 否 | 标题栏右侧 |
| headerLeft | `React.ReactNode \| (() => React.ReactNode)` | - | 否 | 标题栏左侧 |
| onHeaderLeftClick | `(e: React.MouseEvent<HTMLDivElement>) => void` | - | 否 | 标题栏左侧点击 |
| onHeaderRightClick | `(e: React.MouseEvent<HTMLDivElement>) => void` | - | 否 | 标题栏右侧点击 |
| round | `boolean` | `false` | 否 | 是否圆角弹层 |
| visible | `boolean` | - | 否 | 是否显示（命令式场景由 API 管理） |
| onClose | `React.ReactEventHandler<HTMLElement>` | - | 否 | 关闭意图 |
| children | `React.ReactNode` | - | 否 | 内容（继承自 Modal/BasicModal 侧） |
| modalId | `string` | 随机（Modal） | 否 | 弹层 id |
| shareMask | `boolean` | `false` | 否 | 共享遮罩 |
| contentClassName | `string` | - | 否 | 内容容器类名 |
| contentVisible | `boolean` | `true` | 否 | 内容是否可见 |
| contentTransition / contentTransitionSpeed / contentMask / contentMaskTransition | 见 Modal 类型 | 见默认实现 | 否 | 内容与内容遮罩动画 |
| onConflict | `ModalConflictHandler \| null` | - | 否 | 多弹层冲突处理 |
| mask | `boolean` | `true`（BasicModal） | 否 | 是否显示遮罩 |
| maskClosable | `boolean` | `true` | 否 | 点击遮罩是否关闭 |
| maskTransparent | `boolean` | `false` | 否 | 遮罩是否透明 |
| maskClassName | `string` | - | 否 | 遮罩类名 |
| maskTransition | `TransitionType` | - | 否 | 遮罩过渡 |
| level | `ModalLevel` | `normal` | 否 | 层级（影响 z-index） |
| portalClassName | `string` | - | 否 | Portal 容器类名 |
| scrollable | `boolean` | - | 否 | 有遮罩时内容是否可滚动 |
| transitionSpeed | `TransitionSpeed` | `fast` | 否 | 动画速度（`placement` / `transition` / 弹层 `type` 由 Popup 固定，不在 `ActionSheetProps` 中） |
| destroyOnExit | `boolean` | `true` | 否 | 退场后是否销毁 |
| portalTo | `any` | - | 否 | Portal 挂载目标 |
| storeProps | `any` | 当前 props | 否 | 写入 modalStore 的 props |
| onCreated / onEnter / onEntered / onExit / onExited / onDestroyed | 回调 | - | 否 | 生命周期 |
| className / style / … | 见 `JSXDivProps` 省略项 | - | 否 | 根节点 DOM 属性（BasicModal 对部分 key 有 Omit，见 type） |

### ActionSheetAction（`actions` 中单项为对象时）

`ActionSheetAction` 等价于 `PureActionSheetAction`：`Omit<PureButtonProps, 'children' | 'onClick'>` 且包含 `content` 与可选 `onClick`（定义见 `exports/ActionSheet/type.tsx`）。`PureButtonProps` 见 `exports/BasicButton/type.tsx`，并含 `exports/Button/type.tsx` 中的 `icon`、`iconPosition`、`loading`。

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| content | `React.ReactNode \| (() => React.ReactNode)` | - | 是 | 按钮文案或渲染函数 |
| onClick | `() => void` | - | 否 | 点击回调 |
| type / size / shape / fill / block / disabled / className / as / ref | 见 BasicButton | 见 Button 默认 | 否 | 与按钮一致 |
| icon / iconPosition / loading | 见 Button | 见 Button 默认 | 否 | 图标与加载态 |

## 样式定制

Less 变量见 `ActionSheet/type.tsx` 中 `ActionSheetStyleVars`（如 `@action-sheet-prefix`、`@action-sheet-action-height-scale`、`@action-sheet-border-color`）。动作按钮还会继承 Button 相关变量（如 `@btn-block-size-base` 等）。

## 注意事项

- 推荐使用 `showActionSheet` 做命令式弹出；若使用 `<ActionSheet />`，需自行维护 `visible` 与 `onClose`。
- `actions` 中可插入自定义 `ReactNode`（如分隔区域），需自行提供稳定 `key`。

## 相关组件

`Popup`、`Modal`、`Button`

<!--
Source:
- packages/mobile/src/exports/ActionSheet/type.tsx
- packages/mobile/src/exports/ActionSheet/index.zh.md
- packages/mobile/src/exports/ActionSheet/index.tsx
- packages/mobile/src/exports/ActionSheet/demos/
- packages/mobile/src/exports/ActionSheet/style.less
-->
