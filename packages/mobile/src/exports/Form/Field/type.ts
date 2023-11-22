import { Rule, Value, Error, Values, Errors } from '../../../helpers/formini'

export type Relative<T = any> = T
export type ComputeRelative<T = any> = (values: Values, errors: Errors) => Relative<T>

export interface FieldController {
  value: Value
  setValue: (value: Value) => void
  error: Error
  validate: () => void
  relative: Relative
}

export interface FormFieldProps {
  name?: string
  defaultValue?: any
  rules?: Rule[]
  relative?: ComputeRelative
  children?: (fieldController: FieldController) => JSX.Element
  validateOnChange?: boolean
}
export type FormFieldRef = any
