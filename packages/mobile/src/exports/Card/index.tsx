import React from 'react'
import { run, classnames } from '@fexd/tools'

import createFC from '../createFC'
import { CardProps } from './type'

const prefix = 'exd-card'
const Card = createFC<CardProps, HTMLDivElement>(function Card(
  { className, title, titleExtra, children, footer, footerExtra, after, ...props },
  forwardedRef,
) {
  return (
    <div {...props} className={classnames(`${prefix}`, className)} ref={forwardedRef}>
      <div className={`${prefix}-wrapper`}>
        <div
          className={classnames(`${prefix}-main`, {
            [`${prefix}-main-no-title`]: !title,
          })}
        >
          {title && (
            <div className={`${prefix}-title`}>
              <span className={`${prefix}-value`}>{title}</span>
              <span className={`${prefix}-extra`}>{titleExtra}</span>
            </div>
          )}
          <div className={`${prefix}-content`}>{children}</div>
        </div>
        {footer && (
          <div className={`${prefix}-footer`}>
            <span className={`${prefix}-value`}>{footer}</span>
            <span className={`${prefix}-extra`}>{footerExtra}</span>
          </div>
        )}
      </div>
      {run(after)}
    </div>
  )
})

Card.defaultProps = {}

export default Card
