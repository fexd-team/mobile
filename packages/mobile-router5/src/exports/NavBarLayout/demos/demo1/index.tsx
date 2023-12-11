import React from 'react'
import { NavBarLayout } from '@fexd/mobile-router5'
import { DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">{/* <NavBarLayout /> */}</DemoBlock>

    <DemoBlock title="进阶">{/* <NavBarLayout /> */}</DemoBlock>
  </div>
)
