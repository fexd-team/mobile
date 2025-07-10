/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useLatest } from 'ahooks'

import useIOControl from '../useIOControl'
import { SelectionFieldProps } from './type'

export default function useSelectionFieldProps<T = string>(props: SelectionFieldProps<T>) {
  const { value, setValue } = useIOControl(props)
  const [insideValue, setInsideValue] = useState(value)
  const [selecting, setSelecting] = useState(false)
  const selectingRef = useLatest(selecting)

  // 未处于挑选状态时，保持 insideValue 和 value 一致
  useEffect(() => {
    if (!selectingRef.current) {
      setInsideValue(value)
    }
  }, [value])

  return {
    ...props,
    selecting,
    setSelecting,
    value,
    setValue,
    insideValue,
    setInsideValue,
  }
}
