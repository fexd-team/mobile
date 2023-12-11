import React from 'react'
import { PickerView, DemoBlock } from '@fexd/mobile'

const options = Array.from(new Array(12)).map((item, index) => ({
  label: `${index + 1}月`,
  value: index + 1,
}))

export default () => {
  const [value, setValue] = React.useState(3)

  return (
    <>
      <DemoBlock title={`PickerView - 受控模式，当前值为：${value}`}>
        <PickerView
          options={options}
          value={value}
          onChange={(value) => {
            setValue(value as number)
          }}
          rows={3}
        />
        <PickerView
          options={options}
          value={value}
          onChange={(value) => {
            setValue(value as number)
          }}
          rows={3}
        />
      </DemoBlock>

      <DemoBlock title="PickerView - 展示 5 行数">
        <PickerView options={options} rows={5} />
      </DemoBlock>
    </>
  )
}
