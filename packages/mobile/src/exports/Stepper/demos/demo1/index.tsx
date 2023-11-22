import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Stepper, Space } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <Stepper />
    </DemoBlock>

    <DemoBlock title="进阶">
      <Stepper defaultValue={10} step={10} />
    </DemoBlock>

    <DemoBlock title="尺寸">
      <Space wrap>
        <Stepper size="small" />
        <Stepper size="normal" />
        <Stepper size="large" />
      </Space>
      <Stepper block size="small" />
      <Stepper block size="normal" />
      <Stepper block size="large" />
    </DemoBlock>
  </div>
)
