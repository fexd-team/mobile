import React from 'react'
import { ScrollView } from '@fexd/mobile'
import BasicDemo from '../basic'
import LineTimePickerDemo from '../LineTimePickerDemo'
import TimePickerViewDemo from '../TimePickerView'

export default () => {
  return (
    <ScrollView className="gap-4">
      <BasicDemo />
      <LineTimePickerDemo />
      <TimePickerViewDemo />
    </ScrollView>
  )
}
