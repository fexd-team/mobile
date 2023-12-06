import AUTO_API from '../../helpers/AUTO_API'
import { Form } from '../createForm'

export interface FormProps {
  form?: Form
  children?: any
}
export type FormRef = any

export default AUTO_API<FormProps>()
export const DOC_FormProps = AUTO_API<FormProps>()
