import { ReactNode } from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { FormValues, FormErrors, Form } from '../createForm'

export interface FormProps {
  /** form 实例 */
  form?: Form
  /** 表单控制区域的内容，<Form.Field> 必须被 <Form> 包裹 */
  children?: ReactNode
}
export type FormRef = any

export default AUTO_API<FormProps>()
// export const DOC_FormProps = AUTO_API<FormProps>()
