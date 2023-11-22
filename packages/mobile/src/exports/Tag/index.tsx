import React from 'react'
import createFC from '../../helpers/createFC'
import { TagProps, TagRef } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-tag'
const Tag = createFC<TagProps, TagRef>(function Tag(props, ref) {
  /* 组件逻辑实现 */
  return (
    <div {...props} ref={ref}>
      Tag
    </div>
  )
})

Tag.defaultProps = {}

export default Tag
