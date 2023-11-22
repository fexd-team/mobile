import { BasicInputProps } from '../BasicInput'
import { MaterialIOLabelProps } from '../MaterialIOLabel/type'

export type MaterialInputRef = any

export interface MaterialInputProps extends Omit<BasicInputProps, 'prefix'> {}
export interface MaterialInputProps extends Omit<MaterialIOLabelProps, 'onClick' | 'type' | 'placeholder'> {}
export interface MaterialInputProps {
  scrollIntoView?: boolean
  multipleLines?: boolean
  clearable?: boolean
  clearIcon?: any
  label?: string
  labelType?: MaterialIOLabelProps['type']
  ref?: MaterialInputRef
}
