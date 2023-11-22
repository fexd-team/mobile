import { useRef, useState } from 'react'
import { useControllableValue, useMemoizedFn, useGetState } from 'ahooks'
import { Options } from 'ahooks/es/useControllableValue'
import { run, pick } from '@fexd/tools'

import { IOProps } from './type'

export default function useIOControl<T>(props: IOProps<T>, options?: Options<T>) {
  const { valuePropName = 'value', defaultValuePropName = 'defaultValue', trigger = 'onChange' } = options || {}
  const controllableValueOptions = pick(props, [valuePropName, defaultValuePropName, trigger]) as IOProps
  const hasValueKey = valuePropName in controllableValueOptions
  const [focused, setFocused, getFocused] = useGetState(false)

  if (
    focused || // 聚焦状态下不受控
    !hasValueKey // 删除无效 value
  ) {
    // 聚焦状态下不受控
    delete controllableValueOptions.value
  }

  const [value, setControllableValue] = useControllableValue<T>(controllableValueOptions, options)
  const valueRef = useRef(value)
  valueRef.current = value

  const setValue = useMemoizedFn((getNextValue: T | ((prevValue: T) => T)) => {
    const currentValue = valueRef.current
    const nextValue = run(getNextValue, undefined, currentValue) as T

    if (currentValue === nextValue) {
      return
    }

    setControllableValue(nextValue)
  })

  const getValue = useMemoizedFn(() => valueRef.current)

  return {
    value,
    setValue,
    getValue,
    focused,
    setFocused,
    getFocused,
  }
}
