import React, { useState } from 'react'
import dayjs from 'dayjs'
import { CheckmarkOutline, CloseOutline } from '@fexd/icons'
import { DatePicker, DatePickerView, Button, showPopup, toast, DemoBlock } from '@fexd/mobile'

const showDatePicker = async () => {
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
      <DatePickerView
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
  const [date, setDate] = useState<Date | undefined>()

  return (
    <>
      <DemoBlock title="DatePicker 基础">
        <DatePicker value={date} onChange={setDate}>
          {(value) => <Button>点击选择日期: {value ? dayjs(value).format('YYYY年MM月DD日') : '请选择'}</Button>}
        </DatePicker>
      </DemoBlock>

      <DemoBlock title="命令式调用">
        <Button
          onClick={async () => {
            const value = await showDatePicker()
            toast.info(`你选择了：${value ? dayjs(value).format('YYYY年MM月DD日') : '--'}`)
          }}
        >
          点击选择日期（命令式）
        </Button>
      </DemoBlock>
    </>
  )
}
