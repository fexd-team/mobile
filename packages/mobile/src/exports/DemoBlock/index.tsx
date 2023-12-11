import React from 'react'
import { classnames } from '@fexd/tools'

import Space from '../Space'
import createFC from '../createFC'
import { DemoBlockProps, DemoBlockRef, DemoBlockType } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-demo-block'
const DemoBlock = createFC<DemoBlockProps, DemoBlockRef>(function DemoBlock(
  { title, inline = false, plain = false, children, ...props },
  ref,
) {
  /* 组件逻辑实现 */
  return (
    <div
      {...props}
      className={classnames(prefix, {
        [`${prefix}--plain`]: plain,
      })}
      ref={ref}
    >
      {title && <p className={`${prefix}-title`}>{title}</p>}
      <Space direction={inline ? 'horizontal' : 'vertical'} wrap={inline} className={`${prefix}-content`}>
        {children}
      </Space>
    </div>
  )
}) as DemoBlockType

DemoBlock.defaultProps = {}

export default DemoBlock
