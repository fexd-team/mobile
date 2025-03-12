import React from 'react'
import { CaretDown } from '@fexd/icons'
import cloneFC from '../cloneFC'
import UnstyledIOTimePicker from '../UnstyledIOTimePicker'

import CellLabel from '../CellLabel'
// 此处不引入 style.less，目的是实现按需引用

const CellTimePicker = cloneFC(UnstyledIOTimePicker)

CellTimePicker.defaultProps = {
  ...CellTimePicker.defaultProps,
  theme: CellLabel,
  // arrowIcon: <CaretDown color="#bbb" />,
  classNamePrefix: 'exd-cell-time-picker',
}

export default CellTimePicker
