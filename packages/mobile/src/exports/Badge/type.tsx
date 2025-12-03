import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { JSXDivProps } from '../../helpers/html.types'

export const BadgeStatus = ['primary', 'success', 'warning', 'danger']
export interface BadgeProps extends Omit<JSXDivProps, 'content'> {
  className?: string
  content?: React.ReactNode
  visible?: boolean
  dot?: boolean
  showZero?: boolean
  color?: string
  bgColor?: string
  offset?: [number | string, number | string]
  overflowCount?: number | string
  // children?: React.ReactNode
  style?: React.CSSProperties & Partial<Record<string, string>>
  type?: 'primary' | 'success' | 'warning' | 'danger'
}

export type BadgeRef = any

export default AUTO_API<BadgeProps>()

export interface BadgeStyleVars {
  /**
   * @description 组件的 className 前缀
   * @default 'exd-badge'
   */
  '@badge-prefix'?: string
  /**
   * @description Badge 文字颜色
   * @default #fff
   */
  '@badge-color'?: string
  /**
   * @description Badge 背景颜色
   * @default #ff411c
   */
  '@badge-background'?: string
  /**
   * @description Badge 最小宽度
   * @default 16px
   */
  '@badge-min-width'?: string
  /**
   * @description Badge 水平内边距
   * @default 4px
   */
  '@badge-padding-x'?: string
  /**
   * @description Badge 字体大小
   * @default 9px
   */
  '@badge-font-size'?: string
  /**
   * @description Badge 圆点模式尺寸
   * @default 10px
   */
  '@badge-dot-size'?: string
}

export const DOC_BadgeStyleVars = AUTO_API<BadgeStyleVars>()
