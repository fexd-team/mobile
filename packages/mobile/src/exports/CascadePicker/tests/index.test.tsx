import React from 'react'
import { render, fireEvent, cleanup, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import CascadePicker from '..'

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
      {
        label: '温州',
        value: '温州',
        children: [
          { label: '鹿城区', value: '鹿城区' },
          { label: '瓯海区', value: '瓯海区' },
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
        children: [
          { label: '包河区', value: '包河区' },
          { label: '蜀山区', value: '蜀山区' },
        ],
      },
    ],
  },
]

describe('CascadePicker', () => {
  afterEach(() => {
    cleanup()
    jest.useRealTimers()
  })

  test('冒烟：渲染触发区子节点', () => {
    const { getByText } = render(<CascadePicker options={options}>请选择地区</CascadePicker>)
    expect(getByText('请选择地区')).toBeInTheDocument()
  })

  test('函数式 children 接收 values', () => {
    const { getByText } = render(
      <CascadePicker options={options} defaultValue={['浙江', '杭州', '西湖区']}>
        {(values) => <span>{Array.isArray(values) ? values.join('/') : '请选择'}</span>}
      </CascadePicker>,
    )
    expect(getByText('浙江/杭州/西湖区')).toBeInTheDocument()
  })

  test('点击触发区打开弹层后渲染 CascadePickerView', async () => {
    const user = userEvent.setup()
    const { getByText } = render(<CascadePicker options={options}>打开</CascadePicker>)
    await user.click(getByText('打开'))
    await waitFor(() => {
      expect(document.querySelector('.exd-cascade-picker-view')).toBeInTheDocument()
    })
  })

  test('点击确认触发 onChange 并关闭弹层', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { getByText } = render(
      <CascadePicker options={options} onChange={onChange} popupProps={{ title: '选择地区' }}>
        打开
      </CascadePicker>,
    )
    await user.click(getByText('打开'))
    await waitFor(() => expect(document.querySelector('.exd-popup-header')).toBeInTheDocument())

    const confirmSpan = document.querySelector('.exd-popup-header .exd-nav-bar-right span')
    expect(confirmSpan).toBeTruthy()
    await act(async () => {
      await user.click(confirmSpan!)
    })

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled()
      const [values, selectedOptions] = onChange.mock.calls[onChange.mock.calls.length - 1]
      expect(Array.isArray(values)).toBe(true)
      expect(values.length).toBe(3)
      expect(Array.isArray(selectedOptions)).toBe(true)
    })
  })

  test('点击取消触发 onCancel 并关闭', async () => {
    const user = userEvent.setup()
    const onCancel = jest.fn().mockResolvedValue(true)
    const { getByText } = render(
      <CascadePicker options={options} onCancel={onCancel}>
        打开
      </CascadePicker>,
    )
    await user.click(getByText('打开'))
    await waitFor(() => expect(document.querySelector('.exd-popup-header')).toBeInTheDocument())

    const header = document.querySelector('.exd-popup-header')!
    await act(async () => {
      await user.click(header.querySelector('span')!)
    })
    await waitFor(() => {
      expect(onCancel).toHaveBeenCalled()
    })
  })

  test('disabled 时点击不打开弹层', async () => {
    const user = userEvent.setup()
    const { getByText } = render(
      <CascadePicker options={options} disabled>
        点我
      </CascadePicker>,
    )
    await user.click(getByText('点我'))
    expect(document.querySelector('.exd-cascade-picker-view')).not.toBeInTheDocument()
  })

  test('空 options 仍可渲染触发区', () => {
    const { getByText } = render(
      <CascadePicker options={[]}>
        <span>空列表</span>
      </CascadePicker>,
    )
    expect(getByText('空列表')).toBeInTheDocument()
  })

  test('空 options 时点击打开不崩溃', async () => {
    const user = userEvent.setup()
    const { getByText } = render(
      <CascadePicker options={[]}>
        <span>打开</span>
      </CascadePicker>,
    )
    await user.click(getByText('打开'))
    await waitFor(() => {
      expect(document.querySelector('.exd-popup')).toBeInTheDocument()
    })
  })

  test('受控 value 变化时 children 函数可拿到新值', () => {
    function Wrapper() {
      const [v, setV] = React.useState<(string | number)[]>(['浙江', '杭州', '西湖区'])
      return (
        <>
          <button type="button" onClick={() => setV(['安徽', '合肥', '包河区'])}>
            切换
          </button>
          <CascadePicker options={options} value={v} onChange={() => {}}>
            {(values) => <span data-testid="lab">{values?.join(',') ?? '空'}</span>}
          </CascadePicker>
        </>
      )
    }
    const { getByTestId, getByText } = render(<Wrapper />)
    expect(getByTestId('lab').textContent).toBe('浙江,杭州,西湖区')
    fireEvent.click(getByText('切换'))
    expect(getByTestId('lab').textContent).toBe('安徽,合肥,包河区')
  })

  test('onConfirm 返回 false 时不关闭也不提交', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const onConfirm = jest.fn().mockResolvedValue(false)
    const { getByText } = render(
      <CascadePicker options={options} onChange={onChange} onConfirm={onConfirm} popupProps={{ title: '选' }}>
        打开
      </CascadePicker>,
    )
    await user.click(getByText('打开'))
    await waitFor(() => expect(document.querySelector('.exd-cascade-picker-view')).toBeInTheDocument())
    const confirmSpan = document.querySelector('.exd-popup-header .exd-nav-bar-right span')!
    await act(async () => {
      await user.click(confirmSpan)
    })
    expect(onChange).not.toHaveBeenCalled()
    expect(document.querySelector('.exd-cascade-picker-view')).toBeInTheDocument()
  })
})
