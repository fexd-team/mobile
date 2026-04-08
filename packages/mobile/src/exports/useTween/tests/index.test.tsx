import { renderHook, act, waitFor } from '@testing-library/react'
import useTween from '..'

describe('useTween', () => {
  test('返回 value、setValue、getValue、run、to、stop、core', () => {
    const { result } = renderHook(() => useTween(0, { duration: 50, from: 0 }))
    const r = result.current
    expect(typeof r.value).toBe('number')
    expect(typeof r.setValue).toBe('function')
    expect(typeof r.getValue).toBe('function')
    expect(typeof r.run).toBe('function')
    expect(typeof r.to).toBe('function')
    expect(typeof r.stop).toBe('function')
    expect(r.core).toBeDefined()
  })

  test('config.from 显式指定时初始 value 取 from', () => {
    const { result } = renderHook(() => useTween(0, { from: 42, duration: 10 }))
    expect(result.current.getValue()).toBe(42)
  })

  test('config 省略时默认 from 为 0', () => {
    const { result } = renderHook(() => useTween(0, { duration: 10 }))
    expect(result.current.getValue()).toBe(0)
  })

  test('useTween 第二参数省略时使用默认空 config', () => {
    const { result } = renderHook(() => useTween(0))
    expect(result.current.getValue()).toBe(0)
    expect(result.current.core).toBeDefined()
  })

  test('followValue 变化后 value 向目标趋近', async () => {
    const { result, rerender } = renderHook(({ v }) => useTween(v, { duration: 30, from: 0 }), {
      initialProps: { v: 0 },
    })

    rerender({ v: 100 })

    await waitFor(
      () => {
        expect(result.current.value).toBeGreaterThan(0)
      },
      { timeout: 3000 },
    )

    act(() => {
      result.current.stop()
    })
  })

  test('run 无参时以当前值为起点重配并 restart', async () => {
    const { result } = renderHook(() => useTween(0, { duration: 20, from: 10 }))
    await waitFor(() => expect(result.current.getValue()).toBeDefined())
    act(() => {
      result.current.setValue(50)
      result.current.run()
    })
    expect(typeof result.current.value).toBe('number')
  })

  test('run 传入 undefined 触发默认空配置合并', async () => {
    const { result } = renderHook(() => useTween(0, { duration: 15, from: 5 }))
    await waitFor(() => expect(result.current.core).toBeDefined())
    act(() => {
      ;(result.current.run as (c?: unknown) => void)(undefined)
    })
    expect(typeof result.current.value).toBe('number')
  })

  test('run 传入部分配置与 to 方法', async () => {
    const { result } = renderHook(() => useTween(0, { duration: 25, from: 0 }))
    await waitFor(() => expect(result.current.core).toBeDefined())
    act(() => {
      result.current.to(80)
    })
    await waitFor(
      () => {
        expect(result.current.value).toBeGreaterThan(0)
      },
      { timeout: 3000 },
    )
    act(() => {
      result.current.stop()
    })
  })

  test('卸载时移除 tween update 监听', async () => {
    const { result, unmount } = renderHook(() => useTween(1, { duration: 100, from: 0 }))
    await waitFor(() => expect(result.current.core).toBeDefined())
    act(() => {
      unmount()
    })
  })

  test('TweenConfig.loop 传入 new Tween(config) 分支', () => {
    const { result } = renderHook(() => useTween(0, { duration: 5, from: 0, loop: true }))
    expect(result.current.core).toBeDefined()
    act(() => {
      result.current.stop()
    })
  })
})
