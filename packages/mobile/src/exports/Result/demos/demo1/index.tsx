import React from 'react'
import { Balloon } from '@fexd/icons'
import { Result, Button, toast, DemoBlock } from '@fexd/mobile'
import './style.module.less'

export default () => (
  <div className="demo">
    <DemoBlock title="成功状态">
      <Result status="success" title="操作成功" description="您的操作已经成功完成" />
    </DemoBlock>
    <DemoBlock title="警告状态">
      <Result status="warning" title="警告提示" description="请注意检查相关信息" />
    </DemoBlock>
    <DemoBlock title="错误状态">
      <Result status="error" title="操作失败" description="操作失败，请稍后重试" />
    </DemoBlock>
    <DemoBlock title="信息状态">
      <Result status="info" title="信息提示" description="这是一条信息提示" />
    </DemoBlock>
    <DemoBlock title="自定义图标">
      <Result icon={<Balloon />} title="自定义图标" description="可以使用任意自定义图标" />
    </DemoBlock>
    <DemoBlock title="仅标题">
      <Result status="success" title="操作成功" />
    </DemoBlock>
    <DemoBlock title="仅描述">
      <Result status="info" description="这是一条提示信息" />
    </DemoBlock>
    <DemoBlock title="带操作按钮">
      <Result status="success" title="提交成功" description="您的申请已提交成功，请等待审核">
        <Button
          type="primary"
          fill="outline"
          shape="round"
          onClick={() => {
            toast.info('返回首页')
          }}
        >
          返回首页
        </Button>
      </Result>
    </DemoBlock>
  </div>
)
