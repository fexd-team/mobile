import React from 'react'
import ReactWatermark from '@pansy/react-watermark'

import createFC from '../../helpers/createFC'
import { WatermarkProps, WatermarkRef } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-watermark'
const Watermark = createFC<WatermarkProps, WatermarkRef>(function Watermark({ fullpage, ...props }, ref) {
  /* 组件逻辑实现 */
  return <ReactWatermark {...props} isBody={fullpage} />
})

Watermark.defaultProps = {
  fullpage: false,
}

export default Watermark
