import React from 'react'
import { NoticeBar, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <NoticeBar text={<h1>这是我想要提醒你的文本哦</h1>} animation={false} />
    </DemoBlock>

    <DemoBlock title="动画">
      <NoticeBar text="这是我想要提醒你的文本哦" animation={true} />
    </DemoBlock>
  </div>
)
