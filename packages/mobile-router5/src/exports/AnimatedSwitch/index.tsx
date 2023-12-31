import React, { Suspense, useMemo } from 'react'
import { Switch, useLocation, useHistory, matchPath } from 'react-router-dom'
import { get, run, isString } from '@fexd/tools'
import { usePrevious } from 'ahooks'
import { Spinner, TransitionSwitch, TransitionSwitchProps, createFC, FC } from '@fexd/mobile'

import renderLayout from './renderLayout'

interface AnimatedSwitchProps extends Omit<TransitionSwitchProps, 'direction' | 'animate'> {
  direction?: 'history' | 'index'
  animate?: 'slide' | 'slide-cover' | 'fade' | { [key: string]: any }
  speed?: 'fast' | 'normal' | 'slow'
  always?: boolean
  location?: any
  renderWrapper?: (routes: any) => React.ReactNode
}

const AnimatedSwitch: FC<AnimatedSwitchProps> & {
  renderLayout: typeof renderLayout
} = createFC<AnimatedSwitchProps, any>(function AnimatedSwitch(
  { children: propChildren, direction, renderWrapper, always, location: propLocation, animate, speed, ...props },
  forwardedRef,
) {
  const children = useMemo<any>(() => React.Children.map(propChildren, (child) => child), [propChildren])
  const hookLocation = useLocation()
  const location = propLocation ?? hookLocation
  const { action } = useHistory()
  const routesConfig = useMemo(
    () =>
      children
        .filter((child: any) => !!child?.props?.path)
        .map((child: any) => ({
          path: child?.props?.path,
          exact: child?.props?.exact,
        })),
    [children?.length],
  )

  const matchIdx = useMemo(
    () => routesConfig.findIndex((config: any) => matchPath(location.pathname, config)),
    [location, routesConfig],
  )
  const prevMatchIdx = usePrevious(matchIdx)

  const animateMap = run(animate, undefined, { action, matchIdx, prevMatchIdx, direction })

  return (
    <TransitionSwitch
      {...props}
      animate={isString(animateMap) ? animateMap : (get(animateMap, action, animateMap) as any)}
      speed={speed}
      direction={
        // @ts-ignore
        {
          history: action === 'POP' ? 'back' : 'forward',
          index: prevMatchIdx < matchIdx ? 'forward' : 'back',
        }[direction as any] ?? 'forward'
      }
      animateKey={always ? location.key ?? location.pathname : matchIdx}
      ref={forwardedRef}
    >
      {renderWrapper?.(
        <Switch location={location} {...(props as any)}>
          {children}
        </Switch>,
      )}
    </TransitionSwitch>
  )
}) as any

AnimatedSwitch.defaultProps = {
  direction: 'history',
  animate: 'slide',
  speed: 'normal',
  always: false,
  renderWrapper: (routes: any) => <Suspense fallback={<Spinner delay={100} />}>{routes}</Suspense>,
}

AnimatedSwitch.renderLayout = renderLayout

export default AnimatedSwitch
