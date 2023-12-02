import React from 'react'
import { CaretDown } from '@fexd/icons'

import BlockLabel from '../BlockLabel'
import cloneFC from '../cloneFC'
import UnstyledIODatePicker from '../UnstyledIODatePicker'
// 此处不引入 style.less，目的是实现按需引用

const BlockDatePicker = cloneFC(UnstyledIODatePicker)

BlockDatePicker.defaultProps = {
  ...BlockDatePicker.defaultProps,
  theme: BlockLabel,
  arrowIcon: <CaretDown color="#bbb" />,
  classNamePrefix: 'exd-block-date-picker',
}

export default BlockDatePicker
