import { renderHook, act } from '@testing-library/react'
import useThrottleFn from '..'

describe('useThrottleFn', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  describe('返回值结构', () => {
    test('返回与入参同类型的可调用函数', () => {
      const fn = jest.fn()
      const { result } = renderHook(() => useThrottleFn(fn, 50))
      expect(typeof result.current).toBe('function')
    })
  })

  describe('wait > 0', () => {
    test('时间窗口内多次调用合并，窗口结束后 trailing 再执行一次', () => {
      jest.useFakeTimers()
      const fn = jest.fn()
      const { result } = renderHook(() => useThrottleFn(fn, 100))

      act(() => {
        result.current()
        result.current()
        result.current()
      })
      expect(fn).toHaveBeenCalledTimes(1)

      act(() => {
        jest.advanceTimersByTime(100)
      })
      expect(fn).toHaveBeenCalledTimes(2)

      act(() => {
        result.current()
      })
      expect(fn).toHaveBeenCalledTimes(3)
    })

    test('快速连续传参：最后一次参数可被 trailing 使用（与 throttle 行为一致）', () => {
      jest.useFakeTimers()
      const fn = jest.fn()
      const { result } = renderHook(() => useThrottleFn(fn, 100))
      act(() => {
        result.current('a')
        result.current('b')
      })
      act(() => {
        jest.advanceTimersByTime(100)
      })
      expect(fn).toHaveBeenCalled()
    })
  })

  describe('wait <= 0', () => {
    test('wait 为 0 时每次调用直接透传 memoizedFn', () => {
      const fn = jest.fn()
      const { result } = renderHook(() => useThrottleFn(fn, 0))
      act(() => {
        result.current()
        result.current()
      })
      expect(fn).toHaveBeenCalledTimes(2)
    })
  })

  describe('参数变化', () => {
    test('wait 变化时重新生成节流函数', () => {
      jest.useFakeTimers()
      const fn = jest.fn()
      const { result, rerender } = renderHook(({ w }) => useThrottleFn(fn, w), {
        initialProps: { w: 200 },
      })
      const first = result.current
      rerender({ w: 0 })
      const second = result.current
      expect(first).not.toBe(second)
      act(() => {
        second()
        second()
      })
      expect(fn).toHaveBeenCalledTimes(2)
    })
  })

  describe('回调更新', () => {
    test('fn 引用变更后仍通过 useMemoizedFn 调用最新实现', () => {
      jest.useFakeTimers()
      const a = jest.fn()
      const b = jest.fn()
      const { result, rerender } = renderHook(({ f }) => useThrottleFn(f, 50), {
        initialProps: { f: a },
      })
      act(() => {
        result.current()
      })
      expect(a).toHaveBeenCalledTimes(1)
      rerender({ f: b })
      act(() => {
        jest.advanceTimersByTime(50)
        result.current()
      })
      expect(b).toHaveBeenCalled()
    })
  })
})
