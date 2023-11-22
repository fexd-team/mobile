import React, { useState } from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Rate, Space, toast } from '@fexd/mobile'
import { Icon, Fish } from '@fexd/icons'

import './style.module.less'

export default () => {
  const [value, setValue] = React.useState(3)

  return (
    <div className="demo">
      <DemoBlock title="基础用法">
        <Rate
          value={value}
          onChange={(val) => {
            setValue(val)
            toast.info(val.toString())
          }}
        />
        <Rate
          value={value}
          onChange={(val) => {
            setValue(val)
            toast.info(val.toString())
          }}
        />
      </DemoBlock>
      <DemoBlock title="半星">
        <Rate allowHalf defaultValue={2.5} />
      </DemoBlock>
      <DemoBlock title="只读">
        <Rate readOnly value={4} />
      </DemoBlock>
      <DemoBlock title="清除">
        <Rate defaultValue={3} allowClear={true} />
        <div>可清除</div>
        <Rate defaultValue={3} allowClear={false} />
        <div>不可清除</div>
      </DemoBlock>
      <DemoBlock title="自定义字符和样式">
        <Rate allowHalf defaultValue={2} character={<Icon type={Fish} />} />
        <Rate allowHalf defaultValue={1.5} character={'A'} />
        <Rate
          allowHalf
          defaultValue={3.5}
          character={'好'}
          style={{
            fontSize: '32px',
            '--rate-active-color': '#ff7f7f',
          }}
        />
      </DemoBlock>
    </div>
  )
}
