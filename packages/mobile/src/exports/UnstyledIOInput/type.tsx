import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'

import { BasicInputProps } from '../BasicInput/type'
import { UnstyledIOLabelProps } from '../UnstyledIOLabel/type'

export type UnstyledIOInputRef = any

export interface UnstyledIOInputProps
  extends Omit<UnstyledIOLabelProps, 'type' | 'placeholder' | 'value' | 'onChange' | 'defaultValue'> {}
export interface UnstyledIOInputProps extends Omit<BasicInputProps, 'prefix' | 'onClick'> {}
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

export default AUTO_API<UnstyledIOInputProps>()
