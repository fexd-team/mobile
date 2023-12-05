import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { JSXDivProps, JSXLabelProps } from '../../helpers/html.types'

export interface UnstyledLabelPureProps {
  ref?: React.Ref<any>
  label?: React.ReactNode
  placeholder?: React.ReactNode
  autoHeight?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  helper?: React.ReactNode
  active?: boolean
  type?: 'warn' | 'error' | 'info' | 'success'
  disabled?: boolean
  children?: React.ReactNode
  className?: string
  style?: JSXDivProps['style']
  keepHelperPlaceholder?: boolean
  onClick?: (e?: any) => any
  wrapperProps?: JSXDivProps
  labelProps?: JSXDivProps | ((config: { prefixWidth: number }) => JSXDivProps)
  barProps?: JSXLabelProps
  contentProps?: JSXDivProps
  placeholderProps?: JSXDivProps
  prefixProps?: JSXDivProps
  suffixProps?: JSXDivProps
  helperProps?: JSXDivProps
}

export interface UnstyledLabelProps
  extends Omit<JSXDivProps, 'placeholder' | 'disabled' | 'prefix' | 'ref' | 'onClick'> {}
export interface UnstyledLabelProps extends UnstyledLabelPureProps {}

export default AUTO_API<UnstyledLabelProps>()
