import React, { ReactNode } from 'react'

type JSXLIElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>, 'content'>

export interface StepItemProps extends Omit<JSXLIElement, 'title' | 'children'> {
  step?: number
  title?: ReactNode | (() => ReactNode)
  children?: ReactNode | (() => ReactNode)
  type?: 'default' | 'process' | 'completed' | 'error'
  icon?: ReactNode | (() => ReactNode)
  ref?: React.Ref<any>
}
