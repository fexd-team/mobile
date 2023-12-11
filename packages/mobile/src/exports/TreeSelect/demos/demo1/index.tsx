import React from 'react'
import { TreeSelect, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <TreeSelect />
    </DemoBlock>

    <DemoBlock title="进阶">
      <TreeSelect />
    </DemoBlock>
  </div>
)
