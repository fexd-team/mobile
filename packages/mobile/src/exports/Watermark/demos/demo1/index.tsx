import React from 'react'
import { Watermark, View, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <View height={300}>
        <Watermark text="测试水印" fullpage />
      </View>
    </DemoBlock>

    {/* <DemoBlock title="进阶">
      <Watermark />
    </DemoBlock> */}
  </div>
)
