import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { TabBarLayout } from '@fexd/mobile-router5'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">{/* <TabBarLayout /> */}</DemoBlock>

    <DemoBlock title="进阶">{/* <TabBarLayout /> */}</DemoBlock>
  </div>
)
