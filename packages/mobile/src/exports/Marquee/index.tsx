import React from 'react'
import createFC from '../createFC'
import { MarqueeProps, MarqueeRef } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-marquee'
const Marquee = createFC<MarqueeProps, MarqueeRef>(function Marquee(props, ref) {
  /* 组件逻辑实现 */
  return (
    <div {...props} ref={ref}>
      Marquee
    </div>
  )
})

Marquee.defaultProps = {}

export default Marquee
