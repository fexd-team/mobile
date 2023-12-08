import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { FC } from '../createFC/type'
import { BasicInputProps, PureBasicInputProps } from '../BasicInput/type'

export type InputRef = any
export interface PureInputProps extends PureBasicInputProps {
  ref?: React.Ref<InputRef>
}
export interface InputProps extends PureInputProps {}
export interface InputProps extends BasicInputProps {}
export interface InputType extends FC<InputProps> {}

export default AUTO_API<PureInputProps>()
