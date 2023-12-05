import React from 'react'
import { classnames, run } from '@fexd/tools'

import createFC from '../createFC'
import { DividerProps } from './type'

const prefix = 'exd-divider'
const Divider = createFC<DividerProps, HTMLDivElement>(function (
  { vertical, children, className, ...props },
  forwardedRef,
) {
  if (vertical) {
    return <span {...props} className={classnames(`${prefix}-vertical`, className)} ref={forwardedRef} />
  }

  return (
    <div
      {...props}
      className={classnames(prefix, className, {
        [`${prefix}-vertical`]: vertical,
      })}
      ref={forwardedRef}
    >
      {children && <span className={`${prefix}-text`}>{run(children)}</span>}
    </div>
  )
})

Divider.defaultProps = {
  vertical: false,
}

export default Divider
