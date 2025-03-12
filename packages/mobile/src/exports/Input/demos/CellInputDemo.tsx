import React from 'react'

import { Button, CellInput, toast, DemoBlock } from '@fexd/mobile'

export default () => (
  <>
    <DemoBlock title="CellInput 基础">
      <CellInput label="随便写点什么" placeholder="请输入" />
    </DemoBlock>

    <DemoBlock title="CellInput 多行输入">
      <CellInput label="多行输入" placeholder="按回车键换行" multipleLines />
    </DemoBlock>

    <DemoBlock title="CellInput 状态一览">
      <CellInput
        label="聚焦时隐藏错误"
        placeholder="请输入"
        error="XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦XXX有点问题哦"
        helper="辅助文本"
      />
      <CellInput hideErrorWhenFocusing={false} label="聚焦时不隐藏错误" placeholder="请输入" error="XXX有点问题哦" />
      <CellInput placeholder="请输入" label={'警告状态'} labelType="warn" helper="辅助文本" />
      <CellInput placeholder="请输入" label={'成功状态'} labelType="success" helper="辅助文本" />
      <CellInput placeholder="输入不了" disabled label={'禁用状态'} helper="禁用了，点也点不着" />
    </DemoBlock>

    <DemoBlock title="CellInput 各部分示意">
      <CellInput
        label="label-1"
        placeholder="placeholder-1"
        prefix="prefix-1"
        helper="helper-1"
        suffix="suffix-1"
        error="error-1"
      />
      <CellInput
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
