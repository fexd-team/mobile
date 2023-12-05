import React from 'react'
import { classnames } from '@fexd/tools'
import { JSXDivProps } from '../../helpers/html.types'

import Item from './Item'

import createFC from '../createFC'

interface TabBarProps extends JSXDivProps {
  // children?: (typeof React.Chil)[]
}

type BasicTabBarType = React.FC<TabBarProps>
interface TabBarType extends BasicTabBarType {
  Item: typeof Item
}

const TabBar: TabBarType = createFC<TabBarProps, HTMLDivElement>(function TabBar(
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
