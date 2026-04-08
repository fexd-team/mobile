import React from 'react'
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import UnstyledIODatePicker from '..'

describe('UnstyledIODatePicker', () => {
  afterEach(() => {
    cleanup()
  })

  const baseDate = new Date(2024, 5, 15)

  test('默认渲染不崩溃', () => {
    const { container } = render(<UnstyledIODatePicker />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('classNamePrefix 正确应用', () => {
    const { container } = render(<UnstyledIODatePicker />)
    expect(container.querySelector('[class*="exd-unstyled-io-date-picker"]')).toBeInTheDocument()
  })

  test('自定义 className 透传', () => {
    const { container } = render(<UnstyledIODatePicker className="my-custom" />)
    expect(container.querySelector('.my-custom')).toBeInTheDocument()
  })

  test('有值时按 format 展示', () => {
    const { container } = render(
      <UnstyledIODatePicker defaultValue={baseDate} format="YYYY" label="日期" placeholder="请选择" />,
    )
    expect(container.textContent).toContain('2024')
  })

  test('filterInvalidDate 开启时过滤无效日期', () => {
    const { container } = render(
      <UnstyledIODatePicker filterInvalidDate defaultValue={new Date('invalid')} label="L" />,
    )
    expect(container.querySelector('[class*="exd-unstyled-io-date-picker"]')).toBeInTheDocument()
  })

  test('自定义 suffix 覆盖默认箭头', () => {
    const { getByTestId } = render(<UnstyledIODatePicker suffix={<span data-testid="sfx">x</span>} label="L" />)
    expect(getByTestId('sfx')).toBeInTheDocument()
  })

  test('打开弹层触发 onEnter', async () => {
    const onEnter = jest.fn()
    const { getByText } = render(
      <UnstyledIODatePicker
        defaultValue={baseDate}
        label="点我"
        popupProps={{ title: '日期', transitionSpeed: 'none' }}
        onEnter={onEnter}
      />,
    )
    fireEvent.click(getByText('点我'))
    await waitFor(() => {
      expect(onEnter).toHaveBeenCalled()
      expect(document.querySelector('.exd-date-picker-view')).toBeInTheDocument()
    })
  })
})
