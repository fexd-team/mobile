import React from 'react'
import { run } from '@fexd/tools'

import usePickerProps from '../usePickerProps'
import TimePickerView from '../TimePickerView'
import createFC from '../../helpers/createFC'
import { TimePickerProps, TimePickerRef } from './type'

const TimePicker = createFC<TimePickerProps, TimePickerRef>(function Picker(props, ref) {
  const { children, ...restProps } = props
  const { value, insideValue, setInsideValue, renderTrigger, renderPopup } = usePickerProps({
    ref,
    ...restProps,
  })

  return (
    <>
      {renderTrigger(run(children, undefined, value))}
      {renderPopup(
        <TimePickerView
          rows={5}
          value={insideValue}
          onChange={(value) => {
            setInsideValue(value)
          }}
        />,
      )}
    </>
  )
})

export default TimePicker
