import React from 'react'
import { TabBarLayout } from '@fexd/mobile-router5'
import { DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">{/* <TabBarLayout /> */}</DemoBlock>

    <DemoBlock title="进阶">{/* <TabBarLayout /> */}</DemoBlock>
  </div>
)
