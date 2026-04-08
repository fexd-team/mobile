import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import CellLabel from '..'

describe('CellLabel', () => {
  test('默认渲染不崩溃', () => {
    const { container } = render(<CellLabel />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('classNamePrefix 正确应用', () => {
    const { container } = render(<CellLabel />)
    expect(container.querySelector('[class*="exd-cell-label"]')).toBeInTheDocument()
  })

  test('自定义 className 透传', () => {
    const { container } = render(<CellLabel className="my-custom" />)
    expect(container.querySelector('.my-custom')).toBeInTheDocument()
  })
})
