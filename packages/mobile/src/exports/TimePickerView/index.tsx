import React, { useState, useCallback, useEffect, useMemo } from 'react'
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
  const [dateArr, setDateArr] = useState<number[]>([])

  const hours = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        label: dayjs().hour(i).format(hourLabel),
        value: i,
      })),
    [hourLabel],
  )
  const minutes = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        label: dayjs().minute(i).format(minuteLabel),
        value: i,
      })),
    [minuteLabel],
  )
  const seconds = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        label: dayjs().second(i).format(secondLabel),
        value: i,
      })),
    [secondLabel],
  )

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
  }, [value])

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
