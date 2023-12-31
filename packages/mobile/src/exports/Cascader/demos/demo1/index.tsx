import React from 'react'
import { Cascader, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <Cascader />
    </DemoBlock>

    <DemoBlock title="进阶">
      <Cascader />
    </DemoBlock>
  </div>
)
