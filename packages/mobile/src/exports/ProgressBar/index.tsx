import React from 'react'
import { clamp, classnames } from '@fexd/tools'
import { useThrottle } from 'ahooks'
import { SPEED_MAP } from '../createTransition'
import createFC from '../createFC'
import { ProgressBarProps } from './type'

export const prefix = 'exd-progress-bar'

const ProgressBar = createFC<ProgressBarProps, HTMLDivElement>(function ProgressBar(
  { className, value, speed = 0, onChange, children, ...props },
  forwardedRef,
) {
  const timeout = SPEED_MAP[speed!] ?? speed
  const progress = useThrottle(clamp(value!, 0, 100), {
    wait: 16,
  })

  return (
    <div ref={forwardedRef} className={classnames(prefix, className)} {...props}>
      <div
        className={`${prefix}-value`}
        style={{
          width: `${progress}%`,
          transition: `width ${timeout}ms`,
        }}
      />
    </div>
  )
})

ProgressBar.defaultProps = {
  value: 0,
  speed: 'normal',
}

export default ProgressBar
