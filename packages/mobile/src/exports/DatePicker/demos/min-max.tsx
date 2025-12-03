import React, { useState } from 'react'
import { DatePickerView, DemoBlock } from '@fexd/mobile'

export default () => {
  const [date1, setDate1] = useState<any>(undefined)
  const [date2, setDate2] = useState<any>(undefined)

  return (
    <>
      <DemoBlock title="最小日期（今天起）">
        <div className="text-sm text-gray-500 mb-2">选中：{date1 ? String(date1) : '未选择'}</div>
        <DatePickerView value={date1} min={new Date()} onChange={setDate1} />
      </DemoBlock>

      <DemoBlock title="最大日期（今天止）">
        <div className="text-sm text-gray-500 mb-2">选中：{date2 ? String(date2) : '未选择'}</div>
        <DatePickerView value={date2} max={new Date()} onChange={setDate2} />
      </DemoBlock>
    </>
  )
}
