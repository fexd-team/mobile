/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext, useMemo, useRef } from 'react'

import { FormStopWatch } from '../createForm'
import { context } from './context'
// 此处不引入 style.less，目的是实现按需引用

export default function useValue(fieldName: string) {
  const form = useContext(context)!
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
