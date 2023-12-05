import AUTO_API from '../../helpers/AUTO_API'
import React, { ReactNode } from 'react'
import { JSXDivProps } from '../../helpers/html.types'

export interface TransitionSwitchProps extends JSXDivProps {
  direction?: 'forward' | 'back'
  animateKey?: any
  animate?: 'fade' | 'slide' | 'slide-cover'
  speed?: 'none' | 'fastest' | 'fast' | 'normal' | 'slow' | 'slowest' | 'test'
}

export default AUTO_API<TransitionSwitchProps>()
