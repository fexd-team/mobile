import React from 'react'
import { CaretDown } from '@fexd/icons'

import BlockLabel from '../BlockLabel'
import cloneFC from '../cloneFC'
import UnstyledIOCascadePicker from '../UnstyledIOCascadePicker'

const BlockCascadePicker = cloneFC(UnstyledIOCascadePicker)

BlockCascadePicker.defaultProps = {
  ...BlockCascadePicker.defaultProps,
  theme: BlockLabel,
  arrowIcon: <CaretDown color="#bbb" />,
  classNamePrefix: 'exd-block-cascade-picker',
}

export default BlockCascadePicker
