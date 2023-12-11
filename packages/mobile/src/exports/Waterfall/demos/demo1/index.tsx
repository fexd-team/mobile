import React from 'react'
import { Waterfall, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <Waterfall />
    </DemoBlock>

    <DemoBlock title="进阶">
      <Waterfall />
    </DemoBlock>
  </div>
)
