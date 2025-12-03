import AUTO_API from '../../helpers/AUTO_API'
import React from 'react'
import { JSXDivProps } from '../../helpers/html.types'

export interface PureNavBarProps {
  /**
   * @description 标题内容是否居中
   * @default true
   */
  alignCenter?: boolean
  /** 标题内容 */
  children?: React.ReactNode
  /** 左侧内容 */
  left?: React.ReactNode | (() => React.ReactNode)
  /** 右侧内容 */
  right?: React.ReactNode | (() => React.ReactNode)
  /** 左侧点击事件 */
  onLeftClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  /** 右侧点击事件 */
  onRightClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  /** 内容类名 */
  contentClassName?: string
  /** ref */
  ref?: React.Ref<HTMLDivElement>
}
export interface NavBarProps extends Omit<JSXDivProps, 'ref' | 'children'>, PureNavBarProps {}

/**
 * NavBar 样式变量
 */
export interface NavBarStyleVars {
  /**
   * @description 组件样式前缀
   * @default ~'exd-nav-bar'
   */
  '@nav-bar-prefix'?: string
  /**
   * @description 导航栏高度
   * @default 48px
   */
  '@nav-bar-height'?: string
  /**
   * @description 水平内边距
   * @default 16px
   */
  '@nav-bar-padding-x'?: string
  /**
   * @description 背景色
   * @default #fff
   */
  '@nav-bar-background'?: string
  /**
   * @description 字体大小
   * @default 14px
   */
  '@nav-bar-font-size'?: string
  /**
   * @description 图标大小
   * @default 18px
   */
  '@nav-bar-icon-size'?: string
  /**
   * @description 左右区域文字颜色
   * @default @color-primary
   */
  '@nav-bar-side-color'?: string
  /**
   * @description 图标颜色
   * @default @nav-bar-side-color
   */
  '@nav-bar-icon-color'?: string
  /**
   * @description 左右区域与中间的间距
   * @default 12px
   */
  '@nav-bar-side-gap'?: string
  /**
   * @description 底部边框宽度
   * @default 0
   */
  '@nav-bar-border-width'?: string
  /**
   * @description 底部边框颜色
   * @default @color-gray-divider
   */
  '@nav-bar-border-color'?: string
}

export const DOC_NavBarStyleVars = AUTO_API<NavBarStyleVars>()

export default AUTO_API<PureNavBarProps>()
