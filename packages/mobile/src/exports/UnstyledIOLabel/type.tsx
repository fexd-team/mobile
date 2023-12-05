import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'

import { UnstyledLabelPureProps } from '../UnstyledLabel/type'

export type UnstyledIOLabelRef = any

export interface UnstyledIOLabelProps extends Omit<UnstyledLabelPureProps, 'ref'> {
  // placeholder?: string
  error?: React.ReactNode
  disabled?: boolean
  focused?: boolean
  hideErrorWhenFocusing?: boolean
  ref?: React.Ref<UnstyledIOLabelRef>
  helperPrefix?: React.ReactNode | ((hasError: boolean) => React.ReactNode)
  theme?: any
}

export default AUTO_API<UnstyledIOLabelProps>()
