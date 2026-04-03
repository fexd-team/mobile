import React, { useState, useCallback, useEffect, useMemo, HTMLProps } from 'react'
import { classnames, run } from '@fexd/tools'
import dayjs from 'dayjs'
import { useDebounceEffect, useMemoizedFn } from 'ahooks'

import PickerView from '../PickerView'
import { DatePickerViewProps } from './type'
import createFC from '../createFC'

const prefix = 'exd-date-picker-view'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

function getMonthRange(year: number, minDate: any, maxDate: any): [number, number] {
  const dMin = dayjs(minDate)
  const dMax = dayjs(maxDate)
  return [
    year === Number(dMin.format('YYYY')) ? Number(dMin.format('MM')) : 1,
    year === Number(dMax.format('YYYY')) ? Number(dMax.format('MM')) : 12,
  ]
}

function getDayRange(year: number, month: number, minDate: any, maxDate: any): [number, number] {
  const dMin = dayjs(minDate)
  const dMax = dayjs(maxDate)
  const isMin = year === Number(dMin.format('YYYY')) && month === Number(dMin.format('MM'))
  const isMax = year === Number(dMax.format('YYYY')) && month === Number(dMax.format('MM'))
  const lastDay = Number(dayjs(new Date(year, month, 0)).format('DD'))
  return [isMin ? Number(dMin.format('DD')) : 1, isMax ? Number(dMax.format('DD')) : lastDay]
}
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
  const getValidDate = useMemoizedFn((value: any) => {
    const date = value ? new Date(value) : new Date()
    return dayjs(date).isValid() ? date : new Date()
  }) as (value: any) => Date

  const [currentDate, setCurrentDate] = useState(() => getValidDate(value ?? defaultValue))
  const [currentYear, setCurrentYear] = useState(() => {
    return Number(dayjs(currentDate).format('YYYY'))
  })
  const [currentMonth, setCurrentMonth] = useState(() => {
    return Number(dayjs(currentDate).format('MM'))
  })
  const [currentDay, setCurrentDay] = useState(() => {
    return Number(dayjs(currentDate).format('DD'))
  })

  const years = useMemo(() => {
    const maxYear = Number(dayjs(max).format('YYYY'))
    const minYear = Number(dayjs(min).format('YYYY'))
    const data = Array.from(new Array(maxYear - minYear + 1)).map((item, index) => {
      return minYear + index
    })
    return data.map((value) => {
      return {
        value,
        label: dayjs(new Date(`${value}-01-01`)).format(yearLabel),
      }
    })
  }, [min, max, yearLabel])
  const months = useMemo(() => {
    const [rangeMin, rangeMax] = getMonthRange(currentYear, min, max)
    return Array.from({ length: rangeMax - rangeMin + 1 }, (_, i) => {
      const value = rangeMin + i
      return {
        value,
        label: dayjs(`${currentYear}-${value}-01`).format(monthLabel),
      }
    })
  }, [min, max, currentYear, monthLabel])
  const days = useMemo(() => {
    const [rangeMin, rangeMax] = getDayRange(currentYear, currentMonth, min, max)
    return Array.from({ length: rangeMax - rangeMin + 1 }, (_, i) => {
      const value = rangeMin + i
      return {
        value,
        label: dayjs(`${currentYear}-${currentMonth}-${value}`).format(dayLabel),
      }
    })
  }, [min, max, currentYear, currentMonth, dayLabel])

  const handleYearChange = useCallback(
    (value: any) => {
      setCurrentYear(value)
      const [mMin, mMax] = getMonthRange(value, min, max)
      const cMonth = clamp(currentMonth, mMin, mMax)
      if (cMonth !== currentMonth) setCurrentMonth(cMonth)
      const [dMin, dMax] = getDayRange(value, cMonth, min, max)
      const cDay = clamp(currentDay, dMin, dMax)
      if (cDay !== currentDay) setCurrentDay(cDay)
    },
    [currentMonth, currentDay, min, max],
  )
  const handleMonthChange = useCallback(
    (value: any) => {
      setCurrentMonth(value)
      const [dMin, dMax] = getDayRange(currentYear, value, min, max)
      const cDay = clamp(currentDay, dMin, dMax)
      if (cDay !== currentDay) setCurrentDay(cDay)
    },
    [currentYear, currentDay, min, max],
  )
  const handleDayChange = useCallback((value: any) => {
    setCurrentDay(value)
  }, [])

  useDebounceEffect(
    () => {
      const currentDate = getValidDate(value)
      setCurrentDate(currentDate)
      setCurrentYear(Number(dayjs(currentDate).format('YYYY')))
      setCurrentMonth(Number(dayjs(currentDate).format('MM')))
      setCurrentDay(Number(dayjs(currentDate).format('DD')))
    },
    [value],
    { wait: 96 },
  )

  useDebounceEffect(
    () => {
      const date = new Date(`${currentYear}/${currentMonth}/${currentDay}`)
      if (format) {
        run(onChange, undefined, date, dayjs(date).format(format))
      } else {
        run(onChange, undefined, date)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [currentYear, currentMonth, currentDay, format],
    { wait: 96 },
  )

  const pickerSort = useMemo(() => {
    return [...(propPickerSort ?? [])]?.sort?.()?.join('-') === 'day-month-year'
      ? propPickerSort
      : ['year', 'month', 'day']
  }, [propPickerSort])

  return (
    <div style={props.style} onClick={props.onClick} className={classnames(prefix, className)} ref={forwardedRef}>
      {pickerSort?.map(
        (layout) =>
          ({
            year: <PickerView key="year" options={years} rows={rows} value={currentYear} onChange={handleYearChange} />,
            month: (
              <PickerView key="month" options={months} rows={rows} value={currentMonth} onChange={handleMonthChange} />
            ),
            day: <PickerView key="day" options={days} rows={rows} value={currentDay} onChange={handleDayChange} />,
          }[layout]),
      )}
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
