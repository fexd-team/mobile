import React, { useState } from 'react'
import { classnames, run, isExist } from '@fexd/tools'
import { CloseOutline } from '@fexd/icons'

import NavBar from '../NavBar'
import Modal from '../Modal'
import uniqueId from '../uniqueId'
import TransitionSlideUp from '../TransitionSlideUp'
import { PopupProps } from './type'
import createFC from '../createFC'

const prefix = 'exd-popup'
const Popup = createFC<PopupProps, HTMLDivElement>(function Popup(
  {
    modalId,
    children,
    title,
    className,
    contentClassName,
    onClose,
    round,
    headerRight = <CloseOutline onClick={onClose as any} />,
    headerLeft,
    header = isExist(title) ? (
      <NavBar className={`${prefix}-header`} right={headerRight} left={headerLeft}>
        {title}
      </NavBar>
    ) : null,
    ...props
  },
  forwardedRef,
) {
  const [currentModalId] = useState(() => modalId ?? uniqueId('popup'))

  return (
    <Modal
      {...props}
      onClose={onClose}
      modalId={currentModalId}
      className={classnames(`${prefix}`, className, {
        [`${prefix}-round`]: round,
      })}
      contentClassName={classnames(`${prefix}-body`)}
      transition={TransitionSlideUp}
      placement="bottom"
      type="popup"
      ref={forwardedRef}
    >
      {run(header)}
      <div className={classnames(`${prefix}-content`, contentClassName)}>{children}</div>
    </Modal>
  )
})

Popup.defaultProps = {
  ...Modal.defaultProps,
}

export default Popup
