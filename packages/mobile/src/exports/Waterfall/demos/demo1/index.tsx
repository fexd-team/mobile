import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Waterfall } from '@fexd/mobile'

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
