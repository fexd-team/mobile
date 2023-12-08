import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'

import { BasicInputProps, PureBasicInputProps } from '../BasicInput/type'
import { UnstyledIOLabelProps } from '../UnstyledIOLabel/type'

export type UnstyledIOInputRef = any

export interface PureUnstyledIOInputProps extends Omit<PureBasicInputProps, 'prefix' | 'onClick'> {}
export interface PureUnstyledIOInputProps
  extends Omit<UnstyledIOLabelProps, 'type' | 'placeholder' | 'value' | 'onChange' | 'defaultValue' | 'ref'> {
  classNamePrefix?: string
  scrollIntoView?: boolean
  multipleLines?: boolean
  clearable?: boolean
  clearIcon?: any
  label?: React.ReactNode
  labelType?: UnstyledIOLabelProps['type']
  ref?: React.Ref<UnstyledIOInputRef>
  theme?: UnstyledIOLabelProps['theme']
  inputProps?: BasicInputProps
}
export interface UnstyledIOInputProps extends PureUnstyledIOInputProps {}
export interface UnstyledIOInputProps extends Omit<BasicInputProps, 'prefix' | 'onClick'> {}

export default AUTO_API<UnstyledIOInputProps>()
