import React from 'react'
import { renderHook, waitFor, act } from '@testing-library/react'
import useSize from '..'

const disconnectMock = jest.fn()

jest.mock('resize-observer-polyfill', () => {
  return class MockResizeObserver {
    constructor(private readonly cb: ResizeObserverCallback) {}

    observe(target: Element) {
      queueMicrotask(() => {
        this.cb([{ target } as ResizeObserverEntry], this as unknown as ResizeObserver)
      })
    }

    disconnect = disconnectMock

    unobserve = jest.fn()
  }
})

function mockRect(w: number, h: number) {
  return () =>
    ({
      width: w,
      height: h,
      top: 0,
      left: 0,
      right: w,
      bottom: h,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect)
}

describe('useSize', () => {
  beforeEach(() => {
    disconnectMock.mockClear()
  })

  test('Ref 目标：ResizeObserver 回调后得到 width、height', async () => {
    const div = document.createElement('div')
    div.getBoundingClientRect = mockRect(120, 80)
    document.body.appendChild(div)
    const target = { current: div }

    const { result } = renderHook(() => useSize(target))

    await waitFor(() => {
      expect(result.current.width).toBe(120)
      expect(result.current.height).toBe(80)
    })

    div.remove()
  })

  test('直接传入 DOM 元素（非 Ref）时同样可观察', async () => {
    const div = document.createElement('div')
    div.getBoundingClientRect = mockRect(40, 60)
    document.body.appendChild(div)

    const { result } = renderHook(() => useSize(div))

    await waitFor(() => {
      expect(result.current.width).toBe(40)
      expect(result.current.height).toBe(60)
    })

    div.remove()
  })

  test('target 引用变更时重新订阅且卸载时 disconnect', async () => {
    const a = document.createElement('div')
    a.getBoundingClientRect = mockRect(10, 10)
    const b = document.createElement('div')
    b.getBoundingClientRect = mockRect(20, 20)
    document.body.appendChild(a)
    document.body.appendChild(b)

    const refA = { current: a }
    const { result, rerender } = renderHook(({ t }) => useSize(t), {
      initialProps: { t: refA as { current: HTMLDivElement } },
    })

    await waitFor(() => {
      expect(result.current.width).toBe(10)
    })

    const refB = { current: b }
    rerender({ t: refB })

    await waitFor(() => {
      expect(result.current.width).toBe(20)
    })

    act(() => {
      rerender({ t: refB })
    })

    a.remove()
    b.remove()
  })

  test('卸载 hook 时调用 ResizeObserver.disconnect', async () => {
    const div = document.createElement('div')
    div.getBoundingClientRect = mockRect(1, 1)
    document.body.appendChild(div)
    const { unmount } = renderHook(() => useSize(div))
    await waitFor(() => {
      expect(div).toBeTruthy()
    })
    disconnectMock.mockClear()
    unmount()
    expect(disconnectMock).toHaveBeenCalledTimes(1)
    div.remove()
  })
})
