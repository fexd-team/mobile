import React, { useState } from 'react'
import { TimePickerView, Button, showPopup, DemoBlock } from '@fexd/mobile'

const ViewDemo = () => {
  const [date1, setDate1] = useState<any>(null)
  const [date2, setDate2] = useState<any>(undefined)
  const [formatdate2, setFormatDate2] = useState<any>(undefined)
  const [date3, setDate3] = useState<any>(undefined)
  const [formatdate3, setFormatDate3] = useState<any>(undefined)
  const [date4, setDate4] = useState<any>(undefined)
  const [date5, setDate5] = useState<any>(undefined)

  return (
    <div className="gap-4 bg-[#f5f5f5]">
      <DemoBlock title="受控模式">
        {String(date1)}
        <TimePickerView value={date1} onChange={setDate1} />
        <TimePickerView value={date1} onChange={setDate1} />
      </DemoBlock>

      <DemoBlock title="格式化选中的值：">
        {String(formatdate2)}
        <TimePickerView
          value={date2}
          format="HH时mm分ss秒"
          onChange={(value, formatValue) => {
            setDate2(value)
            setFormatDate2(formatValue)
          }}
        />
        {String(formatdate3)}
        <TimePickerView
          value={date3}
          format="HH:mm:ss"
          onChange={(value, formatValue) => {
            setDate3(value)
            setFormatDate3(formatValue)
          }}
        />
      </DemoBlock>

      <DemoBlock title="修改 Label">
        {String(date4)}
        <TimePickerView value={date4} hourLabel="HH时" minuteLabel="mm分" secondLabel="ss秒" onChange={setDate4} />
      </DemoBlock>

      <DemoBlock title="展示行数">
        {String(date5)}
        <TimePickerView value={date5} rows={5} onChange={setDate5} />
      </DemoBlock>
    </div>
  )
}

export default () => {
  return (
    <DemoBlock title="TimePickerView 示例">
      <Button
        onClick={() => {
          showPopup({
            title: 'TimePickerView 示例',
            content: <ViewDemo />,
          })
        }}
      >
        性能原因，请点击查看
      </Button>
    </DemoBlock>
  )
}
