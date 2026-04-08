import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import CellTimePicker from '..'

describe('CellTimePicker', () => {
  afterEach(() => {
    cleanup()
  })

  test('默认渲染不崩溃', () => {
    const { container } = render(<CellTimePicker />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('classNamePrefix 正确应用', () => {
    const { container } = render(<CellTimePicker />)
    expect(container.querySelector('[class*="exd-cell-time-picker"]')).toBeInTheDocument()
  })

  test('自定义 className 透传', () => {
    const { container } = render(<CellTimePicker className="my-custom" />)
    expect(container.querySelector('.my-custom')).toBeInTheDocument()
  })
})
