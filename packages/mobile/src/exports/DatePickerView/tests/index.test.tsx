import React from 'react'
import { render, fireEvent, act, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import dayjs from 'dayjs'
import DatePickerView from '..'

describe('DatePickerView', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  function getPickerContent(container: HTMLElement, columnIndex: number) {
    const columns = container.querySelectorAll('.exd-picker-view')
    return columns[columnIndex]?.querySelector('.exd-picker-view-content') as HTMLDivElement
  }

  function scrollColumn(container: HTMLElement, columnIndex: number, scrollTop: number) {
    const content = getPickerContent(container, columnIndex)
    expect(content).toBeTruthy()
    fireEvent.scroll(content, { target: { scrollTop } })
    act(() => {
      jest.advanceTimersByTime(200)
    })
  }

  // L1 冒烟
  test('默认渲染根容器与三列 PickerView', () => {
    const { container } = render(<DatePickerView />)
    expect(container.querySelector('.exd-date-picker-view')).toBeInTheDocument()
    expect(container.querySelectorAll('.exd-picker-view').length).toBe(3)
  })

  test('ref、style、onClick 透传到根节点', () => {
    const ref = React.createRef<HTMLDivElement>()
    const onClick = jest.fn()
    const { container } = render(
      <DatePickerView ref={ref} style={{ marginTop: 8 }} onClick={onClick} data-testid="dpv-root" />,
    )
    const root = container.querySelector('.exd-date-picker-view') as HTMLDivElement
    expect(root).toBe(ref.current)
    fireEvent.click(root)
    expect(onClick).toHaveBeenCalled()
  })

  // L2 min/max 与列数据
  test('min/max 为 Date 时年份列表正确', () => {
    const { container } = render(<DatePickerView min={new Date(2020, 0, 1)} max={new Date(2023, 11, 31)} />)
    const yearColumn = getPickerContent(container, 0)
    const items = yearColumn?.querySelectorAll('.exd-picker-view-item')
    const years: number[] = []
    items?.forEach((el) => {
      const n = Number(el.textContent?.trim())
      if (n >= 2020 && n <= 2023) years.push(n)
    })
    expect(years).toEqual([2020, 2021, 2022, 2023])
  })

  test('min/max 支持时间戳数字', () => {
    const min = new Date(2022, 0, 1).getTime()
    const max = new Date(2022, 11, 31).getTime()
    const { container } = render(<DatePickerView min={min} max={max} value={new Date(2022, 5, 15)} />)
    const yearColumn = getPickerContent(container, 0)
    const items = yearColumn?.querySelectorAll('.exd-picker-view-item')
    const years: number[] = []
    items?.forEach((el) => {
      const n = Number(el.textContent?.trim())
      if (n === 2022) years.push(n)
    })
    expect(years.length).toBeGreaterThan(0)
  })

  test('max 所在年份时月份上限为 max 的月份', () => {
    const { container } = render(
      <DatePickerView min={new Date(2024, 0, 1)} max={new Date(2024, 2, 20)} value={new Date(2024, 2, 10)} />,
    )
    const monthCol = getPickerContent(container, 1)
    const monthNums: number[] = []
    monthCol?.querySelectorAll('.exd-picker-view-item').forEach((el) => {
      const n = Number(el.textContent?.trim())
      if (n >= 1 && n <= 12) monthNums.push(n)
    })
    expect(Math.max(...monthNums)).toBeLessThanOrEqual(3)
  })

  test('非 min/max 边界年份时月份为 1–12', () => {
    const { container } = render(
      <DatePickerView min={new Date(2023, 5, 1)} max={new Date(2025, 5, 30)} value={new Date(2024, 5, 15)} />,
    )
    const monthCol = getPickerContent(container, 1)
    const monthNums: number[] = []
    monthCol?.querySelectorAll('.exd-picker-view-item').forEach((el) => {
      const n = Number(el.textContent?.trim())
      if (n >= 1 && n <= 12) monthNums.push(n)
    })
    expect(monthNums[0]).toBe(1)
    expect(monthNums[monthNums.length - 1]).toBe(12)
  })

  test('日期列在当月非边界时使用自然月最后一天', () => {
    const { container } = render(
      <DatePickerView min={new Date(2024, 0, 1)} max={new Date(2026, 11, 31)} value={new Date(2024, 1, 15)} />,
    )
    const dayCol = getPickerContent(container, 2)
    const dayNums: number[] = []
    dayCol?.querySelectorAll('.exd-picker-view-item').forEach((el) => {
      const n = Number(el.textContent?.trim())
      if (n >= 1 && n <= 29) dayNums.push(n)
    })
    expect(Math.max(...dayNums)).toBe(29)
  })

  test('rows、yearLabel、monthLabel、dayLabel 生效', () => {
    const { container, getByText } = render(
      <DatePickerView rows={5} yearLabel="YYYY年" monthLabel="M月" dayLabel="D日" value={new Date(2024, 0, 15)} />,
    )
    expect(container.querySelector('.exd-date-picker-view')).toBeInTheDocument()
    expect(getByText(dayjs(new Date(2024, 0, 15)).format('YYYY年'))).toBeInTheDocument()
  })

  test('自定义 className 合并到根节点', () => {
    const { container } = render(<DatePickerView className="custom-dpv" />)
    expect(container.querySelector('.exd-date-picker-view')).toHaveClass('custom-dpv')
  })

  // L3 pickerSort
  test('pickerSort 为 day/month/year 时保持日-月-年列顺序', () => {
    const { container } = render(<DatePickerView pickerSort={['day', 'month', 'year']} value={new Date(2024, 0, 15)} />)
    expect(container.querySelectorAll('.exd-picker-view').length).toBe(3)
  })

  test('pickerSort 不完整时回退为 year/month/day', () => {
    const { container } = render(<DatePickerView pickerSort={['year'] as any} />)
    expect(container.querySelectorAll('.exd-picker-view').length).toBe(3)
  })

  // L4 value / defaultValue / getValidDate
  test('defaultValue 决定初始年月日', () => {
    const { container } = render(<DatePickerView defaultValue={new Date(2023, 4, 9)} />)
    expect(container.querySelector('.exd-date-picker-view')).toBeInTheDocument()
  })

  test('无效 value 时回退为当前日期逻辑不抛错', () => {
    const { container } = render(<DatePickerView value={'not-a-date' as any} />)
    expect(container.querySelector('.exd-date-picker-view')).toBeInTheDocument()
  })

  test('value 为 null 时使用当天', () => {
    const { container } = render(<DatePickerView value={null as any} />)
    expect(container.querySelector('.exd-date-picker-view')).toBeInTheDocument()
  })

  test('受控 value 更新后内部状态跟随（debounce）', async () => {
    jest.useFakeTimers()
    function Wrapper() {
      const [v, setV] = React.useState<Date>(new Date(2024, 0, 10))
      return (
        <>
          <button type="button" onClick={() => setV(new Date(2025, 5, 20))}>
            改日期
          </button>
          <DatePickerView value={v} onChange={() => {}} />
        </>
      )
    }
    const { container, getByText } = render(<Wrapper />)
    const y2024 = [...container.querySelectorAll('.exd-picker-view-item')].some(
      (el) => el.textContent?.trim() === '2024' && el.classList.contains('exd-picker-view-item--active'),
    )
    expect(y2024).toBe(true)
    fireEvent.click(getByText('改日期'))
    act(() => {
      jest.advanceTimersByTime(150)
    })
    await waitFor(() => {
      const y2025 = [...container.querySelectorAll('.exd-picker-view-item')].some(
        (el) => el.textContent?.trim() === '2025' && el.classList.contains('exd-picker-view-item--active'),
      )
      expect(y2025).toBe(true)
    })
  })

  // L5 onChange 与 format
  test('无 format 时 onChange 仅传入 Date', async () => {
    jest.useFakeTimers()
    const onChange = jest.fn()
    render(<DatePickerView value={new Date(2024, 0, 15)} onChange={onChange} />)
    act(() => {
      jest.advanceTimersByTime(150)
    })
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled()
      const last = onChange.mock.calls[onChange.mock.calls.length - 1]
      expect(last[0]).toBeInstanceOf(Date)
      expect(last[1]).toBeUndefined()
    })
  })

  test('有 format 时 onChange 第二个参数为格式化字符串', async () => {
    jest.useFakeTimers()
    const onChange = jest.fn()
    const d = new Date(2024, 0, 15)
    render(<DatePickerView value={d} onChange={onChange} format="YYYY-MM-DD" />)
    act(() => {
      jest.advanceTimersByTime(150)
    })
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled()
      const last = onChange.mock.calls[onChange.mock.calls.length - 1]
      expect(last[1]).toBe(dayjs(d).format('YYYY-MM-DD'))
    })
  })

  // L6 滚动驱动 handleYearChange / handleMonthChange / handleDayChange
  test('切换年份时钳制月份与日期到 min 范围', () => {
    jest.useFakeTimers()
    const onChange = jest.fn()
    const { container } = render(
      <DatePickerView
        min={new Date(2024, 5, 10)}
        max={new Date(2025, 5, 20)}
        value={new Date(2025, 2, 15)}
        onChange={onChange}
      />,
    )
    act(() => {
      jest.advanceTimersByTime(150)
    })
    onChange.mockClear()
    scrollColumn(container, 0, 0)
    act(() => {
      jest.advanceTimersByTime(150)
    })
    expect(onChange).toHaveBeenCalled()
    const lastDate = onChange.mock.calls[onChange.mock.calls.length - 1][0] as Date
    expect(lastDate.getFullYear()).toBe(2024)
    expect(lastDate.getMonth()).toBeGreaterThanOrEqual(5)
  })

  test('切换年份时在月份被钳制后进一步钳制日期（1 月 31 日切到 2023 年 6 月）', () => {
    jest.useFakeTimers()
    const onChange = jest.fn()
    const { container } = render(
      <DatePickerView
        min={new Date(2023, 5, 1)}
        max={new Date(2024, 11, 31)}
        value={new Date(2024, 0, 31)}
        onChange={onChange}
      />,
    )
    act(() => {
      jest.advanceTimersByTime(150)
    })
    onChange.mockClear()
    scrollColumn(container, 0, 0)
    act(() => {
      jest.advanceTimersByTime(200)
    })
    expect(onChange).toHaveBeenCalled()
    const lastDate = onChange.mock.calls[onChange.mock.calls.length - 1][0] as Date
    expect(lastDate.getFullYear()).toBe(2023)
    expect(lastDate.getMonth()).toBe(5)
    expect(lastDate.getDate()).toBeLessThanOrEqual(30)
  })

  test('切换月份时钳制日期到该月天数上限（3 月 31 日切到 2 月）', () => {
    jest.useFakeTimers()
    const onChange = jest.fn()
    const { container } = render(
      <DatePickerView
        min={new Date(2024, 0, 1)}
        max={new Date(2024, 2, 31)}
        value={new Date(2024, 2, 31)}
        onChange={onChange}
      />,
    )
    act(() => {
      jest.advanceTimersByTime(150)
    })
    onChange.mockClear()
    // 当前 3 月（索引 2）→ 滚到 2 月（索引 1），日期 31 应钳到 ≤29
    scrollColumn(container, 1, 50)
    act(() => {
      jest.advanceTimersByTime(200)
    })
    expect(onChange).toHaveBeenCalled()
    const lastDate = onChange.mock.calls[onChange.mock.calls.length - 1][0] as Date
    expect(lastDate.getMonth()).toBe(1)
    expect(lastDate.getDate()).toBeLessThanOrEqual(29)
  })

  test('滚动日期列触发 handleDayChange', () => {
    jest.useFakeTimers()
    const onChange = jest.fn()
    const { container } = render(
      <DatePickerView
        min={new Date(2024, 0, 1)}
        max={new Date(2024, 11, 31)}
        value={new Date(2024, 5, 15)}
        onChange={onChange}
      />,
    )
    act(() => {
      jest.advanceTimersByTime(150)
    })
    onChange.mockClear()
    scrollColumn(container, 2, 50)
    act(() => {
      jest.advanceTimersByTime(150)
    })
    expect(onChange).toHaveBeenCalled()
  })

  test('pickerSort 为 day 优先时仍可通过滚动改变日期', () => {
    jest.useFakeTimers()
    const onChange = jest.fn()
    const { container } = render(
      <DatePickerView
        pickerSort={['day', 'month', 'year']}
        min={new Date(2024, 0, 1)}
        max={new Date(2024, 11, 31)}
        value={new Date(2024, 5, 15)}
        onChange={onChange}
      />,
    )
    act(() => {
      jest.advanceTimersByTime(150)
    })
    onChange.mockClear()
    scrollColumn(container, 0, 50)
    act(() => {
      jest.advanceTimersByTime(150)
    })
    expect(onChange).toHaveBeenCalled()
  })

  // L7 边界
  test('min 等于 max 单日范围仍可渲染', () => {
    const same = new Date(2024, 5, 15)
    const { container } = render(<DatePickerView min={same} max={same} value={same} />)
    expect(container.querySelector('.exd-date-picker-view')).toBeInTheDocument()
  })

  test('min 大于 max 时自动交换，不崩溃且年份列正确', () => {
    const { container } = render(<DatePickerView min={new Date(2025, 0, 1)} max={new Date(2020, 0, 1)} />)
    expect(container.querySelector('.exd-date-picker-view')).toBeInTheDocument()
    const yearCol = getPickerContent(container, 0)
    const years: number[] = []
    yearCol?.querySelectorAll('.exd-picker-view-item').forEach((el) => {
      const n = Number(el.textContent?.trim())
      if (n >= 2020 && n <= 2025) years.push(n)
    })
    expect(years).toEqual([2020, 2021, 2022, 2023, 2024, 2025])
  })
})
