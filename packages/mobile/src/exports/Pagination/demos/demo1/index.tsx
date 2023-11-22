import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Pagination } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <Pagination />
    </DemoBlock>

    <DemoBlock title="进阶">
      <Pagination />
    </DemoBlock>
  </div>
)
