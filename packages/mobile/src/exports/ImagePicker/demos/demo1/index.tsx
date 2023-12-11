import React from 'react'
import { ImagePicker, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <ImagePicker />
    </DemoBlock>

    <DemoBlock title="进阶">
      <ImagePicker />
    </DemoBlock>
  </div>
)
