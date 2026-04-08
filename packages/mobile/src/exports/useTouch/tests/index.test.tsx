import React from 'react'
import { render, fireEvent, act, renderHook } from '@testing-library/react'
import useTouch from '..'

const mockRect = {
  width: 100,
  height: 50,
  left: 10,
  top: 20,
  right: 110,
  bottom: 70,
  x: 10,
  y: 20,
  toJSON: () => ({}),
} as DOMRect

function TouchHarness({
  options,
  rectOverride,
}: {
  options?: Parameters<typeof useTouch>[1]
  rectOverride?: () => DOMRect
}) {
  const targetRef = React.useRef<HTMLDivElement | null>(null)
  useTouch(targetRef, { rate: 0, ...options })

  return (
    <div
      ref={(el) => {
        ;(targetRef as React.MutableRefObject<HTMLDivElement | null>).current = el
        if (el) {
          el.getBoundingClientRect = rectOverride ?? (() => mockRect)
        }
      }}
      data-testid="touch-target"
    />
  )
}

describe('useTouch', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  describe('返回值结构', () => {
    test('初始 main 为空、touches 为空数组', () => {
      const target = React.createRef<HTMLDivElement>()
      const { result } = renderHook(() => useTouch(target, { rate: 0 }))
      expect(result.current.touches).toEqual([])
      expect(result.current.main).toBeUndefined()
    })
  })

  describe('触摸事件序列', () => {
    test('无触点且当前也无触点时 updateTouches 早退（不 setState）', () => {
      const onMove = jest.fn()
      const { getByTestId } = render(<TouchHarness options={{ onMove, rate: 0 }} />)
      const el = getByTestId('touch-target')
      act(() => {
        fireEvent.touchMove(el, { touches: [] })
      })
      expect(onMove).not.toHaveBeenCalled()
    })

    test('touchstart → touchmove → touchend 更新 touches 并触发 onStart/onMove/onEnd', () => {
      const onStart = jest.fn()
      const onMove = jest.fn()
      const onEnd = jest.fn()
      const { getByTestId } = render(<TouchHarness options={{ onStart, onMove, onEnd, rate: 0 }} />)
      const el = getByTestId('touch-target')

      const t0 = { clientX: 20, clientY: 30, identifier: 0 }
      act(() => {
        fireEvent.touchStart(el, { touches: [t0], changedTouches: [t0] })
      })
      expect(onStart).toHaveBeenCalled()
      expect(onStart.mock.calls[0][0][0]).toMatchObject({
        x: 10,
        y: 10,
      })

      const t1 = { clientX: 40, clientY: 35, identifier: 0 }
      act(() => {
        fireEvent.touchMove(el, { touches: [t1], changedTouches: [t1] })
      })
      expect(onMove).toHaveBeenCalled()

      act(() => {
        fireEvent.touchEnd(el, { touches: [], changedTouches: [t1] })
      })
      expect(onEnd).toHaveBeenCalled()
    })

    test('touchmove 计算 dX、dY、percent 与 tracks', () => {
      const onMove = jest.fn()
      const { getByTestId } = render(<TouchHarness options={{ onMove, rate: 0 }} />)
      const el = getByTestId('touch-target')
      const a = { clientX: 20, clientY: 30, identifier: 0 }
      const b = { clientX: 30, clientY: 40, identifier: 0 }
      act(() => {
        fireEvent.touchStart(el, { touches: [a], changedTouches: [a] })
        fireEvent.touchMove(el, { touches: [b], changedTouches: [b] })
      })
      const touchData = onMove.mock.calls[0][0][0]
      expect(touchData.tracks.length).toBeGreaterThanOrEqual(1)
      expect(typeof touchData.dX).toBe('number')
      expect(typeof touchData.percentX).toBe('number')
    })

    test('触点缺少 client 坐标时仍走 normalize（toFixed 默认 0）', () => {
      const onStart = jest.fn()
      const { getByTestId } = render(<TouchHarness options={{ onStart, rate: 0 }} />)
      const el = getByTestId('touch-target')
      act(() => {
        fireEvent.touchStart(el, {
          touches: [{ identifier: 0 } as any],
          changedTouches: [{ identifier: 0 } as any],
        })
      })
      expect(onStart).toHaveBeenCalled()
    })

    test('双指触摸为第二触点生成独立轨迹', () => {
      const onMove = jest.fn()
      const { getByTestId } = render(<TouchHarness options={{ onMove, rate: 0 }} />)
      const el = getByTestId('touch-target')
      const t0 = { clientX: 15, clientY: 25, identifier: 0 }
      const t1 = { clientX: 70, clientY: 30, identifier: 1 }
      act(() => {
        fireEvent.touchStart(el, { touches: [t0, t1], changedTouches: [t0, t1] })
        fireEvent.touchMove(el, {
          touches: [
            { ...t0, clientX: 20 },
            { ...t1, clientX: 75 },
          ],
          changedTouches: [{ ...t0, clientX: 20 }],
        })
      })
      expect(onMove.mock.calls[0][0]).toHaveLength(2)
    })
  })

  describe('鼠标兼容', () => {
    test('mousedown → document mousemove → mouseup 更新触点', () => {
      const onStart = jest.fn()
      const onMove = jest.fn()
      const onEnd = jest.fn()
      const { getByTestId } = render(<TouchHarness options={{ onStart, onMove, onEnd, rate: 0 }} />)
      const el = getByTestId('touch-target')
      act(() => {
        fireEvent.mouseDown(el, { clientX: 25, clientY: 35 })
      })
      act(() => {
        fireEvent.mouseMove(document.documentElement, { clientX: 35, clientY: 35 })
      })
      act(() => {
        fireEvent.mouseUp(document.documentElement, { clientX: 35, clientY: 35 })
      })
      expect(onStart).toHaveBeenCalled()
      expect(onMove).toHaveBeenCalled()
      expect(onEnd).toHaveBeenCalled()
    })

    test('未 mousedown 时 document 上 mousemove 不触发更新', () => {
      const onMove = jest.fn()
      render(<TouchHarness options={{ onMove, rate: 0 }} />)
      fireEvent.mouseMove(document.documentElement, { clientX: 99, clientY: 99 })
      expect(onMove).not.toHaveBeenCalled()
    })

    test('绑定在 documentElement 上的 mouseleave 触发结束', () => {
      const onEnd = jest.fn()
      const { getByTestId } = render(<TouchHarness options={{ onEnd, rate: 0 }} />)
      const el = getByTestId('touch-target')
      act(() => {
        fireEvent.mouseDown(el, { clientX: 10, clientY: 10 })
      })
      act(() => {
        fireEvent.mouseLeave(document.documentElement)
      })
      expect(onEnd).toHaveBeenCalled()
    })
  })

  describe('选项与事件修饰', () => {
    test('disabled 时不触发回调', () => {
      const onStart = jest.fn()
      const { getByTestId } = render(<TouchHarness options={{ onStart, disabled: true, rate: 0 }} />)
      fireEvent.touchStart(getByTestId('touch-target'), {
        touches: [{ clientX: 1, clientY: 1, identifier: 0 }],
      })
      expect(onStart).not.toHaveBeenCalled()
    })

    test('stopPropagation 为 true 时阻止冒泡', () => {
      const { getByTestId } = render(<TouchHarness options={{ stopPropagation: true, rate: 0 }} />)
      const el = getByTestId('touch-target')
      const ev = new Event('touchmove', { bubbles: true })
      Object.defineProperty(ev, 'touches', { value: [{ clientX: 20, clientY: 30 }] })
      const spy = jest.spyOn(ev, 'stopPropagation')
      el.dispatchEvent(ev)
      expect(spy).toHaveBeenCalled()
    })

    test('touchend 默认不 preventDefault（避免影响点击）', () => {
      const { getByTestId } = render(<TouchHarness options={{ preventDefault: true, rate: 0 }} />)
      const el = getByTestId('touch-target')
      act(() => {
        fireEvent.touchStart(el, {
          touches: [{ clientX: 10, clientY: 10, identifier: 0 }],
        })
      })
      const ev = new Event('touchend', { bubbles: true, cancelable: true })
      Object.defineProperty(ev, 'touches', { value: [] })
      const spy = jest.spyOn(ev, 'preventDefault')
      act(() => {
        el.dispatchEvent(ev)
      })
      expect(spy).not.toHaveBeenCalled()
    })

    test('touchmove 默认会 preventDefault（可 spy）', () => {
      const { getByTestId } = render(<TouchHarness options={{ preventDefault: true, rate: 0 }} />)
      const el = getByTestId('touch-target')
      act(() => {
        fireEvent.touchStart(el, {
          touches: [{ clientX: 10, clientY: 10, identifier: 0 }],
        })
      })
      const ev = new Event('touchmove', { bubbles: true, cancelable: true })
      Object.defineProperty(ev, 'touches', { value: [{ clientX: 15, clientY: 15 }] })
      const spy = jest.spyOn(ev, 'preventDefault')
      act(() => {
        el.dispatchEvent(ev)
      })
      expect(spy).toHaveBeenCalled()
    })

    test('preventDefault 为 false 时不调用 preventDefault', () => {
      const { getByTestId } = render(<TouchHarness options={{ preventDefault: false, rate: 0 }} />)
      const el = getByTestId('touch-target')
      act(() => {
        fireEvent.touchStart(el, {
          touches: [{ clientX: 10, clientY: 10, identifier: 0 }],
        })
      })
      const ev = new Event('touchmove', { bubbles: true, cancelable: true })
      Object.defineProperty(ev, 'touches', { value: [{ clientX: 20, clientY: 20 }] })
      const spy = jest.spyOn(ev, 'preventDefault')
      act(() => {
        el.dispatchEvent(ev)
      })
      expect(spy).not.toHaveBeenCalled()
    })

    test('mousedown 后 shouldMouse 为 true，touchend 也会 preventDefault', () => {
      const { getByTestId } = render(<TouchHarness options={{ preventDefault: true, rate: 0 }} />)
      const el = getByTestId('touch-target')
      act(() => {
        fireEvent.mouseDown(el, { clientX: 5, clientY: 5 })
      })
      const ev = new Event('touchend', { bubbles: true, cancelable: true })
      Object.defineProperty(ev, 'touches', { value: [] })
      const spy = jest.spyOn(ev, 'preventDefault')
      act(() => {
        el.dispatchEvent(ev)
      })
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('绑定目标形态', () => {
    test('target 为 DOM 元素时可直接使用', () => {
      const el = document.createElement('div')
      el.getBoundingClientRect = () => mockRect
      document.body.appendChild(el)
      const { result } = renderHook(() => useTouch(el, { disabled: true, rate: 0 }))
      expect(Array.isArray(result.current.touches)).toBe(true)
      el.remove()
    })
  })

  describe('卸载清理', () => {
    test('卸载组件不抛错', () => {
      const { unmount } = render(<TouchHarness options={{ rate: 0 }} />)
      act(() => {
        unmount()
      })
    })
  })

  describe('默认 rate（内部节流 wait>0）', () => {
    afterEach(() => {
      jest.useRealTimers()
    })

    test('getBoundingClientRect 返回空对象时可选链分支仍可执行', () => {
      const onStart = jest.fn()
      const { getByTestId } = render(
        <TouchHarness options={{ onStart, rate: 0 }} rectOverride={() => ({} as DOMRect)} />,
      )
      const el = getByTestId('touch-target')
      const t = { clientX: 5, clientY: 5, identifier: 0 }
      act(() => {
        fireEvent.touchStart(el, { touches: [t], changedTouches: [t] })
      })
      expect(onStart).toHaveBeenCalled()
    })

    test('目标 width 为 0 时百分比计算仍走完整 normalize 分支', () => {
      const onStart = jest.fn()
      const zeroW = { ...mockRect, width: 0 }
      const { getByTestId } = render(
        <TouchHarness options={{ onStart, rate: 0 }} rectOverride={() => zeroW as DOMRect} />,
      )
      const el = getByTestId('touch-target')
      const t = { clientX: 20, clientY: 30, identifier: 0 }
      act(() => {
        fireEvent.touchStart(el, { touches: [t], changedTouches: [t] })
      })
      expect(onStart).toHaveBeenCalled()
      expect(Number.isFinite(onStart.mock.calls[0][0][0].percentX)).toBe(false)
    })

    test('使用默认 rate 时 touch 更新经节流仍可到达', () => {
      jest.useFakeTimers()
      const onStart = jest.fn()
      const { getByTestId } = render(<TouchHarness options={{ onStart /* rate 默认 16 */ }} />)
      const el = getByTestId('touch-target')
      const t = { clientX: 30, clientY: 40, identifier: 0 }
      act(() => {
        fireEvent.touchStart(el, { touches: [t], changedTouches: [t] })
      })
      act(() => {
        jest.advanceTimersByTime(32)
      })
      expect(onStart).toHaveBeenCalled()
    })
  })
})
