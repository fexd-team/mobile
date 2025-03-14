import AUTO_API from '../../../helpers/AUTO_API'
import { FormRule, FormValue, FormError, FormValues, FormErrors, Form } from '../../createForm'
import { FormRelative, FormComputeRelative } from '../../createForm/type'

export interface FieldController {
  /** 当前域字段的值 */
  value: FormValue
  /** 更改字段的值 */
  setValue: (value: FormValue) => void
  /** 当前域字段的错误 */
  error: FormError
  /** 校验当前域的内容 */
  validate: (ruleNames?: (number | string)[]) => void
  /** 当前域与其他域的关联属性 */
  relative: FormRelative
  /** 表单实例 */
  form: Form
}

export interface FormFieldProps {
  /** 字段名 */
  name?: string
  /** 默认值 */
  defaultValue?: any
  /** 校验规则 */
  rules?: FormRule[] | Record<string, FormRule>
  /** 关联值，当值变化时，会自动计算出关联值 */
  relative?: FormComputeRelative
  children?: (fieldController: FieldController) => JSX.Element
  /**
   * @description 当值变化时，是否自动校验
   * @default true
   */
  validateOnChange?: boolean

  watchValue?: Record<string, (watchedValue: any, fieldController: FieldController) => void>
}
export type FormFieldRef = any

export const DOC_FieldController = AUTO_API<FieldController>()
export const DOC_FormFieldProps = AUTO_API<FormFieldProps>()
