import React from 'react'
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import UnstyledIOPicker from '..'

describe('UnstyledIOPicker', () => {
  afterEach(() => {
    cleanup()
  })

  test('默认渲染不崩溃', () => {
    const { container } = render(<UnstyledIOPicker />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('classNamePrefix 正确应用', () => {
    const { container } = render(<UnstyledIOPicker />)
    expect(container.querySelector('[class*="exd-unstyled-io-picker"]')).toBeInTheDocument()
  })

  test('自定义 className 透传', () => {
    const { container } = render(<UnstyledIOPicker className="my-custom" />)
    expect(container.querySelector('.my-custom')).toBeInTheDocument()
  })

  test('options 与 defaultValue 展示选中项 label', () => {
    const { container } = render(
      <UnstyledIOPicker options={[{ label: '选项甲', value: 'a' }]} defaultValue="a" label="选择" />,
    )
    expect(container.textContent).toContain('选项甲')
  })

  test('自定义 suffix 覆盖默认箭头', () => {
    const { getByTestId } = render(<UnstyledIOPicker suffix={<span data-testid="sfx">x</span>} label="L" />)
    expect(getByTestId('sfx')).toBeInTheDocument()
  })

  test('打开弹层触发 onEnter', async () => {
    const onEnter = jest.fn()
    const { getByText } = render(
      <UnstyledIOPicker
        options={[{ label: '一', value: 1 }]}
        label="点开"
        popupProps={{ title: '选择器', transitionSpeed: 'none' }}
        onEnter={onEnter}
      />,
    )
    fireEvent.click(getByText('点开'))
    await waitFor(() => {
      expect(onEnter).toHaveBeenCalled()
    })
  })
})
