import React from 'react'

import cloneFC from '../cloneFC'
import UnstyledIOCascadePicker from '../UnstyledIOCascadePicker'
import CellLabel from '../CellLabel'

const CellCascadePicker = cloneFC(UnstyledIOCascadePicker)

CellCascadePicker.defaultProps = {
  ...CellCascadePicker.defaultProps,
  theme: CellLabel,
  classNamePrefix: 'exd-cell-cascade-picker',
}

export default CellCascadePicker
