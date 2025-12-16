import AUTO_API from '../../../helpers/AUTO_API'
import { Context } from 'react'
import { FC } from '../../createFC/type'
import { JSXDivProps } from '../../../helpers/html.types'
import { CellProps, PureCellProps } from '../type'

export interface PureCellGroupProps extends Pick<PureCellProps, 'size'> {
  /** 标题 */
  title?: string
  /** 是否卡片格式 */
  inset?: boolean
  /** 是否显示边框 */
  border?: boolean
}
export interface CellGroupProps extends JSXDivProps {}
export interface CellGroupProps extends Pick<CellProps, 'size'> {}
export interface CellGroupProps extends PureCellGroupProps {}
export type CellGroupRef = HTMLDivElement

export interface CellGroupType extends FC<CellGroupProps> {}
export type CellGroupContext = Context<CellGroupProps>

export default AUTO_API<PureCellGroupProps>()

export interface CellGroupStyleVars {
  /**
   * @description 组件的 className 前缀
   * @default 'exd-cell-group'
   */
  '@cell-group-prefix'?: string
  /**
   * @description 标题垂直内边距
   * @default 12px
   */
  '@cell-group-title-padding-y'?: string
  /**
   * @description 标题水平内边距
   * @default 16px
   */
  '@cell-group-title-padding-x'?: string
  /**
   * @description 标题颜色
   * @default #999
   */
  '@cell-group-title-color'?: string
  /**
   * @description 标题字体大小
   * @default 12px
   */
  '@cell-group-title-font-size'?: string
  /**
   * @description Inset 模式的水平外边距
   * @default 16px
   */
  '@cell-group-inset-margin-x'?: string
  /**
   * @description Inset 模式的圆角大小
   * @default 8px
   */
  '@cell-group-inset-border-radius'?: string
}

export const DOC_CellGroupStyleVars = AUTO_API<CellGroupStyleVars>()
