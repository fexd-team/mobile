import { ReactNode } from 'react'
import AUTO_API from '../../../helpers/AUTO_API'
import { FC } from '../../createFC/type'
import { JSXDivProps } from '../../../helpers/html.types'

export interface PureTabItemProps {
  /** 子项名称 */
  name?: string
  /** 子项图标，当值为 string 时，作用于 Icon.type 相同 */
  icon?: ReactNode | string
  /**
   * @description 是否处于激活状态
   * @default false
   */
  active?: boolean
  /** 类名 */
  className?: string
  /** 点击事件 */
  onClick?: JSXDivProps['onClick']
}
export interface TabItemProps extends JSXDivProps {}
export interface TabItemProps extends PureTabItemProps {}

export type TabItemRef = any
export interface TabItemType extends FC<TabItemProps> {}

export default AUTO_API<PureTabItemProps>()
