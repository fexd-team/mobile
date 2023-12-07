import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { ExtensionPuzzle, ExtensionPuzzleOutline } from '@fexd/icons'
import { Radio, Space } from '@fexd/mobile'

export default () => (
  <>
    <DemoBlock title="基础">
      <Space direction="horizontal">
        <Radio value="1">第一项</Radio>
        <Radio value="2">第二项</Radio>
        <Radio value="3">第三项</Radio>
      </Space>
    </DemoBlock>

    <DemoBlock title="块级元素">
      <Space direction="vertical">
        <Radio block value="1">
          第一项
        </Radio>
        <Radio block value="2">
          第二项
        </Radio>
        <Radio block value="3">
          第三项
        </Radio>
      </Space>
    </DemoBlock>

    <DemoBlock title="带描述">
      <Space direction="vertical">
        <Radio value="1" block description="第一项的描述">
          第一项
        </Radio>
        <Radio value="2" block description="第二项的描述">
          第二项
        </Radio>
        <Radio value="3" block description="第三项的描述">
          第三项
        </Radio>
      </Space>
    </DemoBlock>

    <DemoBlock title="自定义图标">
      <Radio block icon={(checked) => (checked ? <ExtensionPuzzle /> : <ExtensionPuzzleOutline />)}>
        第一项
      </Radio>
    </DemoBlock>
  </>
)
