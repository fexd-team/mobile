import { renderHook, act } from '@testing-library/react'
import useForcedUpdate from '..'

describe('useForcedUpdate', () => {
  test('首次渲染返回强制更新函数与 renderKey', () => {
    const { result } = renderHook(() => useForcedUpdate())
    expect(typeof result.current[0]).toBe('function')
    expect(typeof result.current[1]).toBe('number')
  })

  test('调用强制更新函数会改变 renderKey（触发重渲染）', () => {
    const { result } = renderHook(() => useForcedUpdate())
    const keyBefore = result.current[1]
    act(() => {
      result.current[0]()
    })
    expect(result.current[1]).not.toBe(keyBefore)
  })
})
