import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import CellIOLabel from '..'

describe('CellIOLabel', () => {
  test('默认渲染不崩溃', () => {
    const { container } = render(<CellIOLabel />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('classNamePrefix 正确应用', () => {
    const { container } = render(<CellIOLabel />)
    expect(container.querySelector('[class*="exd-io-label"]')).toBeInTheDocument()
    expect(container.querySelector('[class*="exd-cell-label"]')).toBeInTheDocument()
  })

  test('自定义 className 透传', () => {
    const { container } = render(<CellIOLabel className="my-custom" />)
    expect(container.querySelector('.my-custom')).toBeInTheDocument()
  })
})
