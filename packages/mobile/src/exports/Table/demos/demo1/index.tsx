import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Table } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <Table />
    </DemoBlock>

    <DemoBlock title="进阶">
      <Table />
    </DemoBlock>
  </div>
)
