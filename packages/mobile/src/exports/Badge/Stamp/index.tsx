import React from 'react'
import { classnames } from '@fexd/tools'
import createFC from '../../../helpers/createFC'
import { BadgeStampProps } from './type'

export const prefix = 'exd-badge-stamp'

const BadgeStamp = createFC<BadgeStampProps>(function BadgeStamp({ color, bgColor, children, className, style, text }) {
  const badgeCls = classnames(prefix, {
    [`${prefix}-fixed`]: !!children,
  })

  const element = text ? (
    <div
      className={classnames(`${badgeCls}`, className)}
      style={{
        backgroundColor: bgColor,
        color,
        ...style,
      }}
    >
      {text}
    </div>
  ) : null
  return children ? (
    <div className={`${prefix}-wrap`}>
      {children}
      {element}
    </div>
  ) : (
    element
  )
})

BadgeStamp.defaultProps = {}

export default BadgeStamp
