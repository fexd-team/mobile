import React from 'react'

import { BasicInputProps } from '../BasicInput'
import { UnstyledIOLabelProps } from '../UnstyledIOLabel/type'

export type UnstyledIOInputRef = any

export interface UnstyledIOInputProps
  extends Omit<UnstyledIOLabelProps, 'type' | 'placeholder' | 'value' | 'onChange' | 'defaultValue'> {}
export interface UnstyledIOInputProps
  extends Pick<BasicInputProps, 'value' | 'onChange' | 'defaultValue' | 'placeholder'> {}
export interface UnstyledIOInputProps {
  classNamePrefix?: string
  scrollIntoView?: boolean
  multipleLines?: boolean
  clearable?: boolean
  clearIcon?: any
  label?: React.ReactNode
  labelType?: UnstyledIOLabelProps['type']
  ref?: UnstyledIOInputRef
  theme?: UnstyledIOLabelProps['theme']
  inputProps?: BasicInputProps
}
