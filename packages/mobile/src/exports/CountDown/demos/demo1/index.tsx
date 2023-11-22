import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { CountDown } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <CountDown deadline={Date.now() + 1000 * 10} localOffset={0} />
    </DemoBlock>
  </div>
)
