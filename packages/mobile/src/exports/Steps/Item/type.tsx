import AUTO_API from '../../../helpers/AUTO_API'
import React, { ReactNode } from 'react'
import { JSXLiProps } from '../../../helpers/html.types'

export interface StepItemProps extends Omit<JSXLiProps, 'title' | 'children'> {
  step?: number
  title?: ReactNode | (() => ReactNode)
  children?: ReactNode | (() => ReactNode)
  type?: 'default' | 'process' | 'completed' | 'error'
  icon?: ReactNode | (() => ReactNode)
  ref?: React.Ref<any>
}

export interface StepItemStyleVars {
  /**
   * 步骤项宽度
   * @default 84px
   */
  '@step-width'?: string
  /**
   * 图标大小
   * @default 24px
   */
  '@step-icon-size'?: string
  /**
   * 默认图标颜色
   * @default #999
   */
  '@step-icon-color'?: string
  /**
   * 步骤图标左侧偏移
   * @default 30px
   */
  '@step-icon-left'?: string
  /**
   * 连接线宽度
   * @default 28px
   */
  '@step-line-width'?: string
  /**
   * 连接线颜色
   * @default #e9e9e9
   */
  '@step-line-color'?: string
  /**
   * 连接线粗细
   * @default 2px
   */
  '@step-line-thickness'?: string
  /**
   * 圆圈内字号
   * @default 12px
   */
  '@step-circle-font-size'?: string
  /**
   * 圆圈背景色
   * @default #fff
   */
  '@step-circle-background'?: string
  /**
   * 步骤圆形图标行高
   * @default 20px
   */
  '@step-circle-line-height'?: string
  /**
   * 内容字号
   * @default 14px
   */
  '@step-content-font-size'?: string
  /**
   * 步骤内容行高
   * @default 16px
   */
  '@step-content-line-height'?: string
  /**
   * 内容上外边距
   * @default 6px
   */
  '@step-content-margin-top'?: string
  /**
   * 标题颜色
   * @default #333
   */
  '@step-title-color'?: string
  /**
   * 描述颜色
   * @default #999
   */
  '@step-description-color'?: string
  /**
   * 首尾步骤宽度
   * @default 54px
   */
  '@step-first-last-width'?: string
  /**
   * 首尾步骤偏移量
   * @default 28px
   */
  '@step-first-last-offset'?: string
  /**
   * 完成状态边框宽度
   * @default 2px
   */
  '@step-completed-border-width'?: string
  /**
   * 完成状态勾选图标左侧偏移
   * @default 5px
   */
  '@step-completed-check-left'?: string
  /**
   * 完成状态勾选图标顶部偏移
   * @default 6px
   */
  '@step-completed-check-top'?: string
  /**
   * 完成状态勾选图标宽度
   * @default 10px
   */
  '@step-completed-check-width'?: string
  /**
   * 完成状态勾选图标高度
   * @default 5px
   */
  '@step-completed-check-height'?: string
  /**
   * 完成状态勾选图标边框宽度
   * @default 2px
   */
  '@step-completed-check-border-width'?: string
  /**
   * 完成状态勾选图标颜色
   * @default #fff
   */
  '@step-completed-check-color'?: string
  /**
   * 完成状态勾选图标旋转角度
   * @default -45deg
   */
  '@step-completed-check-rotate'?: string
}

export const DOC_StepItemStyleVars: StepItemStyleVars = {}

export default AUTO_API<StepItemProps>()
