import React from 'react'
import { classnames } from '@fexd/tools'

import createFC from '../createFC'
import { SkeletonProps } from './type'

const prefix = 'exd-skeleton'
const Skeleton = createFC<SkeletonProps, HTMLDivElement>(function ({ className, round, ...props }, forwardedRef) {
  return (
    <div
      {...props}
      className={classnames(prefix, className, {
        [`${prefix}-round`]: round,
      })}
      ref={forwardedRef}
    />
  )
})

Skeleton.defaultProps = {}

export default Skeleton
