import React, { Fragment } from 'react'
import { run, classnames } from '@fexd/tools'
import { ChevronForward } from '@fexd/icons'

import createFC from '../createFC'
import { BreadcrumbProps } from './type'

const prefix = 'exd-breadcrumb'
const Breadcrumb = createFC<BreadcrumbProps, HTMLDivElement>(function (
  { className, data, onClick, ...props },
  forwardedRef,
) {
  return (
    <div {...props} className={classnames(prefix, className)} ref={forwardedRef}>
      <div className={`${prefix}-content`}>
        {data.map((item, idx) => (
          <Fragment key={idx}>
            {idx !== 0 && <ChevronForward className={`${prefix}-arrow`} />}
            <div className={`${prefix}-item`} onClick={(event) => run(onClick, undefined, idx, event)}>
              {item}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
})

Breadcrumb.defaultProps = {}

export default Breadcrumb
