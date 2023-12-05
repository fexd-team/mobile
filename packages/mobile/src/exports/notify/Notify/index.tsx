import React, { useState } from 'react'
import { classnames } from '@fexd/tools'

import Modal from '../../Modal'
import TransitionSlideDown from '../../TransitionSlideDown'
import uniqueId from '../../uniqueId'
import { NotifyProps } from './type'
import createFC from '../../createFC'

const prefix = 'exd-notify'
const Notify = createFC<NotifyProps, HTMLDivElement>(function Notify(
  { visible, notifyType, modalId, children, className, contentClassName, onClose, touchable, ...props },
  forwardedRef,
) {
  const [currentModalId] = useState(() => modalId ?? uniqueId('notify'))

  return (
    <Modal
      {...props}
      visible={visible}
      onClose={onClose}
      modalId={currentModalId}
      className={classnames(`${prefix}`, className, {
        [`${prefix}-untouchable`]: !touchable,
      })}
      contentClassName={classnames(`${prefix}-content`, contentClassName, {
        [`${prefix}-${notifyType}`]: !!notifyType,
      })}
      type="notify"
      placement="top"
      maskClosable={false}
      mask={!!touchable}
      transition={props?.transition ?? TransitionSlideDown}
      ref={forwardedRef}
    >
      <span>{children}</span>
    </Modal>
  )
})

Notify.defaultProps = {
  ...Modal.defaultProps,
  transition: undefined,
  notifyType: 'info',
  level: 'high',
  maskTransparent: true,
  touchable: false,
}

export default Notify
