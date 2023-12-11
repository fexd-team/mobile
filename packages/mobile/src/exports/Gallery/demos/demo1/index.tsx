import React from 'react'
import { Gallery, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <Gallery />
    </DemoBlock>

    <DemoBlock title="进阶">
      <Gallery />
    </DemoBlock>
  </div>
)
