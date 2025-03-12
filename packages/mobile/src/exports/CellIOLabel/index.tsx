import React, { isValidElement } from 'react'
import createFC from '../createFC'
import UnstyledIOLabel from '../UnstyledIOLabel'

import CellLabel from '../CellLabel'
import { CellIOLabelProps, CellIOLabelRef } from './type'

export const prefix = 'exd-cell-io-label'
const CellIOLabel = createFC<CellIOLabelProps, CellIOLabelRef>(function CellIOLabel(props, ref) {
  return <UnstyledIOLabel {...props} ref={ref as any} theme={CellLabel} />
})

CellIOLabel.defaultProps = {
  disabled: false,
  type: 'info',
  hideErrorWhenFocusing: true,
}

export default CellIOLabel
