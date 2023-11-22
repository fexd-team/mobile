import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { classnames, isString, isNumber } from '@fexd/tools'
import { TransitionProps } from './type'

const DEFAULT_PROPS = {
  unmountOnExit: true,
  speed: 'normal',
}

export const SPEED_MAP: Record<string, number> = {
  none: 0,
  fastest: 100,
  fast: 200,
  normal: 300,
  slow: 500,
  slowest: 700,
  debug: 5000,
}

const create = (name: string, defaultProps: TransitionProps = DEFAULT_PROPS as TransitionProps) => {
  const Transition: React.FC<TransitionProps> = ({ in: inProp, children, speed = 300, style = {}, ...props }) => {
    const timeout = SPEED_MAP[speed!] ?? speed

    return (
      <CSSTransition
        in={inProp}
        timeout={timeout}
        mountOnEnter
        classNames={classnames(
          name,
          {
            [`exd-speed-${speed}`]: isString(speed),
          },
          // exd-transition 需要放在最后，因为 CSSTransition 会在其后增加 -enter-active、-exit-active 标识
          'exd-transition',
        )}
        style={
          isNumber(speed)
            ? {
                ...style,
                transitionDuration: `${speed}ms`,
                animationDuration: `${speed}ms`,
              }
            : style
        }
        {...props}
      >
        {children}
      </CSSTransition>
    )
  }

  Transition.defaultProps = defaultProps

  return Transition
}

export default create
