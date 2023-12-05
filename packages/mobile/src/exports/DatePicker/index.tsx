import React from 'react'
import { run } from '@fexd/tools'

import usePickerProps from '../usePickerProps'
import DatePickerView from '../DatePickerView'
import createFC from '../createFC'
import { DatePickerProps, DatePickerRef, DatePickerType } from './type'

const DatePicker = createFC<DatePickerProps, DatePickerRef>(function DatePicker(props, ref) {
  const { children, format, style, ...restProps } = props
  const { value, insideValue, setInsideValue, renderTrigger, renderPopup } = usePickerProps({
    ref,
    ...restProps,
  })

  return (
    <>
      {renderTrigger(run(children, undefined, value))}
      {renderPopup(
        <DatePickerView
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
}

export default DatePicker
