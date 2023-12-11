import React from 'react'
import { NotFound, DemoBlock } from '@fexd/mobile'
import { HelpCircleOutline } from '@fexd/icons'

import './style.module.less'

import emptyImage from '../../../Empty/demos/demo1/emptyImg.png'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <NotFound />
    </DemoBlock>

    <DemoBlock title="自定义文案">
      <NotFound text="进入了未知的空间" />
    </DemoBlock>

    <DemoBlock title="自定义图标">
      <NotFound icon={<HelpCircleOutline />} />
      <NotFound icon={<img src={emptyImage} />} />
    </DemoBlock>
  </div>
)
