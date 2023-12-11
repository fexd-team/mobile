import React from 'react'
import { ShareSheet, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <ShareSheet />
    </DemoBlock>

    <DemoBlock title="进阶">
      <ShareSheet />
    </DemoBlock>
  </div>
)
