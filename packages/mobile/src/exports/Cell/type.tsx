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
