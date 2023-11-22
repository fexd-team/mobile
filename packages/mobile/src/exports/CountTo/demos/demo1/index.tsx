import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { CountTo } from '@fexd/mobile'

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
