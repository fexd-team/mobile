import React from 'react'
import { CaretDown } from '@fexd/icons'

import BlockLabel from '../BlockLabel'
import cloneFC from '../cloneFC'
import UnstyledIOPicker from '../UnstyledIOPicker'
// 此处不引入 style.less，目的是实现按需引用

const BlockPicker = cloneFC(UnstyledIOPicker)

BlockPicker.defaultProps = {
  ...BlockPicker.defaultProps,
  theme: BlockLabel,
  arrowIcon: <CaretDown color="#bbb" />,
  classNamePrefix: 'exd-block-picker',
}

export default BlockPicker
