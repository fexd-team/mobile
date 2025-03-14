/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import { createContext, useContext as useReactContext, useMemo } from 'react'

import { Form } from '../createForm/type'
import { FormInstance } from './type'
import { createUseRelative } from './useRelative'
import { createUseValue } from './useValue'
import { createUseError } from './useError'
import { createUseWatchValue } from './useWatchValue'

export const context = createContext<{
  form: Form | undefined
  validateOnChange: boolean | undefined
}>(undefined)
export const { Provider, Consumer } = context
export const useContext = () => useReactContext(context)
export function useContextForm() {
  const { form } = useReactContext(context)

  return useMemo<FormInstance>(
    () =>
      Object.assign(form, {
        useValue: createUseValue(form),
        useError: createUseError(form),
        useRelative: createUseRelative(form),
        useWatchValue: createUseWatchValue(form),
      }),
    [form],
  )
}
