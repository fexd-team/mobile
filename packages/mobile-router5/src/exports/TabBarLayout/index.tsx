import React from 'react'
import { Route, useLocation, useHistory } from 'react-router-dom'
import { get, isArray } from '@fexd/tools'
import { View, TabBar, createFC } from '@fexd/mobile'

import AnimatedSwitch from '../AnimatedSwitch'
import { TabBarLayoutProps, TabBarLayoutRef, TabBarLayoutType } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-tab-bar-layout'
const TabBarLayout = createFC<TabBarLayoutProps, TabBarLayoutRef>(function TabBarLayout(
  { children, animate, tabs: tabConfigs, ...props },
  ref,
) {
  const location = useLocation()
  const history = useHistory()

  const tabs = ((isArray(children) ? children : [children]) ?? [])!.map((child: any, idx) => ({
    path: child?.props?.path,
    name: child?.props?.name,
    icon: child?.props?.icon,
    onClick: child?.props?.onClick,
    ...get<Record<string, any>>(tabConfigs, idx, {}),
  }))

  return (
    <View ref={ref} {...props}>
      <AnimatedSwitch direction="index" animate={animate}>
        {children}
      </AnimatedSwitch>
      <TabBar>
        {(tabs as any).map((item: any, index: any) => (
          <TabBar.Item
            key={index}
            name={item.name}
            icon={item.icon}
            active={item.path === location.pathname}
            onClick={() => {
              if (typeof item.onClick === 'function') {
                item.onClick()
                return
              }
              history.replace(item.path)
            }}
          />
        ))}
      </TabBar>
    </View>
  )
})

TabBarLayout.defaultProps = {
  animate: 'slide',
}

export default TabBarLayout
