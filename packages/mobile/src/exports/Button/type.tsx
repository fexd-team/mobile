import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { BasicButtonProps, PureBasicButtonProps } from '../BasicButton/type'

export interface PureButtonProps extends PureBasicButtonProps {
  /** 图标名称或节点 */
  icon?: React.ReactNode

  /**
   * @description 图标位置
   * @default 'left'
   */
  iconPosition?: 'left' | 'right'

  /**
   * @description 是否加载中，当设置为 'auto' 时，onClick 如果是返回了 Promise，点击按钮会自动设置为 true，直到 onClick 执行完毕
   * @default 'auto'
   */
  loading?: boolean | 'auto'
}

export interface ButtonProps extends BasicButtonProps {}
export interface ButtonProps extends PureButtonProps {}

export default AUTO_API<ButtonProps>()

export interface ButtonStyleVars {
  /**
   * @description 组件的 className 前缀
   * @default 'exd-btn'
   */
  '@btn-prefix'?: string
  /**
   * @description 内联按钮基础高度
   * @default 38px
   */
  '@btn-inline-size-base'?: string
  /**
   * @description 块级按钮基础高度
   * @default 42px
   */
  '@btn-block-size-base'?: string
  /**
   * @description 大尺寸按钮缩放比例
   * @default 1.2
   */
  '@btn-size-scale-large'?: number
  /**
   * @description 标准尺寸按钮缩放比例
   * @default 1
   */
  '@btn-size-scale-normal'?: number
  /**
   * @description 小尺寸按钮缩放比例
   * @default 0.8
   */
  '@btn-size-scale-small'?: number
  /**
   * @description 迷你尺寸按钮缩放比例
   * @default 0.6
   */
  '@btn-size-scale-mini'?: number
  /**
   * @description 按钮边框宽度
   * @default 1px
   */
  '@btn-border-width'?: string
  /**
   * @description 按钮边框颜色（plain 模式）
   * @default color-gray-border
   */
  '@btn-border-color-plain'?: string
  /**
   * @description 按钮字体基础大小
   * @default 14px
   */
  '@btn-font-size-base'?: string
  /**
   * @description 按钮行高
   * @default 1
   */
  '@btn-line-height'?: number | string
  /**
   * @description 按钮水平内边距基础值
   * @default 14px
   */
  '@btn-padding-horizontal-base'?: string
  /**
   * @description 按钮圆角（square 模式）
   * @default 2px
   */
  '@btn-border-radius-square'?: string
  /**
   * @description 按钮圆角（round 模式）
   * @default 999px
   */
  '@btn-border-radius-round'?: string
  /**
   * @description 按钮过渡动画时长
   * @default 0.2s
   */
  '@btn-transition-duration'?: string
  /**
   * @description 按钮过渡动画缓动函数
   * @default ease
   */
  '@btn-transition-timing-function'?: string
  /**
   * @description 按钮禁用态透明度
   * @default 0.5
   */
  '@btn-disabled-opacity'?: number
  /**
   * @description 按钮激活态遮罩颜色
   * @default #000
   */
  '@btn-active-mask-color'?: string
  /**
   * @description 按钮激活态遮罩透明度（solid 填充）
   * @default 0.18
   */
  '@btn-active-opacity-solid'?: number
  /**
   * @description 按钮激活态遮罩透明度（outline/none 填充）
   * @default 0.06
   */
  '@btn-active-opacity-light'?: number
  /**
   * @description 按钮白色文字颜色
   * @default color-white
   */
  '@btn-color-white'?: string
  /**
   * @description 按钮透明背景色
   * @default transparent
   */
  '@btn-background-transparent'?: string
  /**
   * @description 按钮图标与文字间距
   * @default 6px
   */
  '@btn-icon-spacing'?: string
  /**
   * @description 大尺寸按钮 Spinner 缩放比例
   * @default 1.2
   */
  '@btn-spinner-scale-large'?: number
  /**
   * @description 标准尺寸按钮 Spinner 缩放比例
   * @default 1
   */
  '@btn-spinner-scale-normal'?: number
  /**
   * @description 小尺寸按钮 Spinner 缩放比例
   * @default 0.8
   */
  '@btn-spinner-scale-small'?: number
  /**
   * @description 迷你尺寸按钮 Spinner 缩放比例
   * @default 0.6
   */
  '@btn-spinner-scale-mini'?: number
  /**
   * @description Spinner 尺寸相对于 spinner-size 的比例
   * @default 0.55
   */
  '@btn-spinner-size-ratio'?: number
  /**
   * @description 块级按钮 Spinner 额外尺寸增量
   * @default 0.15
   */
  '@btn-spinner-block-size-extra'?: number
}

export const DOC_ButtonStyleVars = AUTO_API<ButtonStyleVars>()
