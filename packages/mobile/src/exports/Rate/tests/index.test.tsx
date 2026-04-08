import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import Rate, { prefix } from '..'

describe('Rate', () => {
  beforeEach(() => {
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      return {
        width: 200,
        height: 40,
        top: 0,
        left: 0,
        bottom: 40,
        right: 200,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
    jest.useRealTimers()
  })

  test('冒烟：默认渲染根节点存在', () => {
    const { container } = render(<Rate />)
    expect(container.querySelector('.exd-rate')).toBeInTheDocument()
  })

  test('导出 prefix 与根类名一致', () => {
    expect(prefix).toBe('exd-rate')
  })

  test('props：count 决定 exd-rate-box 数量', () => {
    const { container } = render(<Rate count={3} />)
    expect(container.querySelectorAll('.exd-rate-box').length).toBe(3)
  })

  test('props：character 自定义展示字符', () => {
    const { getAllByText } = render(<Rate character={<span>星</span>} />)
    expect(getAllByText('星').length).toBe(5)
  })

  test('props：disabled 根节点带禁用类名', () => {
    const { container } = render(<Rate disabled />)
    expect(container.querySelector('.exd-rate')).toHaveClass('exd-rate-disabled')
  })

  test('props：readOnly 根节点带只读类名', () => {
    const { container } = render(<Rate readOnly />)
    expect(container.querySelector('.exd-rate')).toHaveClass('exd-rate-readonly')
  })

  test('props：size 为 small / default / large 时尺寸类名', () => {
    const { container: small } = render(<Rate size="small" />)
    expect(small.querySelector('.exd-rate')).toHaveClass('exd-rate-size-small')

    const { container: def } = render(<Rate size="default" />)
    expect(def.querySelector('.exd-rate')).toHaveClass('exd-rate-size-default')

    const { container: large } = render(<Rate size="large" />)
    expect(large.querySelector('.exd-rate')).toHaveClass('exd-rate-size-large')
  })

  test('props：className 合并到根节点', () => {
    const { container } = render(<Rate className="custom-rate" />)
    expect(container.querySelector('.exd-rate')).toHaveClass('custom-rate')
  })

  test('ref：forwardRef 指向容器 div', () => {
    const ref = React.createRef<HTMLDivElement>()
    const { container } = render(<Rate ref={ref} />)
    expect(ref.current).toBe(container.querySelector('.exd-rate'))
  })

  test('交互：鼠标按下触发 onStart 并更新评分', () => {
    const onChange = jest.fn()
    const { container } = render(<Rate onChange={onChange} defaultValue={0} />)
    const root = container.querySelector('.exd-rate')!
    // 宽度 200，clientX=120 → 60% → 满星 round(3)=3
    fireEvent.mouseDown(root, { clientX: 120, clientY: 20 })
    expect(onChange).toHaveBeenCalledWith(3)
  })

  test('交互：mouseDown 后 mouseMove 在 document 上拖拽更新评分', () => {
    jest.useFakeTimers()
    const onChange = jest.fn()
    const { container } = render(<Rate onChange={onChange} defaultValue={0} />)
    const root = container.querySelector('.exd-rate')!

    act(() => {
      fireEvent.mouseDown(root, { clientX: 0, clientY: 20 })
    })
    act(() => {
      fireEvent.mouseMove(document.documentElement, { clientX: 200, clientY: 20 })
      jest.advanceTimersByTime(20)
    })
    expect(onChange).toHaveBeenCalledWith(5)

    act(() => {
      fireEvent.mouseUp(document.documentElement, { clientX: 200, clientY: 20 })
    })
  })

  test('交互：mouseDown 后 mouseUp 完成一次指针手势', () => {
    jest.useFakeTimers()
    const onChange = jest.fn()
    const { container } = render(<Rate onChange={onChange} defaultValue={0} />)
    const root = container.querySelector('.exd-rate')!

    act(() => {
      fireEvent.mouseDown(root, { clientX: 80, clientY: 20 })
    })
    expect(onChange).toHaveBeenCalledWith(2)

    act(() => {
      fireEvent.mouseUp(document.documentElement, { clientX: 80, clientY: 20 })
    })
  })

  test('allowHalf：半星路径下 onChange 为 0.5 步进', () => {
    const onChange = jest.fn()
    const { container } = render(<Rate allowHalf onChange={onChange} defaultValue={0} />)
    const root = container.querySelector('.exd-rate')!
    // 50% → percentCount=2.5 → round(5)/2=2.5
    fireEvent.mouseDown(root, { clientX: 100, clientY: 20 })
    expect(onChange).toHaveBeenCalledWith(2.5)
  })

  test('allowHalf：渲染半星字符节点', () => {
    const { container } = render(<Rate allowHalf defaultValue={2.5} onChange={() => {}} />)
    expect(container.querySelectorAll('.exd-rate-character-half').length).toBe(5)
  })

  test('allowHalf：拖拽过程中可得到半星', () => {
    jest.useFakeTimers()
    const onChange = jest.fn()
    const { container } = render(<Rate allowHalf onChange={onChange} defaultValue={0} />)
    const root = container.querySelector('.exd-rate')!

    act(() => {
      fireEvent.mouseDown(root, { clientX: 0, clientY: 20 })
    })
    act(() => {
      fireEvent.mouseMove(document.documentElement, { clientX: 100, clientY: 20 })
      jest.advanceTimersByTime(20)
    })
    expect(onChange).toHaveBeenLastCalledWith(2.5)
  })

  test('disabled：不触发 onChange', () => {
    const onChange = jest.fn()
    const { container } = render(<Rate disabled onChange={onChange} defaultValue={0} />)
    fireEvent.mouseDown(container.querySelector('.exd-rate')!, { clientX: 100, clientY: 20 })
    expect(onChange).not.toHaveBeenCalled()
  })

  test('readOnly：不触发 onChange', () => {
    const onChange = jest.fn()
    const { container } = render(<Rate readOnly onChange={onChange} defaultValue={0} />)
    fireEvent.mouseDown(container.querySelector('.exd-rate')!, { clientX: 100, clientY: 20 })
    expect(onChange).not.toHaveBeenCalled()
  })

  test('readOnly：onStart 未置 touchingRef 时后续 mouseMove 走 applyTouch 早退', () => {
    jest.useFakeTimers()
    const onChange = jest.fn()
    const { container } = render(<Rate readOnly onChange={onChange} defaultValue={2} />)
    const root = container.querySelector('.exd-rate')!

    act(() => {
      fireEvent.mouseDown(root, { clientX: 20, clientY: 20 })
    })
    act(() => {
      fireEvent.mouseMove(document.documentElement, { clientX: 160, clientY: 20 })
      jest.advanceTimersByTime(20)
    })
    expect(onChange).not.toHaveBeenCalled()
  })

  test('非受控：defaultValue 决定激活字符数量', () => {
    const { container } = render(<Rate defaultValue={3} />)
    expect(container.querySelectorAll('.exd-rate-character-active').length).toBe(3)
  })

  test('受控：value 与 rerender 决定激活数量', () => {
    const { container, rerender } = render(<Rate value={2} onChange={() => {}} />)
    expect(container.querySelectorAll('.exd-rate-character-active').length).toBe(2)
    rerender(<Rate value={4} onChange={() => {}} />)
    expect(container.querySelectorAll('.exd-rate-character-active').length).toBe(4)
  })

  test('边界：value 为 0 时无激活字符', () => {
    const { container } = render(<Rate value={0} onChange={() => {}} />)
    expect(container.querySelectorAll('.exd-rate-character-active').length).toBe(0)
  })

  test('边界：value 等于 count 时全部激活', () => {
    const { container } = render(<Rate count={4} value={4} onChange={() => {}} />)
    expect(container.querySelectorAll('.exd-rate-character-active').length).toBe(4)
  })

  test('边界：拖拽超出宽度时 clamp 到 count', () => {
    const onChange = jest.fn()
    const { container } = render(<Rate count={5} onChange={onChange} defaultValue={0} />)
    const root = container.querySelector('.exd-rate')!
    fireEvent.mouseDown(root, { clientX: 999, clientY: 20 })
    expect(onChange).toHaveBeenCalledWith(5)
  })

  test('边界：拖拽到最左侧 clamp 为 0', () => {
    const onChange = jest.fn()
    const { container } = render(<Rate onChange={onChange} defaultValue={5} />)
    const root = container.querySelector('.exd-rate')!
    fireEvent.mouseDown(root, { clientX: 0, clientY: 20 })
    expect(onChange).toHaveBeenCalledWith(0)
  })

  test('节流：多次 mouseMove 后 mouseUp，尾随定时器不应在松手后再次改值', () => {
    jest.useFakeTimers()
    const onChange = jest.fn()
    const { container } = render(<Rate onChange={onChange} defaultValue={0} />)
    const root = container.querySelector('.exd-rate')!

    act(() => {
      fireEvent.mouseDown(root, { clientX: 20, clientY: 20 })
    })
    act(() => {
      fireEvent.mouseMove(document.documentElement, { clientX: 40, clientY: 20 })
      fireEvent.mouseMove(document.documentElement, { clientX: 60, clientY: 20 })
      fireEvent.mouseMove(document.documentElement, { clientX: 90, clientY: 20 })
    })
    act(() => {
      fireEvent.mouseUp(document.documentElement, { clientX: 90, clientY: 20 })
    })
    const callsAfterUp = onChange.mock.calls.length

    act(() => {
      jest.runOnlyPendingTimers()
    })
    expect(onChange.mock.calls.length).toBe(callsAfterUp)
  })
})
