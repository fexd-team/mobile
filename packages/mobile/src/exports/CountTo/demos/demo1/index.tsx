import React from 'react'
import { CountTo, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <CountTo />
    </DemoBlock>

    <DemoBlock title="进阶">
      <CountTo />
    </DemoBlock>
  </div>
)
