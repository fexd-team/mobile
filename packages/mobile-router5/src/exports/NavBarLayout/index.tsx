import React from 'react'
import { ChevronBack } from '@fexd/icons'
import { useHistory } from 'react-router-dom'
import { View, NavBar } from '@fexd/mobile'
import createFC from '@fexd/mobile/es/helpers/createFC'

import AnimatedSwitch from '../AnimatedSwitch'
import { NavBarLayoutProps, NavBarLayoutRef, NavBarLayoutType } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-nav-bar-layout'
const NavBarLayout = createFC<NavBarLayoutProps, NavBarLayoutRef>(function NavBarLayout(
  { children, title, animate, ...props },
  ref,
) {
  const history = useHistory()

  /* 组件逻辑实现 */
  return (
    <View {...props} ref={ref}>
      <NavBar left={<ChevronBack onClick={history.goBack} />}>{title}</NavBar>
      <AnimatedSwitch animate={animate}>{children}</AnimatedSwitch>
    </View>
  )
}) as NavBarLayoutType

NavBarLayout.defaultProps = {
  animate: 'fade',
}

export default NavBarLayout
