import React from 'react'
import { Tips, Button, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Tips title="123" zIndex={30}>
          <Button>左上</Button>
        </Tips>
        <Tips title="123" placement="top" modal theme="white">
          <Button>上中</Button>
        </Tips>
        <Tips title="123" placement="topRight">
          <Button>右上</Button>
        </Tips>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Tips title="101" placement="rightTop">
            <Button>右上</Button>
          </Tips>
          <Tips title="101" placement="right">
            <Button>右中</Button>
          </Tips>
          <Tips title="101" placement="rightBottom">
            <Button>右下</Button>
          </Tips>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
          <Tips title="456" placement="leftTop">
            <Button>左上</Button>
          </Tips>
          <Tips title="456" placement="left">
            <Button>左中</Button>
          </Tips>
          <Tips title="456" placement="leftBottom">
            <Button>左下</Button>
          </Tips>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Tips title="789" placement="bottomLeft">
          <Button>下左</Button>
        </Tips>
        <Tips title="789" placement="bottom">
          <Button>下中</Button>
        </Tips>
        <Tips title="789" placement="bottomRight">
          <Button>下右</Button>
        </Tips>
      </div>
    </DemoBlock>
  </div>
)
