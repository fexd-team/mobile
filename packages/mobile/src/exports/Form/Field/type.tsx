import AUTO_API from '../../../helpers/AUTO_API'
import { FormRule, FormValue, FormError, FormValues, FormErrors } from '../../createForm'

export type FormRelative<T = any> = T
export type FormComputeRelative<T = any> = (values: FormValues, errors: FormErrors) => FormRelative<T>

export interface FieldController {
  value: FormValue
  setValue: (value: FormValue) => void
  error: FormError
  validate: () => void
  relative: FormRelative
}

export interface FormFieldProps {
  /** 字段名 */
  name?: string
  /** 默认值 */
  defaultValue?: any
  /** 校验规则 */
  rules?: FormRule[]
  /** 相对值，当值变化时，会自动计算出相对值 */
  relative?: FormComputeRelative
  children?: (fieldController: FieldController) => JSX.Element
  /** 是否在值变化时自动校验 */
  validateOnChange?: boolean
}
export type FormFieldRef = any

export const DOC_FieldController = AUTO_API<FieldController>()
export const DOC_FormFieldProps = AUTO_API<FormFieldProps>()
