import React from 'react'

import createFC from '../../helpers/createFC'
import useTextFieldProps, { TextFieldProps, defaultProps } from '../useTextFieldProps'

export interface BasicInputProps extends TextFieldProps<any> {}

const BasicInput = createFC<BasicInputProps, HTMLInputElement>(function BasicInput(props, ref) {
  const { focused, onChange, ...inputProps } = useTextFieldProps({ ref, ...props })
  return <input {...inputProps} onChange={(e) => onChange(e.target.value as string)} />
})

BasicInput.defaultProps = defaultProps as BasicInputProps

export default BasicInput
