import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlockLabel from '..'

describe('BlockLabel', () => {
  test('默认渲染不崩溃', () => {
    const { container } = render(<BlockLabel />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('classNamePrefix 正确应用', () => {
    const { container } = render(<BlockLabel />)
    expect(container.querySelector('[class*="exd-block-label"]')).toBeInTheDocument()
  })

  test('自定义 className 透传', () => {
    const { container } = render(<BlockLabel className="my-custom" />)
    expect(container.querySelector('.my-custom')).toBeInTheDocument()
  })
})
