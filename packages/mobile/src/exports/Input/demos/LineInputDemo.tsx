import React from 'react'

import { Button, LineInput, toast } from '@fexd/mobile'
import DemoBlock from '@documents/components/DemoBlock'

export default () => (
  <>
    <DemoBlock title="LineInput 基础">
      <LineInput label="随便写点什么" />
    </DemoBlock>

    <DemoBlock title="LineInput 多行输入">
      <LineInput placeholder="按回车键换行" multipleLines />
    </DemoBlock>

    <DemoBlock title="LineInput 状态一览">
      <LineInput
        placeholder="聚焦时会暂时去掉错误状态"
        error="XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦"
        helper="辅助文本"
      />
      <LineInput hideErrorWhenFocusing={false} label="聚焦时不解除错误状态" error="XXX有点问题哦" />
      <LineInput label={'警告状态'} labelType="warn" helper="辅助文本" />
      <LineInput label={'成功状态'} labelType="success" helper="辅助文本" />
      <LineInput disabled label={'禁用状态'} helper="禁用了，点也点不着" />
    </DemoBlock>

    <DemoBlock title="LineInput 各部分示意">
      <LineInput
        label="label-1"
        placeholder="placeholder-1"
        prefix="prefix-1"
        helper="helper-1"
        suffix="suffix-1"
        error="error-1"
      />
      <LineInput
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
