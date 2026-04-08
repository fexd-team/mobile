jest.mock('@fexd/tools', () => {
  const actual = jest.requireActual('@fexd/tools')
  return {
    ...actual,
    get: jest.fn((obj: any, key: string) => {
      if (key === 'scrollHeight') return 400
      if (key === 'offsetHeight') return 100
      return actual.get(obj, key)
    }),
    ScrollListener: jest.fn(function MockScrollListener(this: unknown, config: any) {
      const g = globalThis as { __SCROLL_VIEW_CFGS__?: any[] }
      g.__SCROLL_VIEW_CFGS__ = g.__SCROLL_VIEW_CFGS__ ?? []
      g.__SCROLL_VIEW_CFGS__.push(config)
      return {}
    }),
  }
})

import React from 'react'
import { render, screen, act } from '@testing-library/react'
import ScrollView from '..'

function scrollConfigs() {
  const g = globalThis as { __SCROLL_VIEW_CFGS__?: any[] }
  return g.__SCROLL_VIEW_CFGS__ ?? []
}

describe('ScrollView', () => {
  beforeEach(() => {
    const g = globalThis as { __SCROLL_VIEW_CFGS__?: any[] }
    g.__SCROLL_VIEW_CFGS__ = []
  })

  test('子节点渲染在滚动内容区：冒烟', () => {
    const { container } = render(
      <ScrollView>
        <div>滚动子树</div>
      </ScrollView>,
    )
    expect(screen.getByText('滚动子树')).toBeInTheDocument()
    expect(container.querySelector('.exd-scroll-view__content')).toContainElement(screen.getByText('滚动子树'))
  })

  test('className 作用于内容区', () => {
    const { container } = render(
      <ScrollView className="inner-cls">
        <span>x</span>
      </ScrollView>,
    )
    expect(container.querySelector('.exd-scroll-view__content')).toHaveClass('inner-cls')
  })

  test('wrapperClassName 作用于外层', () => {
    const { container } = render(
      <ScrollView wrapperClassName="wrap-cls">
        <span>x</span>
      </ScrollView>,
    )
    expect(container.querySelector('.exd-scroll-view')).toHaveClass('wrap-cls')
  })

  test('无 children 时内容区仍存在', () => {
    const { container } = render(<ScrollView />)
    expect(container.querySelector('.exd-scroll-view__content')).toBeInTheDocument()
  })

  test('ref 指向内部可滚动 div', () => {
    const ref = React.createRef<HTMLDivElement>()
    const { container } = render(
      <ScrollView ref={ref}>
        <div>r</div>
      </ScrollView>,
    )
    const content = container.querySelector('.exd-scroll-view__content')
    expect(ref.current).toBe(content)
  })

  test('shadow=false 时默认不展示滚动阴影类', () => {
    const { container } = render(
      <ScrollView shadow={false}>
        <div>h</div>
      </ScrollView>,
    )
    const wrap = container.querySelector('.exd-scroll-view')
    expect(wrap).not.toHaveClass('exd-scroll-view--can-scroll-up')
    expect(wrap).not.toHaveClass('exd-scroll-view--can-scroll-down')
  })

  test('shadow=true 且触发 distanceEvents 时可出现上下阴影类', async () => {
    const { container } = render(
      <ScrollView shadow>
        <div style={{ height: 2000 }}>tall</div>
      </ScrollView>,
    )
    await act(async () => {
      await Promise.resolve()
    })
    const list = scrollConfigs()
    const config = list[list.length - 1]
    expect(config).toBeDefined()
    expect(config.distanceEvents.length).toBeGreaterThanOrEqual(2)
    const upEvt = config.distanceEvents.find((e: any) => e.distance === 0)
    const downEvt = config.distanceEvents.find((e: any) => typeof e.distance === 'function')
    expect(downEvt.dynamic).toBe(true)
    expect(downEvt.distance()).toBe(299)

    await act(async () => {
      upEvt.onGoingOut()
    })
    expect(container.querySelector('.exd-scroll-view')).toHaveClass('exd-scroll-view--can-scroll-up')

    await act(async () => {
      upEvt.onGoingIn()
    })
    expect(container.querySelector('.exd-scroll-view')).not.toHaveClass('exd-scroll-view--can-scroll-up')

    await act(async () => {
      downEvt.onGoingIn()
    })
    expect(container.querySelector('.exd-scroll-view')).toHaveClass('exd-scroll-view--can-scroll-down')

    await act(async () => {
      downEvt.onGoingOut()
    })
    expect(container.querySelector('.exd-scroll-view')).not.toHaveClass('exd-scroll-view--can-scroll-down')
  })

  test('shadow 为二元组时分别控制上下阴影能力', async () => {
    const { container } = render(
      <ScrollView shadow={[true, false]}>
        <div>z</div>
      </ScrollView>,
    )
    await act(async () => {
      await Promise.resolve()
    })
    const list = scrollConfigs()
    const config = list[list.length - 1]
    const upEvt = config.distanceEvents.find((e: any) => e.distance === 0)
    await act(async () => {
      upEvt.onGoingOut()
    })
    expect(container.querySelector('.exd-scroll-view')).toHaveClass('exd-scroll-view--can-scroll-up')

    const downEvt = config.distanceEvents.find((e: any) => typeof e.distance === 'function')
    await act(async () => {
      downEvt.onGoingIn()
    })
    expect(container.querySelector('.exd-scroll-view')).not.toHaveClass('exd-scroll-view--can-scroll-down')
  })

  test('onEndReached 通过 ScrollListener 配置透传', async () => {
    const done = jest.fn()
    const onEndReached = jest.fn((cb: () => void) => cb())
    render(
      <ScrollView onEndReached={onEndReached} distanceToReachEnd={50}>
        <div>x</div>
      </ScrollView>,
    )
    await act(async () => {
      await Promise.resolve()
    })
    const list = scrollConfigs()
    const config = list[list.length - 1]
    expect(config.onEndReached).toBeDefined()
    expect(config.distanceToReachEnd).toBe(50)
    await act(async () => {
      config.onEndReached(done)
    })
    expect(onEndReached).toHaveBeenCalled()
    expect(done).toHaveBeenCalled()
  })

  test('children 为函数时接收 canScrollUp/canScrollDown', () => {
    const fn = jest.fn((state: { canScrollUp: boolean; canScrollDown: boolean }) => (
      <div>{state.canScrollUp ? 'up' : 'no-up'}</div>
    ))
    render(<ScrollView>{fn}</ScrollView>)
    expect(fn).toHaveBeenCalled()
    expect(screen.getByText(/no-up|up/)).toBeInTheDocument()
  })

  test('distanceEvents 合并进 ScrollListener', async () => {
    const custom = { distance: 10, onGoingIn: jest.fn(), onGoingOut: jest.fn() }
    render(
      <ScrollView distanceEvents={[custom]}>
        <div>y</div>
      </ScrollView>,
    )
    await act(async () => {
      await Promise.resolve()
    })
    const list = scrollConfigs()
    const config = list[list.length - 1]
    expect(config.distanceEvents).toEqual(expect.arrayContaining([custom]))
  })

  test('外层 div 透传其余 props', () => {
    const { container } = render(
      <ScrollView data-testid="sv-wrap" id="sid">
        <span>s</span>
      </ScrollView>,
    )
    const wrap = container.querySelector('.exd-scroll-view')
    expect(wrap).toHaveAttribute('data-testid', 'sv-wrap')
    expect(wrap).toHaveAttribute('id', 'sid')
  })
})
