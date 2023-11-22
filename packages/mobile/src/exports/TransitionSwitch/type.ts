import React, { ReactNode } from 'react'

type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

export interface TransitionSwitchProps extends JSXDivElement {
  direction?: 'forward' | 'back'
  animateKey?: any
  animate?: 'fade' | 'slide' | 'slide-cover'
  speed?: 'none' | 'fastest' | 'fast' | 'normal' | 'slow' | 'slowest' | 'test'
}
