import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TabBar from '..'

describe('TabBar', () => {
  const user = userEvent.setup()

  test('冒烟：单个子项渲染不崩溃', () => {
    const { container } = render(
      <TabBar>
        <TabBar.Item name="首页" icon={<span data-testid="icon-a">i</span>} />
      </TabBar>,
    )
    expect(container.querySelector('.exd-tab-bar')).toBeInTheDocument()
  })

  test('多个 Item 的 name 均会渲染', () => {
    const { getByText } = render(
      <TabBar>
        <TabBar.Item name="首页" icon={<span />} />
        <TabBar.Item name="我的" icon={<span />} />
      </TabBar>,
    )
    expect(getByText('首页')).toBeInTheDocument()
    expect(getByText('我的')).toBeInTheDocument()
  })

  test('Item 的 icon 为 React 节点时正常展示', () => {
    const { getByTestId } = render(
      <TabBar>
        <TabBar.Item name="项" icon={<span data-testid="ico">icon</span>} />
      </TabBar>,
    )
    expect(getByTestId('ico')).toBeInTheDocument()
  })

  test('Item 的 icon 为字符串时使用 Iconfont', () => {
    const { container } = render(<TabBar.Item name="消息" icon="home" />)
    expect(container.querySelector('.mc-iconfont')).toBeInTheDocument()
    expect(container.querySelector('.exd-tab-bar-item__icon')).toBeInTheDocument()
  })

  test('Item active 为 true 时带激活类名', () => {
    const { container } = render(
      <TabBar>
        <TabBar.Item name="A" icon={<span />} active />
      </TabBar>,
    )
    expect(container.querySelector('.exd-tab-bar-item--active')).toBeInTheDocument()
  })

  test('TabBar 根节点 className 生效', () => {
    const { container } = render(<TabBar className="bottom-bar" />)
    expect(container.querySelector('.exd-tab-bar')).toHaveClass('bottom-bar')
  })

  test('Item 透传 div 属性到根节点', () => {
    const { getByTestId } = render(
      <TabBar>
        <TabBar.Item name="消息" icon={<span />} data-testid="tab-msg" />
      </TabBar>,
    )
    expect(getByTestId('tab-msg')).toHaveClass('exd-tab-bar-item')
  })

  test('点击 Item 触发 onClick', async () => {
    const onClick = jest.fn()
    const { getByText } = render(
      <TabBar>
        <TabBar.Item name="点击我" icon={<span />} onClick={onClick} />
      </TabBar>,
    )
    await user.click(getByText('点击我'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test('父级维护选中态：点击后在不同 Item 间切换 active', async () => {
    function Demo() {
      const [key, setKey] = React.useState(0)
      return (
        <TabBar>
          <TabBar.Item name="一" icon={<span />} active={key === 0} onClick={() => setKey(0)} />
          <TabBar.Item name="二" icon={<span />} active={key === 1} onClick={() => setKey(1)} />
        </TabBar>
      )
    }
    const { container, getByText } = render(<Demo />)
    const items = container.querySelectorAll('.exd-tab-bar-item')
    expect(items[0]).toHaveClass('exd-tab-bar-item--active')
    await user.click(getByText('二'))
    expect(items[1]).toHaveClass('exd-tab-bar-item--active')
    expect(items[0]).not.toHaveClass('exd-tab-bar-item--active')
  })

  test('受控：active 完全由外部 props 决定', () => {
    const { container, rerender } = render(
      <TabBar>
        <TabBar.Item name="A" icon={<span />} active={false} />
        <TabBar.Item name="B" icon={<span />} active />
      </TabBar>,
    )
    const items = container.querySelectorAll('.exd-tab-bar-item')
    expect(items[0]).not.toHaveClass('exd-tab-bar-item--active')
    expect(items[1]).toHaveClass('exd-tab-bar-item--active')
    rerender(
      <TabBar>
        <TabBar.Item name="A" icon={<span />} active />
        <TabBar.Item name="B" icon={<span />} active={false} />
      </TabBar>,
    )
    const items2 = container.querySelectorAll('.exd-tab-bar-item')
    expect(items2[0]).toHaveClass('exd-tab-bar-item--active')
    expect(items2[1]).not.toHaveClass('exd-tab-bar-item--active')
  })

  test('无子项时仅渲染空 TabBar 容器', () => {
    const { container } = render(<TabBar />)
    const bar = container.querySelector('.exd-tab-bar')
    expect(bar).toBeInTheDocument()
    expect(bar?.querySelector('.exd-tab-bar-item')).not.toBeInTheDocument()
  })

  test('TabBar.Item 可脱离 TabBar 单独渲染', () => {
    const { getByText } = render(<TabBar.Item name="独立" icon={<span />} />)
    expect(getByText('独立')).toBeInTheDocument()
  })
})
