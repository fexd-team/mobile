import React, { isValidElement } from 'react'

import LineLabel from '../LineLabel'
import createFC from '../createFC'
import { LineIOLabelProps, LineIOLabelRef } from './type'
import UnstyledIOLabel from '../UnstyledIOLabel'

export const prefix = 'exd-line-io-label'
const LineIOLabel = createFC<LineIOLabelProps, LineIOLabelRef>(function LineIOLabel(props, ref) {
  return <UnstyledIOLabel {...props} ref={ref as any} theme={LineLabel} />
})

LineIOLabel.defaultProps = {
  disabled: false,
  type: 'info',
  hideErrorWhenFocusing: true,
}

export default LineIOLabel
