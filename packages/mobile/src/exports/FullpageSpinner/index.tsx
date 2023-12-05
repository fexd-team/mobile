import React from 'react'
import { classnames } from '@fexd/tools'

import Spinner from '../Spinner'
import createFC from '../createFC'
import { FullpageSpinnerProps } from './type'

const FullpageSpinner = createFC<FullpageSpinnerProps, HTMLDivElement>(function FullpageSpinner(
  { delay, className, ...props },
  forwardedRef,
) {
  return (
    <div {...props} className={classnames('exd-spin-fullpage', className)} ref={forwardedRef}>
      <Spinner delay={delay} />
    </div>
  )
})

FullpageSpinner.defaultProps = {}

export default FullpageSpinner
