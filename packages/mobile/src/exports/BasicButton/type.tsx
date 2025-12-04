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

/**
 * BasicButton 样式变量
 */
export interface BasicButtonStyleVars {
  /**
   * @description 行内按钮基础高度
   * @default 38px
   */
  '@btn-inline-size-base'?: string
  /**
   * @description 块级按钮基础高度
   * @default 42px
   */
  '@btn-block-size-base'?: string
  /**
   * @description 大尺寸缩放比例
   * @default 1.2
   */
  '@btn-size-scale-large'?: string
  /**
   * @description 普通尺寸缩放比例
   * @default 1
   */
  '@btn-size-scale-normal'?: string
  /**
   * @description 小尺寸缩放比例
   * @default 0.8
   */
  '@btn-size-scale-small'?: string
  /**
   * @description 迷你尺寸缩放比例
   * @default 0.6
   */
  '@btn-size-scale-mini'?: string
  /**
   * @description 边框宽度
   * @default 1px
   */
  '@btn-border-width'?: string
  /**
   * @description 朴素按钮边框颜色
   * @default color-gray-border
   */
  '@btn-border-color-plain'?: string
  /**
   * @description 基础字体大小
   * @default 14px
   */
  '@btn-font-size-base'?: string
  /**
   * @description 行高
   * @default 1
   */
  '@btn-line-height'?: string
  /**
   * @description 水平内边距基础值
   * @default 14px
   */
  '@btn-padding-horizontal-base'?: string
  /**
   * @description 方形按钮圆角
   * @default 2px
   */
  '@btn-border-radius-square'?: string
  /**
   * @description 圆形按钮圆角
   * @default 999px
   */
  '@btn-border-radius-round'?: string
  /**
   * @description 过渡动画时长
   * @default 0.2s
   */
  '@btn-transition-duration'?: string
  /**
   * @description 过渡动画时间函数
   * @default ease
   */
  '@btn-transition-timing-function'?: string
  /**
   * @description 禁用态透明度
   * @default 0.5
   */
  '@btn-disabled-opacity'?: string
  /**
   * @description 激活态遮罩颜色
   * @default #000
   */
  '@btn-active-mask-color'?: string
  /**
   * @description 实心按钮激活态透明度
   * @default 0.18
   */
  '@btn-active-opacity-solid'?: string
  /**
   * @description 浅色按钮激活态透明度
   * @default 0.06
   */
  '@btn-active-opacity-light'?: string
  /**
   * @description 白色
   * @default color-white
   */
  '@btn-color-white'?: string
  /**
   * @description 透明背景
   * @default transparent
   */
  '@btn-background-transparent'?: string
}

export const DOC_BasicButtonStyleVars = AUTO_API<BasicButtonStyleVars>()

export default AUTO_API<BasicButtonProps>()
