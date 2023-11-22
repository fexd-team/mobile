import React, { useState } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { TransitionGroupProps } from 'react-transition-group/TransitionGroup'
import { classnames, isNumber, random } from '@fexd/tools'

import createFC from '../../helpers/createFC'
import { TransitionSwitchProps } from './type'

const getRandomClassName = () => `switch-${random(10000, 99999)}`

const TransitionSwitch = createFC<TransitionSwitchProps, TransitionGroupProps['ref']>(function (
  { direction, animateKey, animate: propAnimate, speed, className, children, ...props },
  forwardedRef,
) {
  const [randomClassName] = useState(getRandomClassName)
  const animate = { 'slide-cover': 'slideCover' }[propAnimate as string] ?? propAnimate
  const isCustomizedSpeed = isNumber(speed)

  return (
    <>
      {isCustomizedSpeed && <style>{`.${randomClassName} { animation-duration: ${speed}ms; }`}</style>}
      <TransitionGroup
        {...props}
        className={classnames('exd-transition-switch__transition-group', className)}
        childFactory={(child) =>
          // https://juejin.im/post/5cb1e4275188251ace1feee9#heading-7
          React.cloneElement(child, {
            classNames: {
              enter: `exd-transition-switch__animating exd-transition-switch__animating--${speed}`,
              exit: `exd-transition-switch__animating exd-transition-switch__animating--${speed}`,
              ...(direction === 'back'
                ? {
                    enterActive: `exd-transition-switch__${animate}PrevEnter`,
                    exitActive: `exd-transition-switch__${animate}NextLeave`,
                  }
                : {
                    enterActive: `exd-transition-switch__${animate}NextEnter`,
                    exitActive: `exd-transition-switch__${animate}PrevLeave`,
                  }),
            },
          })
        }
        ref={forwardedRef}
      >
        <CSSTransition
          key={animateKey}
          timeout={
            ({
              none: 0,
              fastest: 100,
              fast: 200,
              normal: 300,
              slow: 500,
              slowest: 700,
              test: 5000,
            }[speed as string] ?? (isCustomizedSpeed ? speed : 300)) as number
          }
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <div className={`exd-transition-switch__animated-switch ${randomClassName}`}>{children}</div>
        </CSSTransition>
      </TransitionGroup>
    </>
  )
})

TransitionSwitch.defaultProps = {
  animate: 'slide',
  speed: 'normal',
}

export default TransitionSwitch
