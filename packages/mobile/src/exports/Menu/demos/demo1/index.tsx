import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Menu } from '@fexd/mobile'

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
