import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { ExtensionPuzzle, ExtensionPuzzleOutline } from '@fexd/icons'
import { Radio, Space } from '@fexd/mobile'

export default () => (
  <>
    <DemoBlock title="基础用法">
      <Radio.Group
        defaultValue={'1'}
        options={[
          { value: '1', label: '第一项' },
          { value: '2', label: '第二项' },
          { value: '3', label: '第三项' },
        ]}
      />
    </DemoBlock>

    <DemoBlock title="禁用状态">
      <Radio.Group
        disabled
        defaultValue={'1'}
        options={[
          { value: '1', label: '第一项' },
          { value: '2', label: '第二项' },
          { value: '3', label: '第三项' },
        ]}
      />
    </DemoBlock>

    <DemoBlock title="自定义图标">
      <Radio.Group
        defaultValue={'1'}
        icon={(checked) => (checked ? <ExtensionPuzzle /> : <ExtensionPuzzleOutline />)}
        options={[
          { value: '1', label: '第一项' },
          { value: '2', label: '第二项' },
          { value: '3', label: '第三项' },
        ]}
      />
    </DemoBlock>

    <DemoBlock title="块级元素">
      <Radio.Group
        defaultValue={'1'}
        block
        options={[
          { value: '1', label: '第一项' },
          { value: '2', label: '第二项' },
        ]}
      />
    </DemoBlock>

    <DemoBlock title="带描述">
      <Radio.Group
        block
        defaultValue={'2'}
        options={[
          { value: '1', label: '第一项', description: '第一项的描述' },
          { value: '2', label: '第二项', description: '第二项的描述', disabled: true },
        ]}
      />
    </DemoBlock>

    <DemoBlock title="单独使用 Radio">
      <Space direction="horizontal">
        <Radio block value="1" defaultChecked>
          第一项
        </Radio>
        <Radio block value="2" disabled>
          第二项
        </Radio>
      </Space>
      <Radio value="3" block description="第二项的描述">
        第三项
      </Radio>
    </DemoBlock>

    <DemoBlock title="单独使用 Radio 和 Radio.Group">
      <Radio.Group defaultValue={'1'}>
        <Space direction="vertical">
          <Space direction="horizontal">
            <Radio block value="1">
              第一项
            </Radio>
            <Radio block value="2" disabled>
              第二项
            </Radio>
          </Space>
          <Radio value="3" block description="第二项的描述">
            第三项
          </Radio>
        </Space>
      </Radio.Group>
    </DemoBlock>
  </>
)
