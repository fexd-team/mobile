import React from 'react'
import { CellCascadePicker, DemoBlock } from '@fexd/mobile'

const options = [
  {
    label: '浙江',
    value: '浙江',
    children: [
      {
        label: '杭州',
        value: '杭州',
        children: [
          { label: '西湖区', value: '西湖区' },
          { label: '上城区', value: '上城区' },
        ],
      },
    ],
  },
  {
    label: '安徽',
    value: '安徽',
    children: [
      {
        label: '合肥',
        value: '合肥',
        children: [
          { label: '包河区', value: '包河区' },
          { label: '蜀山区', value: '蜀山区' },
        ],
      },
    ],
  },
]

export default () => {
  return (
    <div className="gap-4">
      <DemoBlock title="CellCascadePicker 基础">
        <CellCascadePicker options={options} placeholder="请选择地区" />
      </DemoBlock>

      <DemoBlock title="CellCascadePicker 禁用">
        <CellCascadePicker disabled placeholder="禁用状态" />
      </DemoBlock>
    </div>
  )
}
