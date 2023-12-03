import React from 'react'

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
