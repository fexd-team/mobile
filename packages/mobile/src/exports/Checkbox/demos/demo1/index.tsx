import React, { useState } from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Checkbox } from '@fexd/mobile'

import './style.less'

const Demo = () => {
  const [checked, setChecked] = useState<any>(true)
  const [value, setValue] = useState<any>(['E'])
  const [value1, setValue1] = useState<any>(['C'])
  const options = [
    {
      label: 'A',
      value: 'A',
    },
    {
      label: 'B',
      value: 'B',
    },
    {
      label: 'C',
      value: 'C',
    },
    {
      label: 'D',
      value: 'D',
    },
    {
      label: 'E',
      value: 'E',
      disabled: true,
    },
  ]

  return (
    <>
      <DemoBlock title="受控模式：">
        <div>
          <Checkbox checked={checked} onChange={setChecked}>
            123
          </Checkbox>
          <Checkbox checked={checked} onChange={setChecked}>
            123
          </Checkbox>
        </div>
      </DemoBlock>

      <DemoBlock title="禁用状态：">
        <div>
          <Checkbox defaultChecked={true} disabled>
            true
          </Checkbox>
          <Checkbox defaultChecked={false} disabled>
            false
          </Checkbox>
        </div>
      </DemoBlock>

      <DemoBlock title="块级元素：">
        <div>
          <Checkbox defaultChecked={true} block>
            true
          </Checkbox>
          <Checkbox defaultChecked={false} block>
            false
          </Checkbox>
        </div>
      </DemoBlock>

      <DemoBlock title="数组生成组">
        <Checkbox.Group options={options} value={value} onChange={setValue} />
      </DemoBlock>

      <DemoBlock title="子元素生成组">
        <Checkbox.Group value={value1} onChange={setValue1}>
          <Checkbox value="A">A</Checkbox>
          <Checkbox value="B">B</Checkbox>
          <Checkbox value="C">C</Checkbox>
          <Checkbox value="D">D</Checkbox>
          <Checkbox value="E" disabled>
            E
          </Checkbox>
        </Checkbox.Group>
      </DemoBlock>
    </>
  )
}

export default Demo
