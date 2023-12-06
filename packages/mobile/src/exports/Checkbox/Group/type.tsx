import AUTO_API from '../../../helpers/AUTO_API'
import React, { ReactNode } from 'react'
import { CheckboxValue } from '../../Checkbox/type'
import { JSXDivProps } from '../../../helpers/html.types'

interface Option {
  value: CheckboxValue
  label: string
  disabled?: boolean
  block?: boolean
}

export interface CheckboxGroupProps extends JSXDivProps {
  value: CheckboxValue[]
  disabled?: boolean
  name?: string
  options?: Option[]
  children?: ReactNode | ReactNode[]
  ref?: React.Ref<any>
}

export interface CheckboxContentProps {
  checkedValue?: CheckboxValue[]
  onItemChange?: (value: any, checked: boolean) => void
}

export default AUTO_API<CheckboxGroupProps>()
