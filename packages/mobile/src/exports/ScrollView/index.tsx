import React, { useRef, useEffect, useState, useImperativeHandle } from 'react'
import { get, run, classnames, ScrollListener, isArray } from '@fexd/tools'

import createFC from '../createFC'
import { ScrollViewProps, ScrollViewRef } from './type'

export const prefix = 'exd-scroll-view'
const ScrollView = createFC<ScrollViewProps, ScrollViewRef>(function ScrollView(
  { children, className, distanceToReachEnd, onEndReached, distanceEvents, shadow, wrapperClassName, ...props },
  forwardedRef,
) {
  const [useScrollUpAbleShadow, useScrollDownAbleShadow] = isArray(shadow)
    ? shadow
    : shadow === true
    ? [true, true]
    : [false, false]
  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(false)
  const scrollViewRef = useRef<ScrollViewRef>(null)
  const scrollListener = useRef<any>()
  const onEndReachedRef = useRef(onEndReached)

  onEndReachedRef.current = onEndReached

  useImperativeHandle(forwardedRef, () => scrollViewRef.current!)

  useEffect(() => {
    if (get<any>(scrollViewRef.current, 'scrollHeight') > get<any>(scrollViewRef.current, 'offsetHeight')) {
      setCanScrollDown(true)
    }

    scrollListener.current = new ScrollListener({
      element: scrollViewRef.current as any,
      distanceToReachEnd,
      onEndReached: (...args: any[]) => {
        run(onEndReachedRef.current, undefined, ...args)
      },
      distanceEvents: [
        ...distanceEvents,
        {
          distance: 0,
          onGoingIn: () => {
            setCanScrollUp(false)
          },
          onGoingOut: () => {
            setCanScrollUp(true)
          },
        },
        {
          distance: () =>
            get<any>(scrollViewRef.current, 'scrollHeight') - get<any>(scrollViewRef.current, 'offsetHeight') - 1,
          dynamic: true,
          onGoingIn: () => {
            setCanScrollDown(true)
          },
          onGoingOut: () => {
            setCanScrollDown(false)
          },
        },
      ],
    })
  }, [])

  return (
    <div
      {...props}
      className={classnames(prefix, wrapperClassName, {
        [`${prefix}--can-scroll-up`]: useScrollUpAbleShadow && canScrollUp,
        [`${prefix}--can-scroll-down`]: useScrollDownAbleShadow && canScrollDown,
      })}
    >
      <div className={classnames(`${prefix}__content`, className)} ref={scrollViewRef}>
        {run(children, undefined, {
          canScrollUp,
          canScrollDown,
        })}
      </div>
    </div>
  )
})

ScrollView.defaultProps = {
  distanceEvents: [],
  shadow: false,
}

export default ScrollView
