import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { ShareSheet } from '@fexd/mobile'

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
