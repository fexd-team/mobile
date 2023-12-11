import React, { Fragment, isValidElement, useState } from 'react'
import { classnames, isObject, run } from '@fexd/tools'

import Button from '../Button'
import Popup from '../Popup'
import uniqueId from '../uniqueId'
import createFC from '../createFC'
import { ActionSheetProps, ActionSheetRef, ActionSheetAction } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-action-sheet'
const ActionSheet = createFC<ActionSheetProps, ActionSheetRef>(function ActionSheet(
  { modalId, children, className, onClose, actions = [], buttonFactory, ...props },
  forwardedRef,
) {
  const [currentModalId] = useState(() => modalId ?? uniqueId('action-sheep'))
  const Button = buttonFactory!

  return (
    <Popup
      {...props}
      onClose={onClose}
      modalId={currentModalId}
      className={classnames(`${prefix}-popup`, className)}
      ref={forwardedRef}
    >
      <div className={`${prefix}-actions`}>
        {actions.map((action, idx) => {
          if (isValidElement(action)) {
            return <Fragment key={idx}>{action as any}</Fragment>
          }

          const { content, onClick, className, ...buttonProps } = action as ActionSheetAction

          return (
            <Button
              key={idx}
              block
              type="plain"
              fill="none"
              size="normal"
              shape="unset"
              className={classnames(`${prefix}-action`, className)}
              onClick={onClick || onClose}
              {...buttonProps}
            >
              <span className={`${prefix}-action-content`}>{run(content)}</span>
            </Button>
          )
        })}
      </div>
    </Popup>
  )
})

ActionSheet.defaultProps = {
  ...Popup.defaultProps,
  // round: true,
  buttonFactory: Button,
  actions: [
    {
      content: 'OK',
    },
  ],
}

export default ActionSheet
