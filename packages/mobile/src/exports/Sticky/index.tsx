import React from 'react'
import createFC from '../createFC'
import { StickyProps, StickyRef } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-sticky'
const Sticky = createFC<StickyProps, StickyRef>(function Sticky(props, ref) {
  /* 组件逻辑实现 */
  return (
    <div {...props} ref={ref}>
      Sticky
    </div>
  )
})

Sticky.defaultProps = {}

export default Sticky
