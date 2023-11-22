import React from 'react'

import { IOProps } from '../useIOControl/type'

type JSXElement<T> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T>
export interface TextFieldProps<T> extends Omit<JSXElement<T>, keyof IOProps> {
  ref?: React.Ref<T>
}
export interface TextFieldProps<T> extends IOProps<string> {
  filter?: (value: string) => string
  filterTrigger?: 'onChange' | 'onBlur'
  format?: (value: string) => string
}
