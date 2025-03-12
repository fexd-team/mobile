/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react'

import createFC from '../createFC'
import { FormProps, FormRef, FormType } from './type'
import createForm from './createForm'
import { Provider, useContextForm } from './context'
import Field from './Field'
import useRelative from './useRelative'
import useValue from './useValue'
import useError from './useError'
import useForm from './useForm'
import useWatchValue from './useWatchValue'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-form'
const Form: FormType = createFC<FormProps, FormRef>(function Form(
  { form: customizedForm, validateOnChange, children, strict },
  ref,
) {
  const form = useForm(customizedForm, { strict })
  /* 组件逻辑实现 */
  const ctxValue = useMemo(
    () => ({
      form,
      validateOnChange,
    }),
    [form, validateOnChange],
  )

  return <Provider value={ctxValue}>{children}</Provider>
}) as FormType

Form.defaultProps = {
  strict: true,
  validateOnChange: true,
}
Form.Field = Field
Form.createForm = createForm
Form.useContextForm = useContextForm
Form.useForm = useForm
Form.useRelative = useRelative
Form.useValue = useValue
Form.useError = useError
Form.useWatchValue = useWatchValue

export default Form
