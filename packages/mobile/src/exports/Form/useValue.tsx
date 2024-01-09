/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext, useMemo, useRef } from 'react'

import { FormStopWatch, Form } from '../createForm'
import { context } from './context'
// 此处不引入 style.less，目的是实现按需引用

export function createUseValue(insetForm?: Form) {
  return function useValue(fieldName: string) {
    const ctxForm = useContext(context)!
    const form = insetForm || ctxForm
    const listenerStopList = useRef<FormStopWatch[]>([])
    useMemo(() => {
      listenerStopList.current.forEach((stop) => stop())
      listenerStopList.current.push(
        form.watchValue(fieldName, (value: any) => {
          setValue(value)
        }),
      )
    }, [])
    const [value, setValue] = useState<any>(() => form.getValue(fieldName))

    useEffect(
      () => () => {
        listenerStopList.current.forEach((stop) => stop())
      },
      [],
    )

    return value
  }
}

export default createUseValue()
