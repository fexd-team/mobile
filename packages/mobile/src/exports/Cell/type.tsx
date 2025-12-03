import AUTO_API from '../../helpers/AUTO_API'
import React, { ReactNode } from 'react'

import { FC } from '../createFC/type'
import { JSXDivProps } from '../../helpers/html.types'
import { CellGroupType } from './Group/type'

export interface PureCellProps {
  /** 标题 */
  title?: ReactNode
  /** 内容 */
  value?: ReactNode
  /** 内容 */
  children?: ReactNode
  /** 描述 */
  description?: ReactNode
  /** size */
  size?: 'normal' | 'small' | 'large'
  /**
   * @description 是否显示加载中
   * @default 'auto'
   */
  loading?: boolean | 'auto'
  /** 是否显示边框 */
  border?: boolean | 'always'
  /** 前缀 */
  prefix?: ReactNode
  /** 后缀 */
  suffix?: ReactNode

  ref?: React.Ref<CellRef>
}

export interface CellProps extends Omit<JSXDivProps, 'prefix' | 'title' | 'ref'> {}
export interface CellProps extends PureCellProps {}

export type CellRef = HTMLDivElement

export interface CellType extends FC<CellProps> {
  Group: CellGroupType
}

export default AUTO_API<PureCellProps>()

export interface CellStyleVars {
  /**
   * @description 组件的 className 前缀
   * @default 'exd-cell'
   */
  '@cell-prefix'?: string
  /**
   * @description Cell 背景颜色
   * @default #fff
   */
  '@cell-background'?: string
  /**
   * @description Cell 边框颜色
   * @default #f2f2f2
   */
  '@cell-border-color'?: string
  /**
   * @description Cell 标题颜色
   * @default #333
   */
  '@cell-label-color'?: string
  /**
   * @description Cell 描述颜色
   * @default #969799
   */
  '@cell-description-color'?: string
  /**
   * @description Cell 点击激活背景色
   * @default #f8f8f8
   */
  '@cell-active-background'?: string
  /**
   * @description Cell 水平内边距
   * @default 16px
   */
  '@cell-padding-x'?: string
  /**
   * @description Cell 边框左侧偏移
   * @default 16px
   */
  '@cell-border-left'?: string
  /**
   * @description Cell 标题右边距
   * @default 8px
   */
  '@cell-label-margin-right'?: string
  /**
   * @description Cell 前缀右边距
   * @default 16px
   */
  '@cell-prefix-margin-right'?: string
  /**
   * @description Cell 后缀左边距
   * @default 10px
   */
  '@cell-suffix-margin-left'?: string
  /**
   * @description Cell 加载图标尺寸
   * @default 20px
   */
  '@cell-loading-size'?: string
  /**
   * @description Cell 标准尺寸垂直内边距
   * @default 10px
   */
  '@cell-padding-y-normal'?: string
  /**
   * @description Cell 小尺寸垂直内边距
   * @default 8px
   */
  '@cell-padding-y-small'?: string
  /**
   * @description Cell 大尺寸垂直内边距
   * @default 12px
   */
  '@cell-padding-y-large'?: string
  /**
   * @description Cell 标准尺寸字体大小
   * @default 14px
   */
  '@cell-font-size-normal'?: string
  /**
   * @description Cell 小尺寸字体大小
   * @default 12px
   */
  '@cell-font-size-small'?: string
  /**
   * @description Cell 大尺寸字体大小
   * @default 16px
   */
  '@cell-font-size-large'?: string
  /**
   * @description Cell 描述标准尺寸字体大小
   * @default 12px
   */
  '@cell-description-font-size-normal'?: string
  /**
   * @description Cell 描述小尺寸字体大小
   * @default 10px
   */
  '@cell-description-font-size-small'?: string
  /**
   * @description Cell 描述大尺寸字体大小
   * @default 14px
   */
  '@cell-description-font-size-large'?: string
}

export const DOC_CellStyleVars = AUTO_API<CellStyleVars>()
