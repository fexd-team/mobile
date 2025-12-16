import AUTO_API from '../../../helpers/AUTO_API'
import React, { ReactNode } from 'react'
import { JSXDivProps } from '../../../helpers/html.types'

export interface GridItemProps extends Omit<JSXDivProps, 'children'> {
  icon?: ReactNode | (() => ReactNode)
  text?: string
  children?: ReactNode | (() => ReactNode)
  extra?: ReactNode | (() => ReactNode)
  // ref?: React.Ref<any>
}

export default AUTO_API<GridItemProps>()

export interface GridItemStyleVars {
  /**
   * @description 组件的 className 前缀
   * @default 'exd-grid-item'
   */
  '@grid-item-prefix'?: string
  /**
   * @description 图标大小
   * @default 20px
   */
  '@grid-item-icon-size'?: string
  /**
   * @description 文字字体大小
   * @default 12px
   */
  '@grid-item-text-font-size'?: string
  /**
   * @description 文字行高
   * @default 1.5
   */
  '@grid-item-text-line-height'?: string
  /**
   * @description 文字上外边距
   * @default 8px
   */
  '@grid-item-text-margin-top'?: string
  /**
   * @description 文字左外边距
   * @default 8px
   */
  '@grid-item-text-margin-left'?: string
  /**
   * @description 垂直内边距
   * @default 16px
   */
  '@grid-item-padding-y'?: string
  /**
   * @description 水平内边距
   * @default 8px
   */
  '@grid-item-padding-x'?: string
  /**
   * @description 背景颜色
   * @default #fff
   */
  '@grid-item-background'?: string
  /**
   * @description 激活态背景颜色
   * @default #f2f3f5
   */
  '@grid-item-active-background'?: string
}

export const DOC_GridItemStyleVars = AUTO_API<GridItemStyleVars>()
