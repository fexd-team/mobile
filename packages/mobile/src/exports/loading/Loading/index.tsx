import React, { useState } from 'react'
import { classnames } from '@fexd/tools'

import Modal from '../../Modal'
import Spinner from '../../Spinner'
import uniqueId from '../../uniqueId'
import { LoadingProps } from './type'
import createFC from '../../createFC'

const prefix = 'exd-loading'
const Loading = createFC<LoadingProps, HTMLDivElement>(function Loading(
  { visible, modalId, children, className, contentClassName, onClose, ...props },
  forwardedRef,
) {
  const [currentModalId] = useState(() => modalId ?? uniqueId('loading'))

  return (
    <Modal
      {...props}
      visible={visible}
      onClose={onClose}
      modalId={currentModalId}
      className={classnames(`${prefix}`, className)}
      contentClassName={classnames(`${prefix}-content`, contentClassName)}
      type="loading"
      placement="center"
      ref={forwardedRef}
    >
      <Spinner />
      {children && <span>{children}</span>}
    </Modal>
  )
})

Loading.defaultProps = {
  ...Modal.defaultProps,
  level: 'highest',
  mask: true,
  maskTransparent: true,
  maskClosable: false,
}

export default Loading
