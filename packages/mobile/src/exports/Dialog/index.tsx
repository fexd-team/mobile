import React, { useState } from 'react'
import { classnames, run } from '@fexd/tools'

import BasicButton from '../BasicButton'
import Modal from '../Modal'
import uniqueId from '../uniqueId'
import { DialogProps } from './type'
import createFC from '../../helpers/createFC'

const prefix = 'exd-dialog'
const Dialog = createFC<DialogProps, HTMLDivElement>(function Dialog(
  {
    modalId,
    prefix: propPrefix,
    suffix,
    children,
    title,
    className,
    contentClassName,
    onClose,
    theme,
    actions = [],
    buttonFactory,
    buttonType,
    buttonSize,
    buttonFill,
    buttonShape,
    ...props
  },
  forwardedRef,
) {
  const [currentModalId] = useState(() => modalId ?? uniqueId('dialog'))
  const Button = buttonFactory!

  return (
    <Modal
      {...props}
      onClose={onClose}
      modalId={currentModalId}
      className={classnames(`${prefix}-modal`, className, {
        [`${prefix}-${theme}`]: !!theme,
      })}
      type="dialog"
      ref={forwardedRef}
    >
      {propPrefix && <div className={`${prefix}-prefix`}>{propPrefix}</div>}
      <div className={`${prefix}`}>
        <div className={`${prefix}-wrapper`}>
          {title && <h3 className={`${prefix}-title`}>{title}</h3>}
          <div className={`${prefix}-content`}>{children}</div>
        </div>
        <div
          className={classnames(`${prefix}-actions`, {
            [`${prefix}-actions-vertical`]: actions?.length == 2,
          })}
        >
          {actions.map(({ content, onClick, className, ...buttonProps }, idx) => (
            <Button
              key={idx}
              type={run(buttonType, undefined, theme, idx)}
              fill={run(buttonFill, undefined, theme, idx)}
              size={run(buttonSize, undefined, theme, idx)}
              shape={run(buttonShape, undefined, theme, idx)}
              className={classnames(`${prefix}-action`, className)}
              onClick={onClick || onClose}
              {...buttonProps}
            >
              <span className={`${prefix}-action-content`}>{run(content)}</span>
            </Button>
          ))}
        </div>
      </div>
      {suffix && <div className={`${prefix}-suffix`}>{suffix}</div>}
    </Modal>
  )
})

Dialog.defaultProps = {
  ...Modal.defaultProps,
  theme: 'normal',
  buttonFactory: BasicButton,
  buttonType: (theme, idx) => (idx === 0 ? 'primary' : 'plain'),
  // buttonSize: theme => (theme === 'Android' ? 'normal' : 'normal'),
  buttonFill: (theme) => (theme === 'normal' ? 'solid' : 'none'),
  buttonShape: (theme) => (theme === 'normal' ? 'square' : 'unset'),
  actions: [
    {
      content: 'OK',
    },
  ],
}

export default Dialog
