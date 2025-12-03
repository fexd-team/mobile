import React, { useState } from 'react'
import { DatePickerView, DemoBlock } from '@fexd/mobile'

export default () => {
  const [date, setDate] = useState<any>(undefined)

  return (
    <DemoBlock title="展示 5 行">
      <div className="text-sm text-gray-500 mb-2">选中：{date ? String(date) : '未选择'}</div>
      <DatePickerView value={date} rows={5} onChange={setDate} />
    </DemoBlock>
  )
}
