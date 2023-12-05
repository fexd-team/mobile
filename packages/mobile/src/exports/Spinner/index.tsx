import React, { useState, useEffect, useRef } from 'react'
import { classnames, delay } from '@fexd/tools'

import createFC from '../createFC'
import { SpinnerProps } from './type'

const Spinner = createFC<SpinnerProps, HTMLSpanElement>(function Spinner(
  { className, delay: displayDelay = 0, ...props },
  forwardedRef,
) {
  const [show, setShow] = useState(displayDelay <= 0)
  const mountStatus = useRef(false)

  useEffect(() => {
    const init = () => {
      mountStatus.current = true
      if (!show) {
        delay(displayDelay).then(() => {
          if (mountStatus.current) {
            setShow(true)
          }
        })
      }
    }
    init()

    return () => {
      mountStatus.current = false
    }
  }, [])

  return show ? (
    <span {...props} ref={forwardedRef} className={classnames('exd-spin', className)}>
      <svg className="exd-spin-circle" viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" fill="none" />
      </svg>
    </span>
  ) : null
})

Spinner.defaultProps = {}

export default Spinner
