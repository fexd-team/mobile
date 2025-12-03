import React, { useState } from 'react'
import { DatePickerView, DemoBlock } from '@fexd/mobile'

export default () => {
  const [date1, setDate1] = useState<any>(undefined)
  const [formatDate1, setFormatDate1] = useState<any>('')
  const [date2, setDate2] = useState<any>(undefined)
  const [formatDate2, setFormatDate2] = useState<any>('')

  return (
    <>
      <DemoBlock title="格式：YYYY年MM月DD日">
        <div className="text-sm text-gray-500 mb-2">格式化值：{formatDate1 || '未选择'}</div>
        <DatePickerView
          value={date1}
          format="YYYY年MM月DD日"
          onChange={(value, formatValue) => {
            setDate1(value)
            setFormatDate1(formatValue)
          }}
        />
      </DemoBlock>

      <DemoBlock title="格式：YYYY/MM/DD">
        <div className="text-sm text-gray-500 mb-2">格式化值：{formatDate2 || '未选择'}</div>
        <DatePickerView
          value={date2}
          format="YYYY/MM/DD"
          onChange={(value, formatValue) => {
            setDate2(value)
            setFormatDate2(formatValue)
          }}
        />
      </DemoBlock>
    </>
  )
}
