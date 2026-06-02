import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import UnstyledIOInput from '..'

describe('UnstyledIOInput', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('默认渲染不崩溃', () => {
    const { container } = render(<UnstyledIOInput defaultValue="" />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('classNamePrefix 正确应用', () => {
    const { container } = render(<UnstyledIOInput defaultValue="" />)
    expect(container.querySelector('[class*="exd-unstyled-io-input"]')).toBeInTheDocument()
  })

  test('自定义 className 透传', () => {
    const { container } = render(<UnstyledIOInput defaultValue="" className="my-custom" />)
    expect(container.querySelector('.my-custom')).toBeInTheDocument()
  })

  test('有值且 clearable 时展示清除并可清空', () => {
    const onChange = jest.fn()
    const { container } = render(<UnstyledIOInput defaultValue="x" clearable onChange={onChange} />)
    act(() => {
      jest.advanceTimersByTime(150)
    })
    const clear = container.querySelector('[class*="exd-unstyled-io-input__clear"]')
    expect(clear).toBeTruthy()
    fireEvent.click(clear as Element)
    expect(onChange).toHaveBeenCalled()
  })

  test('multipleLines 时使用 TextArea 分支', () => {
    const { container } = render(<UnstyledIOInput multipleLines defaultValue="" label="L" placeholder="P" />)
    expect(container.querySelector('[class*="exd-unstyled-io-input__textarea"]')).toBeInTheDocument()
  })

  test('suffix 插槽透传', () => {
    const { getByText } = render(<UnstyledIOInput defaultValue="" suffix={<span>尾缀</span>} />)
    expect(getByText('尾缀')).toBeInTheDocument()
  })

  test('无 label 时直接在输入框展示 placeholder，并带 no-label class', () => {
    const { container, getByPlaceholderText } = render(<UnstyledIOInput defaultValue="" placeholder="请输入内容" />)

    expect(container.querySelector('.exd-unstyled-io-input__label--no-label')).toBeInTheDocument()
    expect(getByPlaceholderText('请输入内容')).toBeInTheDocument()
  })

  test('clearable=false 时清除图标不展示为可点状态，点击不触发清空', () => {
    const onChange = jest.fn()
    const { container } = render(<UnstyledIOInput defaultValue="x" clearable={false} onChange={onChange} />)

    act(() => {
      jest.advanceTimersByTime(150)
    })

    const clear = container.querySelector('[class*="exd-unstyled-io-input__clear"]') as Element
    expect(clear).not.toHaveClass('exd-unstyled-io-input__clear--show')
    fireEvent.click(clear)
    expect(onChange).not.toHaveBeenCalled()
  })
})
