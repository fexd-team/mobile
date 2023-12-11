import React from 'react'
import { Stepper, Space, DemoBlock } from '@fexd/mobile'

export default () => (
  <>
    <DemoBlock title="基础">
      <Stepper />
    </DemoBlock>

    <DemoBlock title="步长">
      <Stepper defaultValue={10} step={10} />
    </DemoBlock>

    <DemoBlock title="最大值 / 最小值">
      <Stepper min={5} max={10} />
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
  </>
)
