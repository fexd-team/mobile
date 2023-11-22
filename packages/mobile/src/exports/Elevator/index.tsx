import React from 'react'
import createFC from '../../helpers/createFC'
import { ElevatorProps, ElevatorRef } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-elevator'
const Elevator = createFC<ElevatorProps, ElevatorRef>(function Elevator(props, ref) {
  /* 组件逻辑实现 */
  return (
    <div {...props} ref={ref}>
      Elevator
    </div>
  )
})

Elevator.defaultProps = {}

export default Elevator
