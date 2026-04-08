import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { classnames, run, clamp } from '@fexd/tools'
import dayjs from 'dayjs'
import PickerView from '../PickerView'
import { TimePickerViewProps } from './type'
import createFC from '../createFC'

const prefix = 'exd-time-picker-view'

function getHMS(d: any): [number, number, number] {
  const parsed = dayjs(d)
  return [parsed.hour(), parsed.minute(), parsed.second()]
}

function getMinuteRange(
  hour: number,
  minHMS: [number, number, number],
  maxHMS: [number, number, number],
): [number, number] {
  const lo = hour === minHMS[0] ? minHMS[1] : 0
  const hi = hour === maxHMS[0] ? maxHMS[1] : 59
  return [lo, hi]
}

function getSecondRange(
  hour: number,
  minute: number,
  minHMS: [number, number, number],
  maxHMS: [number, number, number],
): [number, number] {
  const lo = hour === minHMS[0] && minute === minHMS[1] ? minHMS[2] : 0
  const hi = hour === maxHMS[0] && minute === maxHMS[1] ? maxHMS[2] : 59
  return [lo, hi]
}

const TimePickerView = createFC<TimePickerViewProps, HTMLDivElement>(function TimePickerView(
  {
    value,
    onChange,
    format,
    min,
    max,
    hourLabel = 'HH',
    minuteLabel = 'mm',
    secondLabel = 'ss',
    rows = 3,
    className,
    ...props
  },
  forwardedRef,
) {
  const [dateArr, setDateArr] = useState<number[]>([])

  const minHMS = useMemo<[number, number, number]>(() => (min ? getHMS(min) : [0, 0, 0]), [min])
  const maxHMS = useMemo<[number, number, number]>(() => (max ? getHMS(max) : [23, 59, 59]), [max])

  const [currentHour, setCurrentHour] = useState<number>()
  const [currentMinute, setCurrentMinute] = useState<number>()
  const [currentSecond, setCurrentSecond] = useState<number>()

  const hours = useMemo(
    () =>
      Array.from({ length: maxHMS[0] - minHMS[0] + 1 }, (_, i) => {
        const v = minHMS[0] + i
        return { label: dayjs().hour(v).format(hourLabel), value: v }
      }),
    [hourLabel, minHMS, maxHMS],
  )

  const minutes = useMemo(() => {
    const [lo, hi] = getMinuteRange(currentHour, minHMS, maxHMS)
    return Array.from({ length: hi - lo + 1 }, (_, i) => {
      const v = lo + i
      return { label: dayjs().minute(v).format(minuteLabel), value: v }
    })
  }, [minuteLabel, currentHour, minHMS, maxHMS])

  const seconds = useMemo(() => {
    const [lo, hi] = getSecondRange(currentHour, currentMinute, minHMS, maxHMS)
    return Array.from({ length: hi - lo + 1 }, (_, i) => {
      const v = lo + i
      return { label: dayjs().second(v).format(secondLabel), value: v }
    })
  }, [secondLabel, currentHour, currentMinute, minHMS, maxHMS])

  const handleHourChange = useCallback(
    (value: number | string) => {
      const h = +value
      setCurrentHour(h)
      const [mLo, mHi] = getMinuteRange(h, minHMS, maxHMS)
      const cMinute = clamp(currentMinute, mLo, mHi)
      if (cMinute !== currentMinute) setCurrentMinute(cMinute)
      const [sLo, sHi] = getSecondRange(h, cMinute, minHMS, maxHMS)
      const cSecond = clamp(currentSecond, sLo, sHi)
      if (cSecond !== currentSecond) setCurrentSecond(cSecond)
    },
    [currentMinute, currentSecond, minHMS, maxHMS],
  )

  const handleMinuteChange = useCallback(
    (value: number | string) => {
      const m = +value
      setCurrentMinute(m)
      const [sLo, sHi] = getSecondRange(currentHour, m, minHMS, maxHMS)
      const cSecond = clamp(currentSecond, sLo, sHi)
      if (cSecond !== currentSecond) setCurrentSecond(cSecond)
    },
    [currentHour, currentSecond, minHMS, maxHMS],
  )

  const handleSecondChange = useCallback((value: number | string) => {
    setCurrentSecond(+value)
  }, [])

  useEffect(() => {
    const currentDate = value ? dayjs(value).toDate() : new Date()
    setDateArr([dayjs(currentDate).year(), dayjs(currentDate).month(), dayjs(currentDate).date()])
    if (value) {
      const [h, m, s] = getHMS(currentDate)
      setCurrentHour(clamp(h, minHMS[0], maxHMS[0]))
      const clampedH = clamp(h, minHMS[0], maxHMS[0])
      const [mLo, mHi] = getMinuteRange(clampedH, minHMS, maxHMS)
      const clampedM = clamp(m, mLo, mHi)
      setCurrentMinute(clampedM)
      const [sLo, sHi] = getSecondRange(clampedH, clampedM, minHMS, maxHMS)
      setCurrentSecond(clamp(s, sLo, sHi))
    } else {
      setCurrentHour(minHMS[0])
      setCurrentMinute(minHMS[1])
      setCurrentSecond(minHMS[2])
    }
  }, [value, minHMS, maxHMS])

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
