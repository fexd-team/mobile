import { FormRule, FormValue, FormError, FormValues, FormErrors } from '../../createForm'

export type Relative<T = any> = T
export type ComputeRelative<T = any> = (values: FormValues, errors: FormErrors) => Relative<T>

export interface FieldController {
  value: FormValue
  setValue: (value: FormValue) => void
  error: FormError
  validate: () => void
  relative: Relative
}

export interface FormFieldProps {
  name?: string
  defaultValue?: any
  rules?: FormRule[]
  relative?: ComputeRelative
  children?: (fieldController: FieldController) => JSX.Element
  validateOnChange?: boolean
}
export type FormFieldRef = any
