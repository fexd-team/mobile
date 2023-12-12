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
