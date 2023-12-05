import React from 'react'
import createFC from '../createFC'
import { DrawerProps, DrawerRef } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-drawer'
const Drawer = createFC<DrawerProps, DrawerRef>(function Drawer(props, ref) {
  /* 组件逻辑实现 */
  return (
    <div {...props} ref={ref}>
      Drawer
    </div>
  )
})

Drawer.defaultProps = {}

export default Drawer
