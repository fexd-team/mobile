import React from 'react'
import { LineCascadePicker, DemoBlock } from '@fexd/mobile'

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
  const [value, setValue] = React.useState<any>()

  return (
    <div className="gap-4">
      <DemoBlock title="LineCascadePicker 基础">
        <LineCascadePicker
          options={options}
          placeholder="请选择地区"
          value={value}
          onChange={(values) => setValue(values)}
        />
      </DemoBlock>

      <DemoBlock title="LineCascadePicker 状态">
        <LineCascadePicker options={options} placeholder="错误状态" error="请选择地区" helper="辅助文本" />
        <LineCascadePicker disabled placeholder="禁用状态" />
      </DemoBlock>
    </div>
  )
}
