import React from 'react'
import { render, act } from '@testing-library/react'
import CountDown from '..'

describe('CountDown', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers()
    })
    jest.useRealTimers()
  })

  test('deadline 为 0 时展示占位 -- -- --', () => {
    jest.setSystemTime(new Date('2026-01-01T12:00:00.000Z'))
    const { container } = render(<CountDown deadline={0} />)
    expect(container).toHaveTextContent('-- -- --')
  })

  test('已超过 deadline 时初始即为 00:00:00', () => {
    jest.setSystemTime(new Date('2026-01-01T12:00:00.000Z'))
    const { container } = render(<CountDown deadline={Date.now() - 1000} />)
    expect(container).toHaveTextContent('00:00:00')
  })

  test('未到期时展示格式化剩余时间', () => {
    jest.setSystemTime(new Date('2026-01-01T12:00:00.000Z'))
    // 剩余 1 小时整 → 01:00:00
    const deadline = Date.now() + 3600 * 1000
    const { container } = render(<CountDown deadline={deadline} />)
    expect(container).toHaveTextContent('01:00:00')
  })

  test('localOffset 参与剩余时间计算', () => {
    jest.setSystemTime(new Date('2026-01-01T12:00:00.000Z'))
    const deadline = Date.now() + 3600 * 1000
    // 本地偏移 +1h，相当于「当前时间」视为晚 1h，剩余少 1h
    const { container } = render(<CountDown deadline={deadline} localOffset={3600 * 1000} />)
    expect(container).toHaveTextContent('00:00:00')
  })

  test('每秒递减并在归零时停止定时器', () => {
    jest.setSystemTime(new Date('2026-01-01T12:00:00.000Z'))
    const deadline = Date.now() + 2500
    const { container } = render(<CountDown deadline={deadline} />)
    expect(container.textContent).not.toBe('00:00:00')

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    const t1 = container.textContent
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    const t2 = container.textContent
    expect(t1).not.toBe(t2)

    act(() => {
      jest.advanceTimersByTime(2000)
    })
    expect(container).toHaveTextContent('00:00:00')

    // 再继续推进，文案应保持 00:00:00（interval 已清除）
    act(() => {
      jest.advanceTimersByTime(5000)
    })
    expect(container).toHaveTextContent('00:00:00')
  })

  test('deadline 变更时重置并重新订阅定时器', () => {
    jest.setSystemTime(new Date('2026-01-01T12:00:00.000Z'))
    const d1 = Date.now() + 5000
    const { container, rerender } = render(<CountDown deadline={d1} />)
    const before = container.textContent

    const d2 = Date.now() + 7200 * 1000
    rerender(<CountDown deadline={d2} />)
    expect(container.textContent).not.toBe(before)
    expect(container).toHaveTextContent('02:00:00')
  })

  test('卸载时清除定时器不抛错', () => {
    jest.setSystemTime(new Date('2026-01-01T12:00:00.000Z'))
    const deadline = Date.now() + 60_000
    const { unmount } = render(<CountDown deadline={deadline} />)
    expect(() => {
      unmount()
      act(() => {
        jest.advanceTimersByTime(5000)
      })
    }).not.toThrow()
  })
})
