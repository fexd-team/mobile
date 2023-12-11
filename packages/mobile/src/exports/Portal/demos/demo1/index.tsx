import React from 'react'
import { Portal, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <div>第1层</div>
      <div>
        <div>第2层</div>
        <div>
          <div>第3层</div>
          <div>
            <div>第4层</div>
            <Portal>
              <p className="animate-pulse fixed top-0 left-1/2 transform -translate-x-1/2" style={{ zIndex: 99999 }}>
                本 p 标签虽然写在第4层里，但打开控制台 Elements 可发现， 其实我和 id 为 root 的根结点同层
              </p>
            </Portal>
          </div>
        </div>
      </div>
    </DemoBlock>
  </div>
)
