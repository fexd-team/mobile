import React from 'react'
import { NumberKeyboard, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <NumberKeyboard />
    </DemoBlock>

    <DemoBlock title="进阶">
      <NumberKeyboard />
    </DemoBlock>
  </div>
)
