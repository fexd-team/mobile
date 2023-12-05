import React from 'react'
import createFC from '../createFC'
import { CascaderProps, CascaderRef } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-cascader'
const Cascader = createFC<CascaderProps, CascaderRef>(function Cascader(props, ref) {
  /* 组件逻辑实现 */
  return (
    <div {...props} ref={ref}>
      Cascader
    </div>
  )
})

Cascader.defaultProps = {}

export default Cascader
