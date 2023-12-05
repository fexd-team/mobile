import React from 'react'
import createFC from '../createFC'
import { CountToProps, CountToRef, CountToType } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-count-to'
const CountTo = createFC<CountToProps, CountToRef>(function CountTo(props, ref) {
  /* 组件逻辑实现 */
  return (
    <div {...props} ref={ref}>
      CountTo
    </div>
  )
}) as CountToType

CountTo.defaultProps = {}

export default CountTo
