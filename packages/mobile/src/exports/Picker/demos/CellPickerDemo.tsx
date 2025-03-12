import React from 'react'
import { CellPicker, DemoBlock } from '@fexd/mobile'

const options = [
  {
    label:
      '数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1数据1',
    value: 1,
    disabled: false,
  },
  {
    label: '数据2',
    value: 2,
    disabled: false,
  },
  {
    label: '数据3',
    value: 3,
  },
]

export default () => {
  const [value, setValue] = React.useState<any>()

  return (
    <div className="gap-4">
      <DemoBlock title="CellPicker 基础">
        <CellPicker options={options} placeholder="基础用法" value={value} onChange={(value) => setValue(value)} />
        <CellPicker
          options={options}
          placeholder="受控状态，上边那个也是受控的"
          value={value}
          onChange={(value) => setValue(value)}
        />
      </DemoBlock>

      <DemoBlock title="CellPicker 状态一览">
        <CellPicker
          options={options}
          label="错误状态，聚焦试试"
          placeholder="聚焦时会暂时去掉错误状态"
          error="XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦"
          helper="辅助文本"
        />
        <CellPicker
          options={options}
          hideErrorWhenFocusing={false}
          placeholder="聚焦时不解除错误状态"
          error="XXX有点问题哦"
        />
        <CellPicker options={options} placeholder={'警告状态'} labelType="warn" helper="辅助文本" />
        <CellPicker options={options} placeholder={'成功状态'} labelType="success" helper="辅助文本" />
        <CellPicker disabled label={'禁用状态'} helper="禁用了，点也点不着" />
      </DemoBlock>

      <DemoBlock title="CellPicker 不可清除">
        <CellPicker options={options} placeholder="不可清除的" clearable={false} />
      </DemoBlock>

      <DemoBlock title="CellPicker 各部分、多个排列">
        <CellPicker
          options={options}
          label="label-1"
          placeholder="placeholder-1"
          prefix="prefix-1"
          helper="helper-1"
          suffix="suffix-1"
          error="error-1"
          onChange={console.log}
        />
        <CellPicker
          options={options}
          label="label-2"
          placeholder="placeholder-2"
          prefix="prefix-2"
          helper="helper-2"
          suffix="suffix-2"
          error="error-2"
        />
      </DemoBlock>
    </div>
  )
}
