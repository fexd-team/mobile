import React from 'react'

import cloneFC from '../cloneFC'
import UnstyledIOPicker from '../UnstyledIOPicker'
import CellLabel from '../CellLabel'

// 此处不引入 style.less，目的是实现按需引用

const CellPicker = cloneFC(UnstyledIOPicker)

CellPicker.defaultProps = {
  ...CellPicker.defaultProps,
  theme: CellLabel,
  // arrowIcon: <CaretDown color="#bbb" />,
  classNamePrefix: 'exd-cell-picker',
  contentProps: {
    className: '!text-right',
  },
}

export default CellPicker
