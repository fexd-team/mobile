import React from 'react'
import { Skeleton, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="方形（默认）">
      <Skeleton />
    </DemoBlock>

    <DemoBlock title="圆形">
      <Skeleton round />
    </DemoBlock>
  </div>
)
