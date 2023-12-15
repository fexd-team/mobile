import AUTO_API from '../../helpers/AUTO_API'
import { JSXDivProps } from '../../helpers/html.types'
import { FC } from '../createFC/type'
import Item from './Item'

export interface PureTabBarProps {
  /** TabBar 子项集合 */
  children?: React.ReactNode
}
export interface TabBarProps extends JSXDivProps {}
export interface TabBarProps extends PureTabBarProps {}
export type TabBarRef = any
export interface TabBarType extends FC<TabBarProps> {
  Item: typeof Item
}

export default AUTO_API<PureTabBarProps>()
