import React, { ReactNode } from 'react'

type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

interface StepItemConfig {
  title?: ReactNode | (() => ReactNode)
  description?: ReactNode | (() => ReactNode)
  icon?: ReactNode | (() => ReactNode)
  error?: boolean
}

export interface StepsProps extends Omit<JSXDivElement, 'children'> {
  value?: number
  data?: StepItemConfig[]
  type?: 'flex'
  checked?: boolean
  children?: ReactNode | (() => ReactNode)
  ref?: React.Ref<any>
}
