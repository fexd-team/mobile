import React, { isValidElement } from 'react'
import { classnames, isString, run } from '@fexd/tools'

import BlockLabel from '../BlockLabel'
import createFC from '../../helpers/createFC'
import { BlockIOLabelProps, BlockIOLabelRef } from './type'
import UnstyledIOLabel from '../UnstyledIOLabel'

export const prefix = 'exd-block-io-label'
const BlockIOLabel = createFC<BlockIOLabelProps, BlockIOLabelRef>(function BlockIOLabel(props, ref) {
  return <UnstyledIOLabel {...props} ref={ref as any} theme={BlockLabel} />
})

BlockIOLabel.defaultProps = {
  disabled: false,
  type: 'info',
  hideErrorWhenFocusing: true,
}

export default BlockIOLabel
