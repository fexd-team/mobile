import React from 'react'
import { classnames } from '@fexd/tools'

import { NoticeBarProps } from './type'
import createFC from '../createFC'

const prefix = 'exd-notice-bar'
const NoticeBar = createFC<NoticeBarProps, HTMLDivElement>(function (
  { text, animation, className, ...props },
  forwardedRef,
) {
  return (
    <div
      {...props}
      ref={forwardedRef}
      className={classnames(
        `${prefix}-bar`,
        {
          [`${prefix}-scrollable`]: animation,
        },
        className,
      )}
    >
      {animation ? (
        <>
          <div className={`${prefix}-content`}>{text}</div>
          <div className={`${prefix}-content`}>{text}</div>
        </>
      ) : (
        <div className={`${prefix}-text`}>{text}</div>
      )}
    </div>
  )
})

NoticeBar.defaultProps = {
  // 是否开启跑马灯，默认开启
  animation: true,
  text: '',
}

export default NoticeBar
