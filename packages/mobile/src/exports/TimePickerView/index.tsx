import React, { useEffect, useMemo, useRef } from 'react'
import { classnames, run } from '@fexd/tools'
import dayjs from 'dayjs'

import PickerView from '../PickerView'
import usePickerNumberColumn from '../usePickerNumberColumn'
import { TimePickerViewProps } from './type'
import createFC from '../createFC'

const prefix = 'exd-time-picker-view'

function getHMS(d: any): [number, number, number] {
  const parsed = dayjs(d)
  return [parsed.hour(), parsed.minute(), parsed.second()]
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
  const minHMS = useMemo<[number, number, number]>(() => (min ? getHMS(min) : [0, 0, 0]), [min])
  const maxHMS = useMemo<[number, number, number]>(() => (max ? getHMS(max) : [23, 59, 59]), [max])

  const initDate = useMemo(() => (value ? dayjs(value).toDate() : new Date()), [])
  const dateArrRef = useRef([dayjs(initDate).year(), dayjs(initDate).month(), dayjs(initDate).date()])

  const hourCol = usePickerNumberColumn({
    defaultValue: value ? dayjs(initDate).hour() : minHMS[0],
    min: minHMS[0],
    max: maxHMS[0],
    toLabel: (v) => dayjs().hour(v).format(hourLabel),
  })

  const minuteMin = hourCol.value === minHMS[0] ? minHMS[1] : 0
  const minuteMax = hourCol.value === maxHMS[0] ? maxHMS[1] : 59

  const minuteCol = usePickerNumberColumn({
    defaultValue: value ? dayjs(initDate).minute() : minHMS[1],
    min: minuteMin,
    max: minuteMax,
    toLabel: (v) => dayjs().minute(v).format(minuteLabel),
  })

  const secondMin = hourCol.value === minHMS[0] && minuteCol.value === minHMS[1] ? minHMS[2] : 0
  const secondMax = hourCol.value === maxHMS[0] && minuteCol.value === maxHMS[1] ? maxHMS[2] : 59

  const secondCol = usePickerNumberColumn({
    defaultValue: value ? dayjs(initDate).second() : minHMS[2],
    min: secondMin,
    max: secondMax,
    toLabel: (v) => dayjs().second(v).format(secondLabel),
  })

  useEffect(() => {
    const currentDate = value ? dayjs(value).toDate() : new Date()
    dateArrRef.current = [dayjs(currentDate).year(), dayjs(currentDate).month(), dayjs(currentDate).date()]
    if (value) {
      const [h, m, s] = getHMS(currentDate)
      hourCol.onChange(h)
      minuteCol.onChange(m)
      secondCol.onChange(s)
    } else {
      hourCol.onChange(minHMS[0])
      minuteCol.onChange(minHMS[1])
      secondCol.onChange(minHMS[2])
    }
  }, [value, minHMS, maxHMS])

  useEffect(() => {
    const arr = dateArrRef.current
    if (!arr?.length) return
    const date = new Date(arr[0], arr[1], arr[2], hourCol.value, minuteCol.value, secondCol.value)
    if (format) {
      run(onChange, undefined, date, dayjs(date).format(format))
    } else {
      run(onChange, undefined, date)
    }
  }, [hourCol.value, minuteCol.value, secondCol.value])

  return (
    <div {...props} className={classnames(prefix, className)} ref={forwardedRef}>
      <PickerView options={hourCol.options} rows={rows} value={hourCol.value} onChange={hourCol.onChange} />
      <PickerView options={minuteCol.options} rows={rows} value={minuteCol.value} onChange={minuteCol.onChange} />
      <PickerView options={secondCol.options} rows={rows} value={secondCol.value} onChange={secondCol.onChange} />
    </div>
  )
})

TimePickerView.defaultProps = {}

export default TimePickerView
