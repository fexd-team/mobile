import React from 'react'
import { Menu, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <Menu />
    </DemoBlock>

    <DemoBlock title="进阶">
      <Menu />
    </DemoBlock>
  </div>
)
