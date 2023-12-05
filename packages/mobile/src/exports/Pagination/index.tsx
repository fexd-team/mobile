import React from 'react'
import createFC from '../createFC'
import { PaginationProps, PaginationRef } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-pagination'
const Pagination = createFC<PaginationProps, PaginationRef>(function Pagination(props, ref) {
  /* 组件逻辑实现 */
  return (
    <div {...props} ref={ref}>
      Pagination
    </div>
  )
})

Pagination.defaultProps = {}

export default Pagination
