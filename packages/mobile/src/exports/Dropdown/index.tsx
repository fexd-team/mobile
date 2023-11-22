import React from 'react'
import createFC from '../../helpers/createFC'
import { DropdownProps, DropdownRef, DropdownType } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-dropdown'
const Dropdown = createFC<DropdownProps, DropdownRef>(function Dropdown(props, ref) {
  /* 组件逻辑实现 */
  return (
    <div {...props} ref={ref}>
      Dropdown
    </div>
  )
}) as DropdownType

Dropdown.defaultProps = {}

export default Dropdown
