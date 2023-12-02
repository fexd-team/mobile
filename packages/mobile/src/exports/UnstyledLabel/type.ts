import React from 'react'

type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>
type JSXLabelElement = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
  'content'
>

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
  // children?: React.ReactNode
  // className?: string
  // style?: JSXDivElement['style']
  keepHelperPlaceholder?: boolean
  // onClick?: (e?: any) => void
}

export interface UnstyledLabelProps extends Omit<JSXDivElement, 'placeholder' | 'disabled' | 'prefix' | 'ref'> {}
export interface UnstyledLabelProps extends UnstyledLabelPureProps {
  wrapperProps?: JSXDivElement
  labelProps?: JSXDivElement | ((config: { prefixWidth: number }) => JSXDivElement)
  barProps?: JSXLabelElement
  contentProps?: JSXDivElement
  placeholderProps?: JSXDivElement
  prefixProps?: JSXDivElement
  suffixProps?: JSXDivElement
  helperProps?: JSXDivElement
}
