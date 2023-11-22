import React from 'react'
import createFC from '../../helpers/createFC'
import { SegmentedControlProps, SegmentedControlRef } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-segmented-control'
const SegmentedControl = createFC<SegmentedControlProps, SegmentedControlRef>(function SegmentedControl(props, ref) {
  /* 组件逻辑实现 */
  return (
    <div {...props} ref={ref}>
      SegmentedControl
    </div>
  )
})

SegmentedControl.defaultProps = {}

export default SegmentedControl
