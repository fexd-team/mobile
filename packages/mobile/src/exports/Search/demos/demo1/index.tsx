import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Search } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <Search />
    </DemoBlock>

    <DemoBlock title="进阶">
      <Search />
    </DemoBlock>
  </div>
)
