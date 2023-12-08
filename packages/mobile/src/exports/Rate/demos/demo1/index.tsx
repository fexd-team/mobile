import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Rate, toast } from '@fexd/mobile'
import { Heart } from '@fexd/icons'

export default () => {
  return (
    <>
      <DemoBlock title="基础用法">
        <Rate onChange={toast.info} />
      </DemoBlock>

      <DemoBlock title="半星">
        <Rate allowHalf defaultValue={2.5} onChange={toast.info} />
      </DemoBlock>

      <DemoBlock title="自定义数量">
        <Rate count={10} defaultValue={5} onChange={toast.info} />
      </DemoBlock>

      <DemoBlock title="尺寸">
        <Rate defaultValue={3} size="small" onChange={toast.info} />
        <Rate defaultValue={3} onChange={toast.info} />
        <Rate defaultValue={3} size="large" onChange={toast.info} />
      </DemoBlock>

      <DemoBlock title="禁用">
        <Rate disabled value={3} />
      </DemoBlock>

      <DemoBlock title="只读">
        <Rate readOnly value={4} />
      </DemoBlock>

      <DemoBlock title="自定义字符和样式">
        <Rate onChange={toast.info} allowHalf defaultValue={2} character={<Heart />} />
        <Rate onChange={toast.info} allowHalf defaultValue={1.5} character={'A'} />
        <Rate
          onChange={toast.info}
          allowHalf
          defaultValue={3.5}
          character={'好'}
          style={{
            fontSize: '32px',
            color: '#ff7f7f',
          }}
        />
      </DemoBlock>
    </>
  )
}
