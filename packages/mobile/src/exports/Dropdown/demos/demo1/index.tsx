import React from 'react'
import { Dropdown, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <Dropdown />
    </DemoBlock>

    <DemoBlock title="进阶">
      <Dropdown />
    </DemoBlock>
  </div>
)
