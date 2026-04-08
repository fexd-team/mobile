import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import LineIOLabel from '..'

describe('LineIOLabel', () => {
  test('默认渲染不崩溃', () => {
    const { container } = render(<LineIOLabel />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('classNamePrefix 正确应用', () => {
    const { container } = render(<LineIOLabel />)
    expect(container.querySelector('[class*="exd-io-label"]')).toBeInTheDocument()
    expect(container.querySelector('[class*="exd-line-label"]')).toBeInTheDocument()
  })

  test('自定义 className 透传', () => {
    const { container } = render(<LineIOLabel className="my-custom" />)
    expect(container.querySelector('.my-custom')).toBeInTheDocument()
  })
})
