import React from 'react'
import createFC from '../../helpers/createFC'
import { WaterfallProps, WaterfallRef, WaterfallType } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-waterfall'
const Waterfall = createFC<WaterfallProps, WaterfallRef>(function Waterfall(props, ref) {
  /* 组件逻辑实现 */
  return (
    <div {...props} ref={ref}>
      Waterfall
    </div>
  )
}) as WaterfallType

Waterfall.defaultProps = {}

export default Waterfall
