import React from 'react'
import { classnames } from '@fexd/tools'
import { TabBarType, TabBarProps } from './type'

import Item from './Item'
import createFC from '../createFC'

const TabBar = createFC<TabBarProps, HTMLDivElement>(function TabBar(
  { className, children = [], ...props },
  forwardedRef,
) {
  return (
    <div className={classnames('exd-tab-bar', className)} ref={forwardedRef} {...props}>
      {children}
    </div>
  )
}) as TabBarType

TabBar.Item = Item

export default TabBar
