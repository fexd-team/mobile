import React from 'react'
import { Space, Button, DemoBlock } from '@fexd/mobile'

export default () => (
  <>
    <DemoBlock title="基础">
      <Space align="center">
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
      </Space>
    </DemoBlock>

    <DemoBlock title="设置对其方式">
      <Space align="start">
        <Button>Button</Button>
        <Button style={{ height: '50px' }}>Button</Button>
        <Button type="success" size="small">
          Button
        </Button>
      </Space>

      <Space align="end">
        <Button>Button</Button>
        <Button style={{ height: '50px' }}>Button</Button>
        <Button type="success" size="small">
          Button
        </Button>
      </Space>

      <Space align="center">
        <Button>Button</Button>
        <Button style={{ height: '50px' }}>Button</Button>
        <Button type="success" size="small">
          Button
        </Button>
      </Space>

      <Space align="baseline">
        <Button>Button</Button>
        <Button style={{ height: '50px' }}>Button</Button>
        <Button type="success" size="small">
          Button
        </Button>
      </Space>
    </DemoBlock>

    <DemoBlock title="设置间距">
      <Space gap={20}>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
      </Space>
    </DemoBlock>

    <DemoBlock title="设置间距方向">
      <Space>
        <Button>Content</Button>
        <Button>Content</Button>
        <Button>Content</Button>
      </Space>

      <Space direction="vertical">
        <Button>Content</Button>
        <Button>Content</Button>
        <Button>Content</Button>
      </Space>
    </DemoBlock>

    <DemoBlock title="设置拆分">
      <Space align="center" split={<span>|</span>}>
        <Button fill="none">Button</Button>
        <Button fill="none">Button</Button>
        <Button fill="none">Button</Button>
      </Space>
    </DemoBlock>

    <DemoBlock title="设置自动换行">
      <Space wrap>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
      </Space>
    </DemoBlock>
  </>
)
