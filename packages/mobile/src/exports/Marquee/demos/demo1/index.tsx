import React from 'react'
import { Marquee, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <Marquee />
    </DemoBlock>

    <DemoBlock title="进阶">
      <Marquee />
    </DemoBlock>
  </div>
)
