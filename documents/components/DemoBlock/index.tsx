import React, { forwardRef } from 'react'
import { Space } from '@fexd/mobile'
import { classnames } from '@fexd/tools'
import './style.module.less'

export interface DemoBlockProps {
  title?: string
  inline?: boolean
  plain?: boolean
  children?: any
}

export default forwardRef<HTMLDivElement, DemoBlockProps>(function DemoBlock(
  { title, inline = false, plain = false, children },
  ref,
) {
  return (
    <div
      className={classnames('demo-block', {
        'demo-block-plain': plain,
      })}
      ref={ref}
    >
      {title && <p className="title">{title}</p>}
      <Space direction={inline ? 'horizontal' : 'vertical'} wrap={inline} className="list">
        {children}
      </Space>
    </div>
  )
})
