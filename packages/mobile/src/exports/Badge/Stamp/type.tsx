import React from 'react'
import AUTO_API from '../../../helpers/AUTO_API'
import { JSXDivProps } from '../../../helpers/html.types'

export interface BadgeStampProps extends JSXDivProps {
  className?: string
  text?: React.ReactNode
  color?: string
  bgColor?: string
  // children?: React.ReactNode
  style?: React.CSSProperties & Partial<Record<string, string>>
}

export default AUTO_API<BadgeStampProps>()

export interface BadgeStampStyleVars {
  /**
   * @description 组件的 className 前缀
   * @default 'exd-badge-stamp'
   */
  '@badge-stamp-prefix'?: string
  /**
   * @description Stamp 文字和边框颜色
   * @default ant-color-gray-7 (#8c8c8c)
   */
  '@badge-stamp-color'?: string
  /**
   * @description Stamp 最小宽度
   * @default 32px
   */
  '@badge-stamp-min-width'?: string
  /**
   * @description Stamp 最小高度
   * @default 32px
   */
  '@badge-stamp-min-height'?: string
  /**
   * @description Stamp 行高
   * @default 30px
   */
  '@badge-stamp-line-height'?: string
  /**
   * @description Stamp 圆角大小
   * @default 16px
   */
  '@badge-stamp-border-radius'?: string
  /**
   * @description Stamp 边框宽度
   * @default 1px
   */
  '@badge-stamp-border-width'?: string
  /**
   * @description Stamp 字体大小
   * @default 14px
   */
  '@badge-stamp-font-size'?: string
  /**
   * @description Stamp fixed 模式的层级
   * @default 99
   */
  '@badge-stamp-fixed-z-index'?: string
  /**
   * @description Stamp fixed 模式的旋转角度
   * @default -20deg
   */
  '@badge-stamp-fixed-rotate'?: string
  /**
   * @description Stamp fixed 模式的水平位移
   * @default 45%
   */
  '@badge-stamp-fixed-translate-x'?: string
  /**
   * @description Stamp fixed 模式的垂直位移
   * @default -25%
   */
  '@badge-stamp-fixed-translate-y'?: string
}

export const DOC_BadgeStampStyleVars = AUTO_API<BadgeStampStyleVars>()
