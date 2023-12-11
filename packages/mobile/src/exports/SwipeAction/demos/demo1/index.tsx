import React from 'react'
import { SwipeAction, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <SwipeAction />
    </DemoBlock>

    <DemoBlock title="进阶">
      <SwipeAction />
    </DemoBlock>
  </div>
)
