import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Sticky } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <Sticky />
    </DemoBlock>

    <DemoBlock title="进阶">
      <Sticky />
    </DemoBlock>
  </div>
)
