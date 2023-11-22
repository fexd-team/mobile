import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Gallery } from '@fexd/mobile'

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
