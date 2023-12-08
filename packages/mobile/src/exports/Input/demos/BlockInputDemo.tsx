import React from 'react'
import { Button, BlockInput, toast } from '@fexd/mobile'
import DemoBlock from '@documents/components/DemoBlock'

export default () => (
  <>
    <DemoBlock title="BlockInput 基础">
      <BlockInput label="随便写点什么" />
    </DemoBlock>

    <DemoBlock title="BlockInput 多行输入">
      <BlockInput placeholder="按回车键换行" multipleLines />
    </DemoBlock>

    <DemoBlock title="BlockInput 状态一览">
      <BlockInput
        placeholder="聚焦时会暂时去掉错误状态"
        error="XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦"
        helper="辅助文本"
      />
      <BlockInput hideErrorWhenFocusing={false} label="聚焦时不解除错误状态" error="XXX有点问题哦" />
      <BlockInput label={'警告状态'} labelType="warn" helper="辅助文本" />
      <BlockInput label={'成功状态'} labelType="success" helper="辅助文本" />
      <BlockInput disabled label={'禁用状态'} helper="禁用了，点也点不着" />
    </DemoBlock>

    <DemoBlock title="BlockInput 各部分示意">
      <BlockInput
        label="label-1"
        placeholder="placeholder-1"
        prefix="prefix-1"
        helper="helper-1"
        suffix="suffix-1"
        error="error-1"
      />
      <BlockInput
        label="发送验证码"
        placeholder="请输入电话号码"
        prefix="+86"
        helper="纯纯的辅助文本"
        suffix={
          <Button
            type="primary"
            size="mini"
            onClick={() => {
              toast.success('假装发送成功', {
                placement: 'bottom',
              })
            }}
          >
            发送
          </Button>
        }
        error="其实不会做任何事情"
      />
    </DemoBlock>
  </>
)
