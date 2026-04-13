import { renderHook, act } from '@testing-library/react'
import usePickerNumberColumn from '..'

describe('usePickerNumberColumn', () => {
  const toLabel = (v: number) => String(v)

  test('defaultValue 在 [min, max] 范围内时直接使用', () => {
    const { result } = renderHook(() => usePickerNumberColumn({ defaultValue: 5, min: 1, max: 10, toLabel }))
    expect(result.current.value).toBe(5)
  })

  test('defaultValue 超出范围时 clamp 到边界', () => {
    const { result } = renderHook(() => usePickerNumberColumn({ defaultValue: 20, min: 1, max: 10, toLabel }))
    expect(result.current.value).toBe(10)
  })

  test('defaultValue 低于 min 时 clamp 到 min', () => {
    const { result } = renderHook(() => usePickerNumberColumn({ defaultValue: -5, min: 1, max: 10, toLabel }))
    expect(result.current.value).toBe(1)
  })

  test('未传 defaultValue 时 value 为 min', () => {
    const { result } = renderHook(() => usePickerNumberColumn({ min: 3, max: 8, toLabel }))
    expect(result.current.value).toBe(3)
  })

  test('options 由 min~max 生成，长度正确', () => {
    const { result } = renderHook(() => usePickerNumberColumn({ defaultValue: 5, min: 1, max: 5, toLabel }))
    expect(result.current.options).toHaveLength(5)
    expect(result.current.options.map((o) => o.value)).toEqual([1, 2, 3, 4, 5])
  })

  test('toLabel 决定选项 label', () => {
    const fmt = (v: number) => `${v}年`
    const { result } = renderHook(() =>
      usePickerNumberColumn({ defaultValue: 2024, min: 2024, max: 2025, toLabel: fmt }),
    )
    expect(result.current.options[0].label).toBe('2024年')
    expect(result.current.options[1].label).toBe('2025年')
  })

  test('onChange 更新 value', () => {
    const { result } = renderHook(() => usePickerNumberColumn({ defaultValue: 5, min: 1, max: 10, toLabel }))
    act(() => result.current.onChange(8))
    expect(result.current.value).toBe(8)
  })

  test('onChange 接受字符串并转为数值', () => {
    const { result } = renderHook(() => usePickerNumberColumn({ defaultValue: 5, min: 1, max: 10, toLabel }))
    act(() => result.current.onChange('7'))
    expect(result.current.value).toBe(7)
  })

  test('min/max 收窄时 value 被 clamp', () => {
    const min = 1
    let max = 10
    const { result, rerender } = renderHook(() => usePickerNumberColumn({ defaultValue: 8, min, max, toLabel }))
    expect(result.current.value).toBe(8)
    max = 5
    rerender()
    expect(result.current.value).toBe(5)
  })

  test('min/max 恢复后 value 不回跳（rawValue 已同步）', () => {
    const min = 1
    let max = 10
    const { result, rerender } = renderHook(() => usePickerNumberColumn({ defaultValue: 8, min, max, toLabel }))
    expect(result.current.value).toBe(8)

    max = 5
    rerender()
    expect(result.current.value).toBe(5)

    max = 10
    rerender()
    expect(result.current.value).toBe(5)
  })

  test('min === max 时只有一个选项', () => {
    const { result } = renderHook(() => usePickerNumberColumn({ defaultValue: 3, min: 3, max: 3, toLabel }))
    expect(result.current.options).toHaveLength(1)
    expect(result.current.value).toBe(3)
  })

  test('toLabel 变化不导致 options 重算（useMemoizedFn 稳定化）', () => {
    let calls = 0
    const { rerender } = renderHook(() =>
      usePickerNumberColumn({
        defaultValue: 1,
        min: 1,
        max: 3,
        toLabel: (v) => {
          calls++
          return String(v)
        },
      }),
    )
    const firstCalls = calls
    rerender()
    expect(calls).toBe(firstCalls)
  })
})
