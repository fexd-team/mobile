import React from 'react'
import createFC from '../createFC'
import { SearchProps, SearchRef } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-search'
const Search = createFC<SearchProps, SearchRef>(function Search(props, ref) {
  /* 组件逻辑实现 */
  return (
    <div {...props} ref={ref}>
      Search
    </div>
  )
})

Search.defaultProps = {}

export default Search
