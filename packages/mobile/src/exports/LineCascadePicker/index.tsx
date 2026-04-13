import React from 'react'

import LineLabel from '../LineLabel'
import cloneFC from '../cloneFC'
import UnstyledIOCascadePicker from '../UnstyledIOCascadePicker'

const LineCascadePicker = cloneFC(UnstyledIOCascadePicker)

LineCascadePicker.defaultProps = {
  ...LineCascadePicker.defaultProps,
  theme: LineLabel,
  classNamePrefix: 'exd-line-cascade-picker',
}

export default LineCascadePicker
