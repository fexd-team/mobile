/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext, useMemo, useRef } from 'react'

import { FormStopWatch, Form } from '../createForm'
import { useContextForm } from './context'
// 此处不引入 style.less，目的是实现按需引用

export function createUseWatchValue(insetForm?: Form) {
  return function useWatchValue(fieldName: string, effect: (value: any) => void) {
    const ctxForm = useContextForm()!
    const form = insetForm || ctxForm
    const listenerStopList = useRef<FormStopWatch[]>([])
    useMemo(() => {
      listenerStopList.current.forEach((stop) => stop())
      listenerStopList.current.push(form.watchValue(fieldName, effect))
    }, [])

    useEffect(
      () => () => {
        listenerStopList.current.forEach((stop) => stop())
      },
      [],
    )
  }
}

export default createUseWatchValue()
