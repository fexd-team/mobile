import React from 'react'
import { render, fireEvent, cleanup, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act as actReact } from 'react'
import '@testing-library/jest-dom'
import Picker, { prefix } from '..'

const options = [
  { label: '选项甲', value: 'a' },
  { label: '选项乙', value: 'b' },
]

describe('Picker', () => {
  afterEach(() => {
    cleanup()
    jest.useRealTimers()
  })

  test('模块导出 prefix 常量', () => {
    expect(prefix).toBe('exd-picker')
  })

  test('不传 options 时解构默认值空数组仍可渲染', () => {
    const { getByText } = render(React.createElement(Picker, { children: '无 options' }))
    expect(getByText('无 options')).toBeInTheDocument()
  })

  test('冒烟：渲染触发区子节点', () => {
    const { getByText } = render(
      <Picker options={options} defaultValue="a">
        请选择
      </Picker>,
    )
    expect(getByText('请选择')).toBeInTheDocument()
  })

  test('函数式 children 接收选中项文案与 value', () => {
    const { getByText } = render(
      <Picker options={options} defaultValue="a">
        {(label, value) => (
          <span>
            {label}-{String(value)}
          </span>
        )}
      </Picker>,
    )
    expect(getByText('选项甲-a')).toBeInTheDocument()
  })

  test('popupProps.title 在弹层打开后可见', async () => {
    const user = userEvent.setup()
    const { getByText } = render(
      <Picker options={options} defaultValue="a" popupProps={{ title: '单列选择' }}>
        打开
      </Picker>,
    )
    await user.click(getByText('打开'))
    await waitFor(() => {
      expect(document.body.textContent).toContain('单列选择')
    })
  })

  test('点击打开后渲染 PickerView', async () => {
    const user = userEvent.setup()
    const { getByText } = render(
      <Picker options={options} defaultValue="a">
        打开
      </Picker>,
    )
    await user.click(getByText('打开'))
    await waitFor(() => {
      expect(document.querySelector('.exd-picker-view')).toBeInTheDocument()
    })
  })

  test('点击确认触发 onChange 并关闭弹层', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { getByText } = render(
      <Picker options={options} onChange={onChange} popupProps={{ title: '选择' }}>
        打开
      </Picker>,
    )
    await user.click(getByText('打开'))
    await waitFor(() => expect(document.querySelector('.exd-popup-header')).toBeInTheDocument())

    const confirmSpan = document.querySelector('.exd-popup-header .exd-nav-bar-right span')
    expect(confirmSpan).toBeTruthy()
    await act(async () => {
      await user.click(confirmSpan!)
    })

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('a', expect.objectContaining({ value: 'a', label: '选项甲' }))
    })
    await waitFor(() => {
      expect(document.querySelector('.exd-picker-view')).not.toBeInTheDocument()
    })
  })

  test('点击左侧取消触发 onCancel 并关闭', async () => {
    const user = userEvent.setup()
    const onCancel = jest.fn().mockResolvedValue(true)
    const { getByText } = render(
      <Picker options={options} defaultValue="a" onCancel={onCancel}>
        打开
      </Picker>,
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

  test('defaultValue 决定初始展示', () => {
    const { getByText } = render(
      <Picker options={options} defaultValue="b">
        {(label) => <span>{label}</span>}
      </Picker>,
    )
    expect(getByText('选项乙')).toBeInTheDocument()
  })

  test('受控 value 变化时触发区展示更新', () => {
    function Wrapper() {
      const [v, setV] = React.useState('a')
      return (
        <>
          <button type="button" onClick={() => setV('b')}>
            切换
          </button>
          <Picker options={options} value={v} onChange={() => {}}>
            {(label) => <span data-testid="lab">{label}</span>}
          </Picker>
        </>
      )
    }
    const { getByTestId, getByText } = render(<Wrapper />)
    expect(getByTestId('lab').textContent).toBe('选项甲')
    fireEvent.click(getByText('切换'))
    expect(getByTestId('lab').textContent).toBe('选项乙')
  })

  test('options 为空仍可渲染触发区', () => {
    const { getByText } = render(
      <Picker options={[]}>
        <span>空列表</span>
      </Picker>,
    )
    expect(getByText('空列表')).toBeInTheDocument()
  })

  test('options 为空时点击打开不崩溃', async () => {
    const user = userEvent.setup()
    const { getByText } = render(
      <Picker options={[]}>
        <span>打开</span>
      </Picker>,
    )
    await user.click(getByText('打开'))
    await waitFor(() => {
      expect(document.querySelector('.exd-popup')).toBeInTheDocument()
    })
  })

  test('disabled 时点击不打开弹层', async () => {
    const user = userEvent.setup()
    const { getByText } = render(
      <Picker options={options} defaultValue="a" disabled>
        点我
      </Picker>,
    )
    await user.click(getByText('点我'))
    expect(document.querySelector('.exd-picker-view')).not.toBeInTheDocument()
  })

  test('clearable 时在列表首行渲染清除项', async () => {
    const user = userEvent.setup()
    const { getByText } = render(
      <Picker options={options} defaultValue="a" clearable>
        打开
      </Picker>,
    )
    await user.click(getByText('打开'))
    await waitFor(() => {
      expect(document.querySelector('.exd-picker__clear')).toBeInTheDocument()
    })
  })

  test('clearable 下确认清空时 onChange 收到 undefined', async () => {
    jest.useFakeTimers()
    const onChange = jest.fn()
    const { getByText } = render(
      <Picker options={options} defaultValue="a" clearable onChange={onChange} popupProps={{ title: '选' }}>
        打开
      </Picker>,
    )
    fireEvent.click(getByText('打开'))
    await waitFor(() => expect(document.querySelector('.exd-picker-view-content')).toBeInTheDocument())

    const content = document.querySelector('.exd-picker-view-content') as HTMLDivElement
    content.scrollTop = 0
    fireEvent.scroll(content)
    actReact(() => {
      jest.advanceTimersByTime(150)
    })

    const confirmSpan = document.querySelector('.exd-popup-header .exd-nav-bar-right span')!
    fireEvent.click(confirmSpan)

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(undefined, undefined)
    })
  })

  test('弹层内滚动 PickerView 会调用 setInsideValue（未确认前父级 onChange 不触发）', async () => {
    jest.useFakeTimers()
    const onChange = jest.fn()
    const { getByText } = render(
      <Picker options={options} defaultValue="a" onChange={onChange} popupProps={{ title: '选' }}>
        打开
      </Picker>,
    )
    fireEvent.click(getByText('打开'))
    await waitFor(() => expect(document.querySelector('.exd-picker-view-content')).toBeInTheDocument())

    const content = document.querySelector('.exd-picker-view-content') as HTMLDivElement
    content.scrollTop = 50
    fireEvent.scroll(content)
    actReact(() => {
      jest.advanceTimersByTime(150)
    })

    expect(onChange).not.toHaveBeenCalled()
    const confirmSpan = document.querySelector('.exd-popup-header .exd-nav-bar-right span')!
    await act(async () => {
      fireEvent.click(confirmSpan)
    })
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('b', expect.objectContaining({ value: 'b' }))
    })
  })

  test('挂载时无 defaultValue 与 value 会将 insideValue 置为首项', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { getByText } = render(
      <Picker options={options} onChange={onChange} popupProps={{ title: '选' }}>
        打开
      </Picker>,
    )
    await user.click(getByText('打开'))
    await waitFor(() => expect(document.querySelector('.exd-popup-header')).toBeInTheDocument())
    const confirmSpan = document.querySelector('.exd-popup-header .exd-nav-bar-right span')!
    await act(async () => {
      await user.click(confirmSpan)
    })
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('a', expect.objectContaining({ value: 'a' }))
    })
  })

  test('onConfirm 返回 false 时不关闭也不提交', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const onConfirm = jest.fn().mockResolvedValue(false)
    const { getByText } = render(
      <Picker options={options} defaultValue="a" onChange={onChange} onConfirm={onConfirm} popupProps={{ title: '选' }}>
        打开
      </Picker>,
    )
    await user.click(getByText('打开'))
    await waitFor(() => expect(document.querySelector('.exd-picker-view')).toBeInTheDocument())
    const confirmSpan = document.querySelector('.exd-popup-header .exd-nav-bar-right span')!
    await act(async () => {
      await user.click(confirmSpan)
    })
    expect(onChange).not.toHaveBeenCalled()
    expect(document.querySelector('.exd-picker-view')).toBeInTheDocument()
  })

  test('onCancel 返回 false 时不关闭弹层', async () => {
    const user = userEvent.setup()
    const onCancel = jest.fn().mockResolvedValue(false)
    const { getByText } = render(
      <Picker options={options} defaultValue="a" onCancel={onCancel}>
        打开
      </Picker>,
    )
    await user.click(getByText('打开'))
    await waitFor(() => expect(document.querySelector('.exd-picker-view')).toBeInTheDocument())
    const header = document.querySelector('.exd-popup-header')!
    await act(async () => {
      await user.click(header.querySelector('span')!)
    })
    expect(onCancel).toHaveBeenCalled()
    expect(document.querySelector('.exd-picker-view')).toBeInTheDocument()
  })

  test('自定义 headerRight 文案出现在确认区', async () => {
    const user = userEvent.setup()
    const { getByText } = render(
      <Picker options={options} defaultValue="a" headerRight="完成" popupProps={{ title: '选' }}>
        打开
      </Picker>,
    )
    await user.click(getByText('打开'))
    await waitFor(() => {
      expect(document.body.textContent).toContain('完成')
    })
  })
})
