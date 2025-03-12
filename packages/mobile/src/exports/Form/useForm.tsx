/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from 'react'

import createForm, { Form } from '../createForm'
import { FormOptions } from '../createForm/type'
import { FormInstance } from './type'
import { createUseRelative } from './useRelative'
import { createUseValue } from './useValue'
import { createUseError } from './useError'
import { createUseWatchValue } from './useWatchValue'
// 此处不引入 style.less，目的是实现按需引用

export default function useForm(customizedForm?: Form, formOptions?: FormOptions) {
  const [form] = useState(() => customizedForm ?? createForm(formOptions))

  return useMemo<FormInstance>(
    () =>
      Object.assign(customizedForm ?? form, {
        useValue: createUseValue(form),
        useError: createUseError(form),
        useRelative: createUseRelative(form),
        useWatchValue: createUseWatchValue(form),
      }),
    [],
  )
}
