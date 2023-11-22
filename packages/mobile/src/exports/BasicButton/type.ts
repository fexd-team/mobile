import React from 'react'

export type BasicButtonTypes = 'plain' | 'primary' | 'info' | 'success' | 'warning' | 'danger'
export type BasicButtonShapes = 'square' | 'round' | 'unset'
export type BasicButtonSizeTypes = 'large' | 'normal' | 'small' | 'mini'
export type BasicButtonFillTypes = 'solid' | 'outline' | 'none'

type JSXButtonElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'content'>

export interface BasicButtonProps extends JSXButtonElement {
  /** 类型，可选值为 plain primary success warning danger */
  type?: BasicButtonTypes

  /** 尺寸，可选值为 large normal small mini */
  size?: BasicButtonSizeTypes

  /** 形状，可选值为 square round */
  shape?: BasicButtonShapes

  /** 填充模式，可选值为 solid outline none */
  fill?: BasicButtonFillTypes

  /** 是否为块级元素 */
  block?: boolean

  /** 是否为禁用状态 */
  disabled?: boolean

  // className?: string // 类名
  children?: React.ReactNode // 子元素
  onClick?: React.MouseEventHandler<HTMLElement>
  as?: string | React.ComponentFactory<any, any> | React.FunctionComponentFactory<any>
  ref?: React.Ref<any>
}
