import AUTO_API from '../../helpers/AUTO_API'
import React, { ReactNode } from 'react'
import { JSXDivProps } from '../../helpers/html.types'

export type ValueType = string | number

interface TabItemConfig<T = ValueType> {
  label?: ReactNode
  value?: T
  disabled?: boolean
  icon?: ReactNode | (() => ReactNode)
}

export interface TabsProps<T = ValueType> extends Omit<JSXDivProps, 'defaultValue' | 'onChange'> {
  display?: 'flex' | 'scroll'
  ellipsis?: boolean
  defaultValue?: T
  value?: T
  onChange?: (value: T) => void
  data?: TabItemConfig<T>[]
  options?: TabItemConfig<T>[]
  ref?: React.Ref<any>
}

export default AUTO_API<TabsProps>()

export interface TabsStyleVars {
  /**
   * @description 组件的 className 前缀
   * @default 'exd-tabs'
   */
  '@tabs-prefix'?: string
  /**
   * @description Tabs 高度
   * @default 50px
   */
  '@tabs-height'?: string
  /**
   * @description Tabs 背景颜色
   * @default #fff
   */
  '@tabs-background'?: string
  /**
   * @description Tabs 边框宽度
   * @default 1px
   */
  '@tabs-border-width'?: string
  /**
   * @description Tabs 边框颜色
   * @default #efeff4
   */
  '@tabs-border-color'?: string
  /**
   * @description Tabs 指示器宽度
   * @default 24px
   */
  '@tabs-indicator-width'?: string
  /**
   * @description Tabs 指示器高度
   * @default 4px
   */
  '@tabs-indicator-height'?: string
  /**
   * @description Tabs 指示器颜色
   * @default color-primary
   */
  '@tabs-indicator-color'?: string
  /**
   * @description Tabs 指示器圆角
   * @default 4px
   */
  '@tabs-indicator-border-radius'?: string
  /**
   * @description Tabs 指示器过渡动画时长
   * @default 0.3s
   */
  '@tabs-indicator-transition-duration'?: string
  /**
   * @description Tabs 指示器偏移量
   * @default 2px
   */
  '@tabs-indicator-offset'?: string
  /**
   * @description Tabs 滚动模式底部内边距
   * @default 20px
   */
  '@tabs-scroll-padding-bottom'?: string
}

export const DOC_TabsStyleVars = AUTO_API<TabsStyleVars>()
