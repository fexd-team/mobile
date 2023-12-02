import React from 'react'

import { UnstyledLabelProps } from '../UnstyledLabel/type'

export type UnstyledIOLabelRef = any

export interface UnstyledIOLabelProps extends Omit<UnstyledLabelProps, 'ref'> {}

export interface UnstyledIOLabelProps {
  // placeholder?: string
  error?: React.ReactNode
  disabled?: boolean
  focused?: boolean
  hideErrorWhenFocusing?: boolean
  ref?: React.Ref<UnstyledIOLabelRef>
  helperPrefix?: React.ReactNode | ((hasError: boolean) => React.ReactNode)
  theme?: any
}
