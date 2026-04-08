import React from 'react'
import { render, fireEvent, cleanup, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import dayjs from 'dayjs'
import TimePicker from '..'

describe('TimePicker', () => {
  afterEach(() => {
    cleanup()
  })

  const base = new Date(2024, 5, 15, 10, 20, 30)

  function getColumnContent(colIndex: number) {
    const root = document.querySelector('.exd-time-picker-view')
    const cols = root?.querySelectorAll(':scope > .exd-picker-view') ?? []
    return cols[colIndex]?.querySelector('.exd-picker-view-content') as HTMLDivElement
  }

  test('渲染触发区域子节点', () => {
    const { getByText } = render(<TimePicker defaultValue={base}>选择时间</TimePicker>)
    expect(getByText('选择时间')).toBeInTheDocument()
  })

  test('popupProps.title 在弹层打开后可见', async () => {
    const { getByText } = render(
      <TimePicker defaultValue={base} popupProps={{ title: '时间标题' }}>
        打开
      </TimePicker>,
    )
    fireEvent.click(getByText('打开'))
    await waitFor(() => {
      expect(document.body.textContent).toContain('时间标题')
    })
  })

  test('点击触发器后挂载 TimePickerView', async () => {
    const { getByText } = render(
      <TimePicker defaultValue={base}>
        <span>点我</span>
      </TimePicker>,
    )
    fireEvent.click(getByText('点我'))
    await waitFor(() => {
      expect(document.querySelector('.exd-time-picker-view')).toBeInTheDocument()
    })
  })

  test('点击确认触发 onConfirm 并关闭弹层', async () => {
    const onConfirm = jest.fn().mockResolvedValue(true)
    const { getByText, container } = render(
      <TimePicker defaultValue={base} onConfirm={onConfirm} popupProps={{ title: '选时间' }}>
        打开
      </TimePicker>,
    )
    fireEvent.click(getByText('打开'))
    await waitFor(() => expect(document.querySelector('.exd-time-picker-view')).toBeInTheDocument())

    const confirmSpan = document.querySelector('.exd-popup-header .exd-nav-bar-right span')
    expect(confirmSpan).toBeTruthy()
    await act(async () => {
      fireEvent.click(confirmSpan!)
    })

    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalled()
    })
    await waitFor(() => {
      expect(document.querySelector('.exd-time-picker-view')).not.toBeInTheDocument()
    })
    expect(container.textContent).toContain('打开')
  })

  test('点击取消区域触发 onCancel', async () => {
    const onCancel = jest.fn().mockResolvedValue(true)
    const { getByText } = render(
      <TimePicker defaultValue={base} onCancel={onCancel}>
        打开
      </TimePicker>,
    )
    fireEvent.click(getByText('打开'))
    await waitFor(() => expect(document.querySelector('.exd-popup-header')).toBeInTheDocument())

    const header = document.querySelector('.exd-popup-header')!
    const leftSpans = header.querySelectorAll('span')
    await act(async () => {
      fireEvent.click(leftSpans[0])
    })

    await waitFor(() => {
      expect(onCancel).toHaveBeenCalled()
    })
  })

  test('非受控 defaultValue 决定函数式 children 展示', () => {
    const { getByText } = render(
      <TimePicker defaultValue={base}>{(v) => <span>{v ? dayjs(v as Date).format('HH:mm') : ''}</span>}</TimePicker>,
    )
    expect(getByText('10:20')).toBeInTheDocument()
  })

  test('受控 value 变化时触发区同步', () => {
    function Wrapper() {
      const [v, setV] = React.useState<Date>(base)
      return (
        <>
          <button type="button" onClick={() => setV(new Date(2020, 0, 1, 1, 2, 3))}>
            改值
          </button>
          <TimePicker value={v} onChange={() => {}}>
            {(val) => <span data-testid="disp">{val ? dayjs(val as Date).format('HH') : ''}</span>}
          </TimePicker>
        </>
      )
    }
    const { getByTestId, getByText } = render(<Wrapper />)
    expect(getByTestId('disp').textContent).toBe('10')
    fireEvent.click(getByText('改值'))
    expect(getByTestId('disp').textContent).toBe('01')
  })

  test('disabled 时不打开弹层', () => {
    const { getByText } = render(
      <TimePicker defaultValue={base} disabled>
        禁用
      </TimePicker>,
    )
    fireEvent.click(getByText('禁用'))
    expect(document.querySelector('.exd-time-picker-view')).not.toBeInTheDocument()
  })

  test('确认选择后触发外部 onChange 并更新非受控展示', async () => {
    const onChange = jest.fn()
    const { getByText } = render(
      <TimePicker defaultValue={base} onChange={onChange}>
        {(v) => <span data-testid="out">{v ? dayjs(v as Date).format('HH:mm:ss') : ''}</span>}
      </TimePicker>,
    )
    expect(getByText('10:20:30')).toBeInTheDocument()

    fireEvent.click(getByText('10:20:30'))
    await waitFor(() => expect(document.querySelector('.exd-time-picker-view')).toBeInTheDocument())

    jest.useFakeTimers()
    const hourCol = getColumnContent(0)
    expect(hourCol).toBeTruthy()
    fireEvent.scroll(hourCol, { target: { scrollTop: 50 } })
    act(() => {
      jest.advanceTimersByTime(150)
    })
    jest.useRealTimers()

    const confirmSpan = document.querySelector('.exd-popup-header .exd-nav-bar-right span')
    await act(async () => {
      fireEvent.click(confirmSpan!)
    })

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled()
    })
    await waitFor(() => {
      expect(document.querySelector('.exd-time-picker-view')).not.toBeInTheDocument()
    })
    const last = onChange.mock.calls[onChange.mock.calls.length - 1][0] as Date
    expect(dayjs(last).format('HH:mm:ss')).not.toBe('10:20:30')
  })

  test('onConfirm 返回 false 时不关闭弹层且不提交值', async () => {
    const onChange = jest.fn()
    const onConfirm = jest.fn().mockResolvedValue(false)
    const { getByText } = render(
      <TimePicker defaultValue={base} onConfirm={onConfirm} onChange={onChange}>
        打开
      </TimePicker>,
    )
    fireEvent.click(getByText('打开'))
    await waitFor(() => expect(document.querySelector('.exd-time-picker-view')).toBeInTheDocument())

    const confirmSpan = document.querySelector('.exd-popup-header .exd-nav-bar-right span')
    await act(async () => {
      fireEvent.click(confirmSpan!)
    })

    await waitFor(() => expect(onConfirm).toHaveBeenCalled())
    expect(onChange).not.toHaveBeenCalled()
    expect(document.querySelector('.exd-time-picker-view')).toBeInTheDocument()
  })

  test('onCancel 返回 false 时不关闭弹层', async () => {
    const onCancel = jest.fn().mockResolvedValue(false)
    const { getByText } = render(
      <TimePicker defaultValue={base} onCancel={onCancel}>
        打开
      </TimePicker>,
    )
    fireEvent.click(getByText('打开'))
    await waitFor(() => expect(document.querySelector('.exd-popup-header')).toBeInTheDocument())

    const header = document.querySelector('.exd-popup-header')!
    await act(async () => {
      fireEvent.click(header.querySelectorAll('span')[0])
    })

    await waitFor(() => expect(onCancel).toHaveBeenCalled())
    expect(document.querySelector('.exd-time-picker-view')).toBeInTheDocument()
  })

  test('ref 与 className 挂在触发器根节点', () => {
    const ref = React.createRef<HTMLDivElement>()
    const { getByText, container } = render(
      <TimePicker ref={ref} className="tp-trigger" defaultValue={base}>
        选
      </TimePicker>,
    )
    const trigger = container.querySelector('.tp-trigger')
    expect(trigger).toBeInTheDocument()
    expect(trigger).toContainElement(getByText('选'))
    expect(ref.current).toBe(trigger)
  })

  test('弹层关闭后触发 onExited', async () => {
    const onExited = jest.fn()
    const { getByText } = render(
      <TimePicker defaultValue={base} onExited={onExited}>
        打开
      </TimePicker>,
    )
    fireEvent.click(getByText('打开'))
    await waitFor(() => expect(document.querySelector('.exd-popup-header')).toBeInTheDocument())

    const header = document.querySelector('.exd-popup-header')!
    await act(async () => {
      fireEvent.click(header.querySelectorAll('span')[0])
    })

    await waitFor(() => {
      expect(onExited).toHaveBeenCalled()
    })
  })
})
