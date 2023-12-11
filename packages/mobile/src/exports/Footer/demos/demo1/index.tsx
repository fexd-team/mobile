import React from 'react'
import { Footer, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <Footer />
    </DemoBlock>

    <DemoBlock title="进阶">
      <Footer />
    </DemoBlock>
  </div>
)
