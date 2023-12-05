import React from 'react'
import createFC from '../createFC'
import { SwipeActionProps, SwipeActionRef, SwipeActionType } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-swipe-action'
const SwipeAction = createFC<SwipeActionProps, SwipeActionRef>(function SwipeAction(props, ref) {
  /* 组件逻辑实现 */
  return (
    <div {...props} ref={ref}>
      SwipeAction
    </div>
  )
}) as SwipeActionType

SwipeAction.defaultProps = {}

export default SwipeAction
