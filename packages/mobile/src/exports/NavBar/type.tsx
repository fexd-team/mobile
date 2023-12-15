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
  /** 内容类名 */
  contentClassName?: string
  /** ref */
  ref?: React.Ref<HTMLDivElement>
}
export interface NavBarProps extends Omit<JSXDivProps, 'ref' | 'children'>, PureNavBarProps {}

export default AUTO_API<PureNavBarProps>()
