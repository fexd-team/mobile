import React from 'react'
import dayjs from 'dayjs'
import { CheckmarkOutline, CloseOutline } from '@fexd/icons'
import { TimePicker, Button, TimePickerView, showPopup, toast, DemoBlock } from '@fexd/mobile'

const showTimePicker = async () => {
  let value
  let tempValue: any

  const { close, promise } = showPopup({
    title: ' ',
    headerRight: (
      <Button
        type="primary"
        fill="none"
        onClick={() => {
          value = tempValue
          close()
        }}
        icon={<CheckmarkOutline />}
      />
    ),
    headerLeft: <Button type="primary" fill="none" onClick={() => close()} icon={<CloseOutline />} />,
    content: (
      <TimePickerView
        onChange={(selectedValue) => {
          tempValue = selectedValue
        }}
      />
    ),
  })

  await promise

  return value
}

export default () => {
  return (
    <>
      <DemoBlock title="基础">
        <TimePicker>
          {(value) => <Button>点击选择时间: {value ? dayjs(value).format('HH:mm:ss') : '--'}</Button>}
        </TimePicker>

        <Button
          onClick={async () => {
            const value = await showTimePicker()
            toast.info(`你选择了：${value ? dayjs(value).format('HH:mm:ss') : '--'}`)
          }}
        >
          命令式（临时实现，当前组件库内内未提供）
        </Button>
      </DemoBlock>
    </>
  )
}
