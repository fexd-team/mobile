import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { classnames, run } from '@fexd/tools'
import dayjs from 'dayjs'
import { useDebounceEffect } from 'ahooks'

import PickerView from '../PickerView'
import { DatePickerViewProps } from './type'
import createFC from '../../helpers/createFC'

const prefix = 'exd-date-picker-view'
const DatePickerView = createFC<DatePickerViewProps, HTMLDivElement>(function DatePickerView(
  {
    defaultValue,
    value,
    onChange,
    format,
    min = new Date('2000/03/01'),
    max = new Date('2050/07/31'),
    yearLabel = 'YYYY',
    monthLabel = 'MM',
    dayLabel = 'DD',
    rows = 3,
    className,
    ...props
  },
  forwardedRef,
) {
  const [currentDate, setCurrentDate] = useState(value ? new Date(value) : new Date())
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
    const dateMax = dayjs(max)
    const dateMin = dayjs(min)
    const maxYear = Number(dateMax.format('YYYY'))
    const minYear = Number(dateMin.format('YYYY'))
    const maxMonth = Number(dateMax.format('MM'))
    const minMonth = Number(dateMin.format('MM'))
    // const currentYear = Number(dayjs(currentDate).format('YYYY'))
    let data: number[] = []
    if (currentYear === maxYear) {
      if (currentYear === minYear) {
        // 1. 当前年份是最大年份, 也是最小年份
        data = Array.from(new Array(maxMonth - minMonth + 1)).map((item, index) => {
          return minMonth + index
        })
      } else {
        // 2. 当前年份只是最大年份
        data = Array.from(new Array(maxMonth - 1 + 1)).map((item, index) => {
          return 1 + index
        })
      }
    } else {
      // 3. 当前年份只是最小年份
      if (currentYear === minYear) {
        data = Array.from(new Array(12 - minMonth + 1)).map((item, index) => {
          return minMonth + index
        })
      } else {
        // 4. 当前年份不是最大年份，也不是最小年份
        data = Array.from(new Array(12 - 1 + 1)).map((item, index) => {
          return 1 + index
        })
      }
    }
    return data.map((value) => {
      return {
        value,
        label: dayjs(`${currentYear}-${value}-01`).format(monthLabel),
      }
    })
  }, [min, max, currentYear, monthLabel])
  const days = useMemo(() => {
    const dateMax = dayjs(max)
    const dateMin = dayjs(min)
    const maxYear = Number(dateMax.format('YYYY'))
    const minYear = Number(dateMin.format('YYYY'))
    const maxMonth = Number(dateMax.format('MM'))
    const minMonth = Number(dateMin.format('MM'))
    const maxDay = Number(dateMax.format('DD'))
    const minDay = Number(dateMin.format('DD'))
    const isMax = currentYear === maxYear && currentMonth === maxMonth
    const isMin = currentYear === minYear && currentMonth === minMonth
    const lastDay = Number(dayjs(new Date(currentYear, currentMonth, 0)).format('DD'))

    let data: number[] = []
    if (isMax) {
      if (isMin) {
        // 1. 现在是最大年月，也是最小年月
        data = Array.from(new Array(maxDay - minDay + 1)).map((item, index) => {
          return minDay + index
        })
      } else {
        // 2. 现在只是最大年月
        data = Array.from(new Array(maxDay - 1 + 1)).map((item, index) => {
          return 1 + index
        })
      }
    } else {
      if (isMin) {
        // 3. 现在只是最小年月
        data = Array.from(new Array(lastDay - minDay + 1)).map((item, index) => {
          return minDay + index
        })
      } else {
        // 4. 现在不是最大年月，也不是最小年月
        data = Array.from(new Array(lastDay - 1 + 1)).map((item, index) => {
          return 1 + index
        })
      }
    }
    return data.map((value) => {
      return {
        value,
        label: dayjs(`${currentYear}-${currentMonth}-${value}`).format(dayLabel),
      }
    })
  }, [min, max, currentYear, currentMonth, dayLabel])

  const handleYearChange = useCallback((value: any) => {
    setCurrentYear(value)
  }, [])
  const handleMonthChange = useCallback((value: any) => {
    setCurrentMonth(value)
  }, [])
  const handleDayChange = useCallback((value: any) => {
    setCurrentDay(value)
  }, [])

  useDebounceEffect(
    () => {
      const currentDate = value ? new Date(value) : new Date()
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

  return (
    <div {...props} className={classnames(prefix, className)} ref={forwardedRef}>
      <PickerView options={years} rows={rows} value={currentYear} onChange={handleYearChange} />
      <PickerView options={months} rows={rows} value={currentMonth} onChange={handleMonthChange} />
      <PickerView options={days} rows={rows} value={currentDay} onChange={handleDayChange} />
    </div>
  )
})

DatePickerView.defaultProps = {}

export default DatePickerView
