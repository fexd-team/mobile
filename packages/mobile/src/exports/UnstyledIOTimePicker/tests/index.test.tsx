import React from 'react'
import { act, render, fireEvent, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import UnstyledIOTimePicker from '..'

describe('UnstyledIOTimePicker', () => {
  afterEach(() => {
    cleanup()
  })

  const baseTime = new Date(2024, 0, 1, 14, 30, 0)

  test('默认渲染不崩溃', () => {
    const { container } = render(<UnstyledIOTimePicker />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('classNamePrefix 正确应用', () => {
    const { container } = render(<UnstyledIOTimePicker />)
    expect(container.querySelector('[class*="exd-unstyled-io-time-picker"]')).toBeInTheDocument()
  })

  test('自定义 className 透传', () => {
    const { container } = render(<UnstyledIOTimePicker className="my-custom" />)
    expect(container.querySelector('.my-custom')).toBeInTheDocument()
  })

  test('有值时按 format 展示时间', () => {
    const { container } = render(
      <UnstyledIOTimePicker defaultValue={baseTime} format="HH:mm" label="时间" placeholder="请选择" />,
    )
    expect(container.textContent).toMatch(/14:30/)
  })

  test('自定义 suffix 覆盖默认箭头', () => {
    const { getByTestId } = render(<UnstyledIOTimePicker suffix={<span data-testid="sfx">x</span>} label="L" />)
    expect(getByTestId('sfx')).toBeInTheDocument()
  })

  test('打开弹层触发 onEnter', async () => {
    const onEnter = jest.fn()
    const { getByText } = render(
      <UnstyledIOTimePicker
        defaultValue={baseTime}
        label="点我"
        popupProps={{ title: '时间', transitionSpeed: 'none' }}
        onEnter={onEnter}
      />,
    )
    fireEvent.click(getByText('点我'))
    await waitFor(() => {
      expect(onEnter).toHaveBeenCalled()
    })
  })

  test('关闭弹层触发 onExited', async () => {
    const onExited = jest.fn()
    const { getByText } = render(
      <UnstyledIOTimePicker
        defaultValue={baseTime}
        label="关闭"
        popupProps={{ title: '时间', transitionSpeed: 'none' }}
        onExited={onExited}
      />,
    )

    fireEvent.click(getByText('关闭'))
    await waitFor(() => expect(document.querySelector('.exd-popup-header')).toBeInTheDocument())

    const cancelSpan = document.querySelector('.exd-popup-header .exd-nav-bar-left span')!
    await act(async () => {
      fireEvent.click(cancelSpan)
    })

    await waitFor(() => {
      expect(onExited).toHaveBeenCalled()
    })
  })

  test('disabled 时带禁用类且不会打开弹层', () => {
    const { container, getByText } = render(<UnstyledIOTimePicker defaultValue={baseTime} label="禁用" disabled />)

    expect(container.querySelector('.exd-unstyled-io-time-picker__disabled')).toBeInTheDocument()
    fireEvent.click(getByText('禁用'))
    expect(document.querySelector('.exd-time-picker-view')).not.toBeInTheDocument()
  })
})
