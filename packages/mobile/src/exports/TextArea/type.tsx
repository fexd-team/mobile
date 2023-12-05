import AUTO_API from '../../helpers/AUTO_API'
import { JSXTextAreaElement, JSXInputProps } from '../../helpers/html.types'
import { TextFieldProps } from '../useTextFieldProps'

export interface TextAreaProps extends Omit<JSXTextAreaElement, keyof JSXInputProps> {}
export interface TextAreaProps extends TextFieldProps<any> {
  ref?: TextFieldProps['ref']
  height?: number | 'auto'
}

export default AUTO_API<TextAreaProps>()
