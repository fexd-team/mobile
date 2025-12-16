import React, { ReactNode } from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { TransitionSpeed } from '../createTransition/type'
import { JSXDivProps } from '../../helpers/html.types'

export type ProgressBarRef = HTMLDivElement
export interface ProgressBarProps extends JSXDivProps {
  value?: number
  speed?: TransitionSpeed | number
  children?: ReactNode
  ref?: React.Ref<ProgressBarRef>
}

export default AUTO_API<ProgressBarProps>()

/**
 * ProgressBar 样式变量
 */
export interface ProgressBarStyleVars {
  /**
   * @description 组件样式前缀
   * @default 'exd-progress-bar'
   */
  '@progress-bar-prefix'?: string
  /**
   * @description 进度条高度
   * @default 4px
   */
  '@progress-bar-height'?: string
  /**
   * @description 轨道背景色
   * @default #e1e1e1
   */
  '@progress-bar-background'?: string
  /**
   * @description 圆角
   * @default 4px
   */
  '@progress-bar-border-radius'?: string
  /**
   * @description 进度条颜色
   * @default @color-primary
   */
  '@progress-bar-active-color'?: string
  /**
   * @description 全局尺寸缩放比例
   * @default 1
   */
  '@size-scale'?: string | number
}

export const DOC_ProgressBarStyleVars = AUTO_API<ProgressBarStyleVars>()
