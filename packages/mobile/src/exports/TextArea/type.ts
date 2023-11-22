import { TextFieldProps } from '../useTextFieldProps'

export interface TextAreaProps extends TextFieldProps<any> {
  height?: number | 'auto'
}
