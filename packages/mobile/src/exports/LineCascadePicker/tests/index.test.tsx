import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import LineCascadePicker from '..'

describe('LineCascadePicker', () => {
  afterEach(() => {
    cleanup()
  })

  test('默认渲染不崩溃', () => {
    const { container } = render(<LineCascadePicker />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('classNamePrefix 正确应用', () => {
    const { container } = render(<LineCascadePicker />)
    expect(container.querySelector('[class*="exd-line-cascade-picker"]')).toBeInTheDocument()
  })

  test('自定义 className 透传', () => {
    const { container } = render(<LineCascadePicker className="my-custom" />)
    expect(container.querySelector('.my-custom')).toBeInTheDocument()
  })
})
