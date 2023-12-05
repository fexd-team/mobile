import React, { useState, useCallback, useEffect } from 'react'
import { classnames, run } from '@fexd/tools'
import dayjs from 'dayjs'
import PickerView from '../PickerView'
import { TimePickerViewProps } from './type'
import createFC from '../createFC'

const prefix = 'exd-time-picker-view'
const TimePickerView = createFC<TimePickerViewProps, HTMLDivElement>(function TimePickerView(
  { value, onChange, format, hourLabel = 'HH', minuteLabel = 'mm', secondLabel = 'ss', rows = 3, className, ...props },
  forwardedRef,
) {
  // 当前 date 对应的 [年, 月, 日]
  const [dateArr, setDateArr] = useState<number[]>([])

  const hours = Array.from(new Array(24)).map((item, index) => {
    const date = new Date()
    date.setHours(index)
    return {
      label: dayjs(date).format(hourLabel),
      value: index,
    }
  })
  const minutes = Array.from(new Array(60)).map((item, index) => {
    const date = new Date()
    date.setMinutes(index)
    return {
      label: dayjs(date).format(minuteLabel),
      value: index,
    }
  })
  const seconds = Array.from(new Array(60)).map((item, index) => {
    const date = new Date()
    date.setSeconds(index)
    return {
      label: dayjs(date).format(secondLabel),
      value: index,
    }
  })

  const [currentHour, setCurrentHour] = useState<number>()
  const [currentMinute, setCurrentMinute] = useState<number>()
  const [currentSecond, setCurrentSecond] = useState<number>()

  const handleHourChange = useCallback((value: number | string) => {
    setCurrentHour(+value)
  }, [])
  const handleMinuteChange = useCallback((value: number | string) => {
    setCurrentMinute(+value)
  }, [])
  const handleSecondChange = useCallback((value: number | string) => {
    setCurrentSecond(+value)
  }, [])

  useEffect(() => {
    const currentDate = value || new Date()
    setDateArr([
      Number(dayjs(currentDate).year()),
      Number(dayjs(currentDate).month()),
      Number(dayjs(currentDate).date()),
    ])
    setCurrentHour(value ? Number(dayjs(currentDate).hour()) : 0)
    setCurrentMinute(value ? Number(dayjs(currentDate).minute()) : 0)
    setCurrentSecond(value ? Number(dayjs(currentDate).second()) : 0)
  }, [value, format])

  useEffect(() => {
    if (!dateArr?.length) {
      return
    }
    const date = new Date(dateArr[0], dateArr[1], dateArr[2], currentHour, currentMinute, currentSecond)
    if (format) {
      run(onChange, undefined, date, dayjs(date).format(format))
    } else {
      run(onChange, undefined, date)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHour, currentMinute, currentSecond])

  return (
    <div {...props} className={classnames(prefix, className)} ref={forwardedRef}>
      <PickerView options={hours} rows={rows} value={currentHour} onChange={handleHourChange} />
      <PickerView options={minutes} rows={rows} value={currentMinute} onChange={handleMinuteChange} />
      <PickerView options={seconds} rows={rows} value={currentSecond} onChange={handleSecondChange} />
    </div>
  )
})

TimePickerView.defaultProps = {}

export default TimePickerView
