import React, { useMemo } from 'react'
import { run } from '@fexd/tools'
import { useMemoizedFn } from 'ahooks'
import dayjs from 'dayjs'

import usePickerProps from '../usePickerProps'
import DatePickerView from '../DatePickerView'
import createFC from '../createFC'
import { DatePickerProps, DatePickerRef, DatePickerType } from './type'

export function usePickerSortFromFormat(format?: string) {
  const pickerSort = useMemo<('year' | 'month' | 'day')[] | undefined>(() => {
    if (typeof format !== 'string') {
      return undefined
    }

    // 去除所有 非 M Y D 字符
    return [
      ...new Set(
        format
          ?.replace(/[^MmDdYy]/g, '')
          .toLocaleLowerCase()
          .split(''),
      ),
    ]?.map(
      (char) =>
        ({
          m: 'month',
          y: 'year',
          d: 'day',
        }[char]),
    ) as ('year' | 'month' | 'day')[]
  }, [format])

  return pickerSort
}

const DatePicker = createFC<DatePickerProps, DatePickerRef>(function DatePicker(props, ref) {
  const { children, format, style, filterInvalidDate: needFilterInvalidDate, ...restProps } = props
  const filterInvalidDate = useMemoizedFn((value) => {
    try {
      return dayjs(value).isValid()
    } catch (error) {
      return false
    }
  })
  const { value, insideValue, setInsideValue, renderTrigger, renderPopup } = usePickerProps({
    ref,
    filterIOValue: needFilterInvalidDate ? filterInvalidDate : undefined,
    ...restProps,
  })

  const pickerSort = usePickerSortFromFormat(format)

  return (
    <>
      {renderTrigger(run(children, undefined, value))}
      {renderPopup(
        <DatePickerView
          pickerSort={pickerSort}
          {...restProps}
          rows={5}
          value={insideValue}
          onChange={(value) => {
            setInsideValue(value)
          }}
          style={style}
        />,
      )}
    </>
  )
}) as DatePickerType

DatePicker.defaultProps = {
  disabled: false,
  filterInvalidDate: false,
}

export default DatePicker
