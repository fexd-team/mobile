import AUTO_API from '../../helpers/AUTO_API'
import { FC } from '../createFC/type'
import { TextFieldProps } from '../useTextFieldProps'

export interface BasicInputProps extends TextFieldProps<any> {}
export type BasicInputRef = any
export interface BasicInputType extends FC<BasicInputProps> {}

export default AUTO_API<BasicInputProps>()
