import React, { useState } from 'react'
import { CascadePicker, CascadePickerView, Button, DemoBlock } from '@fexd/mobile'

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
  {
    label: '江苏',
    value: '江苏',
    children: [
      {
        label: '南京',
        value: '南京',
        children: [
          { label: '玄武区', value: '玄武区' },
          { label: '秦淮区', value: '秦淮区' },
        ],
      },
      {
        label: '苏州',
        value: '苏州',
        children: [
          { label: '虎丘区', value: '虎丘区' },
          { label: '吴中区', value: '吴中区' },
        ],
      },
    ],
  },
]

export default () => {
  const [value, setValue] = useState<(string | number)[]>()

  return (
    <>
      <DemoBlock title="CascadePicker 基础">
        <CascadePicker options={options} value={value} onChange={(values, selectedOptions) => setValue(values)}>
          {(selectedValues, selectedOptions) => (
            <Button>{selectedOptions?.length ? selectedOptions.map((o) => o.label).join(' / ') : '请选择地区'}</Button>
          )}
        </CascadePicker>
      </DemoBlock>
    </>
  )
}
