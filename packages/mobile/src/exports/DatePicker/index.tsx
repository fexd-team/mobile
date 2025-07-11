import React from 'react'
import { run } from '@fexd/tools'
import { useMemoizedFn } from 'ahooks'
import dayjs from 'dayjs'

import usePickerProps from '../usePickerProps'
import DatePickerView from '../DatePickerView'
import createFC from '../createFC'
import { DatePickerProps, DatePickerRef, DatePickerType } from './type'

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

  return (
    <>
      {renderTrigger(run(children, undefined, value))}
      {renderPopup(
        <DatePickerView
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
