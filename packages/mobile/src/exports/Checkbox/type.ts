import React, { ReactNode } from 'react'
import {} from '../useIOControl'

type JSXElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLLabelElement>, HTMLLabelElement>, 'content'>
export type Value = string | number | boolean

export interface CheckboxProps extends Omit<JSXElement, 'value' | 'defaultValue' | 'onChange'> {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  block?: boolean
  value?: Value
  name?: string
  children?: ReactNode
  ref?: React.Ref<any>
}
