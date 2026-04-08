import React from 'react'
import { render, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

jest.mock('@fexd/tools', () => {
  const actual = jest.requireActual('@fexd/tools') as Record<string, unknown>
  return {
    ...actual,
    throttle: (fn: () => void) => fn,
  }
})

import NavBar from '..'
import useSize from '../../useSize'

jest.mock('../../useSize', () => ({
  __esModule: true,
  default: jest.fn(() => ({ width: 100, height: 0 })),
}))

const mockUseSize = useSize as jest.MockedFunction<typeof useSize>

describe('NavBar', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    mockUseSize.mockReturnValue({ width: 100, height: 0 })
  })

  test('冒烟：默认渲染不崩溃', () => {
    const { container } = render(<NavBar>标题</NavBar>)
    expect(container.querySelector('.exd-nav-bar')).toBeInTheDocument()
    expect(container.querySelector('.exd-nav-bar-wrapper')).toBeInTheDocument()
  })

  test('children 作为标题渲染在中间区域', () => {
    const { getByText } = render(<NavBar>页面标题</NavBar>)
    expect(getByText('页面标题')).toBeInTheDocument()
    expect(getByText('页面标题').closest('.exd-nav-bar-content')).toBeInTheDocument()
  })

  test('left 渲染在左侧区域', () => {
    const { getByText } = render(<NavBar left={<span>返回</span>}>标题</NavBar>)
    expect(getByText('返回').closest('.exd-nav-bar-left')).toBeInTheDocument()
  })

  test('right 渲染在右侧区域', () => {
    const { getByText } = render(<NavBar right={<span>更多</span>}>标题</NavBar>)
    expect(getByText('更多').closest('.exd-nav-bar-right')).toBeInTheDocument()
  })

  test('left 支持函数形式', () => {
    const { getByText } = render(<NavBar left={() => <span>函数左侧</span>}>标题</NavBar>)
    expect(getByText('函数左侧')).toBeInTheDocument()
  })

  test('right 支持函数形式', () => {
    const { getByText } = render(<NavBar right={() => <span>函数右侧</span>}>标题</NavBar>)
    expect(getByText('函数右侧')).toBeInTheDocument()
  })

  test('根节点 className 与 contentClassName 生效', () => {
    const { container } = render(
      <NavBar className="nav-root" contentClassName="nav-title">
        标题
      </NavBar>,
    )
    expect(container.querySelector('.exd-nav-bar')).toHaveClass('nav-root')
    expect(container.querySelector('.exd-nav-bar-content')).toHaveClass('nav-title')
  })

  test('点击左侧触发 onLeftClick', async () => {
    const onLeftClick = jest.fn()
    const { getByText } = render(
      <NavBar left={<span>返回</span>} onLeftClick={onLeftClick}>
        标题
      </NavBar>,
    )
    await user.click(getByText('返回'))
    expect(onLeftClick).toHaveBeenCalledTimes(1)
  })

  test('点击右侧触发 onRightClick', async () => {
    const onRightClick = jest.fn()
    const { getByText } = render(
      <NavBar right={<span>操作</span>} onRightClick={onRightClick}>
        标题
      </NavBar>,
    )
    await user.click(getByText('操作'))
    expect(onRightClick).toHaveBeenCalledTimes(1)
  })

  test('标题为空时中间内容节点仍存在', () => {
    const { container } = render(<NavBar>{''}</NavBar>)
    const content = container.querySelector('.exd-nav-bar-content')
    expect(content).toBeInTheDocument()
    expect(content?.textContent).toBe('')
  })

  test('无 left/right 时不渲染左右槽位', () => {
    const { container } = render(<NavBar>仅标题</NavBar>)
    expect(container.querySelector('.exd-nav-bar-left')).not.toBeInTheDocument()
    expect(container.querySelector('.exd-nav-bar-right')).not.toBeInTheDocument()
  })

  test('alignCenter=false 时不执行居中偏移计算', () => {
    const { container } = render(
      <NavBar alignCenter={false} left={<span>L</span>}>
        标题
      </NavBar>,
    )
    const content = container.querySelector('.exd-nav-bar-content') as HTMLElement
    expect(content.style.left).toBe('')
  })

  test('标题未溢出时根据容器宽度设置 left', () => {
    mockUseSize.mockReturnValue({ width: 1, height: 0 })
    const { container, rerender } = render(<NavBar left={<span>L</span>}>短</NavBar>)
    const root = container.querySelector('.exd-nav-bar') as HTMLElement
    const center = container.querySelector('.exd-nav-bar-center') as HTMLElement
    const content = container.querySelector('.exd-nav-bar-content') as HTMLElement

    jest.spyOn(content, 'offsetWidth', 'get').mockReturnValue(60)
    jest.spyOn(content, 'scrollWidth', 'get').mockReturnValue(60)
    jest.spyOn(content, 'offsetLeft', 'get').mockReturnValue(10)
    jest.spyOn(root, 'offsetWidth', 'get').mockReturnValue(400)
    jest.spyOn(center, 'offsetWidth', 'get').mockReturnValue(300)

    content.style.removeProperty('left')
    act(() => {
      mockUseSize.mockReturnValue({ width: 2, height: 0 })
      rerender(<NavBar left={<span>L</span>}>短</NavBar>)
    })
    expect(content.style.left).toBe('160px')
  })

  test('标题内容溢出时重置 left 为 0', () => {
    mockUseSize.mockReturnValue({ width: 1, height: 0 })
    const { container, rerender } = render(<NavBar>x</NavBar>)
    const content = container.querySelector('.exd-nav-bar-content') as HTMLElement
    const root = container.querySelector('.exd-nav-bar') as HTMLElement
    const center = container.querySelector('.exd-nav-bar-center') as HTMLElement

    Object.defineProperty(content, 'offsetWidth', { configurable: true, value: 80 })
    Object.defineProperty(content, 'scrollWidth', { configurable: true, value: 200 })
    jest.spyOn(root, 'offsetWidth', 'get').mockReturnValue(400)
    jest.spyOn(center, 'offsetWidth', 'get').mockReturnValue(300)

    act(() => {
      mockUseSize.mockReturnValue({ width: 2, height: 0 })
      rerender(<NavBar>x</NavBar>)
    })
    expect(content.style.left).toBe('0px')
  })

  test('计算偏移过大时夹紧到 header 容器宽度', () => {
    mockUseSize.mockReturnValue({ width: 1, height: 0 })
    const { container, rerender } = render(<NavBar left={<span>L</span>}>x</NavBar>)
    const content = container.querySelector('.exd-nav-bar-content') as HTMLElement
    const root = container.querySelector('.exd-nav-bar') as HTMLElement
    const center = container.querySelector('.exd-nav-bar-center') as HTMLElement

    jest.spyOn(content, 'offsetWidth', 'get').mockReturnValue(200)
    jest.spyOn(content, 'scrollWidth', 'get').mockReturnValue(200)
    jest.spyOn(content, 'offsetLeft', 'get').mockReturnValue(0)
    jest.spyOn(root, 'offsetWidth', 'get').mockReturnValue(500)
    jest.spyOn(center, 'offsetWidth', 'get').mockReturnValue(220)

    content.style.removeProperty('left')
    act(() => {
      mockUseSize.mockReturnValue({ width: 2, height: 0 })
      rerender(<NavBar left={<span>L</span>}>x</NavBar>)
    })
    expect(content.style.left).toBe('20px')
  })

  test('计算偏移为负时不写入 style.left', () => {
    mockUseSize.mockReturnValue({ width: 1, height: 0 })
    const { container, rerender } = render(<NavBar left={<span>L</span>}>x</NavBar>)
    const content = container.querySelector('.exd-nav-bar-content') as HTMLElement
    const root = container.querySelector('.exd-nav-bar') as HTMLElement
    const center = container.querySelector('.exd-nav-bar-center') as HTMLElement

    jest.spyOn(content, 'offsetWidth', 'get').mockReturnValue(40)
    jest.spyOn(content, 'scrollWidth', 'get').mockReturnValue(40)
    jest.spyOn(content, 'offsetLeft', 'get').mockReturnValue(120)
    jest.spyOn(root, 'offsetWidth', 'get').mockReturnValue(100)
    jest.spyOn(center, 'offsetWidth', 'get').mockReturnValue(280)

    content.style.removeProperty('left')
    act(() => {
      mockUseSize.mockReturnValue({ width: 2, height: 0 })
      rerender(<NavBar left={<span>L</span>}>x</NavBar>)
    })
    expect(content.style.left).toBe('')
  })

  test('注册 window resize 监听并在触发时调用居中逻辑', () => {
    const addSpy = jest.spyOn(window, 'addEventListener')
    mockUseSize.mockReturnValue({ width: 1, height: 0 })
    const { unmount } = render(<NavBar>t</NavBar>)
    expect(addSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    const resizeHandler = addSpy.mock.calls.find((c) => c[0] === 'resize')?.[1] as () => void
    expect(typeof resizeHandler).toBe('function')
    act(() => {
      resizeHandler()
    })
    unmount()
    addSpy.mockRestore()
  })

  test('ref 指向外层容器', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<NavBar ref={ref}>标题</NavBar>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current?.classList.contains('exd-nav-bar')).toBe(true)
  })
})
