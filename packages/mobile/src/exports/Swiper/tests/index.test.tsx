import React from 'react'
import { render, cleanup, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import Swiper, { prefix } from '..'

jest.mock('../../useSize', () => ({
  __esModule: true,
  default: () => ({ width: 320, height: 240 }),
}))

const RECT = { width: 320, height: 240, top: 0, left: 0, bottom: 240, right: 320, x: 0, y: 0, toJSON: () => ({}) }

function mockBoundingRect() {
  jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
    return RECT as DOMRect
  })
}

function createTouch(target: Element, clientX: number, clientY: number) {
  return {
    clientX,
    clientY,
    identifier: 0,
    pageX: clientX,
    pageY: clientY,
    screenX: clientX,
    screenY: clientY,
    target,
  }
}

/** 横向触摸滑动（与 useTouch 一致，依赖 getBoundingClientRect） */
function touchSwipeHorizontal(root: HTMLElement, fromX: number, toX: number, y = 120) {
  const start = createTouch(root, fromX, y)
  fireEvent.touchStart(root, { touches: [start], targetTouches: [start], changedTouches: [start] })
  const mid = createTouch(root, (fromX + toX) / 2, y)
  fireEvent.touchMove(root, { touches: [mid], targetTouches: [mid], changedTouches: [mid] })
  const end = createTouch(root, toX, y)
  fireEvent.touchMove(root, { touches: [end], targetTouches: [end], changedTouches: [end] })
  fireEvent.touchEnd(root, { touches: [], changedTouches: [end] })
}

/** 纵向触摸滑动 */
function touchSwipeVertical(root: HTMLElement, fromY: number, toY: number, x = 160) {
  const start = createTouch(root, x, fromY)
  fireEvent.touchStart(root, { touches: [start], targetTouches: [start], changedTouches: [start] })
  const end = createTouch(root, x, toY)
  fireEvent.touchMove(root, { touches: [end], targetTouches: [end], changedTouches: [end] })
  fireEvent.touchEnd(root, { touches: [], changedTouches: [end] })
}

describe('Swiper', () => {
  beforeEach(() => {
    mockBoundingRect()
  })

  afterEach(() => {
    cleanup()
    jest.useRealTimers()
    jest.restoreAllMocks()
  })

  test('导出 prefix 与根节点类名一致', () => {
    expect(prefix).toBe('exd-swiper')
  })

  test('冒烟：渲染子节点与结构', () => {
    const { container, getByText } = render(
      <Swiper autoplay={false}>
        <div>第一张</div>
        <div>第二张</div>
      </Swiper>,
    )
    expect(container.querySelector('.exd-swiper')).toBeInTheDocument()
    expect(getByText('第一张')).toBeInTheDocument()
    expect(getByText('第二张')).toBeInTheDocument()
    expect(container.querySelectorAll('.exd-swiper-item').length).toBe(2)
  })

  test('默认展示内置指示器且首项为激活态', () => {
    const { container } = render(
      <Swiper autoplay={false} defaultValue={0}>
        <div>A</div>
        <div>B</div>
      </Swiper>,
    )
    expect(container.querySelector('.exd-swiper-indicator')).toBeInTheDocument()
    const dots = container.querySelectorAll('.exd-swiper-indicator-item')
    expect(dots.length).toBe(2)
    expect(dots[0]).toHaveClass('exd-swiper-indicator-item-active')
  })

  test('vertical 时根节点与指示器为纵向', () => {
    const { container } = render(
      <Swiper autoplay={false} vertical>
        <div>1</div>
        <div>2</div>
      </Swiper>,
    )
    const root = container.querySelector('.exd-swiper')!
    expect(root).toHaveClass('exd-swiper-vertical')
    expect(container.querySelector('.exd-swiper-indicator')).toBeInTheDocument()
  })

  test('子项不少于 3 且 loop=true 时根节点带 loop 类名', () => {
    const { container } = render(
      <Swiper autoplay={false} loop>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Swiper>,
    )
    expect(container.querySelector('.exd-swiper')).toHaveClass('exd-swiper-loop')
  })

  test('仅 2 个子项时即使 loop=true 也不启用循环类名', () => {
    const { container } = render(
      <Swiper autoplay={false} loop>
        <div>1</div>
        <div>2</div>
      </Swiper>,
    )
    expect(container.querySelector('.exd-swiper')).not.toHaveClass('exd-swiper-loop')
  })

  test('自定义 indicator 替换默认指示器', () => {
    const { container, getByTestId } = render(
      <Swiper autoplay={false} indicator={() => <div data-testid="custom-ind">x</div>}>
        <div>1</div>
        <div>2</div>
      </Swiper>,
    )
    expect(getByTestId('custom-ind')).toBeInTheDocument()
    expect(container.querySelector('.exd-swiper-indicator')).not.toBeInTheDocument()
  })

  test('indicator 接收 total 与 current（从 1 起）', () => {
    const indicator = jest.fn(() => <span data-testid="ind">i</span>)
    render(
      <Swiper autoplay={false} defaultValue={1} indicator={indicator}>
        <div>a</div>
        <div>b</div>
        <div>c</div>
      </Swiper>,
    )
    expect(indicator).toHaveBeenCalledWith(3, 2)
  })

  test('autoplay 为 false 时不自动切换', () => {
    jest.useFakeTimers()
    const { container } = render(
      <Swiper autoplay={false} interval={100}>
        <div>1</div>
        <div>2</div>
      </Swiper>,
    )
    act(() => {
      jest.advanceTimersByTime(500)
    })
    const dots = container.querySelectorAll('.exd-swiper-indicator-item')
    expect(dots[0]).toHaveClass('exd-swiper-indicator-item-active')
  })

  test('autoplay 定时器推进后切换到下一页并循环回第一页', () => {
    jest.useFakeTimers()
    const { container } = render(
      <Swiper autoplay interval={1000} defaultValue={0}>
        <div>1</div>
        <div>2</div>
      </Swiper>,
    )
    const dots = () => container.querySelectorAll('.exd-swiper-indicator-item')
    expect(dots()[0]).toHaveClass('exd-swiper-indicator-item-active')
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(dots()[1]).toHaveClass('exd-swiper-indicator-item-active')
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(dots()[0]).toHaveClass('exd-swiper-indicator-item-active')
  })

  test('swipeable 为 false 时触摸不切换页', () => {
    const { container } = render(
      <Swiper autoplay={false} swipeable={false} thresholdPercent={10}>
        <div>1</div>
        <div>2</div>
      </Swiper>,
    )
    const root = container.querySelector('.exd-swiper') as HTMLElement
    touchSwipeHorizontal(root, 200, 20)
    expect(container.querySelector('.exd-swiper-indicator-item-active')).toBe(
      container.querySelectorAll('.exd-swiper-indicator-item')[0],
    )
  })

  test('横向左滑（负偏移）超过阈值切换到下一页', () => {
    const { container } = render(
      <Swiper autoplay={false} thresholdPercent={25} thresholdPixel={50}>
        <div>1</div>
        <div>2</div>
      </Swiper>,
    )
    const root = container.querySelector('.exd-swiper') as HTMLElement
    touchSwipeHorizontal(root, 200, 40)
    const dots = container.querySelectorAll('.exd-swiper-indicator-item')
    expect(dots[1]).toHaveClass('exd-swiper-indicator-item-active')
  })

  test('横向右滑超过阈值切换到上一页（非循环边界内）', () => {
    const { container } = render(
      <Swiper autoplay={false} defaultValue={1} thresholdPercent={25}>
        <div>1</div>
        <div>2</div>
      </Swiper>,
    )
    const root = container.querySelector('.exd-swiper') as HTMLElement
    touchSwipeHorizontal(root, 80, 220)
    const dots = container.querySelectorAll('.exd-swiper-indicator-item')
    expect(dots[0]).toHaveClass('exd-swiper-indicator-item-active')
  })

  test('滑动未达阈值时回弹不切换（仍停留在当前页）', () => {
    const { container } = render(
      <Swiper autoplay={false} defaultValue={0} thresholdPercent={50} thresholdPixel={500}>
        <div>1</div>
        <div>2</div>
      </Swiper>,
    )
    const root = container.querySelector('.exd-swiper') as HTMLElement
    touchSwipeHorizontal(root, 160, 140)
    expect(container.querySelectorAll('.exd-swiper-indicator-item')[0]).toHaveClass('exd-swiper-indicator-item-active')
  })

  test('非循环首张右滑越界不切换', () => {
    const { container } = render(
      <Swiper autoplay={false} defaultValue={0} thresholdPercent={15}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Swiper>,
    )
    const root = container.querySelector('.exd-swiper') as HTMLElement
    touchSwipeHorizontal(root, 80, 260)
    expect(container.querySelectorAll('.exd-swiper-indicator-item')[0]).toHaveClass('exd-swiper-indicator-item-active')
  })

  test('非循环末张左滑越界不切换', () => {
    const { container } = render(
      <Swiper autoplay={false} defaultValue={2} thresholdPercent={15}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Swiper>,
    )
    const root = container.querySelector('.exd-swiper') as HTMLElement
    touchSwipeHorizontal(root, 240, 40)
    expect(container.querySelectorAll('.exd-swiper-indicator-item')[2]).toHaveClass('exd-swiper-indicator-item-active')
  })

  test('循环模式下三张可左滑连续切换', () => {
    const { container } = render(
      <Swiper autoplay={false} loop thresholdPercent={20}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Swiper>,
    )
    const root = container.querySelector('.exd-swiper') as HTMLElement
    touchSwipeHorizontal(root, 200, 50)
    expect(container.querySelectorAll('.exd-swiper-indicator-item')[1]).toHaveClass('exd-swiper-indicator-item-active')
  })

  test('纵向模式：上滑超过阈值切换（使用 offsetPercentY）', () => {
    const { container } = render(
      <Swiper autoplay={false} vertical thresholdPercent={20}>
        <div>1</div>
        <div>2</div>
      </Swiper>,
    )
    const root = container.querySelector('.exd-swiper') as HTMLElement
    touchSwipeVertical(root, 180, 40)
    expect(container.querySelectorAll('.exd-swiper-indicator-item')[1]).toHaveClass('exd-swiper-indicator-item-active')
  })

  test('像素阈值：位移超过 thresholdPixel 即切换', () => {
    const { container } = render(
      <Swiper autoplay={false} thresholdPercent={99} thresholdPixel={80}>
        <div>1</div>
        <div>2</div>
      </Swiper>,
    )
    const root = container.querySelector('.exd-swiper') as HTMLElement
    touchSwipeHorizontal(root, 200, 100)
    expect(container.querySelectorAll('.exd-swiper-indicator-item')[1]).toHaveClass('exd-swiper-indicator-item-active')
  })

  test('受控模式：value 与 onChange 同步', () => {
    const onChange = jest.fn()
    const { rerender } = render(
      <Swiper autoplay={false} value={0} onChange={onChange}>
        <div>1</div>
        <div>2</div>
      </Swiper>,
    )
    const root = document.querySelector('.exd-swiper') as HTMLElement
    touchSwipeHorizontal(root, 200, 40)
    expect(onChange).toHaveBeenCalled()
    const last = onChange.mock.calls[onChange.mock.calls.length - 1][0]
    expect(last).toBe(1)
    rerender(
      <Swiper autoplay={false} value={1} onChange={onChange}>
        <div>1</div>
        <div>2</div>
      </Swiper>,
    )
    expect(document.querySelectorAll('.exd-swiper-indicator-item')[1]).toHaveClass('exd-swiper-indicator-item-active')
  })

  test('非受控 defaultValue 仅作初始值', () => {
    const { container } = render(
      <Swiper autoplay={false} defaultValue={1} thresholdPercent={20}>
        <div>1</div>
        <div>2</div>
      </Swiper>,
    )
    expect(container.querySelectorAll('.exd-swiper-indicator-item')[1]).toHaveClass('exd-swiper-indicator-item-active')
  })

  test('speed 与 easing 传入不崩溃', () => {
    const { container } = render(
      <Swiper autoplay={false} speed={100} easing={(t) => t}>
        <div>1</div>
        <div>2</div>
      </Swiper>,
    )
    expect(container.querySelector('.exd-swiper-wrapper')).toBeInTheDocument()
  })

  test('rate 非 0 时节流下触摸仍可切换', () => {
    jest.useFakeTimers()
    const { container } = render(
      <Swiper autoplay={false} rate={32} thresholdPercent={20}>
        <div>1</div>
        <div>2</div>
      </Swiper>,
    )
    const root = container.querySelector('.exd-swiper') as HTMLElement
    const y = 120
    const start = createTouch(root, 200, y)
    fireEvent.touchStart(root, { touches: [start], targetTouches: [start], changedTouches: [start] })
    act(() => {
      jest.advanceTimersByTime(32)
    })
    const mid = createTouch(root, 120, y)
    fireEvent.touchMove(root, { touches: [mid], targetTouches: [mid], changedTouches: [mid] })
    act(() => {
      jest.advanceTimersByTime(32)
    })
    const end = createTouch(root, 50, y)
    fireEvent.touchMove(root, { touches: [end], targetTouches: [end], changedTouches: [end] })
    act(() => {
      jest.advanceTimersByTime(32)
    })
    fireEvent.touchEnd(root, { touches: [], changedTouches: [end] })
    act(() => {
      jest.advanceTimersByTime(32)
    })
    expect(container.querySelectorAll('.exd-swiper-indicator-item')[1]).toHaveClass('exd-swiper-indicator-item-active')
  })

  test('stopPropagation 与 preventDefault 为 true 时不抛错', () => {
    const { container } = render(
      <Swiper autoplay={false} stopPropagation preventDefault thresholdPercent={20}>
        <div>1</div>
        <div>2</div>
      </Swiper>,
    )
    const root = container.querySelector('.exd-swiper') as HTMLElement
    touchSwipeHorizontal(root, 200, 50)
    expect(container.querySelector('.exd-swiper')).toBeInTheDocument()
  })

  test('单子项仍渲染一项与指示器', () => {
    const { container, getByText } = render(
      <Swiper autoplay={false}>
        <div>唯一</div>
      </Swiper>,
    )
    expect(getByText('唯一')).toBeInTheDocument()
    expect(container.querySelectorAll('.exd-swiper-item').length).toBe(1)
    expect(container.querySelectorAll('.exd-swiper-indicator-item').length).toBe(1)
  })

  test('children 为空时不崩溃', () => {
    const { container } = render(<Swiper autoplay={false}>{null}</Swiper>)
    expect(container.querySelector('.exd-swiper')).toBeInTheDocument()
    expect(container.querySelectorAll('.exd-swiper-item').length).toBe(0)
  })

  test('单个子节点（非数组）与 filter 掉空子节点', () => {
    const { container } = render(
      <Swiper autoplay={false}>
        {null}
        <div>仅有效</div>
      </Swiper>,
    )
    expect(container.querySelectorAll('.exd-swiper-item').length).toBe(1)
    expect(container.querySelector('.exd-swiper')).toHaveTextContent('仅有效')
  })

  test('ref 挂载到根容器', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <Swiper ref={ref} autoplay={false}>
        <div>1</div>
      </Swiper>,
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveClass('exd-swiper')
  })

  test('循环模式下受控从首切到尾再切回首触发 valueLoopOffset 修正', () => {
    const { rerender } = render(
      <Swiper autoplay={false} loop value={0} onChange={() => {}}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Swiper>,
    )
    rerender(
      <Swiper autoplay={false} loop value={2} onChange={() => {}}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Swiper>,
    )
    rerender(
      <Swiper autoplay={false} loop value={0} onChange={() => {}}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Swiper>,
    )
    expect(document.querySelector('.exd-swiper')).toHaveClass('exd-swiper-loop')
  })

  test('触摸开始时暂停 autoplay，结束后恢复', () => {
    jest.useFakeTimers()
    const { container } = render(
      <Swiper autoplay interval={500} thresholdPercent={20}>
        <div>1</div>
        <div>2</div>
      </Swiper>,
    )
    const root = container.querySelector('.exd-swiper') as HTMLElement
    act(() => {
      jest.advanceTimersByTime(500)
    })
    expect(container.querySelectorAll('.exd-swiper-indicator-item')[1]).toHaveClass('exd-swiper-indicator-item-active')
    touchSwipeHorizontal(root, 200, 50)
    act(() => {
      jest.advanceTimersByTime(500)
    })
    expect(container.querySelectorAll('.exd-swiper-indicator-item')[0]).toHaveClass('exd-swiper-indicator-item-active')
  })

  test('wrapper 使用 translateX（非 vertical）', () => {
    const { container } = render(
      <Swiper autoplay={false}>
        <div>1</div>
      </Swiper>,
    )
    const wrap = container.querySelector('.exd-swiper-wrapper') as HTMLElement
    expect(wrap.style.transform).toContain('translateX')
  })

  test('vertical 时 wrapper 使用 translateY', () => {
    const { container } = render(
      <Swiper autoplay={false} vertical>
        <div>1</div>
      </Swiper>,
    )
    const wrap = container.querySelector('.exd-swiper-wrapper') as HTMLElement
    expect(wrap.style.transform).toContain('translateY')
  })

  test('纵向且循环时子项使用 top 百分比定位', () => {
    const { container } = render(
      <Swiper autoplay={false} vertical loop>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Swiper>,
    )
    const item = container.querySelector('.exd-swiper-item') as HTMLElement
    expect(item.style.top).toMatch(/%$/)
    expect(item.style.left).toBe('')
  })

  test('循环模式下大幅拖动使 currentTweenIdx 为负时 loopSort 修正负 range', () => {
    const { container } = render(
      <Swiper autoplay={false} loop thresholdPercent={99} thresholdPixel={999}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Swiper>,
    )
    const root = container.querySelector('.exd-swiper') as HTMLElement
    const y = 120
    const s = createTouch(root, 10, y)
    fireEvent.touchStart(root, { touches: [s], targetTouches: [s], changedTouches: [s] })
    const m = createTouch(root, 350, y)
    act(() => {
      fireEvent.touchMove(root, { touches: [m], targetTouches: [m], changedTouches: [m] })
    })
    expect(container.querySelector('.exd-swiper')).toHaveClass('exd-swiper-loop')
  })

  test('拖动中 tween 变化触发 debounce 时若仍在拖动则跳过重置 offset', () => {
    jest.useFakeTimers()
    const { container } = render(
      <Swiper autoplay={false} interval={80} thresholdPercent={40}>
        <div>1</div>
        <div>2</div>
      </Swiper>,
    )
    const root = container.querySelector('.exd-swiper') as HTMLElement
    const y = 120
    const start = createTouch(root, 160, y)
    fireEvent.touchStart(root, { touches: [start], targetTouches: [start], changedTouches: [start] })
    const move = createTouch(root, 140, y)
    fireEvent.touchMove(root, { touches: [move], targetTouches: [move], changedTouches: [move] })
    act(() => {
      jest.advanceTimersByTime(100)
    })
    expect(container.querySelector('.exd-swiper')).toBeInTheDocument()
  })
})
