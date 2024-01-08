/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext, useMemo, useRef, isValidElement } from 'react'
import { random, isFunction, run } from '@fexd/tools'
import { useMemoizedFn } from 'ahooks'

import { FormStopWatch } from '../createForm'
import { context } from './context'
import { FormRelative, FormComputeRelative } from './Field/type'
// 此处不引入 style.less，目的是实现按需引用

export default function useRelative(relativeCompute?: FormComputeRelative) {
  const form = useContext(context)!
  const [relativeName] = useState(() => String(random(10000, 99999)))
  const computedRelative = useMemoizedFn((...args) => run(relativeCompute, undefined, ...args))
  const listenerStopList = useRef<FormStopWatch[]>([])
  useMemo(() => {
    if (!isFunction(relativeCompute)) {
      return
    }

    form.addRelative(relativeName, computedRelative!)
    listenerStopList.current.forEach((stop) => stop())
    listenerStopList.current.push(
      form.watchRelative(relativeName, (fieldRelative: any) => {
        setRelative(fieldRelative)
      }),
    )
  }, [])
  const [relative, setRelative] = useState<FormRelative>(() => form.getRelative(relativeName))

  useEffect(
    () => () => {
      listenerStopList.current.forEach((stop) => stop())
    },
    [],
  )

  return relative
}
