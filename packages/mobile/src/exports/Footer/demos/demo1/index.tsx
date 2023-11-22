import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Footer } from '@fexd/mobile'

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
