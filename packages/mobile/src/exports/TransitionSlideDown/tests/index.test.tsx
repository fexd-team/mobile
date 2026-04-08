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

import TransitionSlideDown from '..'

const rtgClassNames = () => (globalThis as { __TEST_RTG_CLASSNAMES__?: string }).__TEST_RTG_CLASSNAMES__ ?? ''

describe('TransitionSlideDown', () => {
  beforeEach(() => {
    delete (globalThis as { __TEST_RTG_CLASSNAMES__?: string }).__TEST_RTG_CLASSNAMES__
  })

  test('L1：in 为 true 时渲染子节点', () => {
    const { getByText } = render(
      <TransitionSlideDown in>
        <div>下滑内容</div>
      </TransitionSlideDown>,
    )
    expect(getByText('下滑内容')).toBeInTheDocument()
  })

  test('L2：传给 CSSTransition 的 classNames 包含 exd-slide-down', () => {
    render(
      <TransitionSlideDown in>
        <div>内容</div>
      </TransitionSlideDown>,
    )
    expect(rtgClassNames()).toMatch(/\bexd-slide-down\b/)
  })

  test('L6：in 为 false 时子节点不挂载', () => {
    const { queryByText } = render(
      <TransitionSlideDown in={false}>
        <div>隐藏</div>
      </TransitionSlideDown>,
    )
    expect(queryByText('隐藏')).not.toBeInTheDocument()
  })
})
