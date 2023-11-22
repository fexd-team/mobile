import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Elevator } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <Elevator />
    </DemoBlock>

    <DemoBlock title="进阶">
      <Elevator />
    </DemoBlock>
  </div>
)
