import React from 'react'
import { CaretDown } from '@fexd/icons'

import LineLabel from '../LineLabel'
import cloneFC from '../cloneFC'
import UnstyledIOTimePicker from '../UnstyledIOTimePicker'
// 此处不引入 style.less，目的是实现按需引用

const LineTimePicker = cloneFC(UnstyledIOTimePicker)

LineTimePicker.defaultProps = {
  ...LineTimePicker.defaultProps,
  theme: LineLabel,
  // arrowIcon: <CaretDown color="#bbb" />,
  classNamePrefix: 'exd-line-time-picker',
}

export default LineTimePicker
