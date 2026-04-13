import { useReducer, useCallback, useEffect, useRef, useMemo } from 'react'
import { PickerOption, PickerOptionValue } from '../PickerView/type'
import { CascadingColumnDef, UseCascadingPickerConfig, UseCascadingPickerReturn } from './type'

function defaultResolveValue(
  current: PickerOptionValue | undefined,
  options: PickerOption[],
): PickerOptionValue | undefined {
  if (current !== undefined && options.some((o) => o.value === current)) return current
  return options[0]?.value
}

function resolveAll(columns: CascadingColumnDef[], values: PickerOptionValue[]): PickerOptionValue[] {
  const result: PickerOptionValue[] = []
  for (let i = 0; i < columns.length; i++) {
    const col = columns[i]
    const options = col.getOptions(result)
    const resolve = col.resolveValue ?? defaultResolveValue
    result.push(resolve(values[i], options)!)
  }
  return result
}

type State = { values: PickerOptionValue[] }

type Action =
  | { type: 'SET_COLUMN'; index: number; value: PickerOptionValue; columns: CascadingColumnDef[] }
  | { type: 'SYNC_ALL'; values: PickerOptionValue[]; columns: CascadingColumnDef[] }

function valuesEqual(a: PickerOptionValue[], b: PickerOptionValue[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i])
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_COLUMN': {
      const newValues = [...state.values]
      newValues[action.index] = action.value
      for (let i = action.index + 1; i < action.columns.length; i++) {
        const col = action.columns[i]
        const options = col.getOptions(newValues.slice(0, i))
        const resolve = col.resolveValue ?? defaultResolveValue
        newValues[i] = resolve(newValues[i], options)!
      }
      if (valuesEqual(newValues, state.values)) return state
      return { values: newValues }
    }
    case 'SYNC_ALL': {
      const newValues = resolveAll(action.columns, action.values)
      if (valuesEqual(newValues, state.values)) return state
      return { values: newValues }
    }
    default:
      return state
  }
}

export default function useCascadingPicker(config: UseCascadingPickerConfig): UseCascadingPickerReturn {
  const { columns, value, defaultValue, onChange } = config

  const columnsRef = useRef(columns)
  columnsRef.current = columns

  const [state, dispatch] = useReducer(reducer, undefined, () => ({
    values: resolveAll(columns, value ?? defaultValue ?? []),
  }))

  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (value !== undefined) {
      dispatch({ type: 'SYNC_ALL', values: value, columns: columnsRef.current })
    }
  }, [value])

  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const prevValuesRef = useRef<PickerOptionValue[] | null>(null)
  useEffect(() => {
    const prev = prevValuesRef.current
    prevValuesRef.current = state.values
    if (prev === null || prev !== state.values) {
      onChangeRef.current?.(state.values)
    }
  }, [state.values])

  const handleColumnChange = useCallback((index: number, v: PickerOptionValue) => {
    dispatch({ type: 'SET_COLUMN', index, value: v, columns: columnsRef.current })
  }, [])

  const columnResults = useMemo(() => {
    return columns.map((col, i) => {
      const parentValues = state.values.slice(0, i)
      const options = col.getOptions(parentValues)
      return {
        key: col.key,
        options,
        value: state.values[i],
        onChange: (v: PickerOptionValue) => handleColumnChange(i, v),
      }
    })
  }, [columns, state.values, handleColumnChange])

  return {
    values: state.values,
    columns: columnResults,
  }
}
