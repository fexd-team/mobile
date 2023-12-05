import React from 'react'
import createFC from '../createFC'
import { TreeSelectProps, TreeSelectRef } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-tree-select'
const TreeSelect = createFC<TreeSelectProps, TreeSelectRef>(function TreeSelect(props, ref) {
  /* 组件逻辑实现 */
  return (
    <div {...props} ref={ref}>
      TreeSelect
    </div>
  )
})

TreeSelect.defaultProps = {}

export default TreeSelect
