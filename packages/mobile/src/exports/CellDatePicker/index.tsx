import React from 'react'
import { CaretDown } from '@fexd/icons'
import cloneFC from '../cloneFC'
import UnstyledIODatePicker from '../UnstyledIODatePicker'

import CellLabel from '../CellLabel'
// 此处不引入 style.less，目的是实现按需引用

const CellDatePicker = cloneFC(UnstyledIODatePicker)

CellDatePicker.defaultProps = {
  ...CellDatePicker.defaultProps,
  theme: CellLabel,
  // arrowIcon: <CaretDown color="#bbb" />,
  classNamePrefix: 'exd-cell-date-picker',
}

export default CellDatePicker
