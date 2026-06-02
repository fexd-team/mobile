import React from 'react'
import { act, render, fireEvent, waitFor, cleanup } from '@testing-library/react'
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

  test('确认选择后 onChange 接收 value 与选中项', async () => {
    const onChange = jest.fn()
    const { getByText } = render(
      <UnstyledIOPicker
        options={[{ label: '一', value: 1 }]}
        label="点选"
        popupProps={{ title: '选择器', transitionSpeed: 'none' }}
        onChange={onChange}
      />,
    )

    fireEvent.click(getByText('点选'))
    await waitFor(() => expect(document.querySelector('.exd-popup-header')).toBeInTheDocument())

    const confirmSpan = document.querySelector('.exd-popup-header .exd-nav-bar-right span')!
    await act(async () => {
      fireEvent.click(confirmSpan)
    })

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(1, expect.objectContaining({ label: '一', value: 1 }))
    })
  })

  test('关闭弹层触发 onExited', async () => {
    const onExited = jest.fn()
    const { getByText } = render(
      <UnstyledIOPicker
        options={[{ label: '一', value: 1 }]}
        label="关闭"
        popupProps={{ title: '选择器', transitionSpeed: 'none' }}
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
    const { container, getByText } = render(
      <UnstyledIOPicker options={[{ label: '一', value: 1 }]} label="禁用" disabled />,
    )

    expect(container.querySelector('.exd-unstyled-io-picker__disabled')).toBeInTheDocument()
    fireEvent.click(getByText('禁用'))
    expect(document.querySelector('.exd-picker-view')).not.toBeInTheDocument()
  })
})
