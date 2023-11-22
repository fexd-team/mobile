import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Divider } from '@fexd/mobile'

export default () => {
  return (
    <>
      <DemoBlock title="示例：默认分割线">
        <Divider />
      </DemoBlock>
      <DemoBlock title="示例：有文字">
        <Divider>No more</Divider>
        <Divider>This is a very long, very long, very long, very long text</Divider>
      </DemoBlock>
      <DemoBlock title="示例：垂直方向">
        <div>
          <span>First</span>
          <Divider vertical />
          <span>Second</span>
          <Divider vertical />
          <span>Third</span>
        </div>
      </DemoBlock>
    </>
  )
}
