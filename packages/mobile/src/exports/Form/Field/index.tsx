/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, useRef, isValidElement } from 'react'
import { run, random, isFunction, isObject } from '@fexd/tools'

import { FormStopWatch, FormError, FormValues, FormErrors } from '../../createForm'
import createFC from '../../createFC'
import Hook from '../../Hook'
import { FieldController, FormFieldProps, FormFieldRef } from './type'

import { useContext } from '../context'
import useRelative from '../useRelative'
import useWatchValue from '../useWatchValue'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-form-field'
const FormField = createFC<FormFieldProps, FormFieldRef>(function FormField({
  name,
  defaultValue,
  rules,
  relative: relativeCompute,
  children,
  validateOnChange: propValidateOnChange,
  watchValue,
}) {
  const ctxValue = useContext()!
  const form = ctxValue.form!
  const validateOnChange = propValidateOnChange ?? ctxValue?.validateOnChange
  const [value, setFieldValue] = useState(defaultValue)
  const [error, setError] = useState<FormError>()

  const fieldRef = useRef<any>({ name, rules, defaultValue })
  Object.assign(fieldRef.current, { name, rules, defaultValue })

  const validate = (ruleKeys?: (number | string)[]) => form.validate([name!], ruleKeys)
  const setValue = (nextValue: any) => {
    form.setValue(name!, nextValue)
    setFieldValue(nextValue)
    form.setError(name!, undefined)
    if (validateOnChange) {
      validate()
    }
  }

  useEffect(() => {
    const listenerStopList: FormStopWatch[] = []

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
    <Hook {...{ renderChildren: children, watchValue }}>
      {() => {
        const relative = useRelative(relativeCompute!)
        const fieldController = {
          value,
          setValue,
          error,
          validate,
          relative,
          form,
        } as FieldController
        const renderContent = run(children, undefined, fieldController)
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

        return (
          <>
            {renderContent}
            {isObject(watchValue) &&
              Object.entries(watchValue!).map(([key, effect]) => (
                <Hook key={key}>
                  {() => {
                    useWatchValue(key, (value) => {
                      effect?.(value, fieldController)
                    })
                    return null
                  }}
                </Hook>
              ))}
          </>
        )
      }}
    </Hook>
  )
})

FormField.defaultProps = {}

export default FormField
