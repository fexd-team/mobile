import React, { forwardRef } from 'react'
import { classnames } from '@fexd/tools'
import Icon from '../Icon'

import View from '../View'

import './style.module.less'

const NotFount = forwardRef(function NotFount({ className, ...props }, forwardedRef) {
  return (
    <View {...props} className={classnames('demo-404__wrapper', className)} ref={forwardedRef}>
      <Icon type="amicon-warn_light" />
      404 Not Found
    </View>
  )
})

NotFount.defaultProps = {}

export default NotFount
