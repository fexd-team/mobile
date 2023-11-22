import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Card, toast } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <Card title="title" titleExtra={<>titleExtra</>} footer="footer" footerExtra={<>footerExtra</>}>
        <h1>Card Content</h1>
        <h2>Card Content</h2>
        <h3>Card Content</h3>
      </Card>
    </DemoBlock>
  </div>
)
