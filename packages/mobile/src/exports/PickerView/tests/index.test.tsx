import React, { createRef } from 'react'
import { render, fireEvent, cleanup, act, waitFor } from '@testing-library/react'
import { act as actReact } from 'react'
import '@testing-library/jest-dom'
import PickerView from '..'

const options = [
  { label: '甲', value: 'a' },
  { label: '乙', value: 'b' },
  { label: '丙', value: 'c' },
]

function mockItemHeight(height: number) {
  const orig = HTMLElement.prototype.getBoundingClientRect
  jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
    if (this.classList.contains('exd-picker-view-item')) {
      return {
        width: 100,
        height,
        top: 0,
        left: 0,
        bottom: height,
        right: 100,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect
    }
    return orig.call(this)
  })
}

describe('PickerView', () => {
  afterEach(() => {
    jest.useRealTimers()
    jest.restoreAllMocks()
    cleanup()
  })

  test('冒烟：默认渲染根节点与选项文案', () => {
    const { container, getByText } = render(<PickerView options={options} defaultValue="a" />)
    expect(container.querySelector('.exd-picker-view')).toBeInTheDocument()
    expect(getByText('乙')).toBeInTheDocument()
  })

  test('scaleSelected 为 true 时当前值项带激活类名', () => {
    const { container } = render(<PickerView options={options} defaultValue="b" scaleSelected />)
    const active = container.querySelector('.exd-picker-view-item--active')
    expect(active?.textContent).toBe('乙')
  })

  test('scaleSelected 为 false 时不出现激活类名', () => {
    const { container } = render(<PickerView options={options} defaultValue="b" scaleSelected={false} />)
    expect(container.querySelector('.exd-picker-view-item--active')).not.toBeInTheDocument()
  })

  test('数值型 value 与选项 value 比较时激活态正确', () => {
    const numOpts = [
      { label: '一', value: 1 },
      { label: '二', value: 2 },
    ]
    const { container } = render(<PickerView options={numOpts} value={2} onChange={() => {}} scaleSelected />)
    expect(container.querySelector('.exd-picker-view-item--active')?.textContent).toBe('二')
  })

  test('自定义 className 合并到根节点', () => {
    const { container } = render(<PickerView options={options} defaultValue="a" className="pv-custom" />)
    expect(container.querySelector('.exd-picker-view')).toHaveClass('pv-custom')
  })

  test('forwardedRef 指向根元素', () => {
    const ref = createRef<HTMLDivElement>()
    const { container } = render(<PickerView ref={ref} options={options} defaultValue="a" />)
    expect(ref.current).toBe(container.querySelector('.exd-picker-view'))
  })

  test('rows 小于 3 或偶数时 console.error 警告且仍渲染', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const { container: c1 } = render(<PickerView options={options} defaultValue="a" rows={2} />)
    expect(spy).toHaveBeenCalled()
    expect(c1.querySelector('.exd-picker-view-content')).toBeInTheDocument()

    spy.mockClear()
    const { container: c2 } = render(<PickerView options={options} defaultValue="a" rows={4} />)
    expect(spy).toHaveBeenCalled()
    expect(c2.querySelector('.exd-picker-view-content')).toBeInTheDocument()
    spy.mockRestore()
  })

  test('rows 为合法奇数（如 5）时内容区高度随行数变化', () => {
    const { container } = render(<PickerView options={options} defaultValue="a" rows={5} />)
    const content = container.querySelector('.exd-picker-view-content') as HTMLElement
    expect(content).toBeTruthy()
    expect(content.style.height).toBe('250px')
  })

  test('非受控 defaultValue 决定高亮项', () => {
    const { container } = render(<PickerView options={options} defaultValue="c" scaleSelected />)
    expect(container.querySelector('.exd-picker-view-item--active')?.textContent).toBe('丙')
  })

  test('受控 value 变更时高亮与滚动同步', () => {
    const { container, rerender } = render(<PickerView options={options} value="a" onChange={() => {}} scaleSelected />)
    expect(container.querySelector('.exd-picker-view-item--active')?.textContent).toBe('甲')
    rerender(<PickerView options={options} value="c" onChange={() => {}} scaleSelected />)
    expect(container.querySelector('.exd-picker-view-item--active')?.textContent).toBe('丙')
  })

  test('受控 value 不在 options 中时不崩溃', () => {
    const { container } = render(<PickerView options={options} value="missing" onChange={() => {}} />)
    expect(container.querySelector('.exd-picker-view')).toBeInTheDocument()
  })

  test('options 为空数组仍可渲染结构', () => {
    const { container } = render(<PickerView options={[]} />)
    expect(container.querySelector('.exd-picker-view-content')).toBeInTheDocument()
  })

  test('滚动结束 debounce 后 onChange 传出新值与索引', () => {
    jest.useFakeTimers()
    const onChange = jest.fn()
    const { container } = render(<PickerView options={options} defaultValue="a" onChange={onChange} />)
    const content = container.querySelector('.exd-picker-view-content') as HTMLDivElement
    content.scrollTop = 50
    fireEvent.scroll(content)
    actReact(() => {
      jest.advanceTimersByTime(150)
    })
    expect(onChange).toHaveBeenCalled()
    const last = onChange.mock.calls[onChange.mock.calls.length - 1]
    expect(last[0]).toBe('b')
    expect(last[1]).toBe(1)
  })

  test('scrollTop 已对齐到行高时不触发 Tween 且不重复 onChange', () => {
    jest.useFakeTimers()
    const onChange = jest.fn()
    const { container } = render(<PickerView options={options} defaultValue="a" onChange={onChange} />)
    const content = container.querySelector('.exd-picker-view-content') as HTMLDivElement
    content.scrollTop = 0
    fireEvent.scroll(content)
    actReact(() => {
      jest.advanceTimersByTime(150)
    })
    expect(onChange).not.toHaveBeenCalled()
  })

  test('非整数 scrollTop 经 debounce 后 Tween 将 scrollTop 回正到行高（真实计时器）', async () => {
    mockItemHeight(50)
    const onChange = jest.fn()
    const { container } = render(<PickerView options={options} defaultValue="a" onChange={onChange} />)
    const content = container.querySelector('.exd-picker-view-content') as HTMLDivElement
    content.scrollTop = 73
    fireEvent.scroll(content)
    await waitFor(
      () => {
        expect(onChange).toHaveBeenCalled()
        expect(content.scrollTop).toBe(50)
      },
      { timeout: 3000 },
    )
  })

  test('触摸滚动过程中 debounce 触发时因 touching 跳过，松手后再次 handleScroll 生效', () => {
    jest.useFakeTimers()
    const onChange = jest.fn()
    const { container } = render(<PickerView options={options} defaultValue="a" onChange={onChange} />)
    const content = container.querySelector('.exd-picker-view-content') as HTMLDivElement
    fireEvent.touchStart(content)
    content.scrollTop = 50
    fireEvent.scroll(content)
    actReact(() => {
      jest.advanceTimersByTime(150)
    })
    expect(onChange).not.toHaveBeenCalled()
    fireEvent.touchEnd(content)
    actReact(() => {
      jest.advanceTimersByTime(150)
    })
    expect(onChange).toHaveBeenCalled()
  })

  test('完整触摸序列：touchStart → touchMove → touchEnd', () => {
    jest.useFakeTimers()
    const { container } = render(<PickerView options={options} defaultValue="a" onChange={jest.fn()} />)
    const content = container.querySelector('.exd-picker-view-content') as HTMLDivElement
    fireEvent.touchStart(content, { touches: [{ clientX: 0, clientY: 100 }] })
    fireEvent.touchMove(content, { touches: [{ clientX: 0, clientY: 80 }] })
    fireEvent.touchEnd(content, { changedTouches: [{ clientX: 0, clientY: 80 }] })
    actReact(() => {
      jest.advanceTimersByTime(150)
    })
    expect(container.querySelector('.exd-picker-view')).toBeInTheDocument()
  })

  test('getBoundingClientRect 有高度时 resize 逻辑更新 itemHeight 并随后触发滚动同步', () => {
    jest.useFakeTimers()
    mockItemHeight(40)
    const onChange = jest.fn()
    const { container } = render(<PickerView options={options} defaultValue="b" onChange={onChange} />)
    actReact(() => {
      jest.advanceTimersByTime(150)
    })
    actReact(() => {
      jest.advanceTimersByTime(150)
    })
    const content = container.querySelector('.exd-picker-view-content') as HTMLElement
    expect(content.style.height).toContain('px')
    actReact(() => {
      window.dispatchEvent(new Event('resize'))
    })
    actReact(() => {
      jest.advanceTimersByTime(150)
    })
    actReact(() => {
      jest.advanceTimersByTime(150)
    })
    expect(container.querySelector('.exd-picker-view')).toBeInTheDocument()
  })

  test('根节点无 addEventListener 时不注册 resize 仍可卸载', () => {
    const root = globalThis as typeof globalThis & { addEventListener?: typeof window.addEventListener }
    const orig = root.addEventListener
    // @ts-expect-error 模拟极端环境
    root.addEventListener = undefined
    const { unmount } = render(<PickerView options={options} defaultValue="a" />)
    unmount()
    root.addEventListener = orig
  })

  test('options 变更后仍按受控 value 同步', () => {
    const next = [
      { label: 'x', value: 'x' },
      { label: 'y', value: 'y' },
    ]
    const { container, rerender } = render(<PickerView options={options} value="b" onChange={() => {}} scaleSelected />)
    rerender(<PickerView options={next} value="y" onChange={() => {}} scaleSelected />)
    expect(container.querySelector('.exd-picker-view-item--active')?.textContent).toBe('y')
  })

  test('Tween 更新过程中卸载时 update 回调安全退出', async () => {
    mockItemHeight(50)
    const { container, unmount } = render(<PickerView options={options} defaultValue="a" onChange={jest.fn()} />)
    const content = container.querySelector('.exd-picker-view-content') as HTMLDivElement
    content.scrollTop = 73
    fireEvent.scroll(content)
    unmount()
    await actReact(async () => {
      await new Promise((r) => setTimeout(r, 250))
    })
  })

  test('defaultValue 不在 options 中时挂载同步 effect 不写入 scrollTop', () => {
    const { container } = render(<PickerView options={options} defaultValue="not-in-list" />)
    expect(container.querySelector('.exd-picker-view')).toBeInTheDocument()
  })

  test('未传 options 时等价于空列表', () => {
    const { container } = render(<PickerView />)
    expect(container.querySelector('.exd-picker-view-content')).toBeInTheDocument()
  })

  test('受控模式下优先用 value 计算 initialIndex', () => {
    const { container } = render(
      <PickerView options={options} value="c" defaultValue="a" onChange={() => {}} scaleSelected />,
    )
    expect(container.querySelector('.exd-picker-view-item--active')?.textContent).toBe('丙')
  })
})
