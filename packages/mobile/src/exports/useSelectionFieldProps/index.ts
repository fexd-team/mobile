import { useState } from 'react'

import useIOControl from '../useIOControl'
import { SelectionFieldProps } from './type'

export default function useSelectionFieldProps<T = string>(props: SelectionFieldProps<T>) {
  const { value, setValue } = useIOControl(props)
  const [insideValue, setInsideValue] = useState(value)

  return {
    ...props,
    value,
    setValue,
    insideValue,
    setInsideValue,
  }
}
