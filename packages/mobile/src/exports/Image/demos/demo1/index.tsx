import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Image } from '@fexd/mobile'

import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="基础">
      <Image src="https://imgslim.geekpark.net/uploads/image/file/a6/cf/a6cf1c0a392ce4fa5f3a44dd984d2ad9.jpg" />
    </DemoBlock>
    <DemoBlock title="比例">
      <Image
        proportion="8:2"
        src="https://imgslim.geekpark.net/uploads/image/file/a6/cf/a6cf1c0a392ce4fa5f3a44dd984d2ad9.jpg"
      />
    </DemoBlock>
    <div style={{ height: 900 }} />
    <DemoBlock title="懒加载">
      <Image
        lazy={true}
        proportion="16:9"
        src="https://lh3.googleusercontent.com/proxy/r3lvnmHYuAGB2KFKxsmn3ky4aOTIgQaCAtzwnfXaesY-mHdS6pxvHvig4RfrhQePfEiAKdWUwjQY6GBlFNthrlAEdCTACX7qOaFzLOO5rDWIm8mCxPREpAyqq7Rr4qLh-Ad41gmkEQ"
      />
    </DemoBlock>
  </div>
)
