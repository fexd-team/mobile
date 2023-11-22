import React from 'react'
import createFC from '../../helpers/createFC'
import { TableProps, TableRef } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-table'
const Table = createFC<TableProps, TableRef>(function Table(props, ref) {
  /* 组件逻辑实现 */
  return (
    <div {...props} ref={ref}>
      Table
    </div>
  )
})

Table.defaultProps = {}

export default Table
