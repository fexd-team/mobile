/* eslint-disable react-hooks/exhaustive-deps */
import React, { useImperativeHandle, useRef, useEffect, useCallback } from 'react'
import { classnames, run, throttle, globalThis as root } from '@fexd/tools'

import useSize from '../useSize'
import { NavBarProps } from './type'
import createFC from '../createFC'

const prefix = 'exd-nav-bar'
const NavBar: React.FC<NavBarProps> = createFC<NavBarProps, HTMLDivElement>(function NavBar(
  { left, right, children, className, contentClassName, alignCenter, ...props },
  forwardedRef,
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const alignCenterRef = useRef<boolean>(alignCenter as boolean)
  alignCenterRef.current = alignCenter as boolean
  const headerContainerRef = useRef<HTMLDivElement>(null)
  const headerContentRef = useRef<HTMLSpanElement>(null)
  const headerContentSize = useSize(headerContentRef)

  // 居中偏移计算
  const headerAlignCenterOffsetLeft = useCallback(
    throttle(() => {
      if (
        !alignCenterRef.current ||
        !headerContentRef.current ||
        !containerRef.current ||
        !headerContainerRef.current
      ) {
        return
      }
      const contentWidth = headerContentRef.current.offsetWidth
      const contentScrollWidth = headerContentRef.current.scrollWidth

      // 内容溢出时不进行计算
      if (contentScrollWidth > contentWidth) {
        headerContentRef.current.style.left = `${0}px`
        return
      }

      const currentOffsetLeft = parseInt(headerContentRef.current?.style?.left || '0', 10)
      const contentOffsetLeft = headerContentRef.current.offsetLeft
      const containerWidth = containerRef.current.offsetWidth
      const headerContainerWidth = headerContainerRef.current.offsetWidth
      let offsetLeft = containerWidth / 2 - (contentOffsetLeft + contentWidth / 2 - currentOffsetLeft)

      if (offsetLeft + contentWidth > headerContainerWidth) {
        offsetLeft = headerContainerWidth - contentWidth
      }

      if (offsetLeft >= 0) {
        headerContentRef.current.style.left = `${offsetLeft}px`
      }
    }),
    [],
  )

  useImperativeHandle(forwardedRef, () => containerRef.current as HTMLDivElement)

  useEffect(() => {
    if (!root.addEventListener) {
    }
    root.addEventListener('resize', headerAlignCenterOffsetLeft)
    return () => {
      root.removeEventListener('resize', headerAlignCenterOffsetLeft)
    }
  }, [])

  useEffect(() => {
    headerAlignCenterOffsetLeft()
  }, [headerContentSize.width])

  return (
    <div {...props} className={classnames(prefix, className)} ref={containerRef}>
      <div className={`${prefix}-wrapper`}>
        {left && <div className={`${prefix}-left`}>{run(left)}</div>}
        <div className={`${prefix}-center`} ref={headerContainerRef}>
          <span ref={headerContentRef} className={classnames(`${prefix}-content`, contentClassName)}>
            {run(children)}
          </span>
        </div>
        {right && <div className={`${prefix}-right`}>{run(right)}</div>}
      </div>
    </div>
  )
})

NavBar.defaultProps = {
  alignCenter: true,
}

export default NavBar
