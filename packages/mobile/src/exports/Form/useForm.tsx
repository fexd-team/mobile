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

// 函数重载定义
function useForm(customizedForm?: Form, formOptions?: FormOptions): FormInstance
function useForm(options?: Form | FormOptions): FormInstance
function useForm(customizedFormOrOptions?: Form | FormOptions, formOptions?: FormOptions): FormInstance {
  const [form] = useState(() => {
    // 如果第二个参数存在，则使用原本的两参数模式
    if (arguments.length === 2 || (arguments.length === 1 && formOptions !== undefined)) {
      return (customizedFormOrOptions as Form) ?? createForm(formOptions)
    }

    // 否则使用多态模式：通过检查 __isFormInstance 标识来判断参数类型
    if (customizedFormOrOptions && (customizedFormOrOptions as Form).__isFormInstance === true) {
      // 第一个参数是 customizedForm
      return customizedFormOrOptions as Form
    } else {
      // 第一个参数是 formOptions 或者未传参数
      return createForm(customizedFormOrOptions as FormOptions)
    }
  })

  return useMemo<FormInstance>(
    () =>
      Object.assign(form, {
        useValue: createUseValue(form),
        useError: createUseError(form),
        useRelative: createUseRelative(form),
        useWatchValue: createUseWatchValue(form),
      }),
    [],
  )
}

export default useForm
