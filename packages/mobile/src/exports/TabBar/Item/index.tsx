import React from 'react'
import { isString, classnames } from '@fexd/tools'

import Iconfont from '../../Iconfont'
import createFC from '../../../helpers/createFC'

const TabBarItem = createFC<any, HTMLDivElement>(function ({ name, icon, active, className, ...props }, forwardedRef) {
  return (
    <div
      className={classnames('exd-tab-bar-item', className, {
        'exd-tab-bar-item--active': active,
      })}
      ref={forwardedRef}
      {...props}
    >
      <div className="exd-tab-bar-item__icon">{isString(icon) ? <Iconfont type={icon} /> : icon}</div>
      <div className="exd-tab-bar-item__name">{name}</div>
    </div>
  )
})

TabBarItem.defaultProps = {}

export default TabBarItem
