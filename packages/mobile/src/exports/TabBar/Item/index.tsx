import React from 'react'
import { isString, classnames } from '@fexd/tools'

import Iconfont from '../../Iconfont'
import createFC from '../../createFC'
import { TabItemProps, TabItemType, TabItemRef } from './type'

const prefix = 'exd-tab-bar-item'
const TabBarItem = createFC<TabItemProps, TabItemRef>(function (
  { name, icon, active, className, ...props },
  forwardedRef,
) {
  return (
    <div
      className={classnames(prefix, className, {
        [`${prefix}--active`]: active,
      })}
      ref={forwardedRef}
      {...props}
    >
      <div className={`${prefix}__icon`}>{isString(icon) ? <Iconfont type={icon} /> : icon}</div>
      <div className={`${prefix}__name`}>{name}</div>
    </div>
  )
}) as TabItemType

TabBarItem.defaultProps = {
  active: false,
}

export default TabBarItem
