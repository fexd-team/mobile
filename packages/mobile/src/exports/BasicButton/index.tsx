import React from 'react'
import { classnames } from '@fexd/tools'

import createFC from '../../helpers/createFC'
import { BasicButtonProps } from './type'

const prefix = 'exd-btn'
const BasicButton = createFC<BasicButtonProps, any>(function BasicButton(
  { className, type, block, size, disabled, onClick, children, fill, shape, as: Component = 'button', ...props },
  forwardedRef,
) {
  return (
    <Component
      {...props}
      onClick={disabled ? null : onClick}
      className={classnames(prefix, className, {
        [`${prefix}-${type}`]: !!type,
        [`${prefix}-${size}`]: !!size,
        [`${prefix}-${shape}`]: !!shape,
        [`${prefix}-block`]: block,
        [`${prefix}-disabled`]: disabled,
        [`${prefix}-fill-${fill}`]: !!fill,
      })}
      ref={forwardedRef}
    >
      {children}
    </Component>
  )
})

BasicButton.defaultProps = {
  type: 'plain',
  size: 'normal',
  shape: 'square',
  block: false,
  fill: 'solid',
  disabled: false,
}

export const ButtonClassNamePrefix = prefix
export default BasicButton
