import AUTO_API from '../../helpers/AUTO_API'
import { FC } from '../createFC/type'

export interface InputProps {}
export type InputRef = any
export interface InputType extends FC<InputProps> {}

export default AUTO_API<InputProps>()
