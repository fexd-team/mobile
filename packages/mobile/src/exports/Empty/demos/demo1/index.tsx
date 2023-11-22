import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { AlbumsOutline } from '@fexd/icons'
import { Empty, Button, toast } from '@fexd/mobile'
import './style.module.less'

import emptyImage from './emptyImg.png'

// const emptyImage = require('./emptyImg.png')

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <Empty />
    </DemoBlock>
    <DemoBlock title="自定义图标">
      <Empty icon={<AlbumsOutline />} />
      <Empty icon={<img src={emptyImage} />} />
      <Empty icon={<img src={emptyImage} style={{ width: 180 }} />} text="暂无数据" />
    </DemoBlock>
    <DemoBlock title="自定义内容">
      <Empty icon={<img src={emptyImage} />}>
        <Button
          type="primary"
          fill="outline"
          shape="round"
          onClick={() => {
            toast.info('Refresh')
          }}
        >
          Refresh
        </Button>
      </Empty>
    </DemoBlock>
  </div>
)
