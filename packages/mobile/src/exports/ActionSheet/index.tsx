import React, { useState } from 'react'
import { classnames, run } from '@fexd/tools'

import Button from '../Button'
import Popup from '../Popup'
import uniqueId from '../uniqueId'
import createFC from '../../helpers/createFC'
import { ActionSheetProps, ActionSheetRef } from './type'
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
      round
      {...props}
      onClose={onClose}
      modalId={currentModalId}
      className={classnames(`${prefix}-popup`, className)}
      ref={forwardedRef}
    >
      <div className={`${prefix}-actions`}>
        {actions.map(({ content, onClick, className, ...buttonProps }, idx) => (
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
        ))}
      </div>
    </Popup>
  )
})

ActionSheet.defaultProps = {
  buttonFactory: Button,
  actions: [
    {
      content: 'OK',
    },
  ],
}

export default ActionSheet
