import React, { useEffect, useMemo } from 'react'
import { classnames, run } from '@fexd/tools'
import dayjs from 'dayjs'
import { useMemoizedFn } from 'ahooks'

import PickerView from '../PickerView'
import usePickerNumberColumn from '../usePickerNumberColumn'
import { DatePickerViewProps } from './type'
import createFC from '../createFC'

const prefix = 'exd-date-picker-view'

const DatePickerView = createFC<DatePickerViewProps, HTMLDivElement>(function DatePickerView(
  {
    defaultValue,
    value,
    onChange,
    format,
    min,
    max,
    yearLabel,
    monthLabel,
    dayLabel,
    rows,
    className,
    pickerSort: propPickerSort,
    ...props
  },
  forwardedRef,
) {
  const getValidDate = useMemoizedFn((val: any) => {
    const date = val ? new Date(val) : new Date()
    return dayjs(date).isValid() ? date : new Date()
  }) as (val: any) => Date

  const [safeMin, safeMax] = useMemo(() => {
    const a = min ? new Date(min as any) : new Date('1950/01/01')
    const b = max ? new Date(max as any) : new Date('2050/12/31')
    return a.getTime() <= b.getTime() ? [a, b] : [b, a]
  }, [min, max])

  const dMin = useMemo(() => dayjs(safeMin), [safeMin])
  const dMax = useMemo(() => dayjs(safeMax), [safeMax])
  const [initDate] = useMemo(() => [getValidDate(value ?? defaultValue)], [])

  const yearCol = usePickerNumberColumn({
    defaultValue: dayjs(initDate).year(),
    min: dMin.year(),
    max: dMax.year(),
    toLabel: (v) => dayjs(`${v}-01-01`).format(yearLabel),
  })

  const monthMin = yearCol.value === dMin.year() ? dMin.month() + 1 : 1
  const monthMax = yearCol.value === dMax.year() ? dMax.month() + 1 : 12

  const monthCol = usePickerNumberColumn({
    defaultValue: dayjs(initDate).month() + 1,
    min: monthMin,
    max: monthMax,
    toLabel: (v) => dayjs(`${yearCol.value}-${v}-01`).format(monthLabel),
  })

  const isMinBoundary = yearCol.value === dMin.year() && monthCol.value === dMin.month() + 1
  const isMaxBoundary = yearCol.value === dMax.year() && monthCol.value === dMax.month() + 1
  const lastDayOfMonth = dayjs(new Date(yearCol.value, monthCol.value, 0)).date()
  const dayMin = isMinBoundary ? dMin.date() : 1
  const dayMax = isMaxBoundary ? dMax.date() : lastDayOfMonth

  const dayCol = usePickerNumberColumn({
    defaultValue: dayjs(initDate).date(),
    min: dayMin,
    max: dayMax,
    toLabel: (v) => dayjs(`${yearCol.value}-${monthCol.value}-${v}`).format(dayLabel),
  })

  useEffect(() => {
    if (value === undefined) return
    const d = getValidDate(value)
    yearCol.onChange(dayjs(d).year())
    monthCol.onChange(dayjs(d).month() + 1)
    dayCol.onChange(dayjs(d).date())
  }, [value])

  useEffect(() => {
    const date = new Date(yearCol.value, monthCol.value - 1, dayCol.value)
    if (format) {
      run(onChange, undefined, date, dayjs(date).format(format))
    } else {
      run(onChange, undefined, date)
    }
  }, [yearCol.value, monthCol.value, dayCol.value, format])

  const pickerSort = useMemo(() => {
    return [...(propPickerSort ?? [])]?.sort?.()?.join('-') === 'day-month-year'
      ? propPickerSort
      : ['year', 'month', 'day']
  }, [propPickerSort])

  const columnMap = {
    year: yearCol,
    month: monthCol,
    day: dayCol,
  }

  return (
    <div style={props.style} onClick={props.onClick} className={classnames(prefix, className)} ref={forwardedRef}>
      {pickerSort?.map((layout) => {
        const col = columnMap[layout]
        return <PickerView key={layout} options={col.options} rows={rows} value={col.value} onChange={col.onChange} />
      })}
    </div>
  )
})

DatePickerView.defaultProps = {
  min: new Date('1950/01/01'),
  max: new Date('2050/12/31'),
  yearLabel: 'YYYY',
  monthLabel: 'MM',
  dayLabel: 'DD',
  rows: 3,
  pickerSort: ['year', 'month', 'day'],
}

export default DatePickerView
