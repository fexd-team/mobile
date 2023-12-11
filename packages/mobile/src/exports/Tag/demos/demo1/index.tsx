import React from 'react'
import { Tag, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <Tag />
    </DemoBlock>

    <DemoBlock title="进阶">
      <Tag />
    </DemoBlock>
  </div>
)
