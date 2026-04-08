import React from 'react'
import { render, fireEvent, cleanup, waitFor, act, renderHook } from '@testing-library/react'
import '@testing-library/jest-dom'
import dayjs from 'dayjs'
import DatePicker, { usePickerSortFromFormat } from '..'

describe('DatePicker', () => {
  beforeAll(() => {
    jest.useFakeTimers({
      now: new Date(2025, 5, 15),
      doNotFake: [
        'setTimeout',
        'setInterval',
        'setImmediate',
        'clearTimeout',
        'clearInterval',
        'clearImmediate',
        'nextTick',
        'queueMicrotask',
      ],
    })
  })
  afterAll(() => {
    jest.useRealTimers()
  })

  afterEach(() => {
    cleanup()
    jest.restoreAllMocks()
  })

  const baseDate = new Date(2024, 5, 15)

  describe('usePickerSortFromFormat', () => {
    test('format 非 string 时返回 undefined', () => {
      const { result: r1 } = renderHook(() => usePickerSortFromFormat(undefined))
      expect(r1.current).toBeUndefined()
      const { result: r2 } = renderHook(() => usePickerSortFromFormat(1 as unknown as string))
      expect(r2.current).toBeUndefined()
    })

    test('从 format 字符串解析 M/D/Y 顺序（去分隔符、去重）', () => {
      const { result } = renderHook(() => usePickerSortFromFormat('YYYY-MM-DD'))
      expect(result.current).toEqual(['year', 'month', 'day'])
    })

    test('美式日期格式得到 month、day、year 顺序', () => {
      const { result } = renderHook(() => usePickerSortFromFormat('MM/DD/YYYY'))
      expect(result.current).toEqual(['month', 'day', 'year'])
    })
  })

  // L1 冒烟
  test('渲染触发区域子节点', () => {
    const { getByText } = render(<DatePicker defaultValue={baseDate}>选择日期</DatePicker>)
    expect(getByText('选择日期')).toBeInTheDocument()
  })

  test('children 为函数时传入当前值', () => {
    const { getByText } = render(
      <DatePicker defaultValue={baseDate}>
        {(v) => <span>选中：{v ? dayjs(v as Date).format('YYYY') : '无'}</span>}
      </DatePicker>,
    )
    expect(getByText(/选中：2024/)).toBeInTheDocument()
  })

  // L2：标题（popupProps）与弹层展示
  test('popupProps.title 在弹层打开后可见', async () => {
    const { getByText } = render(
      <DatePicker defaultValue={baseDate} popupProps={{ title: '日期标题' }}>
        打开
      </DatePicker>,
    )
    fireEvent.click(getByText('打开'))
    await waitFor(() => {
      expect(document.body.textContent).toContain('日期标题')
    })
  })

  test('点击触发器后挂载 DatePickerView', async () => {
    const { getByText } = render(
      <DatePicker defaultValue={baseDate}>
        <span>点我</span>
      </DatePicker>,
    )
    fireEvent.click(getByText('点我'))
    await waitFor(() => {
      expect(document.querySelector('.exd-date-picker-view')).toBeInTheDocument()
    })
  })

  test('format 传入后弹层内 DatePickerView 仍正常挂载', async () => {
    const { getByText } = render(
      <DatePicker defaultValue={baseDate} format="MM/DD/YYYY">
        打开
      </DatePicker>,
    )
    fireEvent.click(getByText('打开'))
    await waitFor(() => {
      expect(document.querySelector('.exd-date-picker-view')).toBeInTheDocument()
    })
  })

  test('style 透传到弹层内的 DatePickerView 根节点', async () => {
    const { getByText } = render(
      <DatePicker defaultValue={baseDate} style={{ paddingTop: 12 }}>
        打开
      </DatePicker>,
    )
    fireEvent.click(getByText('打开'))
    await waitFor(() => {
      const view = document.querySelector('.exd-date-picker-view') as HTMLElement
      expect(view).toBeTruthy()
      expect(view.style.paddingTop).toBe('12px')
    })
  })

  test('disabled 时不打开弹层', () => {
    const { getByText } = render(
      <DatePicker defaultValue={baseDate} disabled>
        禁用
      </DatePicker>,
    )
    fireEvent.click(getByText('禁用'))
    expect(document.querySelector('.exd-date-picker-view')).not.toBeInTheDocument()
  })

  // L3：确认 / 取消 / 关闭
  test('点击确认触发 onConfirm 并关闭弹层', async () => {
    const onConfirm = jest.fn().mockResolvedValue(true)
    const { getByText, container } = render(
      <DatePicker defaultValue={baseDate} onConfirm={onConfirm} popupProps={{ title: '选日期' }}>
        打开
      </DatePicker>,
    )
    fireEvent.click(getByText('打开'))
    await waitFor(() => expect(document.querySelector('.exd-date-picker-view')).toBeInTheDocument())

    const confirmSpan = document.querySelector('.exd-popup-header .exd-nav-bar-right span')
    expect(confirmSpan).toBeTruthy()
    await act(async () => {
      fireEvent.click(confirmSpan!)
    })

    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalled()
    })
    await waitFor(() => {
      expect(document.querySelector('.exd-date-picker-view')).not.toBeInTheDocument()
    })
    expect(container.textContent).toContain('打开')
  })

  test('点击取消区域触发 onCancel 并关闭', async () => {
    const onCancel = jest.fn().mockResolvedValue(true)
    const { getByText } = render(
      <DatePicker defaultValue={baseDate} onCancel={onCancel}>
        打开
      </DatePicker>,
    )
    fireEvent.click(getByText('打开'))
    await waitFor(() => expect(document.querySelector('.exd-popup-header')).toBeInTheDocument())

    const header = document.querySelector('.exd-popup-header')!
    const leftSpans = header.querySelectorAll('span')
    fireEvent.click(leftSpans[0])

    await waitFor(() => {
      expect(onCancel).toHaveBeenCalled()
    })
  })

  test('点击遮罩关闭时走取消逻辑并触发 onCancel', async () => {
    const onCancel = jest.fn().mockResolvedValue(true)
    const { getByText } = render(
      <DatePicker defaultValue={baseDate} onCancel={onCancel} popupProps={{ title: '选日期', maskClosable: true }}>
        打开
      </DatePicker>,
    )
    fireEvent.click(getByText('打开'))
    await waitFor(() => expect(document.querySelector('.exd-modal-mask')).toBeInTheDocument())

    const mask = document.querySelector('.exd-modal-mask')!
    await act(async () => {
      fireEvent.click(mask)
    })

    await waitFor(() => {
      expect(onCancel).toHaveBeenCalled()
    })
  })

  // L4：filterInvalidDate
  test('filterInvalidDate 为 true 时 Invalid Date 在展示层视为空值', () => {
    const { getByText } = render(
      <DatePicker defaultValue={new Date(NaN)} filterInvalidDate>
        {(v) => <span>{v == null ? '空' : '有'}</span>}
      </DatePicker>,
    )
    expect(getByText('空')).toBeInTheDocument()
  })

  test('filterInvalidDate 在 dayjs 校验抛错时 catch 返回 false', () => {
    const evil = {
      valueOf: () => {
        throw new Error('forced')
      },
    } as unknown as Date
    const { getByText } = render(
      <DatePicker defaultValue={evil} filterInvalidDate>
        {(v) => <span>{v == null ? '空' : '有'}</span>}
      </DatePicker>,
    )
    expect(getByText('空')).toBeInTheDocument()
  })

  // L5：value / defaultValue
  test('非受控 defaultValue 决定初始展示', () => {
    const { getByText } = render(
      <DatePicker defaultValue={baseDate}>
        {(v) => <span>{v ? dayjs(v as Date).format('YYYY-MM-DD') : ''}</span>}
      </DatePicker>,
    )
    expect(getByText('2024-06-15')).toBeInTheDocument()
  })

  test('受控 value 变化时触发区同步', () => {
    function Wrapper() {
      const [v, setV] = React.useState<Date>(baseDate)
      return (
        <>
          <button type="button" onClick={() => setV(new Date(2020, 0, 1))}>
            改值
          </button>
          <DatePicker value={v} onChange={() => {}}>
            {(val) => <span data-testid="disp">{val ? dayjs(val as Date).format('YYYY') : ''}</span>}
          </DatePicker>
        </>
      )
    }
    const { getByTestId, getByText } = render(<Wrapper />)
    expect(getByTestId('disp').textContent).toBe('2024')
    fireEvent.click(getByText('改值'))
    expect(getByTestId('disp').textContent).toBe('2020')
  })

  test('value 为 null 时函数式 children 可渲染', () => {
    const { getByText } = render(
      <DatePicker value={null as any} onChange={() => {}}>
        {(v) => <span>{v == null ? '空' : '有'}</span>}
      </DatePicker>,
    )
    expect(getByText('空')).toBeInTheDocument()
  })
})
