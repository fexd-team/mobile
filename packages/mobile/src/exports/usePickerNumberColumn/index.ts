import { useState, useMemo, useEffect, useCallback } from 'react'
import { clamp } from '@fexd/tools'
import { useMemoizedFn } from 'ahooks'

import { UsePickerNumberColumnOptions, UsePickerNumberColumnResult } from './type'

export type { UsePickerNumberColumnOptions, UsePickerNumberColumnResult }

export default function usePickerNumberColumn({
  defaultValue,
  min,
  max,
  toLabel,
}: UsePickerNumberColumnOptions): UsePickerNumberColumnResult {
  const stableToLabel = useMemoizedFn(toLabel)

  const [rawValue, setRawValue] = useState(() => clamp(defaultValue ?? min, min, max))

  const value = clamp(rawValue, min, max) as number

  useEffect(() => {
    if (value !== rawValue) setRawValue(value)
  }, [value, rawValue])

  const options = useMemo(
    () =>
      Array.from({ length: max - min + 1 }, (_, i) => {
        const v = min + i
        return { value: v, label: stableToLabel(v) }
      }),
    [min, max],
  )

  const onChange = useCallback((v: number | string) => setRawValue(+v), [])

  return { value, options, onChange }
}
