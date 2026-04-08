import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import * as RTG from 'react-transition-group'
import createTransition, { SPEED_MAP } from '..'
import type { TransitionProps } from '../type'

describe('createTransition', () => {
  afterEach(() => {
    cleanup()
    jest.restoreAllMocks()
  })

  test('工厂返回可挂载的过渡组件', () => {
    const Fade = createTransition('unit-fade')
    const { container } = render(
      <Fade in speed="none">
        <div data-testid="child">子节点</div>
      </Fade>,
    )
    expect(container.querySelector('[data-testid="child"]')).toBeInTheDocument()
  })

  test('未传 speed 时使用形参默认值 300（覆盖 speed 默认分支）', () => {
    const OriginalCSST = RTG.CSSTransition
    const spy = jest
      .spyOn(RTG, 'CSSTransition')
      .mockImplementation((props: Record<string, unknown>) =>
        React.createElement(OriginalCSST as React.ComponentType<typeof props>, props),
      )
    const Def = createTransition('unit-def-speed')
    render(
      <Def in>
        <b />
      </Def>,
    )
    expect((spy.mock.calls[0][0] as { timeout?: number }).timeout).toBe(300)
  })

  test('字符串 speed 为档位名时 classNames 含 exd-speed-*', () => {
    const OriginalCSST = RTG.CSSTransition
    const spy = jest
      .spyOn(RTG, 'CSSTransition')
      .mockImplementation((props: Record<string, unknown>) =>
        React.createElement(OriginalCSST as React.ComponentType<typeof props>, props),
      )
    const Box = createTransition('unit-box')
    render(
      <Box in speed="fast">
        <span>inner</span>
      </Box>,
    )
    const cssProps = spy.mock.calls[0][0] as { classNames?: string }
    expect(cssProps.classNames).toMatch(/unit-box/)
    expect(cssProps.classNames).toMatch(/exd-transition/)
    expect(cssProps.classNames).toMatch(/exd-speed-fast/)
  })

  test('speed 为 none 时 timeout 取 SPEED_MAP 的 0（?? 右侧不生效）', () => {
    const OriginalCSST = RTG.CSSTransition
    const spy = jest
      .spyOn(RTG, 'CSSTransition')
      .mockImplementation((props: Record<string, unknown>) =>
        React.createElement(OriginalCSST as React.ComponentType<typeof props>, props),
      )
    const Box = createTransition('unit-none-speed')
    render(
      <Box in speed="none">
        <span>0ms</span>
      </Box>,
    )
    expect((spy.mock.calls[0][0] as { timeout?: number }).timeout).toBe(0)
  })

  test('数字 speed 时 style 合并 transitionDuration / animationDuration', () => {
    const OriginalCSST = RTG.CSSTransition
    const spy = jest
      .spyOn(RTG, 'CSSTransition')
      .mockImplementation((props: Record<string, unknown>) =>
        React.createElement(OriginalCSST as React.ComponentType<typeof props>, props),
      )
    const Box = createTransition('unit-num')
    render(
      <Box in speed={222} style={{ opacity: 0.5 }}>
        <span>n</span>
      </Box>,
    )
    const cssProps = spy.mock.calls[0][0] as { style?: React.CSSProperties; timeout?: number }
    expect(cssProps.timeout).toBe(222)
    expect(cssProps.style?.transitionDuration).toBe('222ms')
    expect(cssProps.style?.animationDuration).toBe('222ms')
    expect(cssProps.style?.opacity).toBe(0.5)
  })

  test('SPEED_MAP 含各预设档位', () => {
    expect(SPEED_MAP.normal).toBe(300)
    expect(SPEED_MAP.debug).toBe(5000)
  })

  test('第二参数可覆盖默认 defaultProps', () => {
    const customDefault = { speed: 'slow' as const, unmountOnExit: false } as TransitionProps
    const Slow = createTransition('slow-trans', customDefault)
    const OriginalCSST = RTG.CSSTransition
    const spy = jest
      .spyOn(RTG, 'CSSTransition')
      .mockImplementation((props: Record<string, unknown>) =>
        React.createElement(OriginalCSST as React.ComponentType<typeof props>, props),
      )
    render(
      <Slow in>
        <i />
      </Slow>,
    )
    const cssProps = spy.mock.calls[0][0] as { timeout?: number }
    expect(cssProps.timeout).toBe(SPEED_MAP.slow)
  })
})
