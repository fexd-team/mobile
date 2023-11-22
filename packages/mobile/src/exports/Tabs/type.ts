import React, { ReactNode } from 'react'

type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

export type ValueType = string | number

interface TabItemConfig<T = ValueType> {
  label?: ReactNode
  value?: T
  disabled?: boolean
  icon?: ReactNode | (() => ReactNode)
}

export interface TabsProps<T = ValueType> extends Omit<JSXDivElement, 'defaultValue' | 'onChange'> {
  display?: 'flex' | 'scroll'
  ellipsis?: boolean
  defaultValue?: T
  value?: T
  onChange?: (value: T) => void
  data?: TabItemConfig<T>[]
  ref?: React.Ref<any>
}
