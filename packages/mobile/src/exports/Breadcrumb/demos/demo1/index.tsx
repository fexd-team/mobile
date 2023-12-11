import React from 'react'
import { Breadcrumb, toast, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <Breadcrumb data={['第一级', '第二级', '第三级']} onClick={(value) => toast.info(value)} />
    </DemoBlock>
  </div>
)
