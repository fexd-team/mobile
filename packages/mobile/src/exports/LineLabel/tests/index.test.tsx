import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import LineLabel from '..'

describe('LineLabel', () => {
  test('默认渲染不崩溃', () => {
    const { container } = render(<LineLabel />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('classNamePrefix 正确应用', () => {
    const { container } = render(<LineLabel />)
    expect(container.querySelector('[class*="exd-line-label"]')).toBeInTheDocument()
  })

  test('自定义 className 透传', () => {
    const { container } = render(<LineLabel className="my-custom" />)
    expect(container.querySelector('.my-custom')).toBeInTheDocument()
  })
})
