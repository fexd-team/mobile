import React from 'react'
import { IOProps } from '../useIOControl/type'
import { HTMLJSXProps } from '../../helpers/html.types'

export interface TextFieldProps<T> extends Omit<HTMLJSXProps<T>, keyof IOProps> {
  ref?: React.Ref<T>
}
export interface TextFieldProps<T> extends IOProps<string> {
  filter?: (value: string) => string
  filterTrigger?: 'onChange' | 'onBlur'
  format?: (value: string) => string
}
