import React, { useState } from 'react'
import { CascadePickerView, DemoBlock } from '@fexd/mobile'

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
          { label: '余杭区', value: '余杭区' },
        ],
      },
      {
        label: '温州',
        value: '温州',
        children: [
          { label: '鹿城区', value: '鹿城区' },
          { label: '瓯海区', value: '瓯海区' },
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
  const [info, setInfo] = useState('')

  return (
    <>
      <DemoBlock title="CascadePickerView 基础">
        <CascadePickerView
          options={options}
          onChange={(values, selectedOptions) => {
            setInfo(selectedOptions.map((o) => o.label).join(' / '))
          }}
        />
        <div style={{ padding: 16, textAlign: 'center' }}>当前选中：{info || '---'}</div>
      </DemoBlock>
    </>
  )
}
