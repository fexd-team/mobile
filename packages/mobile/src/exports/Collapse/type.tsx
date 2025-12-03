import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { JSXDivProps } from '../../helpers/html.types'

export type ActiveKeyType = React.Key

export type CollapseRef = HTMLDivElement

export interface CollapseProps extends Omit<JSXDivProps, 'onChange'> {
  defaultActiveKey?: ActiveKeyType | ActiveKeyType[]
  activeKey?: ActiveKeyType | ActiveKeyType[]
  accordion?: boolean
  onChange?: (activeKey: ActiveKeyType[]) => void
  // children?: React.ReactNode
  expandIcon?: React.ReactNode
  iconRotate?: boolean
  ref?: React.Ref<CollapseRef>
}

export interface CollapsePanelProps extends Omit<JSXDivProps, 'title'> {
  title?: React.ReactNode | string
  disabled?: boolean
  headerClass?: string
  // children?: React.ReactNode
  expandIcon?: React.ReactNode
  iconRotate?: boolean
  isActive?: boolean
  panelKey?: string | number
  onItemClick?: (panelKey: string | number) => void
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void
}

export default AUTO_API<CollapseProps>()

export interface CollapseStyleVars {
  /**
   * @description 组件的 className 前缀
   * @default 'exd-collapse'
   */
  '@collapse-prefix'?: string
  /**
   * @description 背景颜色
   * @default #fff
   */
  '@collapse-background'?: string
  /**
   * @description 字体大小
   * @default 16px
   */
  '@collapse-font-size'?: string
  /**
   * @description 左内边距
   * @default 12px
   */
  '@collapse-padding-left'?: string
  /**
   * @description 头部内边距
   * @default 12px
   */
  '@collapse-header-padding'?: string
  /**
   * @description 头部边框颜色
   * @default #f5f5f5
   */
  '@collapse-header-border-color'?: string
  /**
   * @description 图标颜色
   * @default #999
   */
  '@collapse-icon-color'?: string
  /**
   * @description 禁用状态颜色
   * @default #d6d6d6
   */
  '@collapse-disabled-color'?: string
  /**
   * @description 内容字体大小
   * @default 14px
   */
  '@collapse-content-font-size'?: string
  /**
   * @description 内容文字颜色
   * @default #999
   */
  '@collapse-content-color'?: string
  /**
   * @description 内容边框颜色
   * @default #eee
   */
  '@collapse-content-border-color'?: string
}

export const DOC_CollapseStyleVars = AUTO_API<CollapseStyleVars>()
