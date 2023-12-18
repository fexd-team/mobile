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
