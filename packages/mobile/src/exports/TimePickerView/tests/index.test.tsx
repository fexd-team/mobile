import React from 'react'
import { render, waitFor, fireEvent, cleanup, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import dayjs from 'dayjs'
import TimePickerView from '..'

describe('TimePickerView', () => {
  afterEach(() => {
    jest.useRealTimers()
    cleanup()
  })

  const fixed = new Date(2024, 5, 15, 14, 30, 45)

  function getColumnContent(container: HTMLElement, colIndex: number) {
    const cols = container.querySelectorAll('.exd-time-picker-view > .exd-picker-view')
    return cols[colIndex]?.querySelector('.exd-picker-view-content') as HTMLDivElement
  }

  function hourActiveLabel(container: HTMLElement) {
    const firstCol = container.querySelector('.exd-time-picker-view > .exd-picker-view')
    return firstCol?.querySelector('.exd-picker-view-item--active')?.textContent ?? ''
  }

  test('渲染根容器与三列 PickerView', () => {
    const { container } = render(<TimePickerView value={fixed} onChange={() => {}} />)
    expect(container.querySelector('.exd-time-picker-view')).toBeInTheDocument()
    expect(container.querySelectorAll('.exd-time-picker-view > .exd-picker-view').length).toBe(3)
  })

  test('rows 传入各列 PickerView（三列均存在）', () => {
    const { container } = render(<TimePickerView value={fixed} onChange={() => {}} rows={7} />)
    expect(container.querySelectorAll('.exd-time-picker-view > .exd-picker-view').length).toBe(3)
  })

  test('默认 hourLabel / minuteLabel / secondLabel 为 HH、mm、ss 时展示正确', () => {
    const d = new Date(2024, 0, 1, 8, 9, 10)
    const { container } = render(<TimePickerView value={d} onChange={() => {}} />)
    expect(hourActiveLabel(container)).toBe('08')
    const cols = container.querySelectorAll('.exd-time-picker-view > .exd-picker-view')
    const minuteActive = cols[1]?.querySelector('.exd-picker-view-item--active')?.textContent
    const secondActive = cols[2]?.querySelector('.exd-picker-view-item--active')?.textContent
    expect(minuteActive).toBe(dayjs().minute(9).format('mm'))
    expect(secondActive).toBe(dayjs().second(10).format('ss'))
  })

  test('自定义 hourLabel / minuteLabel / secondLabel 影响列文案', () => {
    const { getByText } = render(
      <TimePickerView value={fixed} onChange={() => {}} hourLabel="H时" minuteLabel="m分" secondLabel="s秒" />,
    )
    expect(getByText(dayjs(fixed).format('H时'))).toBeInTheDocument()
    expect(getByText(dayjs(fixed).format('m分'))).toBeInTheDocument()
    expect(getByText(dayjs(fixed).format('s秒'))).toBeInTheDocument()
  })

  test('传入 format 时 onChange 第二个参数为格式化字符串', async () => {
    const onChange = jest.fn()
    render(<TimePickerView value={fixed} onChange={onChange} format="HH:mm:ss" />)
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled()
    })
    const last = onChange.mock.calls[onChange.mock.calls.length - 1]
    expect(last[0]).toBeInstanceOf(Date)
    expect(last[1]).toBe(dayjs(fixed).format('HH:mm:ss'))
  })

  test('不传 format 时 onChange 仅传入 Date（无第二参数）', async () => {
    const onChange = jest.fn()
    render(<TimePickerView value={fixed} onChange={onChange} />)
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled()
    })
    const last = onChange.mock.calls[onChange.mock.calls.length - 1]
    expect(last[0]).toBeInstanceOf(Date)
    expect(last[1]).toBeUndefined()
  })

  test('受控 value 为 Date 时各列展示对应时间', async () => {
    function Wrapper() {
      const [v, setV] = React.useState(new Date(2024, 0, 1, 8, 9, 10))
      return (
        <>
          <button type="button" onClick={() => setV(new Date(2024, 0, 1, 20, 0, 0))}>
            改时间
          </button>
          <TimePickerView value={v} onChange={() => {}} hourLabel="HH" />
        </>
      )
    }
    const { container, getByText } = render(<Wrapper />)
    expect(hourActiveLabel(container)).toBe('08')
    fireEvent.click(getByText('改时间'))
    await waitFor(() => {
      expect(hourActiveLabel(container)).toBe('20')
    })
  })

  test('受控 value 为可解析时间字符串时各列展示正确', () => {
    const d = new Date(2024, 5, 15, 7, 8, 9)
    const str = dayjs(d).format('YYYY-MM-DD HH:mm:ss')
    const { container } = render(<TimePickerView value={str} onChange={() => {}} hourLabel="HH" />)
    expect(hourActiveLabel(container)).toBe('07')
  })

  test('未传 value 时小时列为 00 且仍回调 onChange', async () => {
    const onChange = jest.fn()
    const { container } = render(<TimePickerView onChange={onChange} />)
    await waitFor(() => {
      expect(hourActiveLabel(container)).toBe('00')
    })
    await waitFor(() => expect(onChange).toHaveBeenCalled())
  })

  test('滚动「时」列触发内部 onChange 与小时变更', () => {
    jest.useFakeTimers()
    const onChange = jest.fn()
    const { container } = render(<TimePickerView value={fixed} onChange={onChange} format="HH:mm:ss" />)
    const hourContent = getColumnContent(container, 0)
    expect(hourContent).toBeTruthy()
    const before = onChange.mock.calls.length
    fireEvent.scroll(hourContent, { target: { scrollTop: 50 } })
    act(() => {
      jest.advanceTimersByTime(150)
    })
    expect(onChange.mock.calls.length).toBeGreaterThan(before)
    const last = onChange.mock.calls[onChange.mock.calls.length - 1]
    expect(last[0]).toBeInstanceOf(Date)
    expect(last[1]).toMatch(/^\d{2}:\d{2}:\d{2}$/)
  })

  test('滚动「分」列触发分变更回调', () => {
    jest.useFakeTimers()
    const onChange = jest.fn()
    const { container } = render(<TimePickerView value={fixed} onChange={onChange} />)
    const minuteContent = getColumnContent(container, 1)
    expect(minuteContent).toBeTruthy()
    const before = onChange.mock.calls.length
    fireEvent.scroll(minuteContent, { target: { scrollTop: 50 } })
    act(() => {
      jest.advanceTimersByTime(150)
    })
    expect(onChange.mock.calls.length).toBeGreaterThan(before)
  })

  test('滚动「秒」列触发秒变更回调', () => {
    jest.useFakeTimers()
    const onChange = jest.fn()
    const { container } = render(<TimePickerView value={fixed} onChange={onChange} />)
    const secondContent = getColumnContent(container, 2)
    expect(secondContent).toBeTruthy()
    const before = onChange.mock.calls.length
    fireEvent.scroll(secondContent, { target: { scrollTop: 50 } })
    act(() => {
      jest.advanceTimersByTime(150)
    })
    expect(onChange.mock.calls.length).toBeGreaterThan(before)
  })

  test('ref 指向根节点且 className 合并', () => {
    const ref = React.createRef<HTMLDivElement>()
    const { container } = render(
      <TimePickerView ref={ref} className="tpv-x" value={fixed} onChange={() => {}} data-testid="tpv-root" />,
    )
    expect(ref.current).toBe(container.querySelector('.exd-time-picker-view'))
    expect(ref.current).toHaveClass('exd-time-picker-view', 'tpv-x')
    expect(container.querySelector('[data-testid="tpv-root"]')).toBe(ref.current)
  })

  // ── min / max 时间范围约束 ──

  function getColumnOptionLabels(container: HTMLElement, colIndex: number) {
    const cols = container.querySelectorAll('.exd-time-picker-view > .exd-picker-view')
    return Array.from(cols[colIndex]?.querySelectorAll('.exd-picker-view-item') ?? [])
      .map((el) => el.textContent ?? '')
      .filter((t) => t !== '')
  }

  describe('min / max 时间范围约束', () => {
    const minTime = new Date(2024, 0, 1, 9, 15, 30)
    const maxTime = new Date(2024, 0, 1, 17, 45, 50)

    test('小时列只渲染 min~max 范围内的选项', () => {
      const { container } = render(
        <TimePickerView value={new Date(2024, 0, 1, 12, 0, 0)} min={minTime} max={maxTime} onChange={() => {}} />,
      )
      const hourItems = getColumnOptionLabels(container, 0)
      expect(hourItems[0]).toBe('09')
      expect(hourItems[hourItems.length - 1]).toBe('17')
      expect(hourItems.length).toBe(9)
    })

    test('当前小时等于 min 小时时，分钟列从 min 的分钟开始', () => {
      const { container } = render(
        <TimePickerView value={new Date(2024, 0, 1, 9, 20, 0)} min={minTime} max={maxTime} onChange={() => {}} />,
      )
      const minuteItems = getColumnOptionLabels(container, 1)
      expect(minuteItems[0]).toBe('15')
      expect(minuteItems[minuteItems.length - 1]).toBe('59')
    })

    test('当前小时等于 max 小时时，分钟列截止到 max 的分钟', () => {
      const { container } = render(
        <TimePickerView value={new Date(2024, 0, 1, 17, 30, 0)} min={minTime} max={maxTime} onChange={() => {}} />,
      )
      const minuteItems = getColumnOptionLabels(container, 1)
      expect(minuteItems[0]).toBe('00')
      expect(minuteItems[minuteItems.length - 1]).toBe('45')
    })

    test('当前小时和分钟均等于 min 时，秒列从 min 的秒开始', () => {
      const { container } = render(
        <TimePickerView value={new Date(2024, 0, 1, 9, 15, 40)} min={minTime} max={maxTime} onChange={() => {}} />,
      )
      const secondItems = getColumnOptionLabels(container, 2)
      expect(secondItems[0]).toBe('30')
      expect(secondItems[secondItems.length - 1]).toBe('59')
    })

    test('当前小时和分钟均等于 max 时，秒列截止到 max 的秒', () => {
      const { container } = render(
        <TimePickerView value={new Date(2024, 0, 1, 17, 45, 10)} min={minTime} max={maxTime} onChange={() => {}} />,
      )
      const secondItems = getColumnOptionLabels(container, 2)
      expect(secondItems[0]).toBe('00')
      expect(secondItems[secondItems.length - 1]).toBe('50')
    })

    test('中间小时时分/秒列为完整 0~59', () => {
      const { container } = render(
        <TimePickerView value={new Date(2024, 0, 1, 12, 30, 0)} min={minTime} max={maxTime} onChange={() => {}} />,
      )
      const minuteItems = getColumnOptionLabels(container, 1)
      expect(minuteItems.length).toBe(60)
      expect(minuteItems[0]).toBe('00')
      expect(minuteItems[59]).toBe('59')

      const secondItems = getColumnOptionLabels(container, 2)
      expect(secondItems.length).toBe(60)
    })

    test('value 低于 min 时被 clamp 到 min 边界', async () => {
      const onChange = jest.fn()
      render(
        <TimePickerView
          value={new Date(2024, 0, 1, 5, 0, 0)}
          min={minTime}
          max={maxTime}
          onChange={onChange}
          format="HH:mm:ss"
        />,
      )
      await waitFor(() => {
        expect(onChange).toHaveBeenCalled()
      })
      const last = onChange.mock.calls[onChange.mock.calls.length - 1]
      expect(last[1]).toBe('09:15:30')
    })

    test('value 高于 max 时小时被 clamp 到 max 小时', async () => {
      const onChange = jest.fn()
      render(
        <TimePickerView
          value={new Date(2024, 0, 1, 22, 0, 0)}
          min={minTime}
          max={maxTime}
          onChange={onChange}
          format="HH:mm:ss"
        />,
      )
      await waitFor(() => {
        expect(onChange).toHaveBeenCalled()
      })
      const last = onChange.mock.calls[onChange.mock.calls.length - 1]
      expect(last[0]).toBeInstanceOf(Date)
      expect(dayjs(last[0]).hour()).toBe(17)
    })

    test('不传 min/max 时小时列为完整 0~23', () => {
      const { container } = render(<TimePickerView value={fixed} onChange={() => {}} />)
      const hourItems = getColumnOptionLabels(container, 0)
      expect(hourItems.length).toBe(24)
      expect(hourItems[0]).toBe('00')
      expect(hourItems[23]).toBe('23')
    })
  })
})
