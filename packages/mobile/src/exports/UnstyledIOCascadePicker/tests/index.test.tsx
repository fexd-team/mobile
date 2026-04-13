import React from 'react'
import { render, cleanup, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import UnstyledIOCascadePicker from '..'

const options = [
  {
    label: '浙江',
    value: '浙江',
    children: [
      {
        label: '杭州',
        value: '杭州',
        children: [
          { label: '西湖区', value: '西湖区' },
          { label: '上城区', value: '上城区' },
        ],
      },
    ],
  },
  {
    label: '安徽',
    value: '安徽',
    children: [
      {
        label: '合肥',
        value: '合肥',
        children: [{ label: '包河区', value: '包河区' }],
      },
    ],
  },
]

describe('UnstyledIOCascadePicker', () => {
  afterEach(() => {
    cleanup()
  })

  test('默认渲染不崩溃', () => {
    const { container } = render(<UnstyledIOCascadePicker />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('classNamePrefix 默认为 exd-unstyled-io-cascade-picker', () => {
    const { container } = render(<UnstyledIOCascadePicker />)
    expect(container.querySelector('[class*="exd-unstyled-io-cascade-picker"]')).toBeInTheDocument()
  })

  test('separator 影响显示文本格式', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <UnstyledIOCascadePicker
        options={options}
        defaultValue={['浙江', '杭州', '西湖区']}
        separator=" - "
        popupProps={{ title: '选' }}
      />,
    )
    fireEvent.click(container.firstChild as Element)
    await waitFor(() => expect(document.querySelector('.exd-popup-header')).toBeInTheDocument())
    const confirmSpan = document.querySelector('.exd-popup-header .exd-nav-bar-right span')!
    await act(async () => {
      await user.click(confirmSpan)
    })
    await waitFor(() => {
      const valueEl = container.querySelector('.exd-unstyled-io-cascade-picker__value')
      expect(valueEl?.textContent).toContain(' - ')
    })
  })

  test('placeholder 在无值时展示', () => {
    const { container } = render(<UnstyledIOCascadePicker placeholder="请选择地区" />)
    expect(container.textContent).toContain('请选择地区')
  })

  test('disabled 时带 disabled class', () => {
    const { container } = render(<UnstyledIOCascadePicker disabled />)
    expect(container.querySelector('[class*="__disabled"]')).toBeInTheDocument()
  })

  test('自定义 className 透传', () => {
    const { container } = render(<UnstyledIOCascadePicker className="custom-test" />)
    expect(container.querySelector('.custom-test')).toBeInTheDocument()
  })
})
