import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Calendar } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <Calendar />
    </DemoBlock>

    <DemoBlock title="进阶">
      <Calendar />
    </DemoBlock>
  </div>
)
