import React, { ReactNode } from 'react'
import { Value } from '../../Checkbox/type'
import { JSXDivProps } from '../../../helpers/html.types'

interface Option {
  value: Value
  label: string
  disabled?: boolean
  block?: boolean
}

export interface CheckboxGroupProps extends JSXDivProps {
  value: Value[]
  disabled?: boolean
  name?: string
  options?: Option[]
  children?: ReactNode | ReactNode[]
  ref?: React.Ref<any>
}

export interface CheckboxContentProps {
  checkedValue?: Value[]
  onItemChange?: (value: any, checked: boolean) => void
}
