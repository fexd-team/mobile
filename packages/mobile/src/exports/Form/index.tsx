/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react'

import createForm from '../createForm'
import { Provider } from './context'
import createFC from '../createFC'
import { FormProps, FormRef } from './type'
import Field from './Field'
import useRelative, { createUseRelative } from './useRelative'
import useValue, { createUseValue } from './useValue'
// 此处不引入 style.less，目的是实现按需引用

type BasicFormType = React.FC<FormProps>
interface FormType extends BasicFormType {
  Field: typeof Field
  useForm: typeof useForm
  createForm: typeof createForm
  useRelative: typeof useRelative
  useValue: typeof useValue
}

function useForm(customizedForm?: FormProps['form']) {
  const [form] = useState(() => customizedForm ?? createForm())
  const useValue = useMemo(() => createUseValue(form), [])
  const useRelative = useMemo(() => createUseRelative(form), [])

  return Object.assign(customizedForm ?? form, {
    useValue,
    useRelative,
  })
}

export const prefix = 'exd-form'
const Form: FormType = createFC<FormProps, FormRef>(function Form({ form: customizedForm, children }, ref) {
  const form = useForm(customizedForm)
  /* 组件逻辑实现 */
  return <Provider value={form}>{children}</Provider>
}) as FormType

Form.defaultProps = {}
Form.Field = Field
Form.createForm = createForm
Form.useForm = useForm
Form.useRelative = useRelative
Form.useValue = useValue

export default Form
