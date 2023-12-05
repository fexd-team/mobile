import AUTO_API from '../../helpers/AUTO_API'
import React, { ReactNode } from 'react'
import { TransitionSpeed } from '../createTransition/type'
import { JSXDivProps } from '../../helpers/html.types'

export type ProgressBarRef = HTMLDivElement
export interface ProgressBarProps extends JSXDivProps {
  value?: number
  speed?: TransitionSpeed | number
  children?: ReactNode
  ref?: React.Ref<ProgressBarRef>
}

export default AUTO_API<ProgressBarProps>()
