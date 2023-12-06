import AUTO_API from '../../helpers/AUTO_API'
// from https://github.com/mui-org/line-ui/blob/v4.11.3/packages/line-ui/src/transitions/transition.d.ts
import { TransitionProps as ReactTransitionProps, TransitionActions } from './Transition.d'
import { CSSTransitionProps } from './CSSTransition.d'
import * as React from 'react'

export type TransitionHandlerKeys = 'onEnter' | 'onEntering' | 'onEntered' | 'onExit' | 'onExiting' | 'onExited'
export type TransitionHandlerProps = Pick<ReactTransitionProps, TransitionHandlerKeys>

export interface EasingProps {
  easing: string | { enter?: string; exit?: string }
}

export type TransitionKeys =
  | 'in'
  | 'mountOnEnter'
  | 'unmountOnExit'
  // | 'timeout'
  | 'easing'
  | 'addEndListener'
  | TransitionHandlerKeys

export type TransitionSpeed = 'none' | 'fastest' | 'fast' | 'normal' | 'slow' | 'slowest' | 'debug' | number
export interface TransitionProps
  extends TransitionActions,
    Partial<Pick<ReactTransitionProps & EasingProps, TransitionKeys>> {
  style?: React.CSSProperties
  speed?: TransitionSpeed
  children?: React.ReactNode
}

export type TransitionType = React.FC<TransitionProps>
export type { CSSTransitionProps, ReactTransitionProps }

export default AUTO_API<any>()
