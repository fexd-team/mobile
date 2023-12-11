import React from 'react'
import { Button, DemoBlock } from '@fexd/mobile'

export default () => (
  <>
    <DemoBlock title="默认纵向布局">
      <Button>按钮</Button>
      <Button>按钮</Button>
      <Button>按钮</Button>
    </DemoBlock>

    <DemoBlock title="横向布局" inline>
      <Button>按钮</Button>
      <Button>按钮</Button>
      <Button>按钮</Button>
    </DemoBlock>

    <DemoBlock title="朴素样式（标题有样式，内容无样式）" plain>
      <Button>按钮</Button>
      <Button>按钮</Button>
      <Button>按钮</Button>
    </DemoBlock>

    <DemoBlock title="朴素样式 - 横向" plain inline>
      <Button>按钮</Button>
      <Button>按钮</Button>
      <Button>按钮</Button>
    </DemoBlock>
  </>
)
