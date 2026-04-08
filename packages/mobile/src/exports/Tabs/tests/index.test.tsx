import React from 'react'
import { render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Tabs from '..'

const defaultOptions = [
  { label: '选项一', value: 'tab1' },
  { label: '选项二', value: 'tab2' },
  { label: '选项三', value: 'tab3' },
]

function mockTabMetrics(container: HTMLElement, activeIndex: number) {
  const items = container.querySelectorAll<HTMLElement>('.exd-tabs__item')
  items.forEach((el, i) => {
    jest.spyOn(el, 'offsetLeft', 'get').mockReturnValue(i * 80)
    jest.spyOn(el, 'offsetWidth', 'get').mockReturnValue(60)
  })
  const indicator = container.querySelector<HTMLElement>('.exd-tabs__indicator')
  if (indicator) {
    jest.spyOn(indicator, 'offsetWidth', 'get').mockReturnValue(24)
  }
  if (items[activeIndex]) {
    jest.spyOn(items[activeIndex], 'offsetLeft', 'get').mockReturnValue(activeIndex * 80)
    jest.spyOn(items[activeIndex], 'offsetWidth', 'get').mockReturnValue(60)
  }
}

describe('Tabs', () => {
  const user = userEvent.setup()

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('冒烟：默认渲染不崩溃', () => {
    const { container } = render(<Tabs options={defaultOptions} defaultValue="tab1" />)
    expect(container.querySelector('.exd-tabs')).toBeInTheDocument()
  })

  test('渲染全部选项文案', () => {
    const { getByText } = render(<Tabs options={defaultOptions} defaultValue="tab1" />)
    expect(getByText('选项一')).toBeInTheDocument()
    expect(getByText('选项二')).toBeInTheDocument()
    expect(getByText('选项三')).toBeInTheDocument()
  })

  test('options 为空数组时不抛错', () => {
    expect(() => render(<Tabs options={[]} />)).not.toThrow()
  })

  test('未传 display 且选项多于 3 个时默认使用 scroll 布局', () => {
    const many = [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
      { label: 'C', value: 'c' },
      { label: 'D', value: 'd' },
    ]
    const { container } = render(<Tabs options={many} defaultValue="a" />)
    expect(container.querySelector('.exd-tabs--scroll')).toBeInTheDocument()
  })

  test('display="flex" 使用 flex 布局', () => {
    const { container } = render(<Tabs options={defaultOptions} display="flex" defaultValue="tab1" />)
    expect(container.querySelector('.exd-tabs--flex')).toBeInTheDocument()
  })

  test('display="scroll" 使用滚动布局', () => {
    const { container } = render(<Tabs options={defaultOptions} display="scroll" defaultValue="tab1" />)
    expect(container.querySelector('.exd-tabs--scroll')).toBeInTheDocument()
  })

  test('data 与 options 等价', () => {
    const { getByText } = render(<Tabs data={defaultOptions} defaultValue="tab1" />)
    expect(getByText('选项一')).toBeInTheDocument()
  })

  test('className 合并到根节点', () => {
    const { container } = render(<Tabs options={defaultOptions} className="my-tabs" defaultValue="tab1" />)
    expect(container.querySelector('.exd-tabs')).toHaveClass('my-tabs')
  })

  test('ellipsis 传给 TabItem（flex 模式）', () => {
    const { container } = render(<Tabs options={defaultOptions} ellipsis defaultValue="tab1" />)
    expect(container.querySelector('.exd-tabs__item--ellipsis')).toBeInTheDocument()
  })

  test('icon 为 React 节点时渲染', () => {
    const optionsWithIcon = [
      { label: '首页', value: 'home', icon: <span data-testid="icon-home">🏠</span> },
      { label: '二', value: 'b' },
      { label: '三', value: 'c' },
    ]
    const { container } = render(<Tabs options={optionsWithIcon} defaultValue="home" />)
    expect(container.querySelector('[data-testid="icon-home"]')).toBeInTheDocument()
  })

  test('icon 为函数时渲染', () => {
    const optionsWithIconFn = [
      {
        label: '项',
        value: 'x',
        icon: () => <span data-testid="icon-fn">fn</span>,
      },
      { label: '二', value: 'b' },
      { label: '三', value: 'c' },
    ]
    const { container } = render(<Tabs options={optionsWithIconFn} defaultValue="x" />)
    expect(container.querySelector('[data-testid="icon-fn"]')).toBeInTheDocument()
  })

  test('点击切换 tab 触发 onChange', async () => {
    const handleChange = jest.fn()
    const { getByText, container } = render(
      <Tabs options={defaultOptions} defaultValue="tab1" onChange={handleChange} />,
    )
    mockTabMetrics(container, 0)
    await user.click(getByText('选项二'))
    expect(handleChange).toHaveBeenCalledWith('tab2')
  })

  test('禁用项点击不触发 onChange', async () => {
    const handleChange = jest.fn()
    const options = [
      { label: '正常', value: 'normal' },
      { label: '禁用', value: 'disabled', disabled: true },
      { label: '三', value: 't' },
    ]
    const { getByText } = render(<Tabs options={options} defaultValue="normal" onChange={handleChange} />)
    await user.click(getByText('禁用'))
    expect(handleChange).not.toHaveBeenCalled()
  })

  test('禁用项带 disabled 样式', () => {
    const options = [
      { label: '正常', value: 'normal' },
      { label: '禁用', value: 'disabled', disabled: true },
      { label: '三', value: 't' },
    ]
    const { container } = render(<Tabs options={options} defaultValue="normal" />)
    expect(container.querySelector('.exd-tabs__item--disabled')).toBeInTheDocument()
  })

  test('非受控：defaultValue 决定初始选中', () => {
    const { container } = render(<Tabs options={defaultOptions} defaultValue="tab2" />)
    expect(container.querySelector('.exd-tabs__item--active')?.textContent).toBe('选项二')
  })

  test('非受控：点击后选中态更新', async () => {
    const { container, getByText } = render(<Tabs options={defaultOptions} defaultValue="tab1" />)
    mockTabMetrics(container, 0)
    await user.click(getByText('选项三'))
    await waitFor(() => {
      expect(container.querySelector('.exd-tabs__item--active')?.textContent).toBe('选项三')
    })
  })

  test('受控：value 由外部更新', () => {
    const { container, rerender } = render(<Tabs options={defaultOptions} value="tab1" onChange={() => {}} />)
    expect(container.querySelector('.exd-tabs__item--active')?.textContent).toBe('选项一')
    rerender(<Tabs options={defaultOptions} value="tab3" onChange={() => {}} />)
    expect(container.querySelector('.exd-tabs__item--active')?.textContent).toBe('选项三')
  })

  test('受控：点击调用 onChange', async () => {
    const onChange = jest.fn()
    const { getByText } = render(<Tabs options={defaultOptions} value="tab1" onChange={onChange} />)
    await user.click(getByText('选项二'))
    expect(onChange).toHaveBeenCalledWith('tab2')
  })

  test('value 无法匹配任一选项时无选中项且指示条带隐藏类', async () => {
    const { container } = render(<Tabs options={defaultOptions} value="missing" />)
    expect(container.querySelectorAll('.exd-tabs__item--active').length).toBe(0)
    await waitFor(() => {
      const hidden = container.querySelector('.exd-tabs--flex__indicator--hidden, .exd-tabs--scroll__indicator--hidden')
      expect(hidden).toBeTruthy()
    })
  })

  test('首次切换：内部 delay 后指示与选中一致', async () => {
    jest.useFakeTimers()
    const userFt = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const { container, getByText } = render(<Tabs options={defaultOptions} defaultValue="tab1" />)
    mockTabMetrics(container, 0)
    await act(async () => {
      await userFt.click(getByText('选项二'))
    })
    await act(async () => {
      jest.advanceTimersByTime(320)
    })
    await waitFor(() => {
      expect(container.querySelector('.exd-tabs__item--active')?.textContent).toBe('选项二')
    })
    jest.useRealTimers()
  })

  test('ref 转发到根 div', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Tabs ref={ref} options={defaultOptions} defaultValue="tab1" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  test('scroll 模式：scrollLeft 大于 offsetLeft 时调用 scrollTo', async () => {
    const many = [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
      { label: 'C', value: 'c' },
      { label: 'D', value: 'd' },
    ]
    jest.useFakeTimers()
    const userFt = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const { container, getByText } = render(<Tabs options={many} defaultValue="a" />)
    const overflow = container.querySelector<HTMLElement>('.exd-tabs--scroll__overflow')!
    const scrollToSpy = jest.fn()
    overflow.scrollTo = scrollToSpy
    Object.defineProperty(overflow, 'offsetWidth', { configurable: true, value: 200 })
    overflow.scrollLeft = 150
    mockTabMetrics(container, 0)
    await act(async () => {
      await userFt.click(getByText('B'))
    })
    await act(async () => {
      jest.advanceTimersByTime(320)
    })
    expect(scrollToSpy).toHaveBeenCalled()
    jest.useRealTimers()
  })

  test('scroll 模式：已滚动但末项未完全可见时调用 scrollTo', async () => {
    const many = [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
      { label: 'C', value: 'c' },
      { label: 'D', value: 'd' },
    ]
    jest.useFakeTimers()
    const userFt = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const { container, getByText } = render(<Tabs options={many} defaultValue="a" />)
    const overflow = container.querySelector<HTMLElement>('.exd-tabs--scroll__overflow')!
    const scrollToSpy = jest.fn()
    overflow.scrollTo = scrollToSpy
    Object.defineProperty(overflow, 'offsetWidth', { configurable: true, value: 200 })
    overflow.scrollLeft = 10
    const items = container.querySelectorAll<HTMLElement>('.exd-tabs__item')
    items.forEach((el, i) => {
      jest.spyOn(el, 'offsetLeft', 'get').mockReturnValue(i * 100)
      jest.spyOn(el, 'offsetWidth', 'get').mockReturnValue(80)
    })
    const indicator = container.querySelector<HTMLElement>('.exd-tabs__indicator')
    if (indicator) jest.spyOn(indicator, 'offsetWidth', 'get').mockReturnValue(24)
    await act(async () => {
      await userFt.click(getByText('C'))
    })
    await act(async () => {
      jest.advanceTimersByTime(320)
    })
    expect(scrollToSpy).toHaveBeenCalled()
    jest.useRealTimers()
  })

  test('scroll 模式：未滚动且总宽超出容器时调用 scrollTo', async () => {
    const many = [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
      { label: 'C', value: 'c' },
      { label: 'D', value: 'd' },
    ]
    jest.useFakeTimers()
    const userFt = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const { container, getByText } = render(<Tabs options={many} defaultValue="a" />)
    const overflow = container.querySelector<HTMLElement>('.exd-tabs--scroll__overflow')!
    const scrollToSpy = jest.fn()
    overflow.scrollTo = scrollToSpy
    Object.defineProperty(overflow, 'offsetWidth', { configurable: true, value: 80 })
    overflow.scrollLeft = 0
    const items = container.querySelectorAll<HTMLElement>('.exd-tabs__item')
    items.forEach((el, i) => {
      jest.spyOn(el, 'offsetLeft', 'get').mockReturnValue(i * 100)
      jest.spyOn(el, 'offsetWidth', 'get').mockReturnValue(50)
    })
    const indicator = container.querySelector<HTMLElement>('.exd-tabs__indicator')
    if (indicator) jest.spyOn(indicator, 'offsetWidth', 'get').mockReturnValue(24)
    await act(async () => {
      await userFt.click(getByText('D'))
    })
    await act(async () => {
      jest.advanceTimersByTime(320)
    })
    expect(scrollToSpy).toHaveBeenCalled()
    jest.useRealTimers()
  })
})
