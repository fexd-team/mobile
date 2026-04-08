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

import TransitionFadeSlideDown from '..'

const rtgClassNames = () => (globalThis as { __TEST_RTG_CLASSNAMES__?: string }).__TEST_RTG_CLASSNAMES__ ?? ''

describe('TransitionFadeSlideDown', () => {
  beforeEach(() => {
    delete (globalThis as { __TEST_RTG_CLASSNAMES__?: string }).__TEST_RTG_CLASSNAMES__
  })

  test('L1：in 为 true 时渲染子节点', () => {
    const { getByText } = render(
      <TransitionFadeSlideDown in>
        <div>下滑内容</div>
      </TransitionFadeSlideDown>,
    )
    expect(getByText('下滑内容')).toBeInTheDocument()
  })

  test('L2：传给 CSSTransition 的 classNames 包含 exd-fade-slide-down', () => {
    render(
      <TransitionFadeSlideDown in>
        <div>内容</div>
      </TransitionFadeSlideDown>,
    )
    expect(rtgClassNames()).toMatch(/\bexd-fade-slide-down\b/)
  })

  test('L6：in 为 false 时子节点不挂载', () => {
    const { queryByText } = render(
      <TransitionFadeSlideDown in={false}>
        <div>隐藏</div>
      </TransitionFadeSlideDown>,
    )
    expect(queryByText('隐藏')).not.toBeInTheDocument()
  })
})
