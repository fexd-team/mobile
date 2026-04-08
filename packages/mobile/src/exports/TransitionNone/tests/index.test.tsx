import React from 'react'
import { render } from '@testing-library/react'

jest.mock('react-transition-group', () => {
  const ReactNs = require('react')
  const actual = jest.requireActual('react-transition-group') as typeof import('react-transition-group')
  const { CSSTransition: RealCSST } = actual
  return {
    ...actual,
    CSSTransition: (props: Record<string, unknown>) => {
      ;(globalThis as { __TEST_RTG_CLASSNAMES__?: string }).__TEST_RTG_CLASSNAMES__ =
        typeof props.classNames === 'string' ? props.classNames : ''
      return ReactNs.createElement(RealCSST, props)
    },
  }
})

import TransitionNone from '..'

const rtgClassNames = () => (globalThis as { __TEST_RTG_CLASSNAMES__?: string }).__TEST_RTG_CLASSNAMES__ ?? ''

describe('TransitionNone', () => {
  beforeEach(() => {
    delete (globalThis as { __TEST_RTG_CLASSNAMES__?: string }).__TEST_RTG_CLASSNAMES__
  })

  test('L1：in 为 true 时渲染子节点', () => {
    const { getByText } = render(
      <TransitionNone in>
        <div>无动画内容</div>
      </TransitionNone>,
    )
    expect(getByText('无动画内容')).toBeInTheDocument()
  })

  test('L2：传给 CSSTransition 的 classNames 包含 exd-none 与 exd-speed-none', () => {
    render(
      <TransitionNone in>
        <div>内容</div>
      </TransitionNone>,
    )
    const cn = rtgClassNames()
    expect(cn).toMatch(/\bexd-none\b/)
    expect(cn).toMatch(/\bexd-speed-none\b/)
  })

  test('L6：in 为 false 时子节点不挂载', () => {
    const { queryByText } = render(
      <TransitionNone in={false}>
        <div>隐藏</div>
      </TransitionNone>,
    )
    expect(queryByText('隐藏')).not.toBeInTheDocument()
  })
})
