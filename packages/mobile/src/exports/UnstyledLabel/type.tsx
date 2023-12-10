import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { JSXDivProps, JSXLabelProps } from '../../helpers/html.types'

export interface UnstyledLabelPureProps {
  ref?: React.Ref<any>
  /** 展示名称 */
  label?: React.ReactNode
  /** 占位提示 */
  placeholder?: React.ReactNode
  /**
   * @description 是否根据内容自动撑开高度
   * @default true
   */
  autoHeight?: boolean
  /** 前缀提示 */
  prefix?: React.ReactNode
  /** 后缀提示 */
  suffix?: React.ReactNode
  /** 辅助文案 */
  helper?: React.ReactNode
  /** 是否激活状态 */
  active?: boolean
  /** 当前控件的提示状态 */
  type?: 'warn' | 'error' | 'info' | 'success'
  /** 是否禁用 */
  disabled?: boolean
  /** 控件内容 */
  children?: React.ReactNode
  className?: string
  style?: JSXDivProps['style']
  /**
   * @description 是否需要保留辅助文案的占位高度
   * @default false
   */
  keepHelperPlaceholder?: boolean
  /** 点击事件 */
  onClick?: (e?: any) => any
  /**
   * @description 是否需要使用 <label> 标签来包裹
   * @default false
   */
  useLabelWrapper?: boolean
  /** 容器元素的属性 */
  wrapperProps?: JSXDivProps
  /** label 容器元素的属性 */
  labelProps?: JSXDivProps | ((config: { prefixWidth: number }) => JSXDivProps)
  /** bar 容器元素的属性 */
  barProps?: JSXLabelProps | JSXDivProps
  /** content 容器元素的属性 */
  contentProps?: JSXDivProps
  /** placeholder 容器元素的属性 */
  placeholderProps?: JSXDivProps
  /** prefix 容器元素的属性 */
  prefixProps?: JSXDivProps
  /** suffix 容器元素的属性 */
  suffixProps?: JSXDivProps
  /** helper 容器元素的属性 */
  helperProps?: JSXDivProps
}

export interface UnstyledLabelProps
  extends Omit<JSXDivProps, 'placeholder' | 'disabled' | 'prefix' | 'ref' | 'onClick'> {}
export interface UnstyledLabelProps extends UnstyledLabelPureProps {}

export default AUTO_API<UnstyledLabelProps>()
