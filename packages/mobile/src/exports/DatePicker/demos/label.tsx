import React, { useState } from 'react'
import { DatePickerView, DemoBlock } from '@fexd/mobile'

export default () => {
  const [date, setDate] = useState<any>(undefined)

  return (
    <DemoBlock title="自定义 Label">
      <div className="text-sm text-gray-500 mb-2">选中：{date ? String(date) : '未选择'}</div>
      <DatePickerView value={date} yearLabel="YYYY年" monthLabel="MM月" dayLabel="DD日" onChange={setDate} />
    </DemoBlock>
  )
}
