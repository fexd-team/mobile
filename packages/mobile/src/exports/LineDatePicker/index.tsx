import React from 'react'
import { CaretDown } from '@fexd/icons'

import LineLabel from '../LineLabel'
import cloneFC from '../cloneFC'
import UnstyledIODatePicker from '../UnstyledIODatePicker'
// 此处不引入 style.less，目的是实现按需引用

const LineDatePicker = cloneFC(UnstyledIODatePicker)

LineDatePicker.defaultProps = {
  ...LineDatePicker.defaultProps,
  theme: LineLabel,
  // arrowIcon: <CaretDown color="#bbb" />,
  classNamePrefix: 'exd-line-date-picker',
}

export default LineDatePicker
