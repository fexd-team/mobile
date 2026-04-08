import React from 'react'
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react'
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
})
