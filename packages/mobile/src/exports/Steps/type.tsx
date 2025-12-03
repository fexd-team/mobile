import AUTO_API from '../../helpers/AUTO_API'
import React, { ReactNode } from 'react'
import { JSXDivProps } from '../../helpers/html.types'

interface StepItemConfig {
  title?: ReactNode | (() => ReactNode)
  description?: ReactNode | (() => ReactNode)
  icon?: ReactNode | (() => ReactNode)
  error?: boolean
}

export interface StepsProps extends Omit<JSXDivProps, 'children'> {
  value?: number
  data?: StepItemConfig[]
  type?: 'flex'
  checked?: boolean
  children?: ReactNode | (() => ReactNode)
  ref?: React.Ref<any>
}

export default AUTO_API<StepsProps>()

export interface StepsStyleVars {
  /**
   * @description 组件的 className 前缀
   * @default 'exd-steps'
   */
  '@steps-prefix'?: string
  /**
   * @description Steps 背景颜色
   * @default #fff
   */
  '@steps-background'?: string
  /**
   * @description Steps flex 模式最大宽度
   * @default 96px
   */
  '@steps-flex-max-width'?: string
}

export const DOC_StepsStyleVars = AUTO_API<StepsStyleVars>()
