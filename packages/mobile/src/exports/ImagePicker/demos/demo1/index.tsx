import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { ImagePicker } from '@fexd/mobile'

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
