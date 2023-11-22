---
group:
  title: 反馈
  order: 104

title: 多个弹窗的处理方式
order: 2
---

# 弹窗互斥

## 3D 原理图示

一图胜千言，请在 Demo 窗口操作弹窗，此处图示将实时响应 Demo 中弹窗层级情况

<code src="./principle/index.tsx" />

## 层级说明

模态框中，按照 level 属性共分为 `low`、`normal`、`high`、`highest` 四层

其中，共享蒙层的默认层级最低，为 `low`

`Modal`、`Popup`、`Dialog` 等较重交互，默认层级为 `normal`

`toast`、`notify` 等轻提示默认层级为 `high`

`loading` 为最高层级 `highest`，意在阻断所有交互

## 互斥定义

何为互斥：产生了任意类型 zIndex 更高的模态框

默认的互斥行为：仅比较同 level 任意类型，`Modal`、`Popup`、`Dialog` 默认使用该互斥行为

进阶互斥行为：比较同 level 同类型，`toast`、`notify` 默认使用该互斥行为

互斥行为下，模态框可使用 `shareMask` 属性，唤起共享蒙层，并使自身蒙层透明，实现单一蒙层的效果

发生互斥时，为继续保持单一蒙层效果，可在模态框内容上创建局部蒙层，或直接将内容隐藏

### onConflict

待补充说明...

## modalConflict

互斥行为辅助工具

待补充说明...

```ts
// 互斥控制器类型
type BasicModalConflictHandler = (conflictParams: ModalConflictParams) => ModalConflictProps

interface ModalConflictHandler extends BasicModalConflictHandler {
  config: CreateConfig | CreateConfig[]
}

// 互斥行为辅助工具
declare const modalConflict: {
  create: (config?: CreateConfig): ModalConflictHandler
  merge: (...conflictHandlers: ModalConflictHandler[]) => ModalConflictHandler
  extend: (conflictHandler: ModalConflictHandler, config: CreateConfig) => ModalConflictHandler
  handlers: {
    mask: ModalConflictHandler
    hidden: ModalConflictHandler
  }
}

// 显示中模态框的相关信息
interface ModalData {
  modalId: string // 模态框 id
  zIndex: number // 模态框 z-index
  level: 'low' | 'normal' | 'high' | 'highest' // 模态框级别
  type?: string // 模态框类型描述
  props?: ModalProps | BasicModalProps | any // 模态框当前属性
}

interface ModalConflictParams {
  type: 'open' | 'close' // 互斥类型，open 为有模态框新增，close 为有模态框消失
  event: ModalData // 造成互斥事件的模态框
  current: ModalData // 当前模态框本身
  all: ModalData[] // 所有可见的模态框
  store: typeof modalStore // 可见模态框控制中心
}

// 互斥修正属性类型，用以根据互斥状态调整 Modal 的 props
interface ModalConflictProps
  extends Pick<
    ModalProps,
    | 'className'
    | 'portalClassName'
    | 'maskClassName'
    | 'contentVisible'
    | 'contentTransition'
    | 'contentMask'
    | 'contentMaskTransition'
  > {}
```

## 演示代码

<!-- ### 预览 -->

<code src="./demo/index.tsx" />
