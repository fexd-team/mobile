import React from 'react'
import { SegmentedControl, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <SegmentedControl />
    </DemoBlock>

    <DemoBlock title="进阶">
      <SegmentedControl />
    </DemoBlock>
  </div>
)
