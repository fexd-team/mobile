import React from 'react'
import AUTO_API from '../../../helpers/AUTO_API'
import { ValueType } from '../type'
import { JSXDivProps } from '../../../helpers/html.types'

export interface TabItemProps<T = ValueType> extends Omit<JSXDivProps, 'onClick'> {
  display?: 'scroll' | 'flex'
  value?: T
  disabled?: boolean
  tabIndex?: number
  isActive?: boolean
  onClick?: (value: T, index: number) => void
  onOffsetChange?: (offsetLeft: number, offsetWidth: number) => void
  ellipsis?: boolean
}

export interface TabItemStyleVars {
  /**
   * 选项文字颜色
   * @default #333
   */
  '@tabs-item-color'?: string
  /**
   * 选项字体大小
   * @default 14px
   */
  '@tabs-item-font-size'?: string
  /**
   * 选项行高
   * @default 1.3
   */
  '@tabs-item-line-height'?: string | number
  /**
   * 选中态文字颜色
   * @default @color-primary
   */
  '@tabs-item-active-color'?: string
  /**
   * flex 模式选项水平内边距
   * @default 4px
   */
  '@tabs-item-flex-padding-x'?: string
  /**
   * scroll 模式选项水平内边距
   * @default 20px
   */
  '@tabs-item-scroll-padding-x'?: string
  /**
   * scroll 模式首尾选项外边距
   * @default 4px
   */
  '@tabs-item-scroll-margin-x'?: string
}

export const DOC_TabItemStyleVars: TabItemStyleVars = {}

export default AUTO_API<TabItemProps>()
