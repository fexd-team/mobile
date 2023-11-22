import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { NavBarLayout } from '@fexd/mobile-router5'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">{/* <NavBarLayout /> */}</DemoBlock>

    <DemoBlock title="进阶">{/* <NavBarLayout /> */}</DemoBlock>
  </div>
)
