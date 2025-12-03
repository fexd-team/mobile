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

/**
 * TabBar 样式变量
 */
export interface TabBarStyleVars {
  /**
   * @description 组件样式前缀
   * @default ~'exd-tab-bar'
   */
  '@tab-bar-prefix'?: string
  /**
   * @description 标签栏高度
   * @default 56px
   */
  '@tab-bar-height'?: string
  /**
   * @description 顶部边框颜色
   * @default #e6e6e6
   */
  '@tab-bar-border-color'?: string
  /**
   * @description 背景色
   * @default #fff
   */
  '@tab-bar-background'?: string
  /**
   * @description Item 组件样式前缀
   * @default ~'exd-tab-bar-item'
   */
  '@tab-bar-item-prefix'?: string
  /**
   * @description 选中态颜色
   * @default @color-primary
   */
  '@tab-bar-item-active-color'?: string
  /**
   * @description 图标大小
   * @default 22px
   */
  '@tab-bar-item-icon-size'?: string
  /**
   * @description 名称字号
   * @default 12px
   */
  '@tab-bar-item-name-font-size'?: string
  /**
   * @description 名称上外边距
   * @default 3px
   */
  '@tab-bar-item-name-margin-top'?: string
}

export const DOC_TabBarStyleVars = AUTO_API<TabBarStyleVars>()

export default AUTO_API<PureTabBarProps>()
