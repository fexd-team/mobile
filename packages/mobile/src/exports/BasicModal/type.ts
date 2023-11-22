import React from 'react'

import { TransitionProps, TransitionType, TransitionSpeed } from '../createTransition/type'

export type ModalIdType = string
export type ModalLevel = 'low' | 'normal' | 'high' | 'highest'
export type ModalPlacement = 'center' | 'top' | 'bottom'

type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

export interface BasicModalProps extends Omit<JSXDivElement, 'prefix' | 'children' | 'title' | 'content'> {
  /** 模态框 id，基础模态框必传，用于区分模态框 */
  modalId: ModalIdType

  /** 是否显示模态框 */
  visible: boolean

  /** 模态框内容 */
  children?: React.ReactNode
  /** 行为意图钩子，尝试关闭时，用于控制外部 visible 变量 */
  onClose?: React.ReactEventHandler<HTMLElement>

  // className?: string // 内容容器的类名
  /** 模态框类型，仅用作互斥标识使用，无其他用途 */
  type?: string

  /** 模态框等级，影响其 z-index */
  level?: ModalLevel

  /** 模态框 Portal 容器的类名 */
  portalClassName?: string

  /** 模态框内容是否可滚动 */
  scrollable?: boolean

  /** 内容位置，可选值为 center、top、bottom */
  placement?: ModalPlacement

  /** 内容出入动画类型 */
  transition?: TransitionType

  /** 动画速度 */
  transitionSpeed?: TransitionSpeed

  /** 是否显示遮罩，基于 Overlay 组件 */
  mask?: boolean

  /** 点击遮罩是否允许关闭（触发 onClose 意图钩子） */
  maskClosable?: boolean

  /** 遮罩是否透明 */
  maskTransparent?: boolean

  /** 遮罩出入动画类型 */
  maskTransition?: TransitionType

  /** 遮罩样式名 */
  maskClassName?: string

  /** 生命周期，模态框创建后 */
  onCreated?: () => void

  /** 生命周期，开始入场前 */
  onEnter?: TransitionProps['onEnter']

  /** 生命周期，入场完成后 */
  onEntered?: TransitionProps['onEntered']

  /** 生命周期，开始退场前 */
  onExit?: TransitionProps['onExit']

  /** 生命周期，退场完成后 */
  onExited?: TransitionProps['onExited']

  /** 生命周期，模态框销毁后 */
  onDestroyed?: () => void

  ref?: React.Ref<HTMLDivElement>
  storeProps?: any
  /** 退场后是否销毁内容 */
  destroyOnExit?: boolean

  /** 弹窗 portal 注入的位置 */
  portalTo?: any
}
