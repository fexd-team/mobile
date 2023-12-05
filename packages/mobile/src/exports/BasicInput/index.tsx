import React from 'react'

import createFC from '../createFC'
import useTextFieldProps, { defaultProps } from '../useTextFieldProps'
import { BasicInputProps } from './type'

const BasicInput = createFC<BasicInputProps, HTMLInputElement>(function BasicInput(props, ref) {
  const { focused, onChange, ...inputProps } = useTextFieldProps({ ref, ...props })
  return <input {...inputProps} onChange={(e) => onChange(e.target.value as string)} />
})

BasicInput.defaultProps = defaultProps as BasicInputProps

export default BasicInput
