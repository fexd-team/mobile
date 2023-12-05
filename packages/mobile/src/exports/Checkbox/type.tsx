import AUTO_API from '../../helpers/AUTO_API'
import React, { ReactNode } from 'react'
// import {} from '../useIOControl'
import { JSXLabelProps } from '../../helpers/html.types'

export type CheckboxValue = string | number | boolean

export interface CheckboxProps extends Omit<JSXLabelProps, 'value' | 'defaultValue' | 'onChange'> {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  block?: boolean
  value?: CheckboxValue
  name?: string
  children?: ReactNode
  ref?: React.Ref<any>
}

export default AUTO_API<CheckboxProps>()
