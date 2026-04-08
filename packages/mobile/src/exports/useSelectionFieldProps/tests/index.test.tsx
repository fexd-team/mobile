import React from 'react'
import { renderHook, act } from '@testing-library/react'
import useSelectionFieldProps from '..'

describe('useSelectionFieldProps', () => {
  test('默认返回与 defaultValue 一致的 value、insideValue 与 selecting 状态', () => {
    const { result } = renderHook(() =>
      useSelectionFieldProps({
        defaultValue: 'sel',
      }),
    )
    expect(result.current).toMatchObject({
      value: 'sel',
      insideValue: 'sel',
      selecting: false,
    })
    expect(typeof result.current.setValue).toBe('function')
    expect(typeof result.current.setInsideValue).toBe('function')
    expect(typeof result.current.setSelecting).toBe('function')
  })

  test('setSelecting 可切换 selecting', () => {
    const { result } = renderHook(() => useSelectionFieldProps({ defaultValue: '' }))
    act(() => {
      result.current.setSelecting(true)
    })
    expect(result.current.selecting).toBe(true)
  })

  test('非挑选态下外部 value 变化会同步 insideValue', () => {
    const { result, rerender } = renderHook(
      ({ v }: { v: string }) =>
        useSelectionFieldProps({
          value: v,
          onChange: jest.fn(),
        }),
      { initialProps: { v: 'a' } },
    )
    expect(result.current.insideValue).toBe('a')

    rerender({ v: 'b' })
    expect(result.current.insideValue).toBe('b')
  })

  test('挑选态下外部 value 变化不覆盖 insideValue', async () => {
    const { result, rerender } = renderHook(
      ({ v }: { v: string }) =>
        useSelectionFieldProps({
          value: v,
          onChange: jest.fn(),
        }),
      { initialProps: { v: 'a' } },
    )

    act(() => {
      result.current.setSelecting(true)
    })
    act(() => {
      result.current.setInsideValue('draft')
    })

    rerender({ v: 'remote' })

    expect(result.current.value).toBe('remote')
    expect(result.current.insideValue).toBe('draft')
  })
})
