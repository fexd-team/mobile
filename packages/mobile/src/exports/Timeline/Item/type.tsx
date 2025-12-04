import AUTO_API from '../../../helpers/AUTO_API'
import React, { ReactNode } from 'react'
import { JSXDivProps } from '../../../helpers/html.types'

export interface TimelineItemProps extends Omit<JSXDivProps, 'title' | 'children'> {
  title?: ReactNode
  time?: ReactNode
  dot?: ReactNode | (() => ReactNode)
  children?: ReactNode | (() => ReactNode)
  ref?: React.Ref<any>
}

export default AUTO_API<TimelineItemProps>()

export interface TimelineItemStyleVars {
  /**
   * @description 时间线项的 className 前缀
   * @default 'exd-timeline-item'
   */
  '@timeline-item-prefix'?: string
  /**
   * @description 时间线内容的 className 前缀
   * @default 'exd-timeline-content'
   */
  '@timeline-content-prefix'?: string
  /**
   * @description 时间线条的 className 前缀
   * @default 'exd-timeline-line'
   */
  '@timeline-line-prefix'?: string
  /**
   * @description 时间线圆点的 className 前缀
   * @default 'exd-timeline-dot'
   */
  '@timeline-dot-prefix'?: string
  /**
   * @description 时间线条的上下外边距
   * @default 2px
   */
  '@timeline-line-margin'?: string
  /**
   * @description 内容区域右侧内边距
   * @default 12px
   */
  '@timeline-content-padding-right'?: string
  /**
   * @description 内容区域底部内边距
   * @default 16px
   */
  '@timeline-content-padding-bottom'?: string
  /**
   * @description 标题行高
   * @default 16px
   */
  '@timeline-title-line-height'?: string
  /**
   * @description 标题字号
   * @default 14px
   */
  '@timeline-title-font-size'?: string
  /**
   * @description 标题颜色
   * @default #333
   */
  '@timeline-title-color'?: string
  /**
   * @description 主内容上边距
   * @default 4px
   */
  '@timeline-main-margin-top'?: string
  /**
   * @description 主内容行高
   * @default 14px
   */
  '@timeline-main-line-height'?: string
  /**
   * @description 主内容字号
   * @default 12px
   */
  '@timeline-main-font-size'?: string
  /**
   * @description 主内容颜色
   * @default #666
   */
  '@timeline-main-color'?: string
  /**
   * @description 时间字号
   * @default 12px
   */
  '@timeline-time-font-size'?: string
  /**
   * @description 时间行高
   * @default 14px
   */
  '@timeline-time-line-height'?: string
  /**
   * @description 时间颜色
   * @default #999
   */
  '@timeline-time-color'?: string
  /**
   * @description 时间线左内边距
   * @default 12px
   */
  '@timeline-line-padding-left'?: string
  /**
   * @description 时间线宽度
   * @default 26px
   */
  '@timeline-line-width'?: string
  /**
   * @description 时间线起始位置
   * @default 17px
   */
  '@timeline-line-top'?: string
  /**
   * @description 时间线边框宽度
   * @default 2px
   */
  '@timeline-line-border-width'?: string
  /**
   * @description 时间线边框颜色
   * @default color-primary
   */
  '@timeline-line-border-color'?: string
  /**
   * @description 圆点上边距
   * @default 3px
   */
  '@timeline-dot-top'?: string
  /**
   * @description 圆点尺寸
   * @default 10px
   */
  '@timeline-dot-size'?: string
  /**
   * @description 圆点颜色
   * @default color-primary
   */
  '@timeline-dot-color'?: string
  /**
   * @description 默认圆点背景色
   * @default color-primary
   */
  '@timeline-dot-default-background'?: string
}

export const DOC_TimelineItemStyleVars = AUTO_API<TimelineItemStyleVars>()
