import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { JSXButtonProps } from '../../helpers/html.types'

export type BasicButtonTypes = 'plain' | 'primary' | 'info' | 'success' | 'warning' | 'danger'
export type BasicButtonShapes = 'square' | 'round' | 'unset'
export type BasicButtonSizeTypes = 'large' | 'normal' | 'small' | 'mini'
export type BasicButtonFillTypes = 'solid' | 'outline' | 'none'

export interface PureBasicButtonProps {
  /**
   * @description 类型，可选值为 'plain' | 'primary' | 'info' | 'success' | 'warning' | 'danger'
   * @default 'plain'
   */
  type?: BasicButtonTypes

  /**
   * @description 尺寸，可选值为 'large' | 'normal' | 'small' | 'mini'
   * @default 'normal'
   */
  size?: BasicButtonSizeTypes

  /**
   * @description 形状，可选值为 'square' | 'round' | 'unset'
   * @default 'square'
   */
  shape?: BasicButtonShapes

  /**
   * @description 填充类型，可选值为 'solid' | 'outline' | 'none'
   * @default 'solid'
   */
  fill?: BasicButtonFillTypes

  /**
   * @description 是否为块级元素
   * @default false
   */
  block?: boolean

  /**
   * @description 是否禁用
   * @default false
   */
  disabled?: boolean

  /** 类名 */
  className?: string

  /** 子元素 */
  children?: React.ReactNode

  /** 点击事件 */
  onClick?: JSXButtonProps['onClick']

  /**
   * @description 标签类型
   * @default 'button'
   */
  as?: string | React.ComponentFactory<any, any> | React.FunctionComponentFactory<any>

  /** ref */
  ref?: React.Ref<any>
}

export interface BasicButtonProps extends Omit<JSXButtonProps, 'ref' | 'onClick'> {}
export interface BasicButtonProps extends PureBasicButtonProps {}

export default AUTO_API<BasicButtonProps>()
