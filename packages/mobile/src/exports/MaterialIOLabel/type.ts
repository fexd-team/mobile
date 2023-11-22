import { MaterialLabelProps } from '../MaterialLabel/type'

export type MaterialIOLabelRef = any

export interface MaterialIOLabelProps extends MaterialLabelProps {}

export interface MaterialIOLabelProps {
  // placeholder?: string
  error?: string
  disabled?: boolean
  focused?: boolean
  hideErrorWhenFocusing?: boolean
  ref?: React.Ref<MaterialIOLabelRef>
  helperPrefix?: React.ReactNode | ((hasError: boolean) => React.ReactNode)
}
