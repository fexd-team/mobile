import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'

import { HTMLJSXProps } from '../../helpers/html.types'

export type SwitchRef = HTMLLabelElement

export interface SwitchProps extends Omit<HTMLJSXProps<HTMLLabelElement>, 'defaultValue' | 'onChange'> {
  checked?: boolean
  children?: React.ReactNode
  ref?: React.Ref<SwitchRef>
  onChange?: (checked: boolean) => void
}

export default AUTO_API<SwitchProps>()

export interface SwitchStyleVars {
  /**
   * @description 组件的 className 前缀
   * @default 'exd-switch'
   */
  '@switch-prefix'?: string
  /**
   * @description 尺寸缩放比例
   * @default 1.3
   */
  '@switch-size-scale'?: number
  /**
   * @description 开关宽度基础值
   * @default 37px
   */
  '@switch-width'?: string
  /**
   * @description 开关高度基础值
   * @default 22px
   */
  '@switch-height'?: string
  /**
   * @description 开关边框圆角
   * @default 31px
   */
  '@switch-border-radius'?: string
  /**
   * @description 未选中状态背景色
   * @default #d8d8d8
   */
  '@switch-background-color'?: string
  /**
   * @description 选中状态背景色
   * @default @color-primary
   */
  '@switch-active-color'?: string
  /**
   * @description 滑块尺寸
   * @default 20px
   */
  '@switch-thumb-size'?: string
  /**
   * @description 滑块背景色
   * @default #fff
   */
  '@switch-thumb-color'?: string
  /**
   * @description 滑块边距
   * @default 1px
   */
  '@switch-thumb-offset'?: string
  /**
   * @description 滑块移动距离
   * @default 15px
   */
  '@switch-thumb-translate'?: string
  /**
   * @description 过渡动画时长
   * @default 0.3s
   */
  '@switch-transition-duration'?: string
}

export const DOC_SwitchStyleVars = AUTO_API<SwitchStyleVars>()
