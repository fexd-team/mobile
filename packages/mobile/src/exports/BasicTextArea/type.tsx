import AUTO_API from '../../helpers/AUTO_API'
import { JSXTextAreaProps, JSXInputProps } from '../../helpers/html.types'
import { PureTextFieldProps, TextFieldProps } from '../useTextFieldProps/type'

export interface PureBasicTextAreaProps extends PureTextFieldProps<any> {
  ref?: TextFieldProps['ref']
  /** 是否自动高度 */
  height?: number | 'auto'
}

export interface BasicTextAreaProps extends PureBasicTextAreaProps {}
export interface BasicTextAreaProps extends Omit<JSXTextAreaProps, keyof JSXInputProps | 'height'> {}
export interface BasicTextAreaProps extends Omit<TextFieldProps<any>, 'height'> {}

export default AUTO_API<PureBasicTextAreaProps>()
