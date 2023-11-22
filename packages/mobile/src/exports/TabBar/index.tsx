import React from 'react'
import { classnames } from '@fexd/tools'

import Item from './Item'

import createFC from '../../helpers/createFC'

type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

interface TabBarProps extends JSXDivElement {
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
