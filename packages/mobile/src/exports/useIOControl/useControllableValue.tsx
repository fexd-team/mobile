/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useMemo, useCallback } from 'react'
import { useControllableValue as raw_useControllableValue, useMemoizedFn } from 'ahooks'
import { run } from '@fexd/tools'

const useControllableValue: typeof raw_useControllableValue = function useControllableValue(
  { filterIOValue, ...props },
  options,
) {
  const [rawValue, raw_setValue] = raw_useControllableValue(props, options)
  const rawValueRef = useRef(rawValue)
  rawValueRef.current = rawValue

  const checkValueAvailable = useMemoizedFn((value: any) => run(filterIOValue, undefined, value) ?? true)

  const value = useMemo(() => {
    const valueAvailable = checkValueAvailable(rawValue)

    return valueAvailable ? rawValue : undefined
  }, [rawValue])

  const setValue = useCallback(
    (getNextValue: any) => {
      const currentValue = rawValueRef.current
      const nextValue = run(getNextValue, undefined, currentValue)
      const valueAvailable = checkValueAvailable(nextValue)
      if (!valueAvailable) {
        return
      }

      return raw_setValue(nextValue)
    },
    [raw_setValue],
  )

  return [value, setValue]
} as any as typeof raw_useControllableValue

export default useControllableValue
