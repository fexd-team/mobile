import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import CellDatePicker from '..'

describe('CellDatePicker', () => {
  afterEach(() => {
    cleanup()
  })

  test('默认渲染不崩溃', () => {
    const { container } = render(<CellDatePicker />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('classNamePrefix 正确应用', () => {
    const { container } = render(<CellDatePicker />)
    expect(container.querySelector('[class*="exd-cell-date-picker"]')).toBeInTheDocument()
  })

  test('自定义 className 透传', () => {
    const { container } = render(<CellDatePicker className="my-custom" />)
    expect(container.querySelector('.my-custom')).toBeInTheDocument()
  })
})
