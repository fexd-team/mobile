import React, { useState } from 'react'
import {
  LineInput,
  BlockInput,
  CellInput,
  LinePicker,
  BlockPicker,
  CellPicker,
  LineDatePicker,
  BlockDatePicker,
  CellDatePicker,
  DemoBlock,
} from '@fexd/mobile'

const options = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
]

export default () => {
  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [input3, setInput3] = useState('')

  const [picker1, setPicker1] = useState('')
  const [picker2, setPicker2] = useState('')
  const [picker3, setPicker3] = useState('')

  const [date1, setDate1] = useState<Date>()
  const [date2, setDate2] = useState<Date>()
  const [date3, setDate3] = useState<Date>()

  return (
    <>
      <DemoBlock title="第 4 层：组件矩阵 - 3 样式 × 4 功能 = 12 组件">
        <LineInput label="Line 输入框" placeholder="请输入" value={input1} onChange={setInput1} />
        <LinePicker label="Line 选择器" placeholder="请选择" options={options} value={picker1} onChange={setPicker1} />
        <LineDatePicker label="Line 日期" placeholder="请选择" value={date1} onChange={setDate1} />
      </DemoBlock>

      <DemoBlock title="Block 样式系列">
        <BlockInput label="Block 输入框" placeholder="请输入" value={input2} onChange={setInput2} />
        <BlockPicker
          label="Block 选择器"
          placeholder="请选择"
          options={options}
          value={picker2}
          onChange={setPicker2}
        />
        <BlockDatePicker label="Block 日期" placeholder="请选择" value={date2} onChange={setDate2} />
      </DemoBlock>

      <DemoBlock title="Cell 样式系列">
        <CellInput label="Cell 输入框" placeholder="请输入" value={input3} onChange={setInput3} />
        <CellPicker label="Cell 选择器" placeholder="请选择" options={options} value={picker3} onChange={setPicker3} />
        <CellDatePicker label="Cell 日期" placeholder="请选择" value={date3} onChange={setDate3} />
      </DemoBlock>
    </>
  )
}
