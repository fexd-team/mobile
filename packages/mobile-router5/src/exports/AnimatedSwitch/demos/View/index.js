import React, { forwardRef } from 'react'
import { classnames } from '@fexd/tools'

import './style.module.less'

const View = forwardRef(function View({ className, children, ...props }, forwardedRef) {
  return (
    <div {...props} className={classnames('demo-view', className)} ref={forwardedRef}>
      {children}
    </div>
  )
})

View.defaultProps = {}

export default View
