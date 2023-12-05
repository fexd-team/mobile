import React, { useState } from 'react'
import { classnames } from '@fexd/tools'

import Modal from '../../Modal'
import TransitionFade from '../../TransitionFade'
import TransitionFadeSlideDown from '../../TransitionFadeSlideDown'
import TransitionFadeSlideUp from '../../TransitionFadeSlideUp'
import uniqueId from '../../uniqueId'
import { ToastProps } from './type'
import createFC from '../../createFC'

const prefix = 'exd-toast'
const Toast = createFC<ToastProps, HTMLDivElement>(function Toast(
  { visible, modalId, children, className, contentClassName, onClose, placement, touchable, icon, ...props },
  forwardedRef,
) {
  const [currentModalId] = useState(() => modalId ?? uniqueId('toast'))
  const ContentTransition =
    props?.transition ??
    {
      center: TransitionFade,
      top: TransitionFadeSlideDown,
      bottom: TransitionFadeSlideUp,
    }[placement as string] ??
    TransitionFade

  return (
    <Modal
      {...props}
      visible={visible}
      onClose={onClose}
      modalId={currentModalId}
      placement={placement}
      maskClosable={false}
      mask={!!touchable}
      className={classnames(`${prefix}`, className, {
        [`${prefix}-untouchable`]: !touchable,
      })}
      transition={ContentTransition}
      type="toast"
      ref={forwardedRef}
    >
      <span className={classnames(`${prefix}-content`, contentClassName)}>
        {icon && <span className={`${prefix}-icon`}>{icon}</span>}
        <span>{children}</span>
      </span>
    </Modal>
  )
})

Toast.defaultProps = {
  ...Modal.defaultProps,
  transition: undefined,
  level: 'high',
  maskTransparent: true,
  touchable: false,
}

export const ToastClassNamePrefix = prefix
export default Toast
