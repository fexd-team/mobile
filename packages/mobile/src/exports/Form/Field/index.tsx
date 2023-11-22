/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useMemo, useRef, isValidElement } from 'react'
import { run, random, isFunction } from '@fexd/tools'

import { StopWatch, Error, Values, Errors } from '../../../helpers/formini'
import createFC from '../../../helpers/createFC'
import Hook from '../../Hook'
import { FormFieldProps, FormFieldRef } from './type'

import { context } from '../context'
// 此处不引入 style.less，目的是实现按需引用

type Relative<T = any> = T
type ComputeRelative<T = any> = (values: Values, errors: Errors) => Relative<T>

function useRelative(relativeCompute?: ComputeRelative) {
  const form = useContext(context)!
  const [relativeName] = useState(() => String(random(10000, 99999)))
  const listenerStopList = useRef<StopWatch[]>([])
  useMemo(() => {
    if (!isFunction(relativeCompute)) {
      return
    }

    form.addRelative(relativeName, relativeCompute!)
    listenerStopList.current.forEach((stop) => stop())
    listenerStopList.current.push(
      form.watchRelative(relativeName, (fieldRelative: any) => {
        setRelative(fieldRelative)
      }),
    )
  }, [relativeCompute])
  const [relative, setRelative] = useState<Relative>(() => form.getRelative(relativeName))

  useEffect(
    () => () => {
      listenerStopList.current.forEach((stop) => stop())
    },
    [],
  )

  return relative
}

export const prefix = 'exd-form-field'
const FormField = createFC<FormFieldProps, FormFieldRef>(function FormField({
  name,
  defaultValue,
  rules,
  relative: relativeCompute,
  children,
  validateOnChange,
}) {
  const form = useContext(context)!
  const [value, setFieldValue] = useState(defaultValue)
  const [error, setError] = useState<Error>()
  const relative = useRelative(relativeCompute!)
  const fieldRef = useRef<any>({ name, rules, defaultValue })
  Object.assign(fieldRef.current, { name, rules, defaultValue })

  const validate = () => form.validate([name!])
  const setValue = (nextValue: any) => {
    form.setValue(name!, nextValue)
    setFieldValue(nextValue)
    if (validateOnChange) {
      validate()
    }
  }

  useEffect(() => {
    const listenerStopList: StopWatch[] = []

    if (!name) {
      return
    }

    listenerStopList.push(
      form.watchValue(name, (fieldValue: any) => {
        setFieldValue(fieldValue)
      }),
    )

    listenerStopList.push(
      form.watchError(name, (errors: any = []) => {
        const error = (errors ?? []).find((error: any) => error.field === fieldRef.current)?.error
        setError(error)
      }),
    )

    return () => {
      listenerStopList.forEach((stop) => stop())
    }
  }, [])

  return (
    <Hook {...{ relative, renderChildren: children }}>
      {() => {
        const renderContent = run(children, undefined, {
          value,
          setValue,
          error,
          validate,
          relative,
        })
        const hasRenderContent = !!renderContent
        const removeFieldRef = useRef<any>(() => undefined)

        useMemo(() => {
          if (!name) {
            return
          }

          if (hasRenderContent) {
            removeFieldRef.current = form.addField(fieldRef.current)
          }
        }, [hasRenderContent])

        useEffect(() => {
          if (!name) {
            return
          }

          const needRemoveField = !hasRenderContent
          // const hasField = form.hasField(name)

          if (needRemoveField) {
            run(removeFieldRef.current)
          }
        }, [hasRenderContent])

        return renderContent as JSX.Element
      }}
    </Hook>
  )
})

FormField.defaultProps = {
  validateOnChange: true,
}

export default FormField
