import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

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

import TransitionFadeSlideUp from '..'

const rtgClassNames = () => (globalThis as { __TEST_RTG_CLASSNAMES__?: string }).__TEST_RTG_CLASSNAMES__ ?? ''

describe('TransitionFadeSlideUp（exd-fade-slide-up）', () => {
  beforeEach(() => {
    delete (globalThis as { __TEST_RTG_CLASSNAMES__?: string }).__TEST_RTG_CLASSNAMES__
  })

  test('L1：in 为 true 时渲染子节点', () => {
    const { getByText } = render(
      <TransitionFadeSlideUp in>
        <div>上滑内容</div>
      </TransitionFadeSlideUp>,
    )
    expect(getByText('上滑内容')).toBeInTheDocument()
  })

  test('L2：传给 CSSTransition 的 classNames 包含 exd-fade-slide-up', () => {
    render(
      <TransitionFadeSlideUp in>
        <div>内容</div>
      </TransitionFadeSlideUp>,
    )
    expect(rtgClassNames()).toMatch(/\bexd-fade-slide-up\b/)
  })

  test('L6：in 为 false 时子节点不挂载', () => {
    const { queryByText } = render(
      <TransitionFadeSlideUp in={false}>
        <div>隐藏</div>
      </TransitionFadeSlideUp>,
    )
    expect(queryByText('隐藏')).not.toBeInTheDocument()
  })
})
