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

export interface TransitionStyleVars {
  /**
   * @description 动画速度：无动画
   * @default 0ms
   */
  '@transition-speed-none'?: string
  /**
   * @description 动画速度：最快
   * @default 100ms
   */
  '@transition-speed-fastest'?: string
  /**
   * @description 动画速度：快速
   * @default 200ms
   */
  '@transition-speed-fast'?: string
  /**
   * @description 动画速度：正常
   * @default 300ms
   */
  '@transition-speed-normal'?: string
  /**
   * @description 动画速度：慢速
   * @default 500ms
   */
  '@transition-speed-slow'?: string
  /**
   * @description 动画速度：最慢
   * @default 700ms
   */
  '@transition-speed-slowest'?: string
  /**
   * @description 动画速度：调试模式
   * @default 5000ms
   */
  '@transition-speed-debug'?: string
}

export const DOC_TransitionStyleVars = AUTO_API<TransitionStyleVars>()
