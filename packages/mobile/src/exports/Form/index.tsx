import React, { useState } from 'react'

import createForm from '../../helpers/formini'
import { Provider } from './context'
import createFC from '../../helpers/createFC'
import { FormProps, FormRef } from './type'
import Field from './Field'
// 此处不引入 style.less，目的是实现按需引用

type BasicFormType = React.FC<FormProps>
interface FormType extends BasicFormType {
  Field: typeof Field
  useForm: typeof useForm
  createForm: typeof createForm
}

function useForm(customizedForm?: FormProps['form']) {
  const [form] = useState(() => customizedForm ?? createForm())
  return customizedForm ?? form
}

export const prefix = 'exd-form'
const Form: FormType = createFC<FormProps, FormRef>(function Form({ form: customizedForm, children }, ref) {
  const form = useForm(customizedForm)
  /* 组件逻辑实现 */
  return <Provider value={form}>{children}</Provider>
}) as FormType

Form.defaultProps = {}
Form.Field = Field
Form.useForm = useForm

export default Form
