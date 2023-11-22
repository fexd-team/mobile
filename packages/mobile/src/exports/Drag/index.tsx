import React from 'react'
import createFC from '../../helpers/createFC'
import { DragProps, DragRef } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-drag'
const Drag = createFC<DragProps, DragRef>(function Drag(props, ref) {
  /* 组件逻辑实现 */
  return (
    <div {...props} ref={ref}>
      Drag
    </div>
  )
})

Drag.defaultProps = {}

export default Drag
