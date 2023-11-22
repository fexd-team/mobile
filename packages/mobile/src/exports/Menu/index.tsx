import React from 'react'
import createFC from '../../helpers/createFC'
import { MenuProps, MenuRef } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-menu'
const Menu = createFC<MenuProps, MenuRef>(function Menu(props, ref) {
  /* 组件逻辑实现 */
  return (
    <div {...props} ref={ref}>
      Menu
    </div>
  )
})

Menu.defaultProps = {}

export default Menu
