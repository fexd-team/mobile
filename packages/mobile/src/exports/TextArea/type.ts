import { JSXTextAreaElement, JSXInputElement } from '../../helpers/html.types'
import { TextFieldProps } from '../useTextFieldProps'

export interface TextAreaProps extends Omit<JSXTextAreaElement, keyof JSXInputElement> {}
export interface TextAreaProps extends TextFieldProps<any> {
  ref?: TextFieldProps['ref']
  height?: number | 'auto'
}
