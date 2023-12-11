import React from 'react'
import { Drawer, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <Drawer />
    </DemoBlock>

    <DemoBlock title="进阶">
      <Drawer />
    </DemoBlock>
  </div>
)
